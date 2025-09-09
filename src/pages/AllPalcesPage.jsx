import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Lording from "../components/Lording";
import Footer from "../components/Footer";
import Image from "../components/Image";
export default function AllPalcesPage() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/places");
        setPlaces(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);
  if (loading) {
    return <Lording />;
  }
  if (error) {
    return (
      <div className="mx-auto mt-28 md:max-w-screen-xl">
        <div className="mx-5 2xl:mx-0">Error: {error}</div>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto mt-28 md:max-w-screen-xl">
        <div className="mx-5 2xl:mx-0">
          <div className="ml-2 font-bold text-2xl w-full mx-auto ">
            All Places
          </div>
          <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/place/" + place._id}
                  key={place._id}
                  className="rounded-2xl p-3 bg-secondry border border-zinc-800 "
                >
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {place.photos?.[0] && (
                      <Image
                        className=" rounded-2xl object-cover aspect-square"
                        src={place.photos?.[0]}
                        alt=""
                      />
                    )}
                  </div>
                  <h2 className="capitalize font-bold ">{place.address}</h2>
                  <h3 className="capitalize text-sm text-fifth ">
                    {place.title}
                  </h3>
                  <div className=" mt-1 text-fifth">
                    <span className="">${place.price}</span> per night
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
