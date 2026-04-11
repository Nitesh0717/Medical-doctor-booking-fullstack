/* eslint-disable react/prop-types */

import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {

  // dynamic image import from assets folder
  let doctorImage;

  try {
    doctorImage = require(`../../assets/images/${doctor.photo}`);
  } catch {
    doctorImage = require(`../../assets/images/defaultUser.jpg`);
  }

  return (

    <div className="p-3 lg:p-5 bg-white shadow-md rounded-xl hover:shadow-xl transition duration-300">

      {/* Doctor Image */}

      <div className="w-full h-[220px] overflow-hidden rounded-lg">

        <img
          src={doctorImage}
          className="w-full h-full object-cover"
          alt={doctor.name}
        />

      </div>


      {/* Doctor Name */}

      <h2 className="text-[18px] leading-[30px] lg:text-[22px] lg:leading-9 text-headingColor font-[700] mt-3">

        {doctor.name}

      </h2>


      {/* Specialization + Rating */}

      <div className="flex items-center justify-between mt-2">

        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-3 text-[13px] rounded font-[600]">

          {doctor.specialization}

        </span>


        <div className="flex items-center gap-[6px]">

          <img src={starIcon} alt="rating" />

          <span className="text-[14px] font-[600] text-headingColor">

            {doctor.averageRating || 4.5}

          </span>

          <span className="text-[13px] text-textColor">

            ({doctor.totalRating || 20})

          </span>

        </div>

      </div>


      {/* Experience */}

      <p className="text-[14px] text-textColor mt-2">

        {doctor.experiences?.length > 0

          ? `At ${doctor.experiences[doctor.experiences.length - 1].hospital}`

          : "Experienced Specialist"}

      </p>


      {/* View Profile Button */}

      <div className="flex justify-end mt-3">

        <Link

          to={`/doctors/${doctor._id}`}

          className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-primaryColor hover:text-white transition"

        >

          <BsArrowRightCircle className="w-6 h-6" />

        </Link>

      </div>

    </div>

  );

};

export default DoctorCard;
