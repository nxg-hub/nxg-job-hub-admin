import { useEffect, useState } from "react";
import s from "./index.module.scss";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { GoKebabHorizontal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../../../Redux/TransactionSlice";
import Spinner from "../../../../static/icons/wheel.svg";
const Transactions = () => {
  const dispatch = useDispatch();
  const transaction = useSelector(
    (state) => state.TransactionSlice.transaction
  );
  const loading = useSelector((state) => state.TransactionSlice.loading);
  const error = useSelector((state) => state.TransactionSlice.error);
  useEffect(() => {
    //fecthing all transactions and displaying on the ui
    dispatch(fetchTransactions("/api/v1/admin/transactions"));
  }, []);

  // const transactions = [
  //   {
  //     id: "4567890311",
  //     description: "Deposited into wallet",
  //     amount: "50,000",
  //     date: currentDate,
  //   },
  // ];
  const [search, setSearch] = useState("");
  const handleSearch = () => {};
  const showOptions = () => {};
  return (
    <div className={`${s.Transactions} overflow-y-hidden`}>
      {loading ? (
        <img
          src={Spinner}
          className="w-[80%] md:[w-100%] h-[400px] absolute top-[250px] right-[0] md:h-[500px] m-auto mt-[-150px] ]"
          alt="loading"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[300px] text-xl">
          <h2>Something went wrong. Check internet connecton</h2>
        </div>
      ) : (
        <>
          <div className={s.Header}>
            <div className={s.searchBar}>
              <input
                className={s.searchInput}
                type="search"
                placeholder={"Search"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CiSearch onClick={handleSearch} />
            </div>
            <CiMenuKebab title={"More"} onClick={showOptions} />
          </div>
          <div>
            <div className={s.Title}>
              <h2>Recent Transactions</h2>
              <MdOutlineSettingsInputComponent />
            </div>
            <div
              className={`border border-[#a4a1a1] relative overflow-x-auto overflow-y-scroll  h-[80vh] w-[100%] m-auto  rounded-lg`}>
              <table className={`${s.Table} h-full  rtl:text-right  `}>
                <thead className=" w-[100%] overflow-x-scroll sm:w-full">
                  <tr
                    className={`${s.title} justify-evenly sm:justify-between whitespace-nowrap`}>
                    <th>ID</th>
                    <th>Description</th>
                    <th className="">
                      Amount <small>(NGN)</small>
                    </th>
                    <th className=""> Date</th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody className="">
                  {transaction.map((transaction, i) => (
                    <tr className="" key={i}>
                      <td className="">{transaction.id}</td>
                      <td className="">{transaction.description}</td>
                      <td className="">{transaction.amount}</td>
                      <td className="">{transaction.date}</td>
                      <td className="" width={2}>
                        <GoKebabHorizontal />
                      </td>
                      {/* <td>
                    <span>{transaction.date}</span>
                  <GoKebabHorizontal />
                </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
