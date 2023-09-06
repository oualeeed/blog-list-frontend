import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: 'error',
  },
  reducers: {
    notifyMessage(state, action) {
      return action.payload
    },
    removeNotification() {
      return {
        message: '',
        type: 'error',
      }
    },
  },
})

export const useNotify = (type) => {
  const dispatch = useDispatch()
  return (message) => {
    dispatch(notifyMessage({ message, type }))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
}

export const { notifyMessage, removeNotification, notify } =
  notificationSlice.actions
export default notificationSlice.reducer
