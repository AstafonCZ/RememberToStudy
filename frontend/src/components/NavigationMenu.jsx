import { NavLink } from "react-router-dom";

function NavigationMenu() {
  return (
    <nav className="navigation-menu">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/study-goals">Study Goals</NavLink>
      <NavLink to="/assignments">Assignments</NavLink>
    </nav>
  );
}

export default NavigationMenu;