import express, { NextFunction, Request, Response } from 'express'
var router = express.Router();
import dotenv from 'dotenv';
import Todo from '../models/todo';
import auth from '../auth'

dotenv.config();

router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({})
    return res.status(201).json(todos)
  } catch (err) {
    return res.status(501).json({ msg: "some eror occured!" })
  }
})

router.post('/todos', auth, async (req, res) => {
  try {
    const { title, desc } = req.body
    if (!(typeof title === 'string' && title.length > 0 && title.length <= 50 )) {
      return res.status(400).json({ msg: 'incorrect values' })
    }

    const todos = await Todo.create({
      title,
      desc,
      author: res.user._id,
      date: new Date(),
    })
    return res.status(201).json({todo : todos})
  } catch (err) {
    return res.status(501).json({ msg: "some eror occured!" })
  }
})

router.put('/todos/:id', auth, async (req, res) => {
  try {
    const todo_id = req.params.id
    console.log(todo_id, req.params)
    const { title, desc, status } = req.body

    if (!todo_id || !title || typeof status !== 'boolean') {
      return res.status(400).json({ msg: 'id required' })
    }
    const check_todo = await Todo.findById(todo_id)
    if (!check_todo){
      return res.status(403).json({ msg: 'todo not found' })
    }
    if (!(check_todo.author.toString() === res.user._id.toString())){
      return res.status(401).json({ msg: 'permission denied' })
    }

    await Todo.findByIdAndUpdate(todo_id ,{
      title, desc, status
    })
    return res.status(201).json({msg : "Successful!"})
  } catch (err) {
    return res.status(501).json({ msg: "some eror occured!" })
  }
})

router.delete('/todos/:id', auth, async (req, res) => {
  try {
    const todo_id = req.params.id
    if (!todo_id) {
      return res.status(400).json({ msg: 'id required' })
    }
    const check_todo = await Todo.findById(todo_id)
    if (!check_todo){
      return res.status(403).json({ msg: 'todo not found' })
    }
    if (!(check_todo.author.toString() === res.user._id.toString())){
      return res.status(401).json({ msg: 'permission denied' })
    }

    await Todo.findByIdAndDelete(todo_id)

    return res.status(201).json({msg : "Successful!"})
  } catch (err) {
    return res.status(501).json({ msg: "some eror occured!" })
  }
})

export default router