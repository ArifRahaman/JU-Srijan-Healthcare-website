import React from "react";
import NavLink from "next/link";
import ReactTyped from "react-typed";

const TYPE_SPEED = 100;
const ICON_SIZE = "w-10 h-10";
const ICON_VIEWBOX = "0 0 24 24";
const ICON_STROKE_WIDTH = 2;
const LEARN_MORE_ICON_SIZE = "w-4 h-4 ml-2";

const Services = () => {
  return (
    <>
      <section className="text-gray-600 body-font bg-slate-400">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              <ReactTyped strings={["Our services"]} typeSpeed={TYPE_SPEED} loop />
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
              We connect you with the doctors all around the world. Signup in
              our website and get access to Thousands of doctors available all
              over the world.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 justify-center">
            {serviceItems.map((item, index) => (
              <ServiceItem key={index} {...item} />
            ))}
          </div>
          <NavLink href="signin">
            <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Signup now
            </button>
          </NavLink>
        </div>
      </section>
    </>
  );
};

const serviceItems = [
  {
    bgColor: "bg-red-300",
    title: "Specialized Doctors",
    description:
      "Discover specialized care with our expert team in Psychology, Neurology, Ophthalmology, Cardiology, and Dermatology. From mental health to skin concerns, our skilled professionals prioritize your well-being. Benefit from personalized services addressing your unique healthcare needs.",
    iconPath: "M22 12h-4l-3 9L9 3l-3 9H2",
  },
  {
    bgColor: "bg-green-300",
    title: "Expert Guidance through Video Interactions",
    description:
      "Ease into virtual healthcare! Our platform offers hassle-free video consultations for mental health, neurology, eye, heart, and skin issues. Prioritizing your well-being, we bring expert advice to your space through seamless video interactions.",
    iconPath: "M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12",
    iconCircle: { cx: 6, cy: 6, r: 3 },
    iconCircle2: { cx: 6, cy: 18, r: 3 },
  },
  {
    bgColor: "bg-orange-300",
    title: "Unique Chatbot",
    description:
      "Experience the power of precision in our application's chat feature! Enjoy swift responses with minimal delay and optimal latency, ensuring you receive direct and to-the-point answers. Our chat capability guarantees a seamless and efficient interaction for a more engaging experience.",
    iconPath: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2",
    iconCircle: { cx: 12, cy: 7, r: 4 },
  },
];

const ServiceItem = ({ bgColor, title, description, iconPath, iconCircle, iconCircle2 }) => (
  <div className={`p-4 md:w-1/4 flex flex-col text-center items-center ${bgColor} rounded-3xl m-2`}>
    <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={ICON_STROKE_WIDTH}
        className={ICON_SIZE}
        viewBox={ICON_VIEWBOX}
      >
        {iconCircle && <circle {...iconCircle}></circle>}
        {iconCircle2 && <circle {...iconCircle2}></circle>}
        <path d={iconPath}></path>
      </svg>
    </div>
    <div className="flex-grow">
      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{title}</h2>
      <p className="leading-relaxed text-base">{description}</p>
      <a className="mt-3 text-indigo-500 inline-flex items-center">
        Learn More
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={ICON_STROKE_WIDTH}
          className={LEARN_MORE_ICON_SIZE}
          viewBox={ICON_VIEWBOX}
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </a>
    </div>
  </div>
);

export default Services;