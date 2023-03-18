import React, {useEffect} from "react";
import Button from "./Button";
import Input from "./Input";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";
import {chatActions} from "../store/chat-slice";
import {toast} from "react-hot-toast";
import {checkJSON} from "../util/error";

const AuthForm = (props) => {
  const mode = props.mode;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = mode === "signup" ? "Create an account" : "Welcome Back!";
  const initFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [error, setError] = useState(initFormData);
  const [formData, setFormData] = useState(initFormData);

  useEffect(() => {
    setError({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [mode]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const pathname = location.pathname;
    const serverURL = process.env.REACT_APP_API_URL;
    const fetchURL = serverURL + `${pathname}/`;

    const data = {
      email: formData["email"],
      username: formData["username"],
      password: formData["password"],
      confirmPassword: formData["confirmPassword"],
    };

    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();

      if (!response.ok) {
        if (resData.cause) {
          const errorsMessage = {};
          for (const error of resData.cause) {
            const {field, message} = error;
            errorsMessage[field] = message;
          }
          throw new Error(JSON.stringify(errorsMessage));
        }
        throw new Error(JSON.stringify("Something went wrong!"));
      }

      const token = resData.token;
      dispatch(authActions.signJWT({token}));
      dispatch(chatActions.clearChat());
      return navigate("/chat");
    } catch (error) {
      if (checkJSON(error.message)) {
        const errorObject = JSON.parse(error.message);
        if (typeof errorObject === "string") {
          toast.error(errorObject);
        }
        setError(errorObject);
      } else {
        toast.error(error.message);
      }
    }
  };

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
        error={error["username"]}
        value={formData.username}
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
          error={error["email"]}
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
        error={error["password"]}
        message={mode === "signup" && "Must be 8 characters long."}
        value={formData.password}
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
          id="confirmPassword"
          placeholder="Confirm Password"
          error={error["confirmPassword"]}
          message="Must be 8 characters long."
          value={formData.confirmPassword}
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
