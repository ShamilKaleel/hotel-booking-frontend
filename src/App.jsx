import { Route, Routes, Navigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import AboutPage from "./pages/AboutPage.jsx";
import AllPalcesPage from "./pages/AllPalcesPage.jsx";

//axios.defaults.baseURL = "https://online-booking-app.vercel.app/api";
axios.defaults.baseURL ="http://localhost:4000/api";
  // "https://online-booking-app-git-main-shamil-kaleels-projects.vercel.app/api";
axios.defaults.withCredentials = true;

function App() {
  const { user, ready } = useContext(UserContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/places" element={<AllPalcesPage />} />
          <Route
            path="/account/places"
            element={
              <PlacesPage />
              //user && ready ? <PlacesPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/account/places/new"
            element={
              <PlacesFormPage />
              //user && ready ? <PlacesFormPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/account/places/:id"
            element={
              <PlacesFormPage />
              // {/*user && ready ? <PlacesFormPage /> : <Navigate to="/login"/>*/}
            }
          />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route
            path="/account/bookings"
            element={
              <BookingsPage />
              //user && ready ? <BookingsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/account/bookings/:id"
            element={
              <BookingPage />
              //user || ready ? <BookingPage /> : <Navigate to="/login" />
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
