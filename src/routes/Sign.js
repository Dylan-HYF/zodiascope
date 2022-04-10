import { Link } from 'react-router-dom'

import { importAll } from '../utils/importAll'


const images = importAll(require.context('../assets/zodiac image', false, /\.(png|jpe?g|svg)$/));

export const Sign = ({ user }) => {
  const userSign = user.sign
  return (
    <section className="vh-100 text-center d-flex flex-column justify-content-center align-items-center section-center">
      <img src={images[`${userSign && userSign.toLowerCase()}.png`]} alt={userSign} className="img-fluid w-25 mb-4 sign-pic" />
      <p className="mb-0">{user.displayName}, it appears that you are a </p>
      <h1 className="display-3 mb-5">{userSign}</h1>
      <div className="sign-btns">
        <Link to="/prediction">
          <button type="button" className="btn btn-primary narrow">Prediction</button>
        </Link>
        <Link to="/analysis">
          <button type="button" className="btn btn-primary narrow">Analysis</button>

        </Link>
        <Link to="/bot">
          <button type="button" className="btn btn-primary narrow">Consult Bot</button>
        </Link>
      </div>
    </section>
  )
}