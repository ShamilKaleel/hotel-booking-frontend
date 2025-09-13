import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import Lording from "../components/Lording";
import PlaceImg from "../components/PlaceImg";
import { format } from "date-fns";

// Safe date formatting helper
const formatSafeDate = (dateValue, formatString = "MMM dd, yyyy") => {
  try {
    if (!dateValue) return "Date not available";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "Invalid date";
    return format(date, formatString);
  } catch (error) {
    console.error("Date formatting error:", error, "Value:", dateValue);
    return "Date error";
  }
};

export default function PlaceBookingsPage() {
  const { id: placeId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [place, setPlace] = useState(null);
  const [placeLoading, setPlaceLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setPlaceLoading(true);
        
        // Fetch bookings and place details in parallel
        const [bookingsResponse, placeResponse] = await Promise.all([
          axios.get(`/bookings/place/${placeId}`).catch(() => ({ data: [] })),
          axios.get(`/places/${placeId}`)
        ]);
        
        console.log("Bookings data:", bookingsResponse.data); // Debug log
        setBookings(bookingsResponse.data);
        setPlace(placeResponse.data);
        
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
        setPlaceLoading(false);
      }
    };

    if (placeId) {
      fetchData();
    }
  }, [placeId]);

  if (loading) {
    return <Lording />;
  }

  if (error) {
    return (
      <div className="mx-auto mt-28 md:max-w-screen-xl min-h-screen">
        <div className="mx-5 2xl:mx-0">
          <AccountNav />
          <div className="text-center text-red-500 mt-8">
            <p>{error}</p>
            <Link 
              to="/account/places" 
              className="inline-block mt-4 bg-lime-500 text-black py-2 px-6 rounded-full hover:bg-lime-600 transition-colors"
            >
              Back to Places
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-28 md:max-w-screen-xl min-h-screen">
      <div className="mx-5 2xl:mx-0">
        <AccountNav />
        
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to="/account/places"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Places
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">
            Bookings for {place?.title || "Place"}
          </h1>
          <p className="text-gray-400 mt-1">
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Place Card */}
        {place && (
          <div className="mb-6 bg-secondry p-6 rounded-2xl border border-zinc-800">
            <div className="flex gap-4">
              <div className="w-32 h-32 bg-gray-300 rounded-xl overflow-hidden shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-2">{place.title}</h2>
                <p className="text-gray-300 text-sm mb-3 line-clamp-3">{place.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 0115 0z"
                      />
                    </svg>
                    {place.address}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                    Max {place.maxGuests} guests
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    ${place.price}/night
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-secondry rounded-2xl border border-zinc-800 overflow-hidden">
          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left p-4 text-gray-300 font-medium">Guest Name</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Phone</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Check-in</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Check-out</th>
                    <th className="text-center p-4 text-gray-300 font-medium">Guests</th>
                    <th className="text-right p-4 text-gray-300 font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr 
                      key={booking._id}
                      className={`${index !== bookings.length - 1 ? 'border-b border-zinc-800' : ''} hover:bg-zinc-800/50 transition-colors`}
                    >
                      <td className="p-4">
                        <p className="text-white font-semibold">{booking.name}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-300">{booking.phone}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-300">{formatSafeDate(booking.checkIn)}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-300">{formatSafeDate(booking.checkOut)}</p>
                      </td>
                      <td className="p-4 text-center">
                        <p className="text-gray-300">{booking.numberOfGuests || 'N/A'}</p>
                      </td>
                      <td className="p-4 text-right">
                        <p className="text-lime-500 font-bold text-lg">${booking.price}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 mx-auto mb-4 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3-13h-9A3 3 0 0 0 3 8.25v9A3 3 0 0 0 6.75 20.25h9A3 3 0 0 0 19.5 17.25v-9A3 3 0 0 0 16.5 5.25Z"
                />
              </svg>
              <p className="text-lg mb-2">No bookings found</p>
              <p>This place doesn't have any bookings yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}