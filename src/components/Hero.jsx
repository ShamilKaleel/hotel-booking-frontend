import { useContext } from "react";
import Img1 from "../assets/modern-apartment-bedroom-comfortable-bed-near-window-generative-ai.jpg";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Hero = () => {
  const { user } = useContext(UserContext);

  return (
    <section className="relative w-full  h-screen mx-auto flex justify-center   ">
      <img
        className=" w-full object-cover opacity-50  blur-sm rounded-2xl"
        src={Img1}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className=" text-6xl font-bold">
          Find Your Ideal Getaway <span className="text-primary">with</span>
        </h1>
        <h1 className="text-6xl  font-bold text-primary"> StayEase</h1>
        <p className="text-sm mt-3 text-[#dddfda] hidden md:block">
          Explore over 1000+ unique stays and unforgettable experiences. From
          cozy cottages to luxurious city apartments, each stay is an adventure.
          Whether you seek a peaceful retreat, an urban escape, or a
          family-friendly home, our selection ensures a memorable experience.
        </p>
        <Link to={user ? "/account" : "/login"}>
          <button className=" mt-10 bg-primary px-5 py-2 hover:opacity-80 duration-300 rounded-full md:mt-3">
            Get Start
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
