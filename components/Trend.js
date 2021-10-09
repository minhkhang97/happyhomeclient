import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import ProductItem from "./ProductItem";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Trend = ({ title, products }) => {
  return (
    <div className="w-10/12 m-auto my-10">
      <h2 className="text-center uppercase font-semibold text-gray-900 mb-6">
        {title}
      </h2>
      <Slider {...settings}>
        {products.map((el, index) => (
          <ProductItem
            key={index}
            productId={el.id}
            name={el.name}
            price={el.price}
            discount={el.discount}
            photos={el.photos}
          />
        ))}
      </Slider>
    </div>
  );
};
export default Trend