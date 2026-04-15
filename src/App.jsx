import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

import Home from "./pages/Home.jsx";
import SavedNews from "./pages/SavedNews/SavedNews.jsx";

import Popup from "./components/Popup/Popup.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Success from "./components/Success/Success.jsx";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

import { checkToken, getUserInfo } from "./utils/api";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigate = useNavigate();

  function openLogin() {
    setActiveModal("login");
  }

  function openRegister() {
    setActiveModal("register");
  }

  function openSuccess() {
    setActiveModal("success");
  }

  function closeModal() {
    setActiveModal(null);
  }

  function handleLoginSuccess() {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    setIsLoggedIn(true);

    getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        closeModal();
        navigate("/saved-news");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");

    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveModal(null);

    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    async function verifyUser() {
      try {
        if (!token) return;

        await checkToken();

        setIsLoggedIn(true);

        const user = await getUserInfo();
        setCurrentUser(user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("jwt");
      } finally {
        setIsCheckingAuth(false);
      }
    }

    verifyUser();
  }, []);

  if (isCheckingAuth) {
    return null;
  }

  return (
    <>
      <Header
        onLoginClick={openLogin}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        user={currentUser}
      />

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

        <Route
          path="/saved-news"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedNews user={currentUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <main
              style={{
                textAlign: "center",
                padding: "50px",
                color: "gray",
              }}
            >
              <h1>Page not found</h1>
            </main>
          }
        />
      </Routes>

      <Footer />

      <Popup isOpen={activeModal !== null} onClose={closeModal}>
        {activeModal === "login" && (
          <Login
            onClose={closeModal}
            onSwitchToRegister={openRegister}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {activeModal === "register" && (
          <Register
            onClose={closeModal}
            onSwitchToLogin={openLogin}
            onSuccess={openSuccess}
          />
        )}

        {activeModal === "success" && <Success onSwitchToLogin={openLogin} />}
      </Popup>
    </>
  );
}

export default App;
