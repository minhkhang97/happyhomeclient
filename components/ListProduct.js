import axios from "axios";

//hien thi danh sach san pham


const fetchProducts = async () => {
  const res = await axios.get(
    "https://rocky-springs-26824.herokuapp.com/categories"
  );

  return res;
};

const ListProduct = ({products}) => {

  console.log(products);

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">

        {/* {products.map((el, index) => (
          <ProductItem2 key={index} name={el.name} price={el.price} discount={el.discount} photos={el.photos} />
        ))} */}
      </div>
    );
};
export default ListProduct
