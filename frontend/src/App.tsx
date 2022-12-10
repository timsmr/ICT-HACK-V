import {
  Routes,
  Route,
} from "react-router-dom";

import './scss/app.scss'
import { Auth } from './pages/Auth'
import { NotFound } from './pages/NotFound'
import { useStore } from "./stores";
import { useLayoutEffect } from "react";
import { PrivateRoute } from "shared/components/PrivateRoute";
import { Feed } from "pages/Feed";
import { Profile } from "pages/Profile";
import { Home } from "pages/Home";
import Header from "shared/components/Header";
import Footer from "shared/components/Footer";


const App = () => {

  const { init } = useStore();

  useLayoutEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <div className='wrapper'>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/auth/:authType" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </>


  );
}

export default App;
