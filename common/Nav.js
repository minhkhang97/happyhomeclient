import axios from "axios";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";

const menu = [
  {
    name: "trang chủ",
    herf: "/",
    //icon: "fas fa-home mr-2",
  },
  {
    name: "sản phẩm",
    herf: "/products?page=1",
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

const Nav = ({ logoColor, categories }) => {
  const [isActive, setActive] = useState(false);
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

  // const categories = useQuery("categories", async () => {
  //   const { data } = await axios.get(
  //     "https://rocky-springs-26824.herokuapp.com/categories"
  //   );
  //   return data;
  // });
  // if (categories.isLoading) return <div>loading...</div>;
  // if (categories.isSuccess) console.log(categories.data);
  return (
    <div
      className={
        isSticky
          ? "fixed w-full top-0 bg-white text-black shadow-md z-40"
          : "static"
      }
      ref={ref}
    >
      {/* cho man hinh to */}
      <div className="hidden md:flex w-10/12 m-auto md:py-4 lg:md-6 uppercase items-center">
        <div className="w-4/12 ">
          <Link href="/">
            <h1
              className={"cursor-pointer uppercase text-sm sm:text-2xl font-bold" + logoColor}
            >
              Happy Home
            </h1>
          </Link>
        </div>
        {/* hien thi cho cac thiet bi lon */}
        <div className="w-7/12">
          <ul className="flex justify-end font-medium sm:text-xs md:text-xs lg:text-sm">
            {menu.map((el, index) => (
              <li key={index} className="md:px-1 lg:px-4">
                <Link href={el.herf}>{el.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/12 text-right">
          <Link href="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </div>

      {/* cho dien thoai */}
      <div className="flex md:hidden w-10/12 m-auto py-4 items-center">
        <div className="w-1/12 text-left" onClick={() => setActive(!isActive)}>
          <i className="fas fa-bars"></i>
        </div>
        <div className="w-7/12 ">
          <h1 className={"text-lg uppercase font-bold" + logoColor}>
            Happy Home
          </h1>
        </div>
        <div className="w-4/12 text-right">
          <Link href="/cart" as="/giohang">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>

        {isActive ? (
          <div className="absolute w-screen h-screen top-0 left-0 bg-white z-30 opacity-95">
            <div className=" py-4 border-b border-solid border-gray-200">
              <div className="w-10/12 m-auto flex items-center justify-between text-lg">
                <h1 className="uppercase font-bold text-gray-800">
                  Happy Home
                </h1>
                <i
                  class="fas fa-times hover:text-red-700 text-gray-900 text-3xl "
                  onClick={() => setActive(!isActive)}
                ></i>
              </div>
            </div>

            <div className="w-10/12 m-auto py-4 ">
              <ul className="uppercase">
                <li className="pb-4 hover:text-red-700 text-black">
                  <Link href="/">trang chủ</Link>
                </li>
                <li className="pb-4 text-black">
                  <p className="hover:text-red-700">
                    <Link href="/products/?page=1" as="/danhmuc">
                      sản phẩm
                    </Link>
                  </p>
                  <ul className="px-4 pt-2 text-sm">
                    {categories.map((el, index) => (
                      <li className="hover:text-red-700" key={index}>
                        <Link href={"/category/" + el.id + "?page=1"}>
                          {el.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="pb-4 hover:text-red-700 text-black">
                  <Link href="/">tư vấn</Link>
                </li>
                <li className="pb-4 hover:text-red-700 text-black">
                  <Link href="/">báo giá</Link>
                </li>
                <li className="pb-4 hover:text-red-700 text-black">
                  <Link href="/">công trình</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Nav;
