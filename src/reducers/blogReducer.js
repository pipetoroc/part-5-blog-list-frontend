import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    updateBlog(state, action) {
      const updated = action.payload

      return state.map(blog => blog.id === updated.id? updated : blog)
    },
    addComment(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id === updatedBlog.id
          ? updatedBlog
          : blog
      )
    }
  }
})

export const { addComment, setBlogs, appendBlog, removeBlog, updateBlog } = blogSlice.actions
export default blogSlice.reducer