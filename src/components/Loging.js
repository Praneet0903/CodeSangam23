import React, { useState, useEffect } from 'react';
import './Loging.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook } from 'reactjs-social-login';
import LogGoogle from './LogGoogle';


const Loging = () => {

  const [credentials,setCredentials] = useState({email:"",password:""});
  const navigate = useNavigate();

const onSubmit= async (event) => {
  event.preventDefault();
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email,password:credentials.password}),
  });
    const json =  await response.json();
    console.log(json);
    if(json.success){
      //redirect
      localStorage.setItem('token',json.authToken);

      navigate('/task')
    }
};


const onChange= (event)=>{
  setCredentials({...credentials, [event.target.name]:event.target.value})
}

// const handleCallbackResponse = (Response) => {
//   console.log(Response.credential);
//   const credentialResponseDecoded = jwtDecode(Response.credential);
//   // setUser(credentialResponseDecoded);
//   console.log(credentialResponseDecoded);
//   document.getElementById("signInDiv").hidden = true;
// };

// const handleSignOut = (event) => {
//   setUser({});
//   document.getElementById("signInDiv").hidden = false;
// }

// const google = window.google;
// useEffect(()=>{
//   google.accounts.id.initialize({
//     client_id: "384014618827-hqgeaqsg1799nhams8sdknbea627sd14.apps.googleusercontent.com",
//     callback: handleCallbackResponse
//   });

//   google.accounts.id.renderButton(
//     document.getElementById("signInDiv"),
//     { theme: "outline", size: "large"}
//   );
// }, []);

    return (
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-200">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={onSubmit}>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                
                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example3">Email address</label>
                  <input type="email" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" name='email' value={credentials.email} onChange={onChange} required/>
                  
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" for="form3Example4">Password</label>
                  <input type="password" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Enter password" name='password' value={credentials.password} onChange={onChange} required/>
                  
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" for="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">Forgot password?</a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg"
                    style={{'padding-left': '2.5rem', 'padding-right': '2.5rem'}}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                   <Link to={"/signUp"} className="link-danger">Register</Link></p>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3"></p>
                  {/* <button type="button" className="btn btn-primary btn-floating mx-1"  onClick={() => login()}> */}
                  {/* <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button> */}


                  {/* <div id="signInDiv"></div> */}
                  <LogGoogle />

                  <LoginSocialFacebook
                    appId='1028878185033376'
                    onResolve={(response) => {
                      console.log(response);
                    }}
                    onReject={(error) => {
                      console.log(error);
                    }}
                  >
                    <FacebookLoginButton/>
                  </LoginSocialFacebook>
                  {/* <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-linkedin-in"></i>
                  </button> */}
                </div>
               
              </form>
            </div>
          </div>
        </div>
        
      </section>
    );
}

export default Loging;
