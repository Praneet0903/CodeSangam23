import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const SignUp = (props) => {
    const navigate = useNavigate();
    const host = "http://localhost:5000"
    const [credentials, setcredentials] = useState({name:"", email: "", password: "" });

    const onChange = (e) => {
        setcredentials({ ...credentials,[e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email,password:credentials.password}),
          });
          const json = await response.json();
          console.log(json);
          
          if(json.success){
            localStorage.setItem("token",json.authToken);
            navigate('/')
            props.showAlert("User successfully created","success")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }   
    }
  return (
    <div className='container my-3' >
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" ><h4>Name</h4></label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" ><h4>Email address</h4></label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" ><h4>Password</h4></label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} required minLength={5}/>
                </div>

                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}
