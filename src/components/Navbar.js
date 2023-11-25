import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap-min-css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'





export const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.clear();
    navigate('/login');
  }
  
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
  <div className="container-fluid">
    <a className="navbar-brand" href="/">ScheduleSavvy</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"> 
          <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
    
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
        </li>
        
      </ul>
      
      {!localStorage.getItem('token')?<form className="d-flex">
      
      <Link className={`btn btn-primary mx-2 ${location.pathname==='/login'?"active":""}`} to="/login" role="button">Login</Link>
      <Link className={`btn btn-primary mx-2 ${location.pathname==='/signup'?"active":""}`} to="/signup" role="button">Signup</Link>
      </form>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
      
    </div>
  </div>
</nav>
  )
}
