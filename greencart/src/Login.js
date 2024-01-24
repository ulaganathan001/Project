import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Register.css'
const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:8000/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid username');
                }
                else 
                {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('username',username);
                        sessionStorage.setItem('userrole',resp.role);
                        usenavigate('/Afh')
                    }else{
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
            
        }
    }

 
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
         
        <div className="row log">
            <div className="col-sm-4"></div>
            <div className="col-sm-4" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer" style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="submit" className="btn btn-warning col-5 ">Login</button> &nbsp;
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-sm-4"></div>
        </div>
    );
}

export default Login;