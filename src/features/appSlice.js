import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './appAPI';

const initialState = {
  roomId: null,
  status: 'idle',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // actions
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { enterRoom } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// selectors
export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;
