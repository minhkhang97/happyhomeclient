import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";
import Nav  from "./Nav";

const menu = [
  {
    name: "trang chủ",
    herf: "",
    //icon: "fas fa-home mr-2",
  },
  {
    name: "sản phẩm",
    herf: "",
  },
  {
    name: "tư vấn",
    herf: "",
    //icon: "fas fa-phone-alt mr-2",
  },
  {
    name: "báo giá",
    herf: "",
    //icon: "fas fa-coins mr-2",
  },
  {
    name: "công trình",
    herf: "",
    //icon: "fas fa-igloo mr-2",
  },
];

const setting = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const Header = () => {
  const [isActive, setActive] = useState(false);
  return (
    <div className="relative">
      <div className="absolute z-20 w-full h-full text-gray-200">
        <Nav logoColor={"text-white"}/>
        <div className="w-10/12 m-auto ">
          <div className="flex flex-col text-center justify-center items-center">
            <h2 className="uppercase text-sm font-semibold cursor-pointer">
              Lorem Ipsum is simply dummy text
            </h2>
            <p className="pt-2 pb-4 cursor-pointer">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour
            </p>
            <div>
              <button className="text-xs uppercase bg-red-500 text-gray-50 font-bold py-2 px-4 rounded-sm shadow-md">
                <Link href="">liên hệ ngay</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <Slider {...setting}>
          <div className="w-full h-80 relative">
            <Image src="/banner1.png" layout="fill" />
          </div>

          <div className="w-full h-80 relative">
            <Image src="/banner.png" layout="fill" />
          </div>
        </Slider>
        <div className="top-0 absolute z-10 bg-gradient-to-b from-gray-900 to-gray-900 w-full h-full opacity-70"></div>
      </div>
    </div>
  );

};
export default Header;