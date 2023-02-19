import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
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
        element: <AuthPage mode="login"/>,
    },
    {
        path: "/signup",
        element: <AuthPage mode="signup"/>,
    },
    {
        path: "/chat/:chatId",
        element: <ChatPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
