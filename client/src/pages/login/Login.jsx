import React, { useState } from 'react'
import "./Login.scss"
import newRequest from '../../utils/newRequest';
import {useNavigate} from "react-router-dom";
 
function Login(){

  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState(null);

  const navigate = useNavigate();
  
  const handleSubmit = async (e)=>{
     e.preventDefault()
     // after writing just above line do (1) install yarn add axios
     // for token also accessing write {withCredentials:true} is also needed 
     try{
        // const res = await axios.post("http://localhost:8800/api/auth/login",
        // {username,password},{withCredentials:true});
        // console.log(res.data)
        const res = await newRequest.post("/auth/login", {username, password});
        localStorage.setItem("currentUser",  JSON.stringify(res.data));
        navigate("/")
     }

     catch(err){
        setError(err.response.data);
     }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1> Sign in </h1>
        <label htmlFor=''>Username</label>
        <input name='username' type='text' placeholder='arvindk25' onChange={(e)=>setUsername(e.target.value)}/>
        <label htmlFor=''>Password</label>
        <input name='password' type='password' onChange={e=>setPassword(e.target.value)} />
        <button type='submit'>Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login
