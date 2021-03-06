import Nav from "../common/Nav";
import Footer from "../common/Footer";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../reducer/cartContext";
import Image from "next/image";
import { useMutation, useQuery } from "react-query";
import Loading from '../common/Loading'

const postOrder = async (order) => {
  const orderItems = await Promise.all(
    order.cart.products.map(async (el) => {
      const { data } = await axios.post(
        `https://rocky-springs-26824.herokuapp.com/order-items`,
        { amount: el.amount, product: el.id }
      );
      return data.id;
    })
  );
  const provinceResult = await axios.get(
    `https://provinces.open-api.vn/api/p/${order.province}`
  );
  const provinceData = await provinceResult.data;

  const districtResult = await axios.get(
    `https://provinces.open-api.vn/api/d/${order.district}`
  );
  const districtData = await districtResult.data;

  const wardResult = await axios.get(
    `https://provinces.open-api.vn/api/w/${order.ward}`
  );
  const wardData = await wardResult.data;

  const res = await axios.post(
    "https://rocky-springs-26824.herokuapp.com/orders",
    {
      order_items: [...orderItems],
      province: provinceData.name,
      district: districtData.name,
      ward: wardData.name,
      describe: order.describe,
      phone: order.phone,
      address: order.address,
      name: order.name,
    }
  );
  return res;
};

const CheckOut = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [provinceCurr, setProvinceCurr] = useState(1);
  const [districtCurr, setDistrictCurr] = useState(1);
  const [wardCurr, setWardCurr] = useState(1);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [errName, setErrName] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errAddress, setErrAddress] = useState("");

  const { cart } = useContext(CartContext);

  const describeCart = () => {
    let temp = "";
    cart.products.map((el) => (temp += el.name + " x " + el.amount));
    return temp;
  };

  const mutation = useMutation(postOrder);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("https://provinces.open-api.vn/api/p");
      setProvinces(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCurr}?depth=2`
      );
      setDistricts(data.districts);
    })();
  }, [provinceCurr]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCurr}?depth=2`
      );
      setWards(data.wards);
    })();
  }, [districtCurr]);
  const categories = useQuery("categories", async () => {
    const { data } = await axios.get(
      "https://rocky-springs-26824.herokuapp.com/categories"
    );
    return data;
  });
  if (categories.isLoading) return <Loading />;
  if (categories.isSuccess)
    return (
      <div>
        <Nav categories={categories.data} />
        {mutation.isLoading && <p>dang dat hang</p>}
        {mutation.isSuccess && <p>dat hang thanh cong</p>}
        <div className="w-10/12 m-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-4/6 md:mr-4">
              <p className="uppercase font-medium text-xl text-gray-800">
                Th??ng tin giao h??ng
              </p>
              <form
                className="my-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label className="">
                  <p className="mb-1 uppercase font-light">H??? v?? t??n</p>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => !name && setErrName("vui l??ng ??i???n t??n")}
                    onFocus={() => setErrName("")}
                    type="text"
                    className="w-full outline-none py-2 px-4 border border-solid border-gray-900"
                  />
                  {errName && (
                    <span className="text-red-700 text-sm">{errName}</span>
                  )}
                </label>
                <label className="">
                  <p className="mb-1 uppercase font-light">S??? ??i???n tho???i</p>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={(e) => {
                      if (!phone) setErrPhone("vui l??ng nh???p s??? ??i???n tho???i");
                      const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                      if (!regex.test(phone))
                        setErrPhone("s??? ??i???n tho???i kh??ng ch??nh x??c");
                    }}
                    onFocus={() => setErrPhone("")}
                    type="text"
                    className="w-full outline-none py-2 px-4 border border-solid border-gray-900"
                  />
                  {errPhone && (
                    <span className="text-red-700 text-sm">{errPhone}</span>
                  )}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <label className="">
                    <p className="mb-1 uppercase font-light">Th??nh ph???/T???nh</p>
                    <select
                      className="border border-solid border-gray-900 px-4 w-full py-2"
                      name="provinces"
                      onChange={(e) => {
                        setProvinceCurr(e.target.value);
                      }}
                    >
                      {provinces.map((el, i) => (
                        <option value={el.code} key={i}>
                          {el.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="">
                    <p className="mb-1 uppercase font-light">Qu???n/HUy???n</p>
                    <select
                      onChange={(e) => setDistrictCurr(e.target.value)}
                      className="border border-solid border-gray-900 px-4 w-full py-2"
                    >
                      {districts.map((el, i) => (
                        <option value={el.code} key={i}>
                          {el.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="">
                    <p className="mb-1 uppercase font-light">X?? ph?????ng</p>
                    <select
                      onChange={(e) => setWardCurr(e.target.value)}
                      className="border border-solid border-gray-900 px-4 w-full py-2"
                    >
                      {wards.map((el, i) => (
                        <option value={el.code} key={i}>
                          {el.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="">
                  <p className="mb-1 uppercase font-light">?????a ch???</p>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={() => setErrAddress("vui l??ng ??i???n ?????a ch???")}
                    onFocus={() => setErrAddress("")}
                    type="text"
                    className="w-full outline-none py-2 px-4 border border-solid border-gray-900"
                  />
                  {errAddress && (
                    <span className="text-red-700 text-sm">{errAddress}</span>
                  )}
                </label>
              </form>
            </div>
            <div className="md:w-2/6 md:ml-4">
              <p className="uppercase font-semibold text-xl text-gray-700 my-2">
                chi ti???t ????n h??ng
              </p>
              <div>
                <div className="my-4">
                  {cart.products.map((el, index) => (
                    <div key={index} className="flex">
                      <div>
                        <Image src="/rem1.jpg" width={100} height={150} />
                      </div>
                      <div className="mx-4">
                        <p className="font-medium">
                          {el.name} x {el.amount}
                        </p>
                        {el.discount ? (
                          <p>{el.discount} vnd</p>
                        ) : (
                          <p>{el.price} vnd</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="uppercase font-light cursor-pointer bg-yellow-700 text-white text-center tracking-wide py-2"
                  onClick={() => {
                    if (!name) setErrName("vui l??ng nh???p t??n");
                    if (!phone) setErrPhone("vui l??ng nh???p s??? ??i???n tho???i");
                    if (!address) setErrAddress("vui l??ng ??i???n ?????a ch???");
                    if (name && address && phone) {
                      mutation.mutate({
                        province: provinceCurr,
                        district: districtCurr,
                        ward: wardCurr,
                        cart,
                        describe: describeCart(),
                        name,
                        phone,
                        address,
                      });
                    }
                  }}
                >
                  ?????t h??ng
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default CheckOut;
