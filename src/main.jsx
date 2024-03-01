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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<App/>}>
      <Route index path='/' element={ <Home/>}/>
      <Route path='/todo/:slug' element={<Authlayout authencation={true} child={<Inditodo/>}/>}/>
      <Route path='/pdf/:pdfid' element={<Authlayout authencation={true} child={<Pdfpriview/>}/>}/>
      <Route path='/signup' element={<Authlayout authencation={false} child={<Signupcompo/>}/>}/>
      <Route path='/login' element={<Authlayout authencation={false} child={<Logincompo/>}/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
