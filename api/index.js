const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const todos = require('./routes/todos')

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb+srv://12345user:12345user@cluster0.qdyas.mongodb.net/nuxt-blog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('mongo connected'))
  .catch(e => console.log(e))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(todos)

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
