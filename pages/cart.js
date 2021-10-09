import { useContext } from "react";
import CartContext from "./reducer/cartContext";
import  Nav  from "./common/Nav";
import  Footer  from "./common/Footer";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { cart, removeProduct, plusProduct, minusProduct } =
    useContext(CartContext);
  const totalAmount = cart.products
    .map((el) => el.amount)
    .reduce((acc, curr) => acc + curr, 0);
  const totalPrice = cart.products.reduce(
    (acc, curr) => curr.price * curr.amount + acc,
    0
  );
  return (
    <div>
      <Nav />
      <div className="w-10/12 m-auto">
        <h5 className="uppercase font-medium text-xl">giỏ hàng</h5>
        <div className="flex flex-col sm:flex-row my-6">
          <div className="w-full sm:w-3/5">
            {cart.products.map((product, index) => (
              <div key={index} className="flex my-3">
                <div className="w-3/12">
                  <Image src="/rem1.jpg" width="100" height="150" />
                </div>
                <div className="w-7/12 sm:w-6/12 px-4 sm:px-0 text-sm sm:text-md">
                  <h5 className="uppercase font-medium text-gray-900">
                    {product.name}
                  </h5>
                  <div className="flex flex-row items-center my-3">
                    <p className="text-lg text-red-800">
                      {product.discount} vnđ
                    </p>
                    <del className="text-gray-600 px-2">
                      {product.price} vnđ
                    </del>
                  </div>
                  <div className="grid grid-cols-3 w-1/2 text-center bg-gray-100 text-gray-800 h-10 items-center mr-4">
                    <button
                      className="text-3xl font-light"
                      onClick={() =>
                        product.amount > 1 ? minusProduct(product) : null
                      }
                    >
                      -
                    </button>
                    <p className="">{product.amount}</p>
                    <button
                      className="text-3xl font-light"
                      onClick={() => plusProduct(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-1/12 sm:w-4/12 text-right">
                  <button onClick={() => removeProduct(product.id)}>
                    <i class="fas fa-times text-gray-900 text-xl"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="sm:w-2/5 sm:ml-6 ">
            <div className="bg-gray-200 px-8 py-6 h-24">
              <div className="flex justify-between">
                <p>Tổng số sản phẩm</p>
                <p>{totalAmount}</p>
              </div>
              <div className="flex justify-between uppercase font-semibold text-lg text-gray-900">
                <p>Tổng tiền</p>
                <p>{totalPrice} vnd</p>
              </div>
            </div>

            <div className="flex flex-col my-4">
              <button className="mb-4 py-2 uppercase text-lg font-medium tracking-wider bg-yellow-800 text-white">
                <Link href="/checkout">đặt hàng</Link>
              </button>
              <button className="uppercase">
                <Link href="/category/Categories">tiếp mục mua hàng</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
