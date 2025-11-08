import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignin from './pages/UserSignin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignin from './pages/CaptainSignin'
import { ErrorBoundary } from 'react-error-boundary'
import Home from './pages/Home'
import CapHome from './pages/CapHome'


// add react-toastify imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>window.location.reload()}>
      <div>
        <Routes>
          <Route path='/' element={<Start/>}/>
          <Route path='/user/login' element={<UserLogin/>}/>
          <Route path='/user/signin' element={<UserSignin/>}/>
          <Route path='/captain/login' element={<CaptainLogin/>}/>
          <Route path='/captain/signin' element={<CaptainSignin/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/caphome' element={<CapHome/>}/>
        </Routes>

        {/* Toast container - available app-wide */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ErrorBoundary>
  )
}

export default App