
import { Link } from 'react-router-dom'
import { importAll } from '../utils/importAll'
const images = importAll(require.context('../assets/zodiac', false, /\.(png|jpe?g|svg)$/));

const imagesTitle = Object.entries(images).map(x => [x[0].split('.')[0], x[1]])

export const Home = () => {
  return (
    <main>

      <div className="preview">
        {imagesTitle.map(x => (
          <Link key={x[0]} state={{ sign: x[0] }} to="preview" className="preview-link">
            <div className="preview-img">
              <img src={x[1]} alt={x[0]} />

            </div>
            <h4 className="fs-5">{x[0]}</h4>
          </Link>
        ))}
      </div>
      <p className="fs-1 my-5">
        Gaze upon the stars to<br />
        see your future
      </p>
    </main>
  )
}