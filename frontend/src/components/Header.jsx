import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="logo">
        RememberToStudy
      </Link>
      <p>Manage your study goals and assignments in one place.</p>
    </header>
  );
}

export default Header;