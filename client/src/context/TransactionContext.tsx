import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

type FormDataStruct ={
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}
type TransactionStruct= {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  amount: number;
}
type TransactionContractContextStruct ={
  connectWallet: Function;
  currentAccount: string;
  handleChangeState: Function;
  formData: FormDataStruct;
  setFormData: Function;
  sendTransaction: Function;
  transactions: TransactionStruct[];
  isLoading: boolean;
}

export const TransactionContext =
  createContext<TransactionContractContextStruct | null>(null);

// access the ethereum object from metamask extension
const { ethereum } = window as any;

const getEthereumContract = () => {
  // to get the provider(sender) we need to communicate with the metamask extension
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionProvider: React.FC = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [formData, setFormData] = useState<FormDataStruct>({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [transactionCount, setTransactionCount] = useState<string | null>(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState<TransactionStruct[]>([]);

  const handleChangeState = (e: any, name: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const transactionContract = getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();
      const structuredTransactions = availableTransactions.map(
        (transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );
      console.log(structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }

      console.log(accounts);
    } catch (e) {
      console.log(e);
      throw new Error("No ethereum object");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      const parsedTransactionCount = parseInt(
        transactionCount._hex,
        16
      ).toString();
      console.log(parseInt(transactionCount._hex, 16));
      window.localStorage.setItem("transactionCount", parsedTransactionCount);
    } catch (error) {
      console.log(error);
      throw new Error("no thereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
      throw new Error("no thereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      // get the data from the form
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      //  sending transaction
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", //21000 GWEI,
            value: parsedAmount._hex,
          },
        ],
      });
      // add our data to blockchain
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setisLoading(true);
      console.log("Loading >>>>");
      console.log(transactionHash.hash);
      await transactionHash.wait();
      setisLoading(false);
      console.log("Success >>>>");
      console.log(transactionHash.hash);

      const transactionCount = await transactionContract.getTransactionCount();
      // setTransactionCount(transactionCount)
      console.log(transactionCount);
    } catch (e) {
      console.log(e);
      throw new Error("no thereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        handleChangeState,
        formData,
        setFormData,
        transactions,
        sendTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
