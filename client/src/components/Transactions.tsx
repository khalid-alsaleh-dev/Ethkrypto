import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

type TransactionCardStruct= {
  id: number;
  url: string;
  message: string;
  timestamp: string;
  addressFrom: string;
  amount: string;
  addressTo: string;
}
// a very simple functional component used in transaction component
const TransactionCard: React.FC<TransactionCardStruct> = (props:TransactionCardStruct) => {
  const gifUrl = useFetch(props.message);
  return (
    <div
      className="blue-glassmorphism m-4 flex flex-1
                  2xl:min-w-[450px]
                  2xl:max-w-[500px]
                  sm:min-w-[270px]
                  sm:max-w-[300px]
                  flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={"https://ropsten.etherscan.io/address/" + props.addressFrom}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              {" "}
              From: {shortenAddress(props.addressFrom)}
            </p>
          </a>

          <a
            href={"https://ropsten.etherscan.io/address/" + props.addressTo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              {" "}
              To:{shortenAddress(props.addressTo)}
            </p>
          </a>

          <div className="text-white text-base">Amount: {props.amount}</div>

          {props.message && (
            <>
              <br />
              <div className="text-white text-base">Message: {props.message}</div>
            </>
          )}
        </div>
        <img
          src={gifUrl || props.url}
          alt="gif"
          className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{props.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions: React.FC = () => {
  const { currentAccount, transactions } = useContext(
    TransactionContext
  ) as any;

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center">
          {transactions.reverse().map((transaction: any, index: number) => {
            return <TransactionCard key={index} {...transaction} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
