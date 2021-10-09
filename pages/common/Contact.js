import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errName, setErrName] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const mutation = useMutation(async (contact) => {
    const res = await axios.post('https://rocky-springs-26824.herokuapp.com/customers', contact);
    return res;
  })
  return (
    <div className="my-8">
      <div className="w-10/12 m-auto">
        <p className="mb-4 uppercase font-semibold text-xl text-red-600 text-center">
          Nhận tư vấn ngay
        </p>
        {mutation.isLoading && <p>loaing....</p>}
        {mutation.isSuccess && <p>dang ky lien he thanh cong</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">
          <form
            className=""
            onSubmit={async (e) => {
              e.preventDefault();
              if(!name) setErrName("vui lòng nhập tên");
              if (!phone) setErrPhone("vui lòng nhập số điện thoại");
              if (!errName && !errPhone) {
                // const res = await axios.post(
                //   "https://rocky-springs-26824.herokuapp.com/customers",
                //   { fullname: name, phone, address }
                // );
                mutation.mutate({ fullname: name, phone, address }) 
              }
              
            }}
          >
            <label className="w-full my-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => {
                  if (!name) setErrName("vui lòng nhập tên");
                }}
                onFocus={() => setErrName("")}
                type="text"
                className="text-gray-900 my-1 w-full outline-none rounded-md bg-gray-100 py-2 px-4"
                placeholder="họ và tên"
              />
              {errName ? (
                <span className="text-red-700 text-sm">{errName}</span>
              ) : null}
            </label>
            <label className="w-full mb-2">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={(e) => {
                  if (!phone) setErrPhone("vui lòng nhập số điện thoại");
                  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                  if (!regex.test(phone))
                    setErrPhone("số điện thoại không chính xác");
                }}
                onFocus={() => setErrPhone("")}
                type="text"
                className="text-gray-900 my-1 w-full outline-none rounded-md bg-gray-100 py-2 px-4"
                placeholder="số điện thoại"
              />
              {errPhone ? (
                <span className="text-red-700 text-sm">{errPhone}</span>
              ) : null}
            </label>
            <label className="w-full my-2">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="text-gray-900 my-1 w-full outline-none rounded-md bg-gray-100 py-2 px-4"
                placeholder="địa chỉ"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-red-600 font-semibold tracking-widest text-white uppercase py-2 my-2 rounded-full shadow-md"
            >
              liên hệ
            </button>
          </form>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
