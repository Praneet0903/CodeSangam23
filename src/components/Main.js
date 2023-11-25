import React from 'react'
import './Main.css';
import { useNavigate } from "react-router-dom";
import image from "../images/todo_list.jpg"



const Main = ()=>{
    const navigate = useNavigate();
    return(
        <div  className='home'>
            <div className='home1'>
                <h1 className='title'>
                <span>Welcome to <strong>ScheduleSavvy</strong></span></h1>
                <p id="colorchange"><strong>Become focused, organized, and calm with Todo List.</strong></p>
                <button >Start for free</button>
            </div>
            <div className="container">
			<div className="row">
				<div className="col-12">
					<h2 className="block-why__title page-title my-4" id="why">
					Why ScheduleSavvy?
					</h2> 
				</div>
				
				<div className="col-12 col-md-6 col-lg-6">
					<div className="block-why__text-wrapper ">
						<p className="block-why__text page-text">
						When it comes down to organising tasks in hand, all&nbsp;you need is three things:
						</p>
						<ul className="block-why__list">
							<li className="block-why__list-item page-text">
								FREE(that’s right, in capitals)
							</li>
							<li className="block-why__list-item page-text ">
								Ease of use
								
							</li>
							<li className="block-why__list-item">
								
								Versatility
								
							</li>
						</ul>
						<p className="block-why__text page-text">
							Coincidentally, that’s exactly what you get from ScheduleSavvy- task management website that’s easy to use and helps you keep track of all your todos in one place.
						</p>
						<a className="block-why__btn page-btn" href="">Get Started</a>					</div>
				</div>
                <div className="col-12 col-md-6 col-lg-6">
                <img src={image} alt="todo app"/>
				</div>
			</div>
		</div>
        <div className='free d-inline-flex'>
           <div>
           <div id="free" class="dynamic-box mt-5">
							
							<h2 class="dynamic-box__title page-title mt-5">
								<span>
								It’s free
								</span>
								<i class="dynamic-box_icon dynamic-box_icon_1"></i>
							</h2>
							<div class="dynamic-box__text-wrapper">
								<p class="dynamic-box__text page-text">
								To get started with ScheduleSavvy, all you have to do is sign up using your email and... that’s it! Once you’ve signed up , you get access to all of the features of ScheduleSavvy FOREVER.
								</p>
								<ul class="dynamic-box__list page-text">
									<li>
									No paid subscription
									</li>
									<li>
									Unlimited users
									</li>
									<li>
									Free forever
									</li>
								</ul>
							
							</div>
						</div>

           </div>
            <div className='loginpage'>
            <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-200">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                
                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example3">Email address</label>
                  <input type="email" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" name='email' required/>
                  
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" for="form3Example4">Password</label>
                  <input type="password" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Enter password" name='password'required/>
                  
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
                  
                </div>

                

                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3"></p>
                  {/* <button type="button" className="btn btn-primary btn-floating mx-1"  onClick={() => login()}> */}
                  {/* <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button> */}


                  {/* <div id="signInDiv"></div> */}
                  

                 
                  {/* <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-linkedin-in"></i>
                  </button> */}
                </div>
               
              </form>
            </div>
          </div>
        </div>
        
      </section>
            </div>
            </div>    
        </div>
    )
            
}

export default Main;