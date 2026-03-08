import React,{useEffect, useState} from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { signup,login } from '../../firebase'
import load_spinner from '../../assets/loading-gif.gif'

const Login = () => {


  const [signstate,setsignstate]=useState('Sign In')
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('') 
  const [loading,setloading]=useState(false)

  useEffect(() => {
    setname('')
    setemail('')
    setpassword('')
  },[])

  const user_auth = async (e) => {
    e.preventDefault();
    setloading(true);
    if(signstate === 'Sign Up'){
      await signup(name, email, password);
    }else{
      await login(email, password);
    }
    setloading(false);
  }




  return (
    loading ? <div className="loginsppiner">
      <img src={load_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} alt="" className='login-logo'/>
      <div className="login-form">
        <h1>{signstate}</h1>
        <form action="">
          {signstate === 'Sign Up' ? <input value={name} onChange={(e)=> {setname(e.target.value)}} type="text" placeholder='Your Name' />:<></>}
          <input value={email} onChange={(e)=> {setemail(e.target.value)}} type="email" placeholder='Email' autoComplete='off' />
          <input value={password} onChange={(e)=> {setpassword(e.target.value)}} type="password" placeholder='Password' autoComplete='new-password' />
          <button onClick={user_auth} type='submit'>{signstate}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signstate === 'Sign In'? <p>New to Dupmov? <a href='#' onClick={()=>{setsignstate('Sign Up')}}>Sign Up Now</a></p> 
          : <p>Already have an account? <a href="#" onClick={()=>{setsignstate('Sign In')}}>Sign In</a></p>}
         
        </div>
      </div>
    </div>

  )
}

export default Login