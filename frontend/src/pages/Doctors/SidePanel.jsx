/* eslint-disable react/prop-types */

import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

  const bookingHandler = async () => {

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {

      const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          doctor: doctorId,
          ticketPrice: ticketPrice,
          appointmentDate: new Date(), 
          timeSlot: timeSlots?.[0]?.startingTime || "10:00 AM"
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Appointment booked successfully ✅");

    } catch (err) {
      console.error(err);
      toast.error("Booking failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center shadow-panelShadow rounded-md h-[24rem] lg:h-[24rem]">

      <div>

        <div className="flex items-center gap-6">
          <p className="text_para mt-0 font-[700] text-headingColor">
            Consultation Fee
          </p>

          <span className="text-[16px] lg:text-[22px] font-[700] text-headingColor">
            {ticketPrice} INR
          </span>
        </div>


        <div className="mt-[30px]">

          <p className="text_para font-[600] text-headingColor">
            Available Time Slots:
          </p>

          <ul className="mt-3">

            {timeSlots?.map((time, index) => (

              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >

                <p>{time.day}</p>

                <p className="text-[15px] font-[600] text-textColor">
                  {convertTime(time.startingTime)} -
                  {convertTime(time.endingTime)}
                </p>

              </li>

            ))}

          </ul>

        </div>


        <button
          onClick={bookingHandler}
          className="btn px-2 w-full rounded-md mt-4"
        >

          Book Appointment

        </button>

      </div>

    </div>
  );
};

export default SidePanel;
