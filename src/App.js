import { ReactDOM, createRoot } from "react-dom/client";
import { Header } from "./components/Header";
import { BodyComponent } from "./components/BodyComponent";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ErrorComponent from "./components/EorrorComponent";
import Restaurantsinfo from "./components/RestorentInfo";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Grocery = lazy(()=>import('./components/Grocery'));

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet/>
    </div>
  );
};

const routes = createBrowserRouter([
  { path: "/", element: <AppLayout />, errorElement: <ErrorComponent /> ,
    children:[
      {path: "/", element: <BodyComponent />},
      {path: "/aboutus", element: <AboutUs />},
      {path: "/contactus", element: <ContactUs />},
      {path: "/restoreInfo/:resid", element: <Restaurantsinfo />},
      {path: "/groceries", element: <Suspense><Grocery/></Suspense>}
    ]},
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />);
