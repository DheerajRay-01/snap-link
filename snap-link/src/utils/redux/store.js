import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import linkReducer from './myLinksSlice.js'
import qrReducer from './qrSlice.js'

export default configureStore({
    reducer:{
        user : userReducer,
        links : linkReducer,
        qr : qrReducer,
    },
})