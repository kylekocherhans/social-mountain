import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

import logo from "../assets/dm-logo-white.svg";

const Header = () => {
    const authCtx = useContext(AuthContext);

    const styleActiveLink = ({ isActive }) => {
        return {
            color: isActive ? "#f57145" : "",
        };
    };

    const navs = authCtx.token ? (
        <>
            <li>
                <NavLink style={styleActiveLink} to="profile">
                    Profile
                </NavLink>
            </li>
            <li>
                <NavLink style={styleActiveLink} to="form">
                    Add Post
                </NavLink>
            </li>
            <li>
                <button className="logout-btn" onClick={() => authCtx.logout()}>Logout</button>
            </li>
        </>
    ) : (
        <li>
            <NavLink style={styleActiveLink} to="auth">
                Login or Register
            </NavLink>
        </li>
    );

    return (
        <header className="header flex-row">
            <div className="flex-row">
                <img src={logo} alt="dm-logo" className="logo" />
                <h2>Social Mountain</h2>
            </div>
            <nav>
                <ul className="main-nav">
                    <li>
                        <NavLink style={styleActiveLink} to="/">
                            Home
                        </NavLink>
                    </li>
                    {navs}
                    {/* <li>
                        <NavLink style={styleActiveLink} to="profile">
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={styleActiveLink} to="form">
                            Add Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={styleActiveLink} to="auth">
                            Login or Register
                        </NavLink>
                    </li> */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
