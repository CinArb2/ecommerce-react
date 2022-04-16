import React, { useState } from 'react';
import Slider from "react-slick";
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import style from '../styles/CarouselProduct.module.css'


const CarouselProduct = ({ selectedProduct }) => {
  const [sliderRef, setSliderRef] = useState(null)

  const settings = {
      customPaging: function(i) {
      return (
          <div className={style.thumb} >
            <img src={selectedProduct?.productImgs?.[i]} alt='slice' className={style.imgThumb} />
          </div>
        )
      },
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      dots: true,
      dotsClass: "slick-dots slick-thumb",
  };

  
  return (
    
    <div className={style.container}>
      <div className='controls'>
        <button onClick={sliderRef?.slickPrev} className={`${style.btn} ${style.left}`}>
          <FaChevronLeft />
        </button>
        <button onClick={sliderRef?.slickNext} className={`${style.btn} ${style.right}`}>
          <FaChevronRight />
        </button>
      </div>
      <Slider ref={setSliderRef} {...settings}>
        {
          selectedProduct?.productImgs?.map((img, index) => (
            <div key={index} >
              <img src={img} alt='slice' className={style.image}/>
            </div>
          ))
        }
      </Slider>
    </div>
  )
}

export default CarouselProduct