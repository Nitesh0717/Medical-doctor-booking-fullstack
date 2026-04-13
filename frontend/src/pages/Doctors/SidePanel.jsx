/* eslint-disable react/prop-types */

import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

  const bookingHandler = async () => {

    try {

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const bookingData = {
        doctor: doctorId,
        ticketPrice: ticketPrice,
        appointmentDate: "2026-04-20",
        timeSlot: "10:00 AM"
      };

      console.log("Sending booking data:", bookingData);

      const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const data = await res.json();

      console.log("Booking response:", data);

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Appointment booked successfully ✅");

    } catch (err) {

      console.error("Booking error:", err);

      toast.error(err.message || "Booking failed");

    }

  };


  return (

    <div className="flex items-center justify-center shadow-panelShadow rounded-md h-[24rem] lg:h-[24rem]">

      <div>

        <div className="flex items-center gap-6">

          <p className="text_para font-[700] text-headingColor">
            Consultation Fee
          </p>

          <span className="text-[20px] font-[700] text-headingColor">
            {ticketPrice} INR
          </span>

        </div>



        <div className="mt-6">

          <p className="font-[600] text-headingColor">
            Available Time Slots:
          </p>


          <ul className="mt-3">

            {timeSlots?.map((slot, index) => (

              <li
                key={index}
                className="flex justify-between mb-2"
              >

                <p>{slot.day}</p>

                <p>
                  {convertTime(slot.startingTime)} -
                  {convertTime(slot.endingTime)}
                </p>

              </li>

            ))}

          </ul>

        </div>



        <button
          onClick={bookingHandler}
          className="btn w-full mt-5 rounded-md"
        >

          Book Appointment

        </button>


      </div>

    </div>

  );

};

export default SidePanel;
