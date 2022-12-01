export const Navbar = () => {
  return (
      <header className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
        <nav className="d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="#">Navbar</a>
          
          <button
            className="btn btn-outline-danger"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
          
        </nav>
      </header>
  )
}
