import Nav from "../../common/Nav";
import Footer from "../../common/Footer";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import ProductDetail from "../../components/ProductDetail";
import ProductItem2 from "../../components/ProductItem2";
import Loading from "../../common/Loading";

const limit = 4;

const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/products/${id}`
  );
  return data;
};

const fetchProductsByCategory = async (categoryId) => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/products?categories[0].id=${categoryId}&_limit=${limit}`
  );
  return data;
};

const Product = () => {
  const router = useRouter();
  const { id, categoryId } = router.query;

  const { status, data } = useQuery(["product", id], ({ queryKey }) =>
    fetchProduct(queryKey[1])
  );

  const productsByCategory = useQuery(
    ["productByCategory", categoryId],
    ({ queryKey }) => fetchProductsByCategory(queryKey[1])
  );

  const categories = useQuery("categories", async () => {
    const { data } = await axios.get(
      "https://rocky-springs-26824.herokuapp.com/categories"
    );
    return data;
  });


  if (status === "loading" || productsByCategory.status === "loading" || categories.isLoading)
    return <Loading/>
  if (status === "success" && productsByCategory.status === "success" && categories.isSuccess)
    return (
      <div>
        <Nav categories={categories.data}/>
        <div className="w-10/12 m-auto">
          <ProductDetail product={data} />
          <div>
            <p className="my-8 text-center text-2xl font-semibold uppercase text-yellow-800">
              có thể bạn sẽ thích
            </p>
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
                {productsByCategory.data.map((product, index) => (
                  <ProductItem2
                    key={index}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    discount={product.discount}
                    photos={product.photos}
                    categoryId={[categoryId]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  return <p>error</p>;
};

export default Product;
