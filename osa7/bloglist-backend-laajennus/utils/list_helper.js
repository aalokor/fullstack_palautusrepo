const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const reducer = (max, blog) => {
    return blog.likes > max.likes ? blog : max
  }

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const grouped = _.countBy(blogs, 'author');

  const mostBlogsAuthor = _.maxBy(_.keys(grouped), author => grouped[author]);

  return {
    author: mostBlogsAuthor,
    blogs: grouped[mostBlogsAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  
  const grouped = _.groupBy(blogs, 'author')

  const authorsWithLikes = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes')
  }))
  
  return _.maxBy(authorsWithLikes, 'likes');
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}