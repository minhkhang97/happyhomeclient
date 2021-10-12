import { useRouter } from "next/router";
import { useQueries, useQuery } from "react-query";
import axios from "axios";
import  ProductItem2  from "../../components/ProductItem2";
import Nav  from "../../common/Nav";
import Footer from "../../common/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

const limit = 4;

const fetchCategory = async (id) => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/categories/${id}`
  );

  return data;
};

const fetchCategories = async () => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/categories`
  );
  return data;
};

const fetchProduct = async (categoryId, page) => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/products?categories[0].id_eq=${categoryId}&_start=${
      (page - 1) * limit
    }&_limit=${limit}`
  );
  return data;
};

const fetchCountProduct = async (categoryId) => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/products/count?categories[0].id_eq=${categoryId}`
  );
  return data;
};

const Category = () => {
  const router = useRouter();
  const { id, page } = router.query;

  const { status, data } = useQuery(["category", id], ({ queryKey }) =>
    fetchCategory(queryKey[1])
  );

  const result = useQueries([
    {
      queryKey: ["products", id, page],
      queryFn: ({ queryKey }) => fetchProduct(queryKey[1], queryKey[2]),
    },
    { queryKey: ["categories"], queryFn: fetchCategories },
    {
      queryKey: ["amountProduct", id],
      queryFn: ({ queryKey }) => fetchCountProduct(queryKey[1]),
    },
    {
      queryKey: ["category", id],
      queryFn: ({ queryKey }) => fetchCategory(queryKey[1]),
    },
  ]);

  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    const count = Math.round(result[2].data / limit) + 1;
    let temp = [];
    let len = count > 3 ? 3 : count;
    for (let i = 1; i <= len; i++) {
      temp = [...temp, i];
    }
    setPagination([...temp]);
  }, [result[2].data]);

  if (
    result[0].status === "loading" ||
    result[1].status === "loading" ||
    result[2].status === "loading" ||
    result[3].status === "loading"
  )
    return <p>loading</p>;
  if (
    result[0].status === "success" &&
    result[1].status === "success" &&
    result[2].status === "success" &&
    result[3].status === "success"
  )
    return (
      <div>
        <Nav categories={result[1].data}/>
        <div className="w-10/12 m-auto py-6">
          <p className="my-4 text-sm font-light text-gray-800 uppercase">
            <Link href="">Trang chủ</Link>
            <i class="fas fa-chevron-right text-xs mx-1"></i>
            <Link href={"/category/" + id + "?page=1"}>
              {result[3].data.name}
            </Link>{" "}
          </p>
          <div className="mb-6">
            <h4 className="uppercase font-semibold text-xl">
              {result[3].data.name}
            </h4>
            <p className="py-2 text-sm tracking-wide">
              {result[3].data.describe}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/5">
              <ul className="flex flex-row sm:flex-col">
                {result[1].data.map((category, index) => (
                  <li
                    className="uppercase tracking-wide mb-4 sm:mb-0 py-1 pr-4"
                    key={index}
                  >
                    <Link href={"/category/" + category.id + "?page=1"}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:w-4/5 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
              {result[0].data.map((el, index) => (
                <ProductItem2
                  key={index}
                  name={el.name}
                  price={el.price}
                  discount={el.discount}
                  photos={el.photos}
                  id={el.id}
                  categoryId={id}
                />
              ))}
            </div>
          </div>

          {/* phan trang */}
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
                  <Link href={"/category/" + id + "?page=" + el}>
                    <a>{el}</a>
                  </Link>
                </li>
              ))}
              <li
                onClick={() =>
                  pagination[pagination.length - 1] <
                  Math.round(result[2].data / limit) + 1
                    ? setPagination([...pagination.map((el) => el + 1)])
                    : null
                }
              >
                <i class="fas fa-chevron-right"></i>
              </li>
            </ul>
          </div>
        </div>

        <Footer />
      </div>
    );
  return <p>error</p>;
};

export default Category;
