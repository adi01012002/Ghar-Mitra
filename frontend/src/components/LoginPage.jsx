
// src/components/LoginPage.jsx

import React from 'react';
import AuthForm from '../components/AuthForm';


const LoginPage = ({ onSubmit }) => {
    return (
        <div className={"login-container"}>
            {/* <h2>Login</h2> */}
            <AuthForm isLogin={true} onSubmit={onSubmit} />
        </div>
    );
};

export default LoginPage;
