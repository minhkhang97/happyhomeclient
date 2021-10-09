import { useQuery } from "react-query";
import { Footer } from "./common/Footer";
import { Header } from "./common/Hedear";
import { Nav } from "./common/Nav";
import axios from "axios";
import { Trend } from "./products/Trend";
import { ListProduct } from "./products/ListProduct";
import { useEffect, useState } from "react";
import Contact from "./common/Contact";

const fetchHomePage = async () => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/home`
  );
  return data;
};

export default function Home() {
  const result = useQuery("homepage", fetchHomePage);

  const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   setCategories(result.data?.featureproduct.map((el) => el.category));
  // }, [result.isSuccess]);
  if (result.isLoading) return <div>loading</div>;
  if (result.isSuccess)
    return (
      <div className="">
        <Header />
        <div>
          {result.data.bestseller.map((el, index) => (
            <Trend key={index} title={el.title} products={el.products} />
          ))}
        </div>
        <ListProduct data={result.data.featureproduct} />
        <Contact/>
        <Footer />
      </div>
    );
  return <div>error</div>;
}
