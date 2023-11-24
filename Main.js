import React from "react";
import "./Main.css";
import { useNavigate, Link } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home">
        <h1>Welcome to SCHEDULESAVVY</h1>
        <p>Become focused, organized, and calm with Todo List.</p>
        <button onClick={() => navigate("/login")}>Start for free</button>
      </div>
        {/* <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-200">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="../images/img_why.png"
              className="img-fluid"
              alt="Sample image"
            />
          </div> */}


          {/* <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Why Schedulesavvy?
              </p>
                <p>When it comes down to choosing task management software, all you need is two things:</p>
                <ul>
                    <li>Free</li>
                    <li>Ease of use</li>
                </ul>
                <p>Coincidentally, that’s exactly what you get from Bitrix24 - task management software that’s easy to use and features dozens of collaboration tools.</p>
                <button
                className="btn btn-primary btn-lg"
                style={{
                  "padding-left": "2.5rem",
                  "padding-right": "2.5rem",
                }}>
                  Login
                </button> 
            </form> */}
          {/* </div>
        </div>

      </div>
    </section> */}

    </>
  );
};

export default Main;
