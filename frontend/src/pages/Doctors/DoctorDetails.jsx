import { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout.jsx";
import Feedback from "./Feedback.jsx";
import SidePanel from "./SidePanel.jsx";
import { BASE_URL } from "../../config.js";
import Error from "../../components/Error/Error.jsx";
import Loader from "../../components/Loader/Loading.jsx";
import useFetchData from "../../hooks/useFetchData.js";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {

  const { id } = useParams();

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  const [tab, setTab] = useState("about");

  return (

    <section>

      <div className="max-w-[1170px] px-5 mx-auto">

        {loading && <Loader />}

        {error && <Error />}

        {!loading && !error && doctor && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px]">

            {/* LEFT SIDE */}

            <div className="md:col-span-2">

              {/* doctor basic info */}

              <div className="flex items-center gap-5">

                <figure className="lg:max-w-[200px] lg:max-h-[200px] overflow-hidden rounded-lg">

                  <img
                    src={`/images/${doctor.photo}`}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />

                </figure>


                <div className="flex flex-col w-[98%]">

                  <span className="bg-[#CCF0F3] flex items-center w-[55%] sm:w-[30%] md:w-[25%] text-irisBlueColor py-1 px-3 text-[12px] lg:text-[14px] font-[600] rounded">

                    {doctor.specialization}

                  </span>


                  <h3 className="text-headingColor text-[18px] md:text-[22px] mt-3 font-bold">

                    {doctor.name}

                  </h3>


                  {/* rating */}

                  <div className="flex items-center gap-[6px]">

                    <span className="flex items-center gap-[6px] text-[14px] lg:text-[16px] font-[600] text-headingColor">

                      <img src={starIcon} alt="starIcon" />

                      {doctor.averageRating || 4.5}

                    </span>

                    <span className="text-[13px] lg:text-[15px] text-textColor">

                      ({doctor.totalRating || 20})

                    </span>

                  </div>


                  {/* about short text */}

                  <p className="text-[13px] md:text-[14px] md:max-w-[390px] mt-2">

                    {doctor.about}

                  </p>

                </div>

              </div>


              {/* tabs */}

              <div className="mt-[50px] border-b border-solid border-[#0066ff30]">

                <button

                  className={`${
                    tab === "about"
                      ? "border-b border-solid border-primaryColor"
                      : ""
                  } py-2 px-5 mr-5 text-[16px] font-[500] text-headingColor`}

                  onClick={() => setTab("about")}

                >

                  About

                </button>


                <button

                  className={`${
                    tab === "feedback"
                      ? "border-b border-solid border-primaryColor"
                      : ""
                  } py-2 px-5 mr-5 text-[16px] font-[500] text-headingColor`}

                  onClick={() => setTab("feedback")}

                >

                  Feedback

                </button>

              </div>


              {/* tab content */}

              <div className="mt-[50px]">

                {tab === "about" && (

                  <DoctorAbout
                    name={doctor.name}
                    about={doctor.about}
                    qualifications={doctor.qualifications}
                    experiences={doctor.experiences}
                  />

                )}


                {tab === "feedback" && (

                  <Feedback
                    reviews={doctor.reviews}
                    totalRating={doctor.totalRating}
                  />

                )}

              </div>

            </div>


            {/* RIGHT SIDE */}

            <SidePanel
              doctorId={doctor._id}
              ticketPrice={doctor.ticketPrice}
              timeSlots={doctor.timeSlots}
            />

          </div>

        )}

      </div>

    </section>

  );

};

export default DoctorDetails;
