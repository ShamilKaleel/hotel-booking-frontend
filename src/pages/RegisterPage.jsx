import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }
  return (
    <div className="mx-auto mt-28 md:max-w-screen-xl">
      <div className="mx-5 2xl:mx-0">
        <div className="mt-4 md:min-w-[450px] md:min-h-[500px] flex items-center justify-center bg-secondry px-5 py-5 md:px-0 rounded-2xl">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form
              className="max-w-md mx-auto flex flex-col gap-5"
              onSubmit={registerUser}
            >
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
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
              <button className="primary">Register</button>
              <div className="text-center py-2 text-gray-500  mx-14">
                Already a member?{" "}
                <Link className="underline text-white" to={"/login"}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
