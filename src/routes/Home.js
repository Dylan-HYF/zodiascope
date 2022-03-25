import zodiac from '../assets/image 4.png'

export const Home = () => {
  return (
    <main>
      <img src={zodiac} alt="zodiac" className="img-fluid" />
      <p className="fs-2">
        Gaze upon the stars to<br />
        see your future
      </p>
    </main>
  )
}