const Card = () => {
  return (
    <div class="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">
      <div class="absolute flex flex-col items-center  text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
            />
          </svg>
        </div>
      </div>
      <div class="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
    </div>
  );
};

export default Card;
