import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect } from 'react';

const Swiper = (props) => {
  useEffect(() => {
    document.querySelector('.thumbs-wrapper').style.textAlign = 'center';
  }, []);

  return (
    <div className="carousel-wrapper">
      <Carousel showStatus={false}>{props.children}</Carousel>
    </div>
  );
};

export default Swiper;
