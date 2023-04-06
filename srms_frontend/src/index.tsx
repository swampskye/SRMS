import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";



import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Main from './pages/Main'
import Show from './pages/inner_pages/Show'
import Fix from './pages/inner_pages/Fix'
import Profile from './pages/inner_pages/Profile'
import Table from './pages/inner_pages/Table'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const is_authed = localStorage.getItem('token') != null

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Navigate to="/show" />
      },
      {
        path: "show",
        element: <Show />
      },
      {
        path: "table",
        element: <Table />
      },
      {
        path: "Fix",
        element: <Fix />
      },
      {
        path: "profile",
        element: <Profile />
      },
    ]
  },
  {
    path: "*",
    element: < NotFound />
  },
])



root.render(
  // <React.StrictMode>
  // </React.StrictMode>

  <RouterProvider router={router} />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
