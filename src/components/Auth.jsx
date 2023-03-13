import { useState, useContext } from "react";
import AuthContext from "../store/authContext";
import axios from 'axios';

const Auth = () => {
    const authCtx = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(true);

    const handleToggle = () => {
        setRegister((current) => !current);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (username.trim().length === 0 || password.trim().length === 0) {
            alert('Invalid username or password');
            return;
        }

        const body = {
            username,
            password
        }

        const endpoint = register ? 'register' : 'login';
        const url = `http://localhost:4545/${endpoint}`;

        axios.post(url, body)
        .then(res => {
            // console.log(res.data);
            authCtx.login(res.data.token, res.data.exp, res.data.userId);
        })
        .catch(err => {
            console.log(err);
            alert("Invalid username or password");
        });
    };

    return (
        <main>
            <h1>Welcome!</h1>
            <form className="form auth-form" onSubmit={submitHandler}>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="form-btn">
                    {register ? "Sign Up" : "Login"}
                </button>
            </form>
            <button className="form-btn" onClick={handleToggle}>
                Need to {register ? "Login" : "Sign Up"}?
            </button>
        </main>
    );
};

export default Auth;
