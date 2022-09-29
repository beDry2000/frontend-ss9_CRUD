import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";


const Register = () => {

    const [inputData, setInputData] = useState({
        username: '',
        password: ''
    })

    const { username, password } = inputData;
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (isError) {
            console.log('Error ' + message);
        }
        if (isSuccess) {
            navigate('/');
        }
        return () => dispatch(reset());
    }, [user, isSuccess, isError, message, dispatch])

    const handleInput = (e) => {
        setInputData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(inputData));
    }

    if (isLoading) {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    return (
        <>
            <h1>Resgister</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="name">Username</label>
                    <input name="username" id="name" type="text" className="form-control" placeholder="Username"
                        value={username}
                        onChange={handleInput}
                    />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="password">Password</label>
                    <input name="password" id="password" type="password" className="form-control" placeholder="Password"
                        value={password}
                        onChange={handleInput}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>

            </form>
        </>
    )
}

export default Register