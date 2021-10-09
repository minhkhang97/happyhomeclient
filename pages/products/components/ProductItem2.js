import Image from "next//image";
import Link from "next/link";

export const ProductItem2 = ({ id, name, price, discount, photos, categoryId }) => {
  const externaImageLoader = ({ url }) =>
    `https://rocky-springs-26824.herokuapp.com${url}`;
  return (
    <div className="h-full flex flex-col">
      <div className="cursor-pointer relative h-60 group">
        <Image src={externaImageLoader(photos[1])} layout="fill" />
        <Link href={"/products/" + id + "?categoryId=" + categoryId}>
          <p className="opacity-0 group-hover:opacity-100 font-medium absolute z-10 px-2 sm:px-4 py-2 text-xs sm:text-md uppercase bg-yellow-800 text-white transform -translate-x-1/2 -translate-y-1/2 left-1/2 transition duration-300 top-1/2">
            xem ngay
          </p>
        </Link>
      </div>
      <div className="text-center text-xs sm:text-lg mt-4 flex flex-col flex-grow justify-between">
        <h3 className="uppercase font-semibold text-gray-800">{name}</h3>
        <p className="text-yellow-800">{price} vnđ</p>
      </div>
    </div>
  );
};
