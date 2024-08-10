import { div } from "three/examples/jsm/nodes/Nodes.js";
import "./App.css";
import Body from "./Components/Body";
import Inbox from "./Components/Inbox";
import Mail from "./Components/Mail";
import Navbar from "./Components/Navbar";
import SendMail from "./Components/SendMail";
import Sidebar from "./Components/Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Toaster } from "react-hot-toast";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />,
      },
      {
        path: "/mail/:id",
        element: <Mail />,
      },
    ],
  },
  {
    path:"/login",
    element:<Login/>
  },{
    path:"/signup",
    element:<Signup/>
  }
]);

function App() {

  return (
    <div className="h-full">
      <div className="bg-[#F6F8FC] h-screen">
        <RouterProvider router={appRouter} />
      </div>
      <div className="absolute w-[42%] bottom-0 right-6 z-1">
          <SendMail />
        </div>
        <Toaster/>
    </div>
  );
}

export default App;
