import { createSlice } from '@reduxjs/toolkit'

export const qrSlice = createSlice({
  name: 'qr',
  initialState: {
    allQr:[],
    limit:10,
    currentPage:0
  },
  reducers: {
    fetchAllQr: (state,action) => {
        const qr = action.payload
        state.allQr = qr
        state.currentPage = 1
    },
    fetchMoreQr: (state, action) => {
    const qr = action.payload;
    state.allQr = [...state.allQr, ...qr]; 
    state.currentPage += 1;
},

    deleteQr: (state,action) => {
      const slug = action.payload
      state.allQr = state.allQr.filter((q) => q.slug !== slug)
    },
     deleteMyQrs: (state,action) => {
          state.allQr = null
        },
  },
})

// Action creators are generated for each case reducer function
export const { fetchAllQr , fetchMoreQr ,deleteQr ,deleteMyQrs} = qrSlice.actions

export default qrSlice.reducer