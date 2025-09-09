import AboutImg from "../assets/Frame 29.png";
import InfinitySlider from "../components/InfinitySlider";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
export default function AboutPage() {
  return (
    <>
      <div className=" grid lg:grid-cols-2  lg:mt-0 h-screen  ">
        <div className=" absolute lg:static -z-10 opacity-30 lg:opacity-100 h-fit  ">
          <img className=" w-auto h-auto" src={AboutImg} alt="" />
        </div>
        <div className="flex items-center lg:items-center lg:max-w-2xl pl-5 pr-5">
          <div className="m-auto w-full flex flex-col gap-4">
            <h1 className=" text-primary font-bold text-xl">ABOUT US</h1>
            <p className="  font-bold text-3xl mb-4">
              Find Your Ideal Getaway with StayEase
            </p>
            <p className="lg:text-gray-400">
              At StayEase, we believe that finding the perfect accommodation
              should be effortless. Whether you are planning a vacation, a
              business trip, or looking to rent out your space, we provide a
              seamless platform to connect travelers with hosts worldwide.
            </p>
            <div className="pt-5">
              <Link
                to="/places"
                className="py-2 px-5 border b rounded-2xl hover:bg-primary hover:text-black duration-300"
              >
                Go to Places
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
