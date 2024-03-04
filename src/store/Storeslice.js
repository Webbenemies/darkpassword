import { createSlice } from "@reduxjs/toolkit";

const init = {
    tost:{
        display:false,
        mas: "done the task",
        icon: "done",
        color:"bg-red-400",
        time:""
    },
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
        },

        showtost(state, action){
            state.tost.display = true
            state.tost.mas = action.payload.mass
            state.tost.icon = action.payload.icon
            state.tost.color = action.payload.bg
            state.tost.time = action.payload.time
        },

        delettost(state){
            state.tost.display = false
        }

    }
})

export const {storelogin, storelogout, showtost, delettost} = Ultraslice.actions

export default Ultraslice.reducer