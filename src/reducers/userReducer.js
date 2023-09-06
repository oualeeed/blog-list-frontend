import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const loginUser = (credentials) => async (dispatch) => {
  const response = await loginService.login(credentials)
  blogService.setToken(response.token)
  return dispatch(setUser(response))
}

export default userSlice.reducer
export const { setUser } = userSlice.actions
