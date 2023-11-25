import React from 'react';
import './App.css';
//import { AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <>
    </>
  );

  // const [fullName,setFullName] =useState({
  //   fname:"",
  //   lname:"",
  //   email:"",
  //   number:"",
  // });
  
  // const inputEvent = (event)  => {
  //   console.log(event.target.value);
  //   console.log(event.target.name); 

  //   const value=event.target.value;
  //   const name=event.target.name;

  //   setFullName((prevalue) => {
  //     if(name === 'fname') {
  //       return {
  //         fname: value,
  //         lname: prevalue.lname,
  //         email: prevalue.email,
  //         number: prevalue.number,
  //       };
  //     } else if(name === 'lname') {
  //       return {
  //         fname: prevalue.fname,
  //         lname: value,
  //         email: prevalue.email,
  //         number: prevalue.number,
  //       };
  //     } else if(name === 'email') {
  //       return {
  //         fname: prevalue.fname,
  //         lname: prevalue.lname,
  //         email: value,
  //         number: prevalue.number,
  //       };
  //     } else if(name === 'number') {
  //       return {
  //         fname: prevalue.fname,
  //         lname: prevalue.lname,
  //         email: prevalue.email,
  //         number: value,
  //       };
  //     } 
  //   })

  // };
 
  // const onSubmit=(event) => {
  //   event.preventDefault();
  //   alert("form submitted");
  // };
  // return (
  //   <>
  //     <div className='main_div'>
  //       <form onSubmit={onSubmit}>
  //         <div>
  //           <h1>Hello {fullName.fname} {fullName.lname}</h1>
  //           <h4>{fullName.email}</h4>
  //           <h4>{fullName.number}</h4>
  //           <input type="text" placeholder="enter first name" name='fname' value={fullName.fname} onChange={inputEvent}/> 
  //           <br />
  //           <input type="text" placeholder='enter last name' name='lname' value={fullName.lname} onChange={inputEvent}/>
  //           <br />
  //           <input type="email" placeholder="enter email" name='email' value={fullName.email} onChange={inputEvent}/> 
  //           <br />
  //           <input type="number" placeholder="enter phone number" name='number' value={fullName.number} onChange={inputEvent}/> 
  //           <br />
  //           <button type='submit' >Submit</button>
  //         </div>
  //       </form>
  //     </div>
  //   </>
  // );
}

export default App;
