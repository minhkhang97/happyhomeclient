import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import Nav from "./Nav";
import { useState, useRef, useEffect } from "react";

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
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    const offset = window.scrollY;
    offset > 200 ? setSticky(true) : setSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);
  return (
    <div className="relative">
      <div className="absolute z-20 w-full h-full text-gray-200">
      <Nav logoColor={"text-white"} />
        {/* <div
          className={isSticky ? "fixed w-full bg-white text-black shadow-md" : "static"}
          ref={ref}
        >
          
        </div> */}
        <div className="w-10/12 m-auto h-96">
          <div className="md:w-1/2 h-full justify-center flex flex-col text-center md:text-left">
            <h2 className="uppercase text=sm md:text-3xl font-black tracking-wider cursor-pointer">
              Lorem Ipsum is simply dummy text
            </h2>
            <p className="mb-4 mt-2 pt-2 pb-4 cursor-pointer text-lg">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour
            </p>
            <div>
              <button className="text-md uppercase bg-red-500 text-gray-50 font-bold py-2 px-4 rounded-sm shadow-md">
                <Link href="">liên hệ ngay</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <Slider {...setting}>
          <div className="w-full h-[30rem] relative">
            <Image src="/banner1.png" layout="fill" />
          </div>

          <div className="w-full h-[30rem] relative">
            <Image src="/banner.png" layout="fill" />
          </div>
        </Slider>
        <div className="top-0 absolute z-10 bg-gradient-to-b from-gray-900 to-gray-900 w-full h-full opacity-70"></div>
      </div>
    </div>
  );
};
export default Header;
