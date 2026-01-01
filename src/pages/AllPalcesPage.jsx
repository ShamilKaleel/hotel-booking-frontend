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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const filteredPlaces = places.filter((place) => {
    if (!searchQuery.trim()) return true;
    return place.address.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="font-bold text-2xl">
              All Places
            </div>
            <button
              onClick={() => {
                if (isSearchOpen) {
                  setSearchQuery("");
                }
                setIsSearchOpen(!isSearchOpen);
              }}
              className="flex items-center justify-center p-2 rounded-full hover:opacity-80 transition-all duration-200 cursor-pointer"
              title="Search places"
            >
              <ion-icon
                name={isSearchOpen ? "close" : "search-outline"}
                style={{ fontSize: "24px" }}
              ></ion-icon>
            </button>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${
            isSearchOpen ? "max-h-20 opacity-100 mb-6" : "max-h-0 opacity-0 mb-0"
          }`}>
            <input
              type="text"
              placeholder="Search by address..."
              value={searchQuery}
              onChange={(ev) => setSearchQuery(ev.target.value)}
              autoFocus={isSearchOpen}
              className="w-full"
            />
          </div>
          <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
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
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-fifth">
                  {searchQuery
                    ? `No places found matching "${searchQuery}"`
                    : "No places available"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
