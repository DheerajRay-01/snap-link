import { createSlice } from '@reduxjs/toolkit'

export const linkSlice = createSlice({
  name: 'links',
  initialState: {
    links:[],
    limit:10,
    currentPage:0
  },
  reducers: {
    fetchAllLinks: (state,action) => {
        const link = action.payload
        state.links = link
        state.currentPage = 1
    },
    fetchMoreLinks: (state, action) => {
  const link = action.payload;
  // console.log(link);
  
  state.links = [...state.links, ...link]; 
  state.currentPage += 1;
},

    deleteLink: (state,action) => {
      const slug = action.payload
      state.links = state.links.filter((l) => l.slug !== slug)
    },
    addLink: (state,action) => {
      const newLink = action.payload
    state.links.push(newLink)
    },
    updateLink: (state,action) => {
      const newLink = action.payload
      state.links = state.links.map((l)=> newLink._id === l._id ? newLink : l)
      // state.links.push(newLink)
    },
     deleteMyLinks: (state,action) => {
          state.links = null
        },
  },
})

// Action creators are generated for each case reducer function
export const { fetchAllLinks,addLink , fetchMoreLinks ,deleteLink,updateLink,deleteMyLinks} = linkSlice.actions

export default linkSlice.reducer