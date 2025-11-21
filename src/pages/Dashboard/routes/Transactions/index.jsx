// import { useEffect, useState } from "react";
// import s from "./index.module.scss";
// import { MdOutlineSettingsInputComponent } from "react-icons/md";
// import { CiMenuKebab, CiSearch } from "react-icons/ci";
// import { GoKebabHorizontal } from "react-icons/go";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTransactions } from "../../../../Redux/TransactionSlice";
// import Spinner from "../../../../static/icons/wheel.svg";
// const Transactions = () => {
//   const dispatch = useDispatch();
//   const transaction = useSelector(
//     (state) => state.TransactionSlice.transaction
//   );
//   const loading = useSelector((state) => state.TransactionSlice.loading);
//   const error = useSelector((state) => state.TransactionSlice.error);
//   useEffect(() => {
//     //fecthing all transactions and displaying on the ui
//     dispatch(
//       fetchTransactions(
//         "/api/v1/admin/transactions?page=0&size=1000&sort=string"
//       )
//     );
//   }, []);
//   // const transactions = [
//   //   {
//   //     id: "4567890311",
//   //     description: "Deposited into wallet",
//   //     amount: "50,000",
//   //     date: currentDate,
//   //   },
//   // ];

//   const [search, setSearch] = useState("");
//   const handleSearch = () => {};
//   const showOptions = () => {};
//   return (
//     <div className={`${s.Transactions} overflow-y-hidden`}>
//       {loading ? (
//         <img
//           src={Spinner}
//           className="w-[30%] md:w-[10%] h-[400px] absolute top-[200px] right-[35%] md:h-[500px] m-auto mt-[-150px]"
//           alt="loading"
//         />
//       ) : !loading && error ? (
//         <div className="w-[80%] m-auto mt-[300px] text-xl">
//           <h2>Something went wrong. Check internet connecton</h2>
//         </div>
//       ) : (
//         <>
//           <div className={s.Header}>
//             <div className={s.searchBar}>
//               <input
//                 className={s.searchInput}
//                 type="search"
//                 placeholder={"Search"}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <CiSearch onClick={handleSearch} />
//             </div>
//             <CiMenuKebab title={"More"} onClick={showOptions} />
//           </div>
//           <div>
//             <div className={s.Title}>
//               <h2>Recent Transactions</h2>
//               <MdOutlineSettingsInputComponent />
//             </div>
//             <div
//               className={`border border-[#a4a1a1] relative overflow-x-auto overflow-y-scroll  h-[80vh] w-[100%] m-auto  rounded-lg`}>
//               <table className={`${s.Table} h-full    `}>
//                 <thead className=" w-[100%] overflow-x-scroll sm:w-full">
//                   <tr
//                     className={`${s.title} justify-evenly sm:justify-between whitespace-nowrap`}>
//                     <th>ID</th>
//                     <th>Description</th>
//                     <th className="">
//                       Amount <small>(NGN)</small>
//                     </th>
//                     <th className=""> Status</th>
//                     <th className=""> Date</th>
//                     <th className=""></th>
//                   </tr>
//                 </thead>
//                 <tbody className="absolute top-[20px]">
//                   {transaction.map((transaction, i) => (
//                     <tr className="" key={i}>
//                       <td className="!pl-0">{transaction.id}</td>
//                       <td className="">{transaction.transactionMessage}</td>
//                       <td className="">{transaction.transactionAmount}</td>
//                       <td className="">{transaction.transactionStatus}</td>
//                       <td className="">{transaction.transactionDate}</td>
//                       <td className="" width={2}>
//                         <GoKebabHorizontal />
//                       </td>
//                       {/* <td>
//                     <span>{transaction.date}</span>
//                   <GoKebabHorizontal />
//                 </td> */}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Transactions;
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CiSearch } from "react-icons/ci";
import { GoKebabHorizontal } from "react-icons/go";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fetchTransactions } from "../../../../Redux/TransactionSlice";
import Spinner from "../../../../static/icons/wheel.svg";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transaction, loading, error } = useSelector(
    (state) => state.TransactionSlice
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchTransactions(
        "/api/v1/admin/transactions?page=0&size=10000000&sort=string"
      )
    );
  }, []);

  const filtered = transaction.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.transactionMessage.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || t.transactionStatus === statusFilter;

    const matchesDate =
      (!dateRange.from ||
        new Date(t.transactionDate) >= new Date(dateRange.from)) &&
      (!dateRange.to || new Date(t.transactionDate) <= new Date(dateRange.to));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Transactions Report", 14, 15);

    const tableColumn = ["ID", "Description", "Amount (NGN)", "Status", "Date"];
    const tableRows = [];

    filtered.forEach((t) => {
      tableRows.push([
        t.id,
        t.transactionMessage,
        t.transactionAmount,
        t.transactionStatus,
        t.transactionDate,
      ]);
    });

    autoTable(doc, {
      head: [["ID", "Description", "Amount", "Status", "Date"]],
      body: filtered.map((t) => [
        t.id,
        t.transactionMessage,
        t.transactionAmount,
        t.transactionStatus,
        t.transactionDate,
      ]),
    });
    doc.save("transactions.pdf");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SUCCESSFUL":
      case "SUCCESS":
        return "text-green-600 bg-green-100";
      case "FAILED":
        return "text-red-600 bg-red-100";
      case "PENDING":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-5 w-full">
      {/* LOADING */}
      {loading && (
        <div className="flex justify-center mt-20">
          <img src={Spinner} className="w-16 h-16" />
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <p className="text-center mt-10 text-red-500 text-lg">
          Something went wrong. Check your internet connection.
        </p>
      )}

      {!loading && !error && (
        <>
          {/* HEADER */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <MdOutlineSettingsInputComponent size={24} />
          </div>

          {/* SEARCH + FILTERS */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/3">
                <CiSearch size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search ID or Description..."
                  className="ml-2 w-full outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <select
                className="border rounded-lg px-3 py-2 outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Status</option>
                <option value="SUCCESSFUL">Success</option>
                <option value="FAILED">Failed</option>
                <option value="PENDING">Pending</option>
              </select>

              {/* Date range */}
              <div className="flex items-center gap-2">
                <label className="text-sm">From:</label>
                <input
                  type="date"
                  className="border rounded-lg px-2 py-1"
                  value={dateRange.from}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, from: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm">To:</label>
                <input
                  type="date"
                  className="border rounded-lg px-2 py-1"
                  value={dateRange.to}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, to: e.target.value })
                  }
                />
              </div>

              {/* Export PDF */}
              <button
                onClick={exportPDF}
                className="bg-[#2596be] text-white px-4 py-2 rounded-lg">
                Export PDF
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white border rounded-lg shadow overflow-x-auto max-h-[75vh]">
            <table className="w-full text-left">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Amount (NGN)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3"></th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}

                {filtered.map((t, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">{t.id}</td>
                    <td className="p-3">{t.transactionMessage}</td>
                    <td className="p-3">{t.transactionAmount}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          t.transactionStatus
                        )}`}>
                        {t.transactionStatus}
                      </span>
                    </td>

                    <td className="p-3">{t.transactionDate}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelected(t);
                          setIsOpen(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full">
                        <GoKebabHorizontal />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SEE MORE MODAL */}
          <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black/30"></div>
              </Transition.Child>

              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Transition.Child
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-90"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-90">
                  <Dialog.Panel className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                    <Dialog.Title className="text-lg font-semibold mb-3">
                      Transaction Details
                    </Dialog.Title>

                    {selected && (
                      <div className="text-sm space-y-2">
                        <p>
                          <strong>ID:</strong> {selected.id}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {selected.transactionMessage}
                        </p>

                        <p>
                          <strong>Plan Type:</strong>
                          {selected.subscriber.planType}
                        </p>
                        <p>
                          <strong>Name:</strong>
                          {`${selected.subscriber?.user?.firstName} ${selected.subscriber?.user?.lastName}`}
                        </p>

                        <p>
                          <strong>Amount:</strong> {selected.transactionAmount}
                        </p>
                        <p>
                          <strong>Status:</strong> {selected.transactionStatus}
                        </p>
                        <p>
                          <strong>Date:</strong> {selected.transactionDate}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-6 bg-[#2596be] text-white px-4 py-2 rounded-lg w-full">
                      Close
                    </button>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </div>
  );
};

export default Transactions;
