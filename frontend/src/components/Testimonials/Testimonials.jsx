import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { HiStar } from "react-icons/hi";
import { testimonials } from "../../assets/data/testimonials";

const Testimonials = () => {

  // safety fallback
  if (!testimonials || testimonials.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No testimonials available
      </p>
    );
  }

  return (

    <div className="container">

      <div className="mt-[30px] lg:mt-[100px] pb-0">

        <Swiper
          modules={[Pagination, Autoplay]}

          spaceBetween={30}

          pagination={{ clickable: true }}

          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}

          breakpoints={{

            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },

            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },

          }}

        >

          {testimonials?.map((item, index) => (

            <SwiperSlide key={index}>

              <div className="py-[30px] px-5 max-w-[400px] rounded-2xl shadow-sm border">

                <div className="flex items-center gap-3">

                  <figure className="h-12 w-12 rounded-full overflow-hidden">

                    <img
                      src={item?.photo}
                      alt="user"
                      className="w-full h-full object-cover"
                    />

                  </figure>

                  <div>

                    <h4 className="text-[18px] font-[600] text-headingColor">
                      {item?.name}
                    </h4>

                    <div className="flex gap-[2px]">

                      {[...Array(item?.rating || 0)].map((_, i) => (

                        <HiStar key={i} className="text-yellowColor w-5 h-5" />

                      ))}

                    </div>

                  </div>

                </div>

                <p className="text-[14px] mt-4 text-textColor">

                  {item?.content}

                </p>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </div>

  );

};

export default Testimonials;
