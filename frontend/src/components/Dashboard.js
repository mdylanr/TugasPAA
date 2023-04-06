import React, {useState, useEffect} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';


const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async() => {
        try{
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        } catch(error) {
            if(error.response){
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) =>{
        const currentDate = new Date();
        if(expire * 1000  < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    });

    const getUsers = async() =>{
        const response = await axiosJWT.get('http://localhost:5000/users',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    const deleteUser = async (id) =>{
        try{
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers();
        } catch(error){
            console.log(error);
        }
    }

  return (
    <div className='container mt-5'>
        {/* <button onClick={getUsers}  className='button is-info'>Get Users</button> */}
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
            <h4 className='is-centered'>Welcome @{username}</h4>
                <table className='table is-striped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                                    <button onClick={()=> deleteUser(user.id)} className='button is-small is-danger'>Hapus</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
  );
}

export default Dashboard