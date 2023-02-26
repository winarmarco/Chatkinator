import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthPage, {action as authAction} from "./pages/AuthPage";
import Private from "./util/Private";
import ChatPage from "./pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />,
    //   errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/login",
    action: authAction,
    element: <AuthPage mode="login" />,
  },
  {
    path: "/signup",
    action: authAction,
    element: <AuthPage mode="signup" />,
  },
  {
    path: "/chat/:chatId",
    element: (
      <Private>
        <ChatPage />
      </Private>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
