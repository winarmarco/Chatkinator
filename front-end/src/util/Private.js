import {useEffect, useState, Fragment} from "react";
import {toast} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import {authActions} from "../store/auth-slice";
import { failedToFetch } from "./error";

const Private = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();  


  useEffect(() => {
    const checkAuth = async (token) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(`/api/check-auth`, options);
        if (!response.ok) {
          throw new Error("something went wrong");
        }
      } catch (err) {
        if (failedToFetch(err)) {
          toast.error("Something went wrong!");
        } else {
          if (token) toast.error("Token expired");
        }
        dispatch(authActions.logout());
        navigate("/login");
      }
      setIsFetching(false);
    };

    checkAuth(token);
  }, [token, dispatch, navigate]);

  if (isFetching) {
    return <LoadingPage />
  }

  if (token) {
    return <Fragment>
      {props.component}
    </ Fragment>;
  }
}


export default Private;
