import { useRouter } from "next/router";
import { useQueries, useQuery } from "react-query";
import axios from "axios";
import ProductItem2 from "../../components/ProductItem2";
import Nav from "../../common/Nav";
import Footer from "../../common/Footer";
import Link from "next/link";
import Loading from "../../common/Loading";
import Pagination from "../../components/Pagination";
import ListCategory from "../../components/ListCategory";

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

  if (
    result[0].status === "loading" ||
    result[1].status === "loading" ||
    result[2].status === "loading" ||
    result[3].status === "loading"
  )
    return <Loading />;
  if (
    result[0].status === "success" &&
    result[1].status === "success" &&
    result[2].status === "success" &&
    result[3].status === "success"
  )
    return (
      <div>
        <Nav categories={result[1].data} />
        <div className="w-10/12 m-auto py-6">
          <p className="my-4 text-sm font-light text-gray-800 uppercase">
            <Link href="/">Trang chủ</Link>
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
            <ListCategory categories={result[1].data} />
            <div className="md:w-4/5 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
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

          <Pagination amountProduct={result[2].data} />
        </div>

        <Footer />
      </div>
    );
  return <p>error</p>;
};

export default Category;
