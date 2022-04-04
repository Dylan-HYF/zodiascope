import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Login = ({ user }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (user.displayName) {
      return navigate("/account");
    }
  }, [user.displayName, navigate])
  const google = () => {
    window.open('http://localhost:8000/auth/google', '_self')
  }
  return (
    <section className="vh-100 text-center d-flex flex-column justify-content-center align-items-center section-center">
      <p className="mb-0">Welcome,</p>
      <h1 className="display-3 mb-5">Create your account</h1>
      <button type="button" className="btn btn-primary mt-3" onClick={google}>Sign in with Google</button>
    </section>
  )
}