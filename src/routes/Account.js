import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from "react"
import { Sign } from './Sign'

import { useNavigate } from 'react-router-dom'
const zodiac = require('zodiac-signs')('en')

export const Account = ({ user, setUserData }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!user.displayName) {
      return navigate("/login");
    }
  }, [user.displayName, navigate])
  const [dob, setDob] = useState({
    mm: '',
    dd: '',
    yy: ''
  })
  const setDobValue = type => e => {
    const val = e.target.value
    setDob({
      ...dob,
      [type]: val
    })
  }
  const insertDob = () => {
    const sign = zodiac.getSignByDate({ day: dob.dd, month: dob.mm })
    console.log(sign)
    if (sign === -1) {
      toast.warn("Invalid Date!", { autoClose: 1000 })
      return
    }
    toast.success("Calculating your zodiac...")
    const data = {
      sign: sign.name
    }
    // console.log(JSON.stringify(data))

    fetch(`http://localhost:8000/user/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUserData(data.value)
        navigate('/sign')

      })
      .catch(err => console.log(err))
  }
  // console.log(user)
  if (!user.sign) {
    return (
      <section className="vh-100 text-center d-flex flex-column justify-content-center align-items-center section-center">
        <p className="mb-0">Hi {user.displayName}, ready to find your fate?</p>
        <h1 className="display-3 mb-5">Your date of birth</h1>
        <form>
          <input value={dob.mm} onChange={setDobValue('mm')} type="text" placeholder="MM" className="input" />
          <input value={dob.dd} onChange={setDobValue('dd')} type="text" placeholder="DD" className="input" />
          <input value={dob.yy} onChange={setDobValue('yy')} type="text" placeholder="YY" className="input" style={{ width: '160px' }} />

        </form>
        <button type="button" className="btn btn-primary mt-5" onClick={insertDob}>Next</button>
        <ToastContainer />
      </section>
    )
  }
  return <Sign user={user} />
}