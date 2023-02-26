import React from 'react'
import { useSelector } from "react-redux";
// import { redirect, useNavigate, Navigate } from 'react-router-dom';


const Private = (props) => {
  const authState = useSelector((store) => {
    console.log(store);
    return store.auth;
  });
  // const navigate = useNavigate();

  // console.log("asddsadas");

  console.log(authState.token);

  // if (!authState.token) {
  //   return <Navigate to="/login" />
  // }  

  return (
    <>
      {props.children}
    </>
  )
}

export default Private