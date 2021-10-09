import ProductItem2 from "./ProductItem2";
import Link from "next/link";

const BrandProduct = ({ id, name, describe, products }) => {
  return (
    <div className="">
      <div className="mb-6">
        <h4 className="uppercase font-semibold text-xl">
          <Link href={"/category/" + id}>{name}</Link>
        </h4>

        <p className="py-2 text-sm tracking-wide">{describe}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
        {products.map((el, index) => (
          <ProductItem2
            key={index}
            name={el.name}
            price={el.price}
            discount={el.discount}
            photos={el.photos}
            id={el.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandProduct;
