
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Navigate, Route, Routes, useNavigate, useNavigation} from "react-router-dom";
import Basic from "./basic";

function Signin() {
    const [userData, setUserData] = useState({ username: ""});
    const [errorMessage, setErrorMessage] = useState({ value: "" });
    console.log(userData.username)
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        setUserData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };
    const toChat =()=> {
        navigate('/chats',{state:{name:userData.username}})
    }

    return (

    <div className="Auth-form-container">
        <form className="Auth-form">
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Welcome !</h3>
                <div className="form-group mt-3">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control mt-1"
                        placeholder="Enter user-name"
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary"  onClick={() => {toChat()} }>
                        Submit
                    </button>
                </div>

            </div>
        </form>
    </div>
    );
}

export default Signin;