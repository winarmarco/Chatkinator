import React from "react";
import Button from "./Button";
import Input from "./Input";
import {Link, useLocation, json, useNavigate} from "react-router-dom";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

const AuthForm = (props) => {
  const mode = props.mode;
  const title = mode === "signup" ? "Create an account" : "Welcome Back!";
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  
  const defaultValue = props.defaultValue;
  
  const initFormData = {
    username: defaultValue && (defaultValue.username || ''),
    email: defaultValue && (defaultValue.email || ''),
    password: defaultValue && (defaultValue.password || ''),
    confirmPassword: defaultValue && (defaultValue.confirmPassword || ''),
  }

  const [formData, setFormData] = useState(initFormData);

  const submitHandler =  async (event) => {
    event.preventDefault();
    
    const pathname = location.pathname;
    const serverURL = process.env.REACT_APP_API_URL;
    const fetchURL = serverURL + `${pathname}`;
    
    const data = {
        email: formData['email'],
        username: formData['username'],
        password: formData['password'],
        confirmPassword: formData['confirmPassword'],
    }

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
    const token = resData.token;
    dispatch(authActions.signJWT('asdasdas'));
    
    return navigate('/');
  }

  const clickHandler = () => {
    console.log("clicked");
    dispatch(authActions.signJWT('asdasdas'));
  }  

  return (
    <form
      method="post"
      className="flex flex-col gap-y-6 w-[500px]"
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <h1 className="text-4xl text-sand mb-4 font-semibold">{title}</h1>

      <Input
        label="Username"
        type="text"
        id="username"
        placeholder="John Doe"
        value={formData.username}
        defaultValue={formData.username}
        onInput={(event) => {
          setFormData((prevState) => {
            return {
              ...prevState,
              username: event.target.value,
            };
          });
        }}
        required
      />

      {mode === "signup" && (
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="abcd@yahoo.com"
          value={formData.email}
          defaultValue={formData.email}
          onInput={(event) => {
            setFormData((prevState) => {
              return {
                ...prevState,
                email: event.target.value,
              };
            });
          }}
          required
        />
      )}

      <Input
        label="Password"
        type="password"
        id="password"
        placeholder="Password"
        message="Must be 8 characters long."
        value={initFormData.password}
        defaultValue={initFormData.password}
        onInput={(event) => {
          setFormData((prevState) => {
            return {
              ...prevState,
              password: event.target.value,
            };
          });
        }}
        required
      />

      {mode === "signup" && (
        <Input
          label="Confirm Password"
          type="password"
          id="confirm-password"
          placeholder="Confirm Password"
          message="Must be 8 characters long."
          value={initFormData.confirmPassword}
          defaultValue={initFormData.confirmPassword}
          onInput={(event) => {
            setFormData((prevState) => {
              return {
                ...prevState,
                confirmPassword: event.target.value,
              };
            });
          }}
          required
        />
      )}

      <Button type="submit" className="mt-4">
        {mode === "signup" ? "Sign Up" : "Login"}
      </Button>
      <p className="text-gray-500">
        {mode === "signup"
          ? "Already have an account? "
          : "Don't have an account? "}
        <Link
          to={mode === "signup" ? "/login" : "/signup"}
          className="underline text-crayola"
        >
          {mode === "signup" ? "Login" : "Sign Up"}
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;