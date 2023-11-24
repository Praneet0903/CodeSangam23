import React, { useState } from 'react';
import './Sign.css';
import { useNavigate } from 'react-router-dom';

const Sign = () => {

    const navigate = useNavigate();
    const host = "http://localhost:5000"
    const [credentials, setcredentials] = useState({name:"", email: "", password: "" });

    const onChange = (e) => {
        setcredentials({ ...credentials,[e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => { 
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email ,password}),
          });
          const json = await response.json();
          console.log(json);
          
          if(json.success){
            localStorage.setItem('token',json.authToken);
            navigate('/');
          }
    }
    return (
    <section className="vh-100" style={{}}>
        <div className="container-fluid h-custom" style={{'border': 'none'}}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">         
                    <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <form className="mx-1 mx-md-4" onSubmit={onSubmit}>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <label className="form-label" for="form3Example1c">Your Name</label>
                                    <input type="text" id="form3Example1c" className="form-control" name='name' placeholder='Enter your name' value={credentials.name} onChange={onChange} required/>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <label className="form-label" for="form3Example3c" >Your Email</label>
                                    <input type="email" id="form3Example3c" className="form-control" placeholder='Enter your email' name='email' value={credentials.email} onChange={onChange} required/>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <label className="form-label" for="form3Example4c" >Password</label>
                                    <input type="password" id="form3Example4c" className="form-control" placeholder='Enter password' name='password' value={credentials.password} onChange={onChange} required/>
                                    </div>
                                </div>

                                {/* <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                    <label className="form-label" for="form3Example4cd">Repeat your password</label>
                                    <input type="password" id="form3Example4cd" className="form-control" placeholder='Renter your password'  onChange={onChange} />
                                    
                                    </div>
                                </div> */}

                                <div className="form-check d-flex justify-content-center mb-5">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" required/>
                                    <label className="form-check-label" for="form2Example3">
                                    I agree all statements in <a href="#!">Terms of service</a>
                                    </label>
                                </div>

                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button type="submit" className="btn btn-primary btn-lg" >Register</button>
                                </div>

                            </form>

                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}
export default Sign;