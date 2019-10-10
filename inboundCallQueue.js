require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const persephonySDK = require('@persephony/sdk')

const app = express()
app.use(bodyParser.json())
// Where your app is hosted ex. www.myapp.com
const host = process.env.HOST
const port = process.env.PORT || 3000
// your Persephony API key (available in the Dashboard) - be sure to set up environment variables to store these values
const accountId = process.env.ACCOUNT_ID
const authToken = process.env.AUTH_TOKEN
const persephony = persephonySDK(accountId, authToken)

app.post('/incomingCall', (req, res) => {
  const options = {
    alias: 'Test',
    maxSize: 25
  }
  //Invoke method to create a queue with the options provided
  persephony.api.queues.create(options).then(queue => {
    // use created queue
    const enqueue = persephony.percl.enqueue(queue.queueId, `${host}/inboundCallAction`, `${host}/inboundCallWait`)
    const percl = persephony.percl.build(enqueue)
    res.status(200).json(percl)
  }).catch(err => { /* Handle Errors */ })
})

app.post('/inboundCallWait', (req, res) => {
  const queueId = req.params.queueId
  const callId = req.body.callId

  // Create PerCL say script
  const say = persephony.percl.say('Press any key to exit queue.')
  const play = persephony.percl.play(`${host}/getAudio`)
  // Create options for getDigits script
  const prompts = persephony.percl.build(say, play)
  const options = {
    prompts,
    maxDigits: 1,
    minDigits: 1,
    flushBuffer: true
  }
  // Create PerCL for getDigits script
  const getDigits = persephony.percl.getDigits(`${host}/callDequeue`, options)
  // Build and respond with Percl script
  const percl = persephony.percl.build(getDigits)
  res.status(200).json(percl)
})

app.post('/callDequeue', (req, res) => {
  const getDigitsResponse = req.body
  const digits = getDigitsResponse.digits
  if (digits && digits.length > 0) {
    const dequeue = persephony.percl.dequeue()
    const percl = persephony.percl.build(dequeue)
    res.status(200).json(percl)
  } else {
    const redirect = persephony.percl.redirect(`${host}/inboundCallWait`)
    const percl = persephony.percl.build(redirect)
    res.status(200).json(percl)
  }
})

app.post('/inboundCallAction', (req, res) => {
  const say = persephony.percl.say('Call exited queue')
  const percl = persephony.percl.build(say)
  res.status(200).json(percl)
})

app.get('/getAudio', (req, res) => {
  const file = `${__dirname}/elevator_music.wav`
  res.download(file)
})

// Specify this route with 'Status Callback URL' in App Config
app.post('/status', (req, res) => {
  // handle status changes
  res.status(200)
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
