import { AiOutlineLeft } from "react-icons/ai"
import moment from 'moment'
import { useState, useEffect } from "react"
import ring from '../assets/image 2.png'


export const Prediction = ({ user }) => {
  const [prediction, setPrediction] = useState('')
  useEffect(() => {
    let isMounted = true
    const fetchPre = async () => {
      const res = await fetch(`https://aztro.sameerkumar.website/?sign=${user.sign.toLowerCase()}&day=today`, {
        method: 'POST'
      })
      const data = await res.json()
      if (isMounted) setPrediction(data.description)
      console.log(data)
    }
    if (user.sign) {
      fetchPre().catch((err) => console.log(err))
    }
    return () => { isMounted = false }
  }, [user.sign])
  return (
    <section className="px-4">
      <button onClick={() => window.history.back()} type="button" className="btn btn-link text-decoration-none">
        <AiOutlineLeft className="little-arrow" />
        <span className="align-middle fs-5 ms-2">Back</span>
      </button>
      <div className="position-relative container prediction-w px-4 d-flex justify-content-center flex-column" style={{ marginTop: '80px', height: '60vh' }}>
        <img src={ring} alt="A ring" className="position-absolute ring" />
        <h1 className="display-3 mb-4 z-index-1">Hi {user.displayName},</h1>
        <p className="fs-5 z-index-1">
          {prediction}
        </p>
        <p className="text-end mt-5 z-index-1">{moment().format('DD MMMM YYYY')}</p>
      </div>
    </section>
  )
}
