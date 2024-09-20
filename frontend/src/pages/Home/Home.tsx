import Faq from "./components/Faq";
import Features1 from "./components/Features1";
import Features2 from "./components/Features2";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";



const Home = () => {
  return <div className="w-full ">
    <Hero />
    <Features1 />
    <Features2 />
    <Testimonial />
    <Faq />
  </div>;
};

export default Home;
