import Blog from './Blog'

export const ListOfBlogs =  ({ blogs, user, setBlogs }) => {

  return (
    <>
      {[...blogs]
        .sort((a, b) => a.likes - b.likes).map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            onDelete={(id) => setBlogs(blogs.filter(b => b.id !== id))}
          />)
        )}
    </>
  )
}
