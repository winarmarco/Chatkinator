import React from "react";
import AuthForm from "../components/AuthForm";

const AuthPage = (props) => {
  const mode = props.mode;
  return (
    <div className="bg-gunmetal-800 min-h-screen flex items-center justify-center">
      <AuthForm
        mode={mode}
      />
    </div>
  );
};

export default AuthPage;
