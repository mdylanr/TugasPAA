import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async(e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/login',{
                email: email,
                password: password
            });
            navigate("/dashboard");
        } catch (error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div>
        <section className="hero has-background0grey-light is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4-desktop">
                        <form onSubmit={ Auth } className="box">
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field mt-5">
                                <label className="label">Email</label>
                                <div className="controls">
                                    <input type="text" className='input' placeholder='Username' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Password</label>
                                <div className="controls">
                                    <input type="password" className='input' placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button className="button is-link is-fullwidth">Login</button>
                            </div>
                            <p className='has-text-centered'><a href="/register">Register</a></p>
                        </form>
                    </div>
                </div>          
            </div>
          </div>
        </section>
    </div>
  )
}

export default Login