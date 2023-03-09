
import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination, Autoplay} from 'swiper';

import { SliderItem } from "./functions/SliderItem";

import Styles from './Banner.module.css'
import "swiper/swiper.min.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export interface ISlider { 
  id: number
  image:any
}

const Banner = () => {

  return (
    <div className={Styles.ContainerSlider}>
      <Swiper
        modules={[Pagination, Autoplay]}
        className={Styles.Slider}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {SliderItem.map((item:ISlider) => (
          <SwiperSlide className={Styles.SwiperSlide} key={item.id}>
            <img className={Styles.image} alt='images' src={item.image}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
