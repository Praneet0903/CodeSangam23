import React from 'react';  
import logo from '../images/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Topbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
  
    const handleLogout=()=>{
      localStorage.clear();
      navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary " style={{ "padding": "0px" }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} style={{ "height": "50px", "width": "130px" }} alt='logo'/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link to={"/task"} className="nav-link">Task</Link>
                        </li> */}
                        <li className="nav-item"> 
                        <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==='/task'?"active":""}`} to="/task">Task</Link>
                        </li>
        
                    </ul>
                    {/* <button type="button" className="btn btn-light" onClick={() => navigate('/Login')}>Login</button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/signUp')}>Sign Up</button> */}
                    {!localStorage.getItem('token')?<form className="d-flex">
                    <Link className={`btn btn-primary mx-2 ${location.pathname==='/login'?"active":""}`} to="/login" role="button">Login</Link>
                    <Link className={`btn btn-primary mx-2 ${location.pathname==='/signup'?"active":""}`} to="/signup" role="button">Signup</Link>
                    </form>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>

    );
}

export default Topbar;