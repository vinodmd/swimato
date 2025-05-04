import { ReactDOM, createRoot } from "react-dom/client";
import { Header } from "./components/Header";
import { BodyComponent } from "./components/BodyComponent";
import { createBrowserRouter, RouterProvider ,Outlet} from "react-router-dom";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ErrorComponent from "./components/EorrorComponent";
import Restaurantsinfo from "./components/RestorentInfo";
import { lazy, Suspense } from "react";


const Groceries =  lazy(()=>import("./components/Grocery"))

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      {/* add  footer componet as well if need */}
    </div>
  );
};

const routes = createBrowserRouter([
    {"path":'/', element: <AppLayout/>, errorElement: <ErrorComponent/>,
        children:[
            {path:"/", element:<BodyComponent/>},
            {path:'/aboutus',element:<AboutUs/>},
            {path:'/contactus',element:<ContactUs/>},
            {path:'/restoreInfo/:resid',element:<Restaurantsinfo/>},
            {path:'/groceries',element:<Suspense fallback={<div>loaing..</div>}><Groceries/></Suspense>}
        ]},
    
])


const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes}/>);

