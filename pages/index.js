import { useQuery } from "react-query";
import Footer from "../common/Footer";
import Header from "../common/Hedear";
import axios from "axios";
import Trend from "../components/Trend";
import ListProduct from "../components/ListProduct";
import Contact from "../common/Contact";
import Head from "next/head";

const fetchHomePage = async () => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/home`
  );
  return data;
};

export default function Home() {
  const result = useQuery("homepage", fetchHomePage);
  if (result.isLoading) return <div>loading</div>;
  if (result.isSuccess)
    return (
      <div className="">
        <Head>
          <title>Happy Home</title>
          <meta property="og:title" content="Happy Home" key="title" />
        </Head>
        <Header />
        <div>
          {result.data.bestseller.map((el, index) => (
            <Trend key={index} title={el.title} products={el.products} />
          ))}
        </div>
        <ListProduct data={result.data.featureproduct} />
        <Contact />
        <Footer />
      </div>
    );
  return <div>error</div>;
}
