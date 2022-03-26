import zodiac from '../assets/image 4.png'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <main>
      <Link to="preview">
        <img src={zodiac} alt="zodiac" className="img-fluid" />
      </Link>
      <p className="fs-2">
        Gaze upon the stars to<br />
        see your future
      </p>
    </main>
  )
}