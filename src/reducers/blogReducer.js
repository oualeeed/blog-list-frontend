import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    modifyBlog(state, action) {
      const id = action.payload.id
      return state.map((blog) => (blog.id === id ? action.payload : blog))
    },
    deletBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

// export const upvoteBlog = (blog) => async (dispatch) => {
//   const updatedBlog = {
//     ...blog,
//     likes: blog.likes + 1,
//   }
//   const response = await blogService.update(updatedBlog)
//   dispatch(modifyBlog(response))
// }

export const upvoteBlog = id => async (dispatch) => {
  const likedBlog = await blogService.like(id)
  dispatch(modifyBlog(likedBlog))
}

export const removeBlog = (id) => async (dispatch) => {
  await blogService.remove(id)
  dispatch(deletBlog(id))
}

export default blogSlice.reducer
export const { setBlogs, modifyBlog, deletBlog, appendBlog } = blogSlice.actions
