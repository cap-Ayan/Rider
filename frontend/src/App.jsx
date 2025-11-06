import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignin from './pages/UserSignin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignin from './pages/CaptainSignin'
import { ErrorBoundary } from 'react-error-boundary'


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
        <Route path='/' element={<Home/>}/>
        <Route path='/user/login' element={<UserLogin/>}/>
        <Route path='/user/signin' element={<UserSignin/>}/>
        <Route path='/captain/login' element={<CaptainLogin/>}/>
        <Route path='/captain/signin' element={<CaptainSignin/>}/>
      </Routes>
      </div>
    </ErrorBoundary>
  )
}


export default App