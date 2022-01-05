import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../images/logo.png";
import { useState } from "react";

type NavbarItemStruct= {
  title: string;
  classProps?: string;
}
// a very simple functional component used in Navbar component
const NavbarItem: React.FC<NavbarItemStruct> = (props:NavbarItemStruct) => {
  return <li className={"mx-4 cursor-pointer ${classProps}"}>{props.title}</li>;
};

const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-30 h-10 cursor-pointer " />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between itmes-center flex-initial">
        {["Market", "Mining", "Exchange", "Wallets"].map((item, index) => {
          return <NavbarItem key={item + index} title={item} />;
        })}
        <li className="bg-[#2952e3] py-2 px-7 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative ">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2zl md:hidden list-none
          flex flex-col justify-start items-end rouned-md blue-glassmorphism text-white animate-slide-in
          "
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                onClick={() => {
                  setToggleMenu(false);
                }}
              />
            </li>
            {["Market", "Mining", "Exchange", "Wallets"].map(
              (item, index) => {
                return (
                  <NavbarItem
                    key={item + index}
                    title={item}
                    classProps="my-2 text-lg"
                  />
                );
              }
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
