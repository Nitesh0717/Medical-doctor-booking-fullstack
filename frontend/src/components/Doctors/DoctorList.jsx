import DoctorCard from "./DoctorCard";
import { BASE_URL } from "../../config.js";
import Error from "../../components/Error/Error.jsx";
import Loader from "../../components/Loader/Loading.jsx";
import useFetchData from "../../hooks/useFetchData.js";

const DoctorList = () => {

  const {
    data: doctors = [],
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <div>

      {loading && <Loader />}

      {error && <Error errMsg={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-[30px]">

          {doctors?.slice(0, 3)?.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor?._id} />
          ))}

        </div>
      )}

    </div>
  );
};

export default DoctorList;
