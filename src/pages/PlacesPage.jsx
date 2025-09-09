import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import Lording from "../components/Lording";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios.get("/user-places").then(({ data }) => {
  //     setPlaces(data);
  //   });
  // }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/user-places");
        setPlaces(response.data);
      } catch (err) {
        console.log(err);
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
      <div className="mx-auto mt-28 md:max-w-screen-xl text-red-500">{`Error: ${error}`}</div>
    );
  }

  const handleDelete = async (placeId) => {
    try {
      await axios.delete(`/places/${placeId}`);
      setPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place._id !== placeId)
      );
    } catch (err) {
      console.error("Failed to delete place:", err);
    }
  };

  return (
    <div className="mx-auto mt-28 md:max-w-screen-xl min-h-screen">
      <div className="mx-5 2xl:mx-0">
        <div>
          <AccountNav />
          <div className="text-center">
            <Link
              className="inline-flex gap-1 bg-lime-500 text-black py-2 px-6 rounded-full"
              to={"/account/places/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Add new place
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {places.length > 0 &&
              places.map((place) => (
                <div
                  className="flex gap-4 bg-secondary  rounded-2xl relative"
                  key={place._id}
                >
                  <div className="flex  gap-4 bg-secondry p-4 rounded-2xl w-full border border-zinc-800">
                    <Link
                      to={"/account/places/" + place._id}
                      className="flex w-16 h-16 md:w-30 md:30 bg-gray-300  shrink-0 cursor-pointer"
                    >
                      <PlaceImg place={place} />
                    </Link>
                    <div className="grow-0 shrink">
                      <h2 className="text-xl">{place.title}</h2>
                      <p className="text-sm mt-2">{place.description}</p>
                    </div>
                  </div>
                  <div className=" absolute right-3 top-3">
                    <button
                      onClick={() => handleDelete(place._id)}
                      className="relative group text-white rounded bg-secondry  hover:text-red-500 duration-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.22 3.22A.75.75 0 0 1 7.75 3h9A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17h-9a.75.75 0 0 1-.53-.22L.97 10.53a.75.75 0 0 1 0-1.06l6.25-6.25Zm3.06 4a.75.75 0 1 0-1.06 1.06L10.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L12 8.94l-1.72-1.72Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="absolute hidden group-hover:block top-7 right-0 bg-slate-200 text-secondry text-xs rounded px-2 py-1 shadow-lg">
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
