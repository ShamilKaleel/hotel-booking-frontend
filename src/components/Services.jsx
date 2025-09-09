import ServiceCard from "./ServiceCard";
import { services } from "../constants";
const Services = () => {
  return (
    <section className=" flex flex-col gap-9  px-5 ">
      <div className=" max-sm:mt-12 max-container">
        <div className="flex flex-col justify-start md:items-center gap-5">
          <h2 className="text-4xl  font-bold">
            Our <span className="text-coral-red">Services </span>
          </h2>
          <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray md:flex md:flex-col justify-center items-center">
            <span>
              Experience a host of powerful services at StayEase, including
            </span>
            <span>
              easy online booking, best price guarantee, and VIP services, all
            </span>
            <span>designed to enhance your travel experience.</span>
          </p>
        </div>
      </div>
      <div className="max-container flex justify-center flex-wrap gap-9">
        {services.map((service) => (
          <ServiceCard key={service.label} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
