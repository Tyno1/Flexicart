import { useState } from "react";
import FaqCard from "./cards/FaqCard";

const accordionData = [
  {
    title: "What is FlexiCart",
    content:
      "FlexiCart is a comprehensive e-commerce platform designed to help businesses manage their online stores and provide customers with a seamless shopping experience. With customisable storefronts, real-time analytics, secure payment processing, and more, we empower you to grow your business efficiently.",
  },
  {
    title: "How do I get started with FlexiCart?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias aliquid accusantium non nulla fugiat ipsam amet mollitia nostrum hic quaerat dicta voluptates et magnam quia culpa, fuga perspiciatis impedit?",
  },
  {
    title: "Is FlexiCart suitable for small businesses?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias aliquid accusantium non nulla fugiat ipsam amet mollitia nostrum hic quaerat dicta voluptates et magnam quia culpa, fuga perspiciatis impedit?",
  },
  {
    title: "How secure is my data on FlexiCart?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias aliquid accusantium non nulla fugiat ipsam amet mollitia nostrum hic quaerat dicta voluptates et magnam quia culpa, fuga perspiciatis impedit?",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-white w-full h-[100vh] flex flex-col items-center gap-16 justify-center py-10">
      <div className="w-full md:w-[450px] flex flex-col items-center text-black">
        <h5 className="mt-4 text-center">FAQ</h5>
        <h3 className="text-2xl md:text-5xl text-center font-medium leading-tight">
          Frequently Asked Questions
        </h3>
        <h5 className="mt-4 text-center">
          Find answers to some of the most common questions about
          <span className="font-bold"> FlexiCart.</span>
        </h5>
      </div>

      <div className="bottom-section w-full md:w-[60%]">
        {accordionData.map((item, index) => (
          <FaqCard
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onClick={() => toggleAccordion(index)}
          />
        ))}
      </div>
      <div className="cards flex"></div>
    </div>
  );
};

export default Faq;
