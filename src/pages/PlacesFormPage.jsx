import EnhancedPhotosUploader from "../components/EnhancedPhotosUploader.jsx";
import Perks from "../components/Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPlaceData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/places/" + id);
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      } catch (error) {
        console.error("Failed to load place data:", error);
        setSaveError("Failed to load place data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceData();
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();

    // Clear previous errors
    setSaveError(null);
    setIsSaving(true);

    try {
      const placeData = {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      };

      if (id) {
        // update existing place
        await axios.put("/places", {
          id,
          ...placeData,
        });
      } else {
        // create new place
        await axios.post("/places", placeData);
      }

      setRedirect(true);
    } catch (error) {
      console.error("Save failed:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to save place";
      setSaveError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  // Loading state for initial data fetch
  if (isLoading && id) {
    return (
      <div className="mx-auto mt-28 md:max-w-screen-xl">
        <div className="mx-5 2xl:mx-0">
          <AccountNav />
          <div className="animate-pulse space-y-6 mt-6">
            <div className="h-8 bg-zinc-700 rounded w-1/3" />
            <div className="h-12 bg-zinc-700 rounded" />
            <div className="h-8 bg-zinc-700 rounded w-1/4" />
            <div className="h-12 bg-zinc-700 rounded" />
            <div className="h-8 bg-zinc-700 rounded w-1/3" />
            <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="h-32 bg-zinc-700 rounded-2xl" />
              ))}
            </div>
            <div className="h-8 bg-zinc-700 rounded w-1/4" />
            <div className="h-32 bg-zinc-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-28 md:max-w-screen-xl">
      <div className="mx-5 2xl:mx-0">
        <div>
          <AccountNav />
          <form onSubmit={savePlace}>
            {preInput(
              "Title",
              "Title for your place. should be short and catchy as in advertisement"
            )}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title, for example: My lovely apt"
            />
            {preInput("Address", "Address to this place")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="address"
            />
            {preInput("Photos", "Add photos of your place")}
            <EnhancedPhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
            {preInput("Description", "description of the place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput("Perks", "select all the perks of your place")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            {preInput(
              "Check in&out times",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="14"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="11"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                />
              </div>
            </div>
            {/* Error display */}
            {saveError && (
              <div className="my-4 p-4 bg-red-900/20 border border-red-500/30 rounded-2xl">
                <div className="flex items-center gap-2 text-red-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {saveError}
                </div>
              </div>
            )}

            {/* Enhanced save button */}
            <button
              type="submit"
              disabled={isSaving || isLoading}
              className={`
                primary my-4 w-full flex items-center justify-center gap-2 min-h-[48px]
                ${isSaving || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-600'}
                transition-all duration-200
              `}
            >
              {isSaving && (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              )}
              {isSaving ? 'Saving...' : (id ? 'Update Place' : 'Save Place')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
