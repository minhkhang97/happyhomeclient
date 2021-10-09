import { useQuery } from "react-query";
import Footer from "../../common/Footer";
import Nav from "../../common/Nav";
import axios from "axios";
import BrandProduct from "../../components/BrandProduct";
import Link from "next/link";

const fetchCategories = async () => {
  const res = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/categories`
  );
  return res;
};

const Categories = () => {
  const { status, data } = useQuery("categories", fetchCategories);

  console.log(data);

  if (status === "loading") return <p>loading</p>;
  if (status === "success")
    return (
      <div>
        <Nav />
        <div className="w-10/12 m-auto">
          <p className="my-4 text-sm font-medium text-gray-500 capitalize">
            <Link href="">Trang chủ</Link>
            <i class="fas fa-chevron-right text-xs mx-1"></i>
            <Link href="">sản phẩm</Link>{" "}
          </p>
          <div>
            {data.data.map((category, categoryIndex) => (
              <BrandProduct
                id={category.id}
                name={category.name}
                describe={category.describe}
                products={category.products}
              />
            ))}
          </div>
          <Footer />
        </div>
      </div>
    );

  return <div>error</div>;
};

export default Categories;
