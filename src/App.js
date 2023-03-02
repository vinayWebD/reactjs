import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import InfoUpdate from './pages/adminPanel/InfoUpdate.jsx';
import UsersDashboard from './pages/adminPanel/UsersDashboard.jsx';
// import ApiFetchTask from './pages/ApiFetchTask.jsx';
import ApiFetchTask2 from './pages/ApiFetchTask2.jsx';
import Login from './pages/authentication/Login.jsx';
import Register from './pages/authentication/Register.jsx';
import Home from './pages/Home.jsx';
import Layout from './pages/Layout.jsx';
import { PrivateRoute } from './pages/PrivateRoute.jsx';
import QuizCategory from './pages/quiz/QuizCategory.jsx';
import QuizDashboard from './pages/quiz/QuizDashboard.jsx';
import QuizHome from './pages/quiz/QuizHome.jsx';
import QuizLevel from './pages/quiz/QuizLevel.jsx';
import TodoLists from './pages/TodoLists.jsx';
import WeatherApp from './pages/WeatherApp.jsx';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/weatherApp"
          element={
            <Layout>
              <WeatherApp />
            </Layout>
          }
        />
        <Route
          path="/apiFetchData"
          element={
            <Layout>
              {/* <ApiFetchTask /> */}
              <ApiFetchTask2 />
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
          path="/login/:page?"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register/:page?"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <PrivateRoute>
                <UsersDashboard />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/infoUpdate/:id?"
          element={
            <Layout>
              <PrivateRoute>
                <InfoUpdate />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/quizDashboard"
          element={
            <Layout>
              <PrivateRoute>
                <QuizDashboard />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/quizCategory"
          element={
            <Layout>
              <PrivateRoute>
                <QuizCategory />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/quizlevel/:id?"
          element={
            <Layout>
              <PrivateRoute>
                <QuizLevel />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/quizHome/:catId?/:levelId?"
          element={
            <Layout>
              <PrivateRoute>
                <QuizHome />
              </PrivateRoute>
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
