import { useAuthStore } from "../../hooks";

export const Navbar = () => {


  const { startLogout, user } = useAuthStore();

  return (
      <header className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
        <nav className="d-flex justify-content-between align-items-center w-100">
          <span className="navbar-brand">
            <i className="far fa-calendar-alt mr-2"></i>
            <span>{user.name}</span>
          </span>
          
          <button
            className="btn btn-outline-danger"
            onClick={startLogout}
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
          
        </nav>
      </header>
  )
}
