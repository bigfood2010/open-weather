import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Search from "./pages/search.js";
import Header from "./components/organism/header.js";
import { WeatherProvider } from "./context/weather-context.js";

const Layout = () => {
  return (
    <div>
      <WeatherProvider>
        <Header />
        <div className="bg-[#C2E9F2]/20 h-[100%] min-h-[100vh]">
          <Outlet />
        </div>
      </WeatherProvider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
