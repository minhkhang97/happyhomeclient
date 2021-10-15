import {useEffect, useState} from 'react'
import Link from 'next/link'
const limit = 8;
const Pagination = ({amountProduct}) => {
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
    const count = Math.round(amountProduct / limit) + 1;
    let temp = [];
    let len = count > 3 ? 3 : count;
    for (let i = 1; i <= len; i++) {
      temp = [...temp, i];
    }
    setPagination([...temp]);
  }, [amountProduct]);
    return( <div className="my-6">
            <ul className="flex justify-center items-center">
              <li
                onClick={() => {
                  if (pagination[0] > 1)
                    setPagination([...pagination.map((el) => el - 1)]);
                }}
              >
                <i class="fas fa-chevron-left"></i>
              </li>
              {pagination.map((el, i) => (
                <li key={i} className="px-4 py-1 mx-2 bg-gray-200">
                  <Link href={"/products?page=" + el}>
                    <a>{el}</a>
                  </Link>
                </li>
              ))}
              <li
                onClick={() =>
                  pagination[pagination.length - 1] <
                  Math.round(amountProduct / limit) + 1
                    ? setPagination([...pagination.map((el) => el + 1)])
                    : null
                }
              >
                <i class="fas fa-chevron-right"></i>
              </li>
            </ul>
          </div>
        )
}

export default Pagination;