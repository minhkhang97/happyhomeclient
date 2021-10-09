import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { Nav } from "./Nav";

const setting = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

export const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 w-full z-20">
        <Nav />
      </div>

      <div className="">
        <div className="w-10/12 m-auto h-full absolute z-20">
          <div className="flex flex-col h-full text-center justify-center items-center">
            <h2 className="uppercase text-sm font-semibold">
              Lorem Ipsum is simply dummy text
            </h2>
            <p className="pt-2 pb-4">
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
        <div className="">
          <Slider {...setting}>
            <Image
              src="/banner1.png"
              objectFit="cover"
              height={900}
              width={1440}
            />
            <Image
              src="/banner1.png"
              objectFit="cover"
              height={900}
              width={1440}
            />
            <Image
              src="/banner.png"
              objectFit="cover"
              height={900}
              width={1440}
            />
          </Slider>
          {/* <div className="absolute z-10 bg-gradient-to-b from-gray-900 to-gray-900 w-full h-full opacity-70"></div> */}
        </div>
      </div>
    </div>
  );
};
