import axios from "axios";
import { useQuery } from "react-query";
import  ProductItem2 from "../components/ProductItem2";
import  Nav  from "../common/Nav";
import  Footer  from "../common/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const limit = 4;

const fetchProducts = async (page) => {
  const res = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/products?_start=${
      (page - 1) * limit
    }&_limit=${limit}`
  );
  return res;
};

const fetchCategories = async () => {
  const res = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/categories`
  );
  return res;
};

const fetchCountProduct = async () => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/products/count`
  );
  return data;
};



const Products = () => {
  const router = useRouter();
  const { page } = router.query;
  const categories = useQuery("categories", fetchCategories);
  const products = useQuery(["products", page], ({ queryKey }) =>
    fetchProducts(queryKey[1])
  );

  const amountProduct = useQuery("amountProduct", fetchCountProduct);

  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    const count = Math.round(amountProduct.data / limit) + 1;
    let temp = [];
    let len = count > 3 ? 3 : count;
    for (let i = 1; i <= len; i++) {
      temp = [...temp, i];
    }
    setPagination([...temp]);
  }, [amountProduct.data]);

  if (
    products.status === "loading" ||
    categories.status === "loading" ||
    amountProduct.status === "loading"
  )
    return <p>loading</p>;
  if (
    products.status === "success" &&
    categories.status === "success" &&
    amountProduct.status == "success"
  )
    return (
      <div>
        <Nav />
        <div className="w-10/12 m-auto">
          <p className="my-8 text-sm font-light text-gray-800 uppercase">
            <Link href="/">Trang chủ</Link>
            <i class="fas fa-chevron-right text-xs mx-1"></i>
            <Link href="/products?page=1">sản phẩm</Link>
          </p>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/5">
              <ul className="flex flex-row sm:flex-col mb-4 sm:mb-0">
                {categories.data.data.map((category, index) => (
                  <li className="pr-4 uppercase tracking-wide py-1">
                    <Link href={"/category/" + category.id + "?page=1"}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:w-4/5 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
              {products.data.data.map((product, index) => (
                <ProductItem2
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  discount={product.discount}
                  photos={product.photos}
                  categoryId={product.categories[0].id}
                />
              ))}
            </div>
          </div>
          <div className="my-6">
            <ul className="flex justify-center items-center">
              <li
                onClick={() => {
                  if (pagination[0] > 1)
                    setPagination([...pagination.map((el) => el - 1)]);
                }}
              >
                <i class="fas fa-chevron-left"></i>
              </li>
              {pagination.map((el, i) => (
                <li key={i} className="px-4 py-1 mx-2 bg-gray-200">
                  <Link href={"/products?page=" + el}>
                    <a>{el}</a>
                  </Link>
                </li>
              ))}
              <li
                onClick={() =>
                  pagination[pagination.length - 1] <
                  Math.round(amountProduct.data / limit) + 1
                    ? setPagination([...pagination.map((el) => el + 1)])
                    : null
                }
              >
                <i class="fas fa-chevron-right"></i>
              </li>
            </ul>
          </div>
        </div>
        {/* phan trang */}

        <Footer />
      </div>
    );

  return <div>error</div>;
};

export default Products;
