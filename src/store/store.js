import {configureStore} from "@reduxjs/toolkit"
import ultraredu from "./Storeslice"

export const Store = configureStore({
    reducer:ultraredu
})