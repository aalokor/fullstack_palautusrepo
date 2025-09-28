const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testiblogi',
    author: 'Teppo Testaaja',
    url: 'http://testiblogi.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  assert(titles.includes('Testiblogi'))
})

test('likes field default value is zero', async () => {
  const newBlog = {
    title: 'Testiblogi',
    author: 'Teppo Testaaja',
    url: 'http://testiblogi.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added and leads to request error', async () => {
  const newBlog = {
    title: '',
    author: 'Teppo Testaaja',
    url: 'http://testiblogi.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('blog without url is not added and leads to request error', async () => {
  const newBlog = {
    title: 'Testiblogi',
    author: 'Teppo Testaaja',
    url: '',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})