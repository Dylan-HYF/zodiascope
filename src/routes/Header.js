import { Link } from "react-router-dom"

export const Header = ({ user }) => {
  const logout = () => {
    window.open('http://localhost:8000/auth/logout', '_self')
  }
  return (
    <header>
      <Link to="/" className="logo">the logo</Link>
      <div className="header-buttons">
        <Link to="/bot" className="header-link">Bot</Link>
        <Link to={user.displayName ? '/account' : '/login'} className="header-link">{user.displayName ? 'Account' : 'Login'}</Link>
        {user.displayName && <button className="header-link logout" onClick={logout}>Logout</button>}
      </div>
    </header>
  )
}