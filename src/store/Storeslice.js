import { createSlice } from "@reduxjs/toolkit";

const init = {
    track:{
        status: false,
        userdata: null,
    }
}

export const Ultraslice = createSlice({
    name:'nodddne',
    initialState: init,
    reducers:{
        storelogin(state, action){
            state.track.status = true,
            state.track.userdata = action.payload
        },

        storelogout(state){
            state.track.status = false,
            state.track.userdata = null
        }
    }
})

export const {storelogin, storelogout} = Ultraslice.actions

export default Ultraslice.reducer