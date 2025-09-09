import { useState, useEffect } from 'react';

const ServiceCard = ({ imgURL, label, subtext }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a slight delay to trigger the entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] px-10 py-16 
        bg-secondry border border-zinc-800 
        transition-all duration-500 hover:shadow-xl hover:shadow-lime-600/20 hover:-translate-y-2
        cursor-pointer relative overflow-hidden group
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-lime-600 to-emerald-600 rounded-[20px] blur opacity-0 
        group-hover:opacity-20 transition-opacity duration-500`} />
      
      {/* Shine effect */}
      <div className={`absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine`}/>

      <div className={`w-11 h-11 flex justify-center items-center bg-lime-600 rounded-full
        transition-all duration-300 ${isHovered ? 'scale-110 animate-pulse-slow' : ''}`}>
        <img 
          src={imgURL} 
          alt={label} 
          width={24} 
          height={24}
          className={`transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}
        />
      </div>
      <h3 className={`mt-5 font-palanquin text-3xl leading-normal font-bold
        transition-colors duration-300 ${isHovered ? 'text-lime-500' : ''}`}>
        {label}
      </h3>
      <p className={`mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray relative z-10
        transition-all duration-300 ${isHovered ? 'text-white/80' : ''}`}>
        {subtext}
      </p>
    </div>
  );
};

export default ServiceCard;
