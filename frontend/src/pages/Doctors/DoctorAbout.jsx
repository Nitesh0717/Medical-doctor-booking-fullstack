/* eslint-disable react/prop-types */

const DoctorAbout = ({ name, about, qualifications, experiences }) => {

  return (

    <div>

      {/* ABOUT */}

      <div>

        <h3 className="text-[20px] leading-[30px] text-headingColor font-[600] flex items-center gap-2">

          About

          <span className="text-irisBlueColor font-bold text-[22px]">

            {name}

          </span>

        </h3>

        <p className="text_para mt-3">

          {about}

        </p>

      </div>



      {/* EDUCATION */}

      <div className="mt-12">

        <h3 className="text-[20px] leading-[30px] text-headingColor font-[600]">

          Education

        </h3>


        {qualifications?.length > 0 && (

          <ul className="pt-4 space-y-4">

            {qualifications.map((item, index) => (

              <li key={index} className="border-l-4 border-irisBlueColor pl-4">

                <p className="font-semibold text-headingColor">

                  {item.degree}

                </p>


                <p className="text-textColor text-[14px]">

                  {item.university}

                </p>


                <span className="text-irisBlueColor text-[13px] font-[600]">

                  {item.year}

                </span>

              </li>

            ))}

          </ul>

        )}

      </div>



      {/* EXPERIENCE */}

      <div className="mt-12">

        <h3 className="text-[20px] leading-[30px] text-headingColor font-[600]">

          Experience

        </h3>


        {experiences?.length > 0 && (

          <ul className="grid md:grid-cols-2 gap-4 pt-4">

            {experiences.map((item, index) => (

              <li key={index} className="p-4 rounded-lg bg-[#f4f9ff] border">

                <p className="font-semibold text-headingColor">

                  {item.hospital}

                </p>


                <span className="text-irisBlueColor text-[13px] font-[600]">

                  {item.from} - {item.to}

                </span>

              </li>

            ))}

          </ul>

        )}

      </div>


    </div>

  );

};

export default DoctorAbout;
