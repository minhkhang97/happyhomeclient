import axios from 'axios';
const limit = 8;
export const fetchProducts = async (page) => {
  const {data} = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/products?_start=${
      (page - 1) * limit
    }&_limit=${limit}`
  );
  return data;
};

export const fetchCategories = async () => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/categories`
  );
  return data;
};

export const fetchCountProduct = async () => {
  const { data } = await axios.get(
    `https://rocky-springs-26824.herokuapp.com/products/count`
  );
  return data;
};