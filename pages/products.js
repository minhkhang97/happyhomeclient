import axios from "axios";
import { useQuery } from "react-query";
import ProductItem2 from "../components/ProductItem2";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import Slider from "react-slick";
import {
  fetchCategories,
  fetchProducts,
  fetchCountProduct,
} from "../api/apiHandler";
import Pagination from "../components/Pagination";
import ListCategory from "../components/ListCategory";


const Products = () => {
  const router = useRouter();
  const { page } = router.query;
  const categories = useQuery("categories", fetchCategories);
  const products = useQuery(["products", page], ({ queryKey }) =>
    fetchProducts(queryKey[1])
  );

  const amountProduct = useQuery("amountProduct", fetchCountProduct);

  if (products.isLoading || categories.isLoading || amountProduct.isLoading)
    return <Loading />;
  if (products.isSuccess && categories.isSuccess && amountProduct.isSuccess)
    return (
      <div>
        <Nav categories={categories.data} />
        <div className="w-10/12 m-auto">
          <p className="my-8 text-xs font-light text-gray-800 uppercase">
            <Link href="/">Trang chủ</Link>
            <i class="fas fa-chevron-right text-xs mx-1"></i>
            <Link href="/products?page=1">sản phẩm</Link>
          </p>
          <div className="flex flex-col sm:flex-row">
            <ListCategory categories={categories.data} />
            <div className="sm:w-4/5 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
              {products.data.map((product, index) => (
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
          <Pagination amountProduct={amountProduct.data} />
        </div>
        <Footer />
      </div>
    );

  return <div>error</div>;
};

export default Products;
