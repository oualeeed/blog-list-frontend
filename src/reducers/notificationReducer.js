import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: 'error'
  },
  reducers: {
    notifyMessage(state, action) {
      return action.payload
    },
    removeNotification() {
      return {
        message: '',
        type: 'error'
      }
    },
  },
})

export const { notifyMessage, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
