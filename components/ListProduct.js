import { useState } from "react";
import Slider from "react-slick";
import ProductItem2 from "./ProductItem2";

const rem = ["rèm cồng vồng", "rèm vải", "rèm cuốn", "rèm gỗ", "rèm voan"];

const setting = {
  dots: false,
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
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const settings2 = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const ListProduct = ({ data }) => {
  const [categories, setCategories] = useState([
    ...data.map((el) => el.category),
  ]);
  const [productsCurr, setProductsCurr] = useState(data[1]);
  return (
    <div className="w-10/12 m-auto mt-12 mb-8">
      <div className="uppercase font-semibold">
        <div>
          <h3 className="text-center mb-2">Danh mục</h3>
          {/* <p className="w-1/4 h-1 bg-gray-400 m-auto"></p> */}
        </div>
        <div className="my-4">
          <Slider {...setting}>
            {categories.map((category, index) => (
              <div key={index} className="group text-center mx-1">
                <p
                  className="py-1 cursor-pointer font-medium text-gray-800 hover:text-black"
                  onClick={() => {
                    let temp = data.filter(
                      (el) => el.category.id === category.id
                    )[0];
                    setProductsCurr(temp);
                    console.log(temp);
                  }}
                >
                  {category.name}
                </p>
                <p className="w-full h-1 group-hover:bg-black"></p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="">
        <Slider {...settings2}>
          {productsCurr.products.map((product, index) => (
            <div className="">
              <ProductItem2
                key={index}
                id={product.id}
                name={product.name}
                price={product.price}
                discount={product.discount}
                photos={product.photos}
                categoryId={[productsCurr.category.id]}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ListProduct;
