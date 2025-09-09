import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import Lording from "../components/Lording";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/bookings");
        setBookings(response.data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`/bookings/${bookingId}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  if (loading) {
    return <Lording />;
  }

  // if (error) {
  //   return (
  //     <div className="mx-auto mt-28 md:max-w-screen-xl text-red-500">{`Error: ${error}`}</div>
  //   );
  // }

  return (
    <div className="mx-auto mt-28 md:max-w-screen-xl min-h-screen">
      <div className="mx-5 2xl:mx-0">
        <AccountNav />
        <div className="flex flex-col gap-5 w-full items-center">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                className="flex gap-4 bg-secondry rounded-2xl overflow-hidden border border-zinc-800"
                key={booking._id}
              >
                <Link to={`/account/bookings/${booking._id}`} className="w-40">
                  <PlaceImg place={booking.place} />
                </Link>
                <div className=" relative py-3 sm:pr-3 grow">
                  <>
                    <h2 className="text-xl">{booking.place.title}</h2>
                    <div className="text-[10px] sm:text-xl">
                      <BookingDates
                        booking={booking}
                        className="mb-2 mt-4 text-gray-500 "
                      />
                      <div className="flex gap-1 pt-5 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          />
                        </svg>
                        <span className="sm:text-2xl">
                          Total price: ${booking.price}
                        </span>
                      </div>
                    </div>
                  </>

                  <div className=" absolute right-3 top-3">
                    <button
                      onClick={() => handleDelete(booking._id)}
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
              </div>
            ))
          ) : (
            <div className="flex- text-gray-500">No bookings</div>
          )}
        </div>
      </div>
    </div>
  );
}
