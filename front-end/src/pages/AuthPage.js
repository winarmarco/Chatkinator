import React from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = (props) => {
    const mode = props.mode;
    return (
        <div className="bg-gunmetal-800 pt-12 px-5 min-h-screen flex items-center justify-center">
            <AuthForm mode={mode}/>
        </div>
    );
};

export default LoginPage;
