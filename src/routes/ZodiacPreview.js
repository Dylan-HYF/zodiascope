import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import zodiac from '../assets/image 1.png'
export const ZodiacPreview = () => {
  return (
    <main className="preview">
      <AiOutlineLeft className="arrow" />
      <section>
        <img src={zodiac} alt="zodiac" className="img-fluid" />
        <h1>Libra</h1>
        <p>September 23 - October 22</p>
        <p className="mt-5 mx-auto zodiac-detail">
          Librans are extroverted, cosy, and friendly people. Librans, like the Scales that symbolise the sign, are often concerned with attaining balance, harmony, peace, and justice in the world. With their vast stores of charm, intelligence, frankness, persuasion, and seamless connectivity, they are well-equipped to do so.
        </p>
      </section>
      <AiOutlineRight className="arrow" />

    </main>
  )
}