import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData.js";

import DoctorCard from "../../components/Doctors/DoctorCard";
import Testimonials from "../../components/Testimonials/Testimonials";

import Error from "../../components/Error/Error.jsx";
import Loader from "../../components/Loader/Loading.jsx";

import { useEffect, useState } from "react";

const Doctors = () => {

  const [query, setQuery] = useState("");

  const [debounceQuery, setDebounceQuery] = useState("");



  const handleSearch = () => {

    setDebounceQuery(query.trim());

  };



  useEffect(() => {

    const timeOut = setTimeout(() => {

      setDebounceQuery(query.trim());

    }, 700);



    return () => clearTimeout(timeOut);

  }, [query]);



  const {

    data: doctors = [],

    loading,

    error,

  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);



  return (

    <>

      {/* search section */}

      <section className="bg-[#fff9ea]">

        <div className="container text-center">

          <h2 className="heading">Find a Doctor</h2>



          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#97aac82c] rounded-md flex items-center justify-between">



            <input

              type="search"

              className="py-4 pl-4 bg-transparent w-[70%] sm:w-[80%] focus:outline-none placeholder:text-textColor"

              placeholder="Search doctor by name or specialization"

              value={query}

              onChange={(e) => setQuery(e.target.value)}

            />



            <button

              onClick={handleSearch}

              className="btn mt-0 md:w-[30%] sm:w-[20%] rounded-r-md py-4"

            >

              Search

            </button>



          </div>

        </div>

      </section>



      {/* doctor list */}

      <section className="pt-[30px]">

        <div className="container">



          {loading && <Loader />}



          {error && !loading && (

            <Error errMsg={error} />

          )}



          {!loading && !error && (



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-[30px]">



              {doctors?.length > 0 ? (



                doctors?.map((doctor) => (

                  <DoctorCard

                    doctor={doctor}

                    key={doctor?._id}

                  />

                ))



              ) : (



                <p className="col-span-full text-center font-[600] text-[20px] text-red-500">

                  No doctors found

                </p>



              )}



            </div>



          )}

        </div>



        {/* testimonial section */}



        <div className="container mt-16 md:mt-24">



          <div className="max-w-[470px] mx-auto">

            <h2 className="heading text-center">

              What our patients say

            </h2>



            <p className="text_para text-center">

              Discover what our patients are saying about their experiences

            </p>

          </div>



        </div>



        <Testimonials />



      </section>



    </>

  );

};



export default Doctors;
