import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import store from './store.js'
import {Provider} from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css' //Import bootstrap to use in react
import './index.css'
import HomeView from './views/HomeView.jsx'
import LoginView from './views/LoginView.jsx'
import RegisterView from './views/RegisterView.jsx'
import ProfileView from './views/ProfileView.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileView />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
