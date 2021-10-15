import Slider from "react-slick";
import Link from "next/link";

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
};

const ListCategory = ({ categories }) => {
  return (
    <>
      {/*giao dien cho man hinh to  */}
      <div className="hidden md:block md:w-1/5">
        <ul className="flex flex-row sm:flex-col">
          {categories.map((category, index) => (
            <li
              className="uppercase tracking-wide mb-4 sm:mb-0 py-1 pr-4"
              key={index}
            >
              <Link href={"/category/" + category.id + "?page=1"}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* giao dien cho dien thoai */}
      <div className="md:hidden mb-4">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div
              className="pr-4 text-center text-xs sm:text-sm uppercase tracking-wide py-1"
              key={index}
            >
              <Link href={"/category/" + category.id + "?page=1"}>
                {category.name}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ListCategory;
