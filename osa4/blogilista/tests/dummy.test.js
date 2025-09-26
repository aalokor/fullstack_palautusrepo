const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = [
  {
    title: "Testiblogi",
    author: "Teppo Testaaja",
    url: "http://testiblogi.com",
    likes: 10,
  },
  {
    title: "Blogaus",
    author: "Bertta",
    url: "http://blogaus.com",
    likes: 12,
  },
  {
    title: "Hello World!",
    author: "Novice",
    url: "http://helloworld.com",
    likes: 50,
  }
  ]

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})