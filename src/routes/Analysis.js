import { importAll } from '../utils/importAll'
import { AiOutlineLeft } from "react-icons/ai"
import { useState, useEffect } from 'react'


const images = importAll(require.context('../assets/zodiac image', false, /\.(png|jpe?g|svg)$/));

export const Analysis = ({ user }) => {
  const [analysis, setAnalysis] = useState({})
  useEffect(() => {
    const fetchAnalysis = async () => {
      const res = await fetch(`http://localhost:8000/user/${user.sign}`)
      const data = await res.json()
      console.log(data)
      setAnalysis(data)
    }
    if (user.sign) {
      fetchAnalysis().catch(err => console.log(err))
    }
  }, [user.sign])
  return (
    <section className="px-4">
      <button onClick={() => window.history.back()} type="button" className="btn btn-link text-decoration-none">
        <AiOutlineLeft className="little-arrow" />
        <span className="align-middle fs-5 ms-2">Back</span>
      </button>
      <div className="mx-auto w-50 text-center mt-5">
        <img src={images[`${user.sign && user.sign.toLowerCase()}.png`]} alt={user.sign} className="mb-4 analysis-sign" />
        <h1 className="display-4 mb-4">{user.sign}</h1>
        <p className="mb-0">{analysis.date}</p>

      </div>
      <div className="mx-auto mt-5 text-start analysis-block pb-4">
        <p>{analysis.overview}</p>
      </div>
      <div className="mx-auto mt-5 text-start analysis-block pb-4">
        <h3>Positive Traits</h3>
        {analysis.negative && analysis.positive.map(x => (
          <div key={x.heading}>
            <h4 className="my-4 fw-normal">{x.heading}</h4>
            <p>{x.detail}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-5 text-start analysis-block pb-4" style={{ borderBottom: 'none' }}>
        <h3>Negative Traits</h3>
        {analysis.negative && analysis.negative.map(x => (
          <div key={x.heading}>
            <h4 className="my-4 fw-normal">{x.heading}</h4>
            <p>{x.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
