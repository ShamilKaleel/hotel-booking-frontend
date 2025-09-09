import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    const response = await axios.post("/logout");
    console.log(response.data);
    if (response.data) {
      setRedirect("/");
      setUser(null);
    }
  }

  function handleLogoutClick() {
    setShowLogoutModal(true);
  }

  function closeModal() {
    setShowLogoutModal(false);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="mx-auto mt-28 md:max-w-screen-xl min-h-screen">
      <div className="mx-5 2xl:mx-0">
        <div>
          <AccountNav />
          {subpage === "profile" && (
            <div className="text-center max-w-lg mx-auto">
              Logged in as {user.name} ({user.email})<br />
              <button onClick={handleLogoutClick} className="primary max-w-sm mt-2">
                Logout
              </button>
            </div>
          )}
          {subpage === "places" && <PlacesPage />}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-secondry p-6 rounded-2xl border border-zinc-800 w-full max-w-md mx-4 shadow-xl transform transition-all">
            <h3 className="text-xl font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={closeModal} 
                className="px-6 py-2 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors duration-300"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  logout();
                  closeModal();
                }} 
                className="primary px-6 py-2 max-w-[150px]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
