import React from "react";
import Notes from "./Notes";
import "./Todos.css";

const Todos = () => {
  const sortEvent = () => {
    console.log("evetnt call");
  };

  const sort = () => {
    console.log("onchangecall");
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div
              className="card"
              id="list1"
              style={{ "border-radius": ".75rem", backgroundColor: "#eff1f2" }}
            >
              <div className="card-body py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <i className="fas fa-check-square me-1"></i>
                  <u>My Todo-s</u>
                </p>

                <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                  <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>

                  <select
                    className="select"
                    name="select1"
                    onChange={(e) => {
                      // Do not use onChange method, for your use case
                      console.log("event value", e.target.value);
                      console.log("event name", e.target.name);
                    }}
                    onClick={(e) => {
                      // Use onClick method, for your use case
                      console.log("XX event value", e.target.value);
                      console.log("XX event name", e.target.name);
                    }}
                  >


                    <option value="A">Default</option>
                    <option value="B">Added Dates</option>
                    <option value="C">Priority</option>
                    <option value="D">Deadline</option>
                  </select>

                  <a
                    href="#!"
                    style={{ color: "#23af89" }}
                    data-mdb-toggle="tooltip"
                    title="Ascending"
                  >
                    <i className="fas fa-sort-amount-down-alt ms-2"></i>
                  </a>
                </div>

                <Notes/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todos;
