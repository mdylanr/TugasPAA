import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const saveUser = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/users", {
                username,
                email,
                password,
                confPassword
            });
        } catch (error){
            console.log(error);
        }
    };

    useEffect(() =>{
        getUserById();
    }, []);

    const getUserById =  async () =>{
        try{
            const response = await axios.get(`http://localhost:5000/users/${id}`);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setPassword(response.data.password);
            setConfPassword(response.data.confPassword);
        } catch(error){
            console.log(error);
            setMsg("error fetching user data");   
        }
    }

    const updateUser = async(e) =>{
        e.preventDefault();
        try{
            await axios.patch(`http://localhost:5000/users/${id}`,{
                username: username,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/dashboard");
        } catch (error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

    console.log("ID:", id);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Conf Password:", confPassword);

  return (
    <div>
        <section className="hero has-background0grey-light is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4-desktop">
                        <form onSubmit={updateUser} className="box">
                        <p className="has-text-centered">{ msg }</p>
                            <div className="field mt-5">
                                <label className="label">Username</label>
                                <div className="controls">
                                    <input type="text" className='input' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Email</label>
                                <div className="controls">
                                    <input type="text" className='input' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Password</label>
                                <div className="controls">
                                    <input type="password" className='input' placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Confirm Password</label>
                                <div className="controls">
                                    <input type="password" className='input' placeholder='*******' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button className="button is-success is-fullwidth">Update</button>
                            </div>
                        </form>
                    </div>
                </div>          
            </div>
          </div>
        </section>
    </div>
  )
}

export default EditUser;
