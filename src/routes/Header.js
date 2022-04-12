import { Link } from "react-router-dom"
import logo from '../assets/logo.png'

export const Header = ({ user }) => {
  const logout = () => {
    window.open('http://localhost:8000/auth/logout', '_self')
  }
  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" style={{ width: '30px' }} className="me-2" />
        Stellar
      </Link>
      <div className="header-buttons">
        <Link to="/bot" className="header-link">Bot</Link>
        <Link to={user.displayName ? '/account' : '/login'} className="header-link">{user.displayName ? 'Account' : 'Login'}</Link>
        {user.displayName && <button className="header-link logout" onClick={logout}>Logout</button>}
      </div>
    </header>
  )
}