const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('Returning blogs', () => {
  beforeEach(async () => {
    await helper.setupDatabase()
  }) 

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog identification field is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      assert.ok(blog.id !== undefined)
      assert.strictEqual(blog._id, undefined)
    })
  })
})

describe('Adding blogs', () => {
  beforeEach(async () => {
    await helper.setupDatabase()
  })

  test('a valid blog can be added', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'admin1234'
      })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'Adminblogi',
      author: 'Aatu Admin',
      url: 'http://adminblogi.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    assert(titles.includes('Adminblogi'))
  })

  test('likes field default value is zero', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'admin1234'
      })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'Adminblogi',
      author: 'Aatu Admin',
      url: 'http://adminblogi.com'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title is not added and leads to request error', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'admin1234'
      })

    const token = loginResponse.body.token

    const newBlog = {
      title: '',
      author: 'Aatu Admin',
      url: 'http://adminblogi.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('blog without url is not added and leads to request error', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'admin1234'
      })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'Adminblogi',
      author: 'Aatu Admin',
      url: '',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('Deleting blogs', () => {
  beforeEach(async () => {
    await helper.setupDatabase()
  })

  test('blog can be deleted', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'admin1234'
      })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'Adminblogi',
      author: 'Aatu Admin',
      url: 'http://adminblogi.com',
      likes: 10
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    const ids = blogsAtEnd.map(r => r.id)
    assert(!ids.includes(response.body.id))
  })

  test('blog cannot be deleted without an authorization token', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'admin1234'
      })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'Adminblogi',
      author: 'Aatu Admin',
      url: 'http://adminblogi.com',
      likes: 10
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .expect(401)
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })
})

describe('Modifying blogs', () => {
  beforeEach(async () => {
    await helper.setupDatabase()
  })

  test('blog can be modified and the correct information is saved', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
    const likes = {
      likes: 15
    }

    const response = await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(likes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, likes.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})
