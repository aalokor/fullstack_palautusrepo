const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
]

const initialUsers = [
  {
    username: 'admin',
    name: 'Aatu Admin',
    password: 'admin1234',
  },
  {
    username: 'juno',
    name: 'Juno-kissa',
    password: 'juno0000',
  },
  {
    username: 'john',
    name: 'Jonh Smith',
    password: 'breakfasttea',
  } 
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'test',
    author: 'test',
    url: 'test',
    likes: 10
   })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const setupDatabase = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const users = []

  for (const user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10)
     const userObject = new User({
      username: user.username,
      name: user.name,
      passwordHash,
    })
    const savedUser = await userObject.save()
    users.push(savedUser)
  }
  
  for (let i = 0; i < initialBlogs.length; i++) {
    const blog = initialBlogs[i]

    let user
    if (i === 0 || i === 1) {
      user = users[0]
    } else if (i === 2 || i === 3) {
      user = users[1]
    } else {
      user = users[2]
    }

    const blogObject = new Blog({
      url: blog.url,
      title: blog.title,
      author: blog.author,
      user: user._id,
      likes: blog.likes
    })

    const savedBlog = await blogObject.save()

    const freshUser = await User.findById(user._id)
    freshUser.blogs = freshUser.blogs.concat(savedBlog._id)
    await freshUser.save()
  }
}

module.exports = {
  initialBlogs,
  initialUsers, 
  nonExistingId, 
  blogsInDb,
  usersInDb,
  setupDatabase
}