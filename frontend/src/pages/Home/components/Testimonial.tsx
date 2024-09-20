import TestimonialCard from "./cards/TestimonialCard";
import img1 from "../../../assets/images/airam-dato-on-T90gWliuCQQ-unsplash.jpg";
import img2 from "../../../assets/images/becca-tapert-QofjUnxy9LY-unsplash.jpg";
import img3 from "../../../assets/images/rasheed-kemy-oqY09oVTa3k-unsplash.jpg";
import img4 from "../../../assets/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg";
import img5 from "../../../assets/images/foto-sushi-6anudmpILw4-unsplash.jpg";
import img6 from "../../../assets/images/ghen-mar-cuano-R6dSBkz32B8-unsplash.jpg";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Testimonial = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black w-full min-h-[100vh] flex flex-col items-center gap-16 justify-center py-10">
      <div className="w-full md:w-[450px] flex flex-col items-center text-white">
        <h3 className="text-2xl md:text-5xl text-center font-medium leading-tight">
          What Are Our Customers Saying?
        </h3>
        <h5 className="mt-4 text-center">
          Hear from the businesses and shoppers who have transformed their
          e-commerce experience with{" "}
          <span className="font-bold"> FlexiCart.</span>
        </h5>
      </div>

      <div className="cards flex gap-6 w-[99vw] overflow-x-scroll no-scrollbar">
        <TestimonialCard
          review="FlexiCart has completely transformed the way I run my online store. 
          The customisable store fronts and real-time analytics have helped me attract more customers and grow my sales significantly. 
          I can't imagine running my business without it!"
          profilePicture={img1}
          name="Martha T."
          title="Satisfied Shopper"
        />
        <TestimonialCard
          review="The inventory management is a game-changer for my small business. 
          I can keep track of my stock effortlessly and engage with my customers in a more meaningful way. 
          FlexiCart is an essential part of my business toolkit."
          profilePicture={img2}
          name="Lisa Penny"
          title="Handmade Goods Seller"
        />
        <TestimonialCard
          review="The mobile app is incredibly user-friendly and makes shopping a breeze. 
          I love the seamless checkout process and the personalised recommendations. 
          FlexiCart has definitely made my online shopping experience much better!"
          profilePicture={img3}
          name="John Doe"
          title="Tech Gadget Enthusiast"
        />
        <TestimonialCard
          review="Shopping for tech gadgets on FlexiCart is fantastic. The app is fast, secure, and easy to navigate. 
          Plus, I always find great deals and the best products. Highly recommended!!"
          profilePicture={img4}
          name="Roony English"
          title="Car Sales"
        />
        <TestimonialCard
          review="FlexiCart has completely transformed the way I run my online store. 
          The customisable store fronts and real-time analytics have helped me attract more customers and grow my sales significantly. 
          I can't imagine running my business without it!"
          profilePicture={img5}
          name="Nike Shits"
          title="Mobile Phone Retailer"
        />
        <TestimonialCard
          review="FlexiCart has completely transformed the way I run my online store. 
          The customisable store fronts and real-time analytics have helped me attract more customers and grow my sales significantly. 
          I can't imagine running my business without it!"
          profilePicture={img6}
          name="Mary Golden"
          title="Salon Owner"
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-white font-bold">Voted #1 in 50+ Categories</h4>
        <Button
          className="bg-primary text-white px-20 py-4 rounded"
          text="View All Testimonials"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default Testimonial;
