import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { Store } from './store/store.js'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Signupcompo from './compos/Signupcompo.jsx'
import Authlayout from './compos/Authlayout.jsx'
import Logincompo from './compos/Logincompo.jsx'
import App from './App.jsx'
import Inditodo from './compos/Inditodo.jsx'
import Home from './pages/Home.jsx'
import Pdfpriview from './compos/Pdfpriview.jsx';
import Trying from './compos/Trying.jsx'
import Profile from './compos/Profile.jsx'
import Phonelogin from './compos/Phonelogin.jsx'
import Varify from './compos/Varify.jsx'
import Inditodo2 from './compos/Inditodo2.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<App/>}>
      <Route index path='/' element={ <Home/>}/>
      <Route path='/todo/:slug' element={<Authlayout authencation={true} child={<Inditodo2/>}/>}/>
      <Route path='/pdf/:pdfid' element={<Authlayout authencation={true} child={<Pdfpriview/>}/>}/>
      <Route path='/account' element={<Authlayout authencation={true} child={<Profile/>}/>}/>
      <Route path='/varify' element={<Varify/>}/>
      <Route path='/signup' element={<Authlayout authencation={false} child={<Signupcompo/>}/>}/>
      <Route path='/phonelogin' element={<Authlayout authencation={false} child={<Phonelogin/>}/>}/>
      <Route path='/test' element={<Authlayout authencation={false} child={<Trying/>}/>}/>
      <Route path='/login' element={<Authlayout authencation={false} child={<Logincompo/>}/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
)
