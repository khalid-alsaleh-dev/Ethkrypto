import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

type ServiceCardStruct ={
  color: string;
  title: string;
  icon: any;
  subtitle: string;
}
// a very simple functional component used in Servcies component
const ServiceCard: React.FC<ServiceCardStruct> = (props:ServiceCardStruct) => {
  return (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div
        className={
          "w-10 h-10 rounded-full flex justify-center items-center " + props.color
        }
      >
        {props.icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
        <h1 className="mt-2 text-white text-lg">{props.title}</h1>
        <p className="mt-2 text-white text-sm md:w-9/12">{props.subtitle}</p>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-strat items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we
            <br />
            continue to imporve
          </h1>
        </div>
        <div className="flex-1 flex flex-col justify-start items-center pt-10">
          <ServiceCard
            color="bg-[#2952E3]"
            title="Security Guaranteed"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is guaranteed.We always maintain privacy of our products"
          />
          <ServiceCard
            color="bg-[#8945f8]"
            title="Best exchange rates"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Best exchange rates because we always maintain the quality of our products"
          />
          <ServiceCard
            color="bg-[#f84550]"
            title="Fastest transaction"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="It only takes some seconds and your transaction completed....."
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
