const CreateForm = ({ createBlog, newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
  return (
    <form onSubmit={createBlog}>
        <div>
          title: <input 
          value={newTitle}
          onChange={handleTitleChange} 
          />
        </div>
        <div>
          author: <input 
          value={newAuthor}
          onChange={handleAuthorChange} 
          />
        </div>
        <div>
          url: <input 
          value={newUrl}
          onChange={handleUrlChange} 
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
    </form>
  )
}

export default CreateForm