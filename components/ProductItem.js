import Image from "next/image";
import Link from "next/link";

const calcSale = (price, discount) => {
  return Math.floor(((price - discount) / price) * 100);
};

const ProductItem = ({ name, price, discount, photos, productId }) => {
  return (
    <div className=" bg-white mx-4 flex flex-col justify-center my-2">
      <div className="w-full text-center ">
        <Link href={"/products/" + productId + "?categoryId=1"}>
          <div className="relative w-full cursor-pointer">
            <Image src="/rem1.jpg" width={400} height={500} objectFit="cover" />
            {discount > 0 && (
              <span className="absolute left-0 top-2 py-1 px-6 text-black font-medium bg-[#fbc02d] tracking-wider">
                {calcSale(price, discount)} %
              </span>
            )}
          </div>
        </Link>
      </div>
      <div className="w-full text-center py-4">
        <h3 className="uppercase text-lg font-semibold text-gray-800">
          {name}
        </h3>
        <div className="flex flex-col justify-center items-center">
          {discount > 0 ? (
            <div>
              <p className="text-lg font-semibold text-red-700">{discount} vnđ</p>
              <del className="text-sm text-gray-500 px-2">{price} vnđ</del>
            </div>
          ) : (
            <p className="text-lg font-bold text-gray-800">{price} vnđ</p>
          )}
        </div>
        <div>
          <button className="mt-4 uppercase font-semibold text-sm bg-[#c5cae9] text-black py-2 px-6 hover:bg-[#283593] hover:text-white rounded-sm">
            <Link href={"/products/" + productId + "?categoryId=1"}>
              xem ngay
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
