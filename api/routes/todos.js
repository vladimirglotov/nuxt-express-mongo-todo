const { Router } = require('express')
const Todo = require('../models/todo.model')
const router = Router()

router.get('/todos', async function (req, res, next) {
  try {
    const todos = await Todo.find().sort({ date: -1 })
    res.json(todos)
  } catch (error) {
    res.status(500).json(req.body)
  }
})

router.post('/todos/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    date: Date.now(),
    done: false
  })
  try {
    await todo.save()
    res.status(201).json(todo)
  } catch (e) {
    res.status(500).json(req.body)
  }
})

router.put('/todos/update/:id', async (req, res) => {
  const $set = {
    done: !req.body.done
  }
  try {
    const todo = await Todo.findOneAndUpdate({
      _id: req.params.id
    }, {$set}, {new: true})
    res.json(todo)
  } catch (e) {
    res.status(500).json(req.body)
  }
})

router.delete('/todos/delete/:id', async (req, res) => {
  try {
    await Todo.deleteOne({_id: req.params.id})
    res.json({message: 'Пост удален'})
  } catch (e) {
    res.status(500).json(req.body)
  }
})

module.exports = router
