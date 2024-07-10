import { useState } from "react";
import s from "./index.module.scss";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { GoKebabHorizontal } from "react-icons/go";
const Transactions = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const currentDate = `${day}/${month}/${year}`;

  const transactions = [
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: currentDate,
    },
  ];
  const [search, setSearch] = useState("");
  const handleSearch = () => {};
  const showOptions = () => {};
  return (
    <div className={`${s.Transactions} overflow-y-hidden`}>
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
              {transactions.map((transaction, i) => (
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
    </div>
  );
};

export default Transactions;
