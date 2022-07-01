import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e, route) {
    e.preventDefault();
    const accountInfo = {
      username: username,
      password: password
    }
    fetch(`/api/${route}`, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(accountInfo)
    })
      .then((res)=> res.json())
      .then((data)=> {
        console.log('data', data)
        if(data) navigate('/home');
      })
      .catch((err)=> console.error('Error in registration:', err))
  }

  return (
    <div>
      <form>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          name="username" 
          onChange={(e)=> setUsername(e.target.value)}
          value={username} 
          required/>
        <br></br>
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          onChange={(e)=> setPassword(e.target.value)}
          value={password} 
          required/>
        <br></br>
        <input 
          type="button" 
          value="Sign Up" 
          onClick={(e)=> handleSubmit(e, '/signup')}
        />
        <input 
          type="button" 
          value="Login" 
          onClick={(e)=> handleSubmit(e, '/login')}
        />
      </form>
    </div>
  )
}