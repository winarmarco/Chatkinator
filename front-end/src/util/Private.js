import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Navigate, redirect } from 'react-router-dom';
import { authActions } from '../store/auth-slice';


const Private = (props) => {
  const authState = useSelector((store) => {
    return store.auth;
  });
  const dispatch = useDispatch();
  const token = authState.token;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const serverURL = process.env.REACT_APP_API_URL;
  
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Authorization": `Bearer ${token}`,
        },
      };
  
      try {
        const response = await fetch(`${serverURL}/check-auth`, options);
        
        if (!response.ok) {
          throw new Error("Not Authenticated");
        }
  
      } catch (err) {
        dispatch(authActions.logout());
        return redirect('/login');
      }
      setIsLoading(false);
    }

    checkAuth();
  }, [token, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to='/login' />
  }

  return (
    <>
      {props.component}
    </>
  )
}

export default Private