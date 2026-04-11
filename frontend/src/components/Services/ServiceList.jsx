import { services } from "../../assets/data/services";
import ServiceCard from "./ServiceCard";

const ServiceList = () => {

  // fallback safety (prevents crash if data missing)
  if (!services || services.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No services available
      </p>
    );
  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[30px] lg:mt-[55px]">

      {services?.map((item, idx) => (

        <ServiceCard
          key={item?.id || idx}
          item={item}
          idx={idx}
        />

      ))}

    </div>

  );

};

export default ServiceList;
