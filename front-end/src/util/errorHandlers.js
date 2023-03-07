import { useNavigate } from "react-router-dom"

const errorHandler = (response, navigate) => {
  if (response.status === 401) {
    return navigate('/login');
  }
}


export default errorHandler;