import React from "react";
import Button from "./Button";
import Input from "./Input";
import {Link} from "react-router-dom";

const AuthForm = (props) => {
    const mode = props.mode;
    const title = mode === "signup" ? "Create an account" : "Welcome Back";

    return (
        <form class="flex flex-col gap-y-6 w-[500px]" autoComplete="off">
            <h1 className="text-4xl text-sand mb-4 font-semibold">{title}</h1>

            <Input
                label="Username"
                type="text"
                id="username"
                placeholder="John Doe"
                required
            />

            {mode === "signup" && (
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    placeholder="abcd@yahoo.com"
                    required
                />
            )}

            <Input
                label="Password"
                type="password"
                id="password"
                placeholder="Password"
                message="Must be 8 characters long."
                required
            />

            {mode === "signup" && (
                <Input
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    message="Must be 8 characters long."
                    required
                />
            )}

            <Button className="mt-4">
                {mode === "signup" ? "Sign Up" : "Login"}
            </Button>
            <p className="text-gray-500">
                {mode === "signup"
                    ? "Already have an account? "
                    : "Don't have an account? "}
                <Link to={(mode === 'signup') ? '/login' : '/signup'} className="underline text-crayola">
                    {mode === "signup" ? "Login" : "Sign Up."}
                </Link>
            </p>
        </form>
    );
};

export default AuthForm;
