import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get("/bookings");
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        } else {
          setError("Booking not found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  if (error) {
    return (
      <div className="mx-auto mt-28 md:max-w-screen-xl">
        <div className="mx-5 2xl:mx-0">
          <div className="my-8">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return "";
  }

  return (
    <div className="mx-auto mt-28 md:max-w-screen-xl">
      <div className="mx-5 2xl:mx-0">
        <div className="my-8">
          <h1 className="text-3xl">{booking.place.title}</h1>
          <AddressLink className="my-2 block">
            {booking.place.address}
          </AddressLink>
          <div className=" bg-secondry p-6 my-6 rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl mb-4">Your booking information:</h2>
              <BookingDates booking={booking} />
            </div>
            <div className="bg-primary p-6 text-black rounded-2xl">
              <div>Total price</div>
              <div className="text-3xl">${booking.price}</div>
            </div>
          </div>
          <PlaceGallery place={booking.place} />
        </div>
      </div>
    </div>
  );
}
