import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">the logo</Link>
      <div className="header-buttons">
        <Link to="/bot" className="header-link">bot</Link>
        <Link to="/login" className="header-link">login</Link>
      </div>
    </header>
  )
}