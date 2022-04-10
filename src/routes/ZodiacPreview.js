import { AiOutlineLeft } from "react-icons/ai"
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { importAll } from '../utils/importAll'
const images = importAll(require.context('../assets/zodiac image', false, /\.(png|jpe?g|svg)$/));
export const ZodiacPreview = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const zodiacSign = location.state?.sign
  useEffect(() => {
    if (!zodiacSign) {
      return navigate("/");
    }
  }, [zodiacSign, navigate])
  const [analysis, setAnalysis] = useState({})
  useEffect(() => {
    let isMounted = true
    const fetchAnalysis = async () => {
      const res = await fetch(`http://localhost:8000/user/${zodiacSign[0]}${zodiacSign.slice(1).toLowerCase()}`)
      const data = await res.json()

      if (isMounted) setAnalysis(data)
    }
    if (zodiacSign) {
      fetchAnalysis().catch(err => console.log(err))
    }
    return () => { isMounted = false }
  }, [zodiacSign])


  return (
    <section className="px-4">
      <button onClick={() => window.history.back()} type="button" className="btn btn-link text-decoration-none">
        <AiOutlineLeft className="little-arrow" />
        <span className="align-middle fs-5 ms-2">Back</span>
      </button>
      <main className="overview">

        <section>
          <img src={images[`${zodiacSign ? zodiacSign.toLowerCase() : 'libra'}.png`]} alt={zodiacSign || 'libra'} className="img-fluid analysis-sign" />
          <h1>{analysis.sign}</h1>
          <p>{analysis.date}</p>
          <p className="mt-5 mx-auto zodiac-detail">
            {analysis.overview}
          </p>
        </section>

      </main>
    </section>
  )
}