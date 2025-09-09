import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      console.log(data);

      setUser(data);
      toast.success("Login successful!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setRedirect(true);
    } catch (e) {
      console.log(e);
      toast.error("Login Failed!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  if (redirect) {
    return <Navigate to={"/places"} />;
  }

  return (
    <div className="mx-auto mt-28 md:max-w-screen-xl">
      <div className="mx-5 2xl:mx-0">
        <div className="mt-4 md:min-w-[450px] md:min-h-[500px] flex items-center justify-center bg-secondry px-5 py-5 md:px-0 rounded-2xl">
          <div className=" flex flex-col gap-5">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form
              className="max-w-md mx-auto flex flex-col gap-5"
              onSubmit={handleLoginSubmit}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <button className="primary">Login</button>
              <div className="text-center py-2 text-gray-500">
                Don't have an account yet?{" "}
                <Link className="underline text-white" to={"/register"}>
                  Register now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
