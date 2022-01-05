import { useContext} from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from ".";
import { TransactionContext } from "../context/TransactionContext";
import {shortenAddress} from '../utils/shortenAddress'


type InputStruct ={
  name: string;
  value?: string;
  placeholder: string;
  type: string;
  handleChange: Function;
}
// a very simple functional component used in Welcome component
const Input: React.FC<InputStruct> = (props:InputStruct) => (
  <input
    placeholder={props.placeholder}
    type={props.type}
    step="0.0001"
    value={props.value}
    name={props.name}
    onChange={(e) => {
      props.handleChange(e, props.name);
    }}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome: React.FC = () => {
  const {
    connectWallet,
    currentAccount,
    handleChangeState,
    formData,
    setFormData,
    sendTransaction,
    isLoading
  } = useContext(TransactionContext) as any;
  const companyCommonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
  const handleSubmit = (e: any) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  };
  return (
    <div className="flex w-full justify-center items-center ">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 ">
        <div className="flex flex-1 justify-start flex-col mf:mr-10 ">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Ethereums <br/> Anytime Anywhere
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
           The easiest way to make your transactions with a very low fee
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect wallet
              </p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-3xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`rounded-tr-3xl ${companyCommonStyles}`}>
              Ethereum
            </div>

            <div className={`rounded-bl-3xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low fees</div>
            <div className={`rounded-br-3xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#ffffff" />
                </div>
                <BsInfoCircle fontSize={21} color="#ffffff" />
              </div>

              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>

                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <div className=" p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChangeState}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChangeState}
            />

            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChangeState}
            ></Input>
            <Input
              placeholder="Enter message"
              name="message"
              type="text"
              handleChange={handleChangeState}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2 " />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                className="text-white text-sm w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                onClick={handleSubmit}
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
