import React from "react";
import {json, redirect} from "react-router-dom";
import AuthForm from "../components/AuthForm";

const LoginPage = (props) => {
  const mode = props.mode;
  return (
    <div className="bg-gunmetal-800 min-h-screen flex items-center justify-center">
      <AuthForm
        mode={mode}
        defaultValue={{
          username: "abcd",
          email: "abcd@yahoo.com",
          password: "abcd",
          confirmPassword: "abcd",
        }}
      />
    </div>
  );
};

export default LoginPage;

export const action = async ({request}) => {
  const pathname = new URL(request.url).pathname;
  const serverURL = process.env.REACT_APP_API_URL;
  const fetchURL = serverURL + `${pathname}`;

  const formData = await request.formData();

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const response = await fetch(fetchURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(response);

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json(
      {
        message: `Could not ${
          pathname === "signup" ? "register" : "login"
        } user`,
      },
      {
        status: 500,
      }
    );
  }

  const resData = await response.json();

  console.log(resData);

  return redirect("/");
};
