import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Layout from './pages/Layout.jsx';
import Login from './pages/Login.jsx';
import { PrivateRoute } from './pages/PrivateRoute.jsx';
import Register from './pages/Register.jsx';
import TodoLists from './pages/TodoLists.jsx';
import UsersDashboard from './pages/UsersDashboard.jsx';
import WeatherApp from './pages/WeatherApp.jsx';
import reportWebVitals from './reportWebVitals';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/weatherApp"
          element={
            <Layout>
              <WeatherApp />
            </Layout>
          }
        />
        <Route
          path="/todolists"
          element={
            <Layout>
              <PrivateRoute>
                <TodoLists />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UsersDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>,

  // </React.StrictMode>,
);

reportWebVitals();
