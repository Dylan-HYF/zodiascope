import './App.scss'
import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Header } from './routes/Header'

import { Login } from './routes/Login'
import { Bot } from './routes/Bot'
import { Home } from './routes/Home'
import { ZodiacPreview } from './routes/ZodiacPreview'
import { Account } from './routes/Account'
import { Prediction } from './routes/Prediction'
import { Analysis } from './routes/Analysis'
import { Sign } from './routes/Sign'


function App() {
  const [user, setUser] = useState({})
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('http://localhost:8000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }
      })
      if (res.status === 200) {
        const data = await res.json()
        setUser(data.user)
      } else {
        throw new Error('Authentication has been failed!')
      }

    }
    getUser().catch(err => { console.log(err) })
  }, [])
  console.log(user)
  return (
    <div className="App overflow-hidden">
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login user={user} />} />
          <Route path="account" element={<Account user={user} setUserData={data => setUser(data)} />} />
          <Route path="bot" element={<Bot user={user} />} />
          <Route path="preview" element={<ZodiacPreview />} />
          <Route path="prediction" element={<Prediction user={user} />} />
          <Route path="analysis" element={<Analysis user={user} />} />
          <Route path="sign" element={<Sign user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
