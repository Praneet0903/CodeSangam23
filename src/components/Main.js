import React from 'react'
import './Main.css';
import { useNavigate ,Link } from "react-router-dom";

const Main = ()=>{
    const navigate = useNavigate();
    return(
            <div className="home">
                <h1>Welcome to SCHEDULESAVVY</h1>
                <p>Become focused, organized, and calm with Todo List.</p>
                <button onClick={() => navigate('/login')}>Start for free</button>
            </div>
    );
}

export default Main;