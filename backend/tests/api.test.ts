import supertest from 'supertest'
import  app  from '../index'
//use the supertest object as our API
const api = supertest(app)

import Todo from '../models/todo'
import User from '../models/users'

test('GET /todos call', async () => {
  const res = await api
      .get('/todos')
      .expect(200)
  console.log(res)
})

