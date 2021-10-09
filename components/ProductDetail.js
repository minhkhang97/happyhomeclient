import React, { useContext } from "react";
import Image from "next/image";
import { useState } from "react";
import {CartContext} from "../reducer/cartContext";
import Slider from "react-slick";
import Link from "next/link";

 const ProductDetail = ({ product }) => {
  const [amount, setAmount] = useState(1);

  const { addProduct, cart } = useContext(CartContext);

  const {
    id,
    name,
    price,
    discount,
    warranty,
    material,
    particularity,
    cansang,
    source,
    describe,
    photos,
    categories,
  } = product;
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const externaImageLoader = ({ url }) =>
    `https://rocky-springs-26824.herokuapp.com${url}`;
  return (
    <div className="">
      <p className="my-8 text-sm font-light text-gray-800 uppercase">
        <Link href="/">Trang chủ</Link>
        <i class="fas fa-chevron-right text-xs mx-1"></i>
        <Link href="/products?page=1">{categories[0].name}</Link>
        <i class="fas fa-chevron-right text-xs mx-1"></i>
        <Link href="/products?page=1">{name}</Link>
      </p>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2">
          <Slider asNavFor={nav2} ref={(c) => setNav1(c)}>
            {photos.map((el, index) => (
              <div key={index} className="relative w-full h-80 shadow-lg">
                <Image src={externaImageLoader(el)} layout="fill" />
              </div>
            ))}
          </Slider>

          <Slider
            asNavFor={nav1}
            ref={(c) => setNav2(c)}
            slidesToShow={photos.length}
            swipeToSlide={true}
            focusOnSelect={true}
            arrows={false}
          >
            {photos.map((el, index) => (
              <div key={index} className="relative w-full h-24 shadow-lg">
                <Image src={externaImageLoader(el)} layout="fill" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="text-lg mt-4 w-full sm:w-1/2 sm:pl-8">
          <h3 className="uppercase font-semibold text-gray-800 text-xl tracking-wider">
            {name}
          </h3>
          <div className="flex flex-row items-center my-3">
            <p className="text-lg text-red-800">{discount} vnđ</p>
            <del className="text-xs text-gray-400 px-2">{price} vnđ</del>
          </div>

          <div className="py-4">
            <div className="flex">
              <i class="fas fa-sort-down"></i>
              <p className="uppercase mx-2">Thông tin sản phẩm</p>
            </div>
            <div className="text-md text-gray-900 text-sm px-3">
              <div className="flex">
                <p className="w-1/4 text-black">Chất liệu</p>
                <p className="w-3/4 font-light">{material}</p>
              </div>
              <div className="flex">
                <p className="w-1/4 text-black">Bảo hành</p>
                <p className="w-3/4 font-light">{warranty}</p>
              </div>
              <div className="flex">
                <p className="w-1/4 text-black">Đặc tính</p>
                <p className="w-3/4 font-light">{particularity}</p>
              </div>
              <div className="flex">
                <p className="w-1/4 text-black">Cản sáng</p>
                <p className="w-3/4 font-light">{cansang}</p>
              </div>
              <div className="flex">
                <p className="w-1/4 text-black">Xuất xứ</p>
                <p className="w-3/4 font-light">{source}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center my-4">
            <div className="grid grid-cols-3 text-center w-1/4 bg-gray-100 text-gray-800 h-10 items-center mr-4">
              <button
                className="text-3xl font-light"
                onClick={() =>
                  amount > 1 ? setAmount(amount - 1) : setAmount(amount)
                }
              >
                -
              </button>
              <p className="">{amount}</p>
              <button
                className="text-3xl font-light"
                onClick={() => setAmount(amount + 1)}
              >
                +
              </button>
            </div>
            <div className="w-2/4">
              <button
                className="uppercase h-10 w-10/12 text-sm border border-solid border-yellow-900 text-yellow-800 hover:bg-yellow-800 hover:text-white"
                onClick={() => {
                  addProduct({ ...product, amount });
                  console.log(cart);
                }}
              >
                thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <div className="uppercase grid grid-cols-2 text-center">
          <p className="text-gray-700 hover:text-black cursor-pointer border-b-2 border-solid border-gray-200 hover:border-black py-2">
            Mô tả
          </p>
          <p className="text-gray-700 hover:text-black cursor-pointer border-b-2 border-solid border-gray-200 hover:border-black py-2">
            đánh giá
          </p>
        </div>
        <p className="my-4 text-gray-900">
          Rèm cầu vồng cao cấp chất lượng tuyệt vời tại Roman Plaza, Hà Nội
          CL141 Khi giới thiệu về rèm cầu vồng, khách hàng luôn nghĩ đến một
          kiểu rèm đẹp, độc đáo và giá cả tương xứng với chất lượng. Và có lẽ
          cũng bởi vì những lý do đó mà rèm cầu vồng luôn nằm trong top những
          mẫu rèm được khách hàng Việt Nam lựa chọn nhiều nhất. Trong bài viết
          này, rèm Khánh Đường sẽ giới thiệu đến quý khách một mẫu rèm cầu vồng
          đang được ưa chuộng hiện nay CL141. Đây là mẫu rèm cầu vồng chất lượng
          cao được lắp đặt tại căn hộ chung cư của gia đình anh Hoàng tại Roman
          Plaza, Hà Nội.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail