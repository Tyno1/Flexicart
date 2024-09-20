import React from "react";
import image4 from "../../assets/images/about_image_4.jpg";
import image2 from "../../assets/images/about_image_2.jpg";

const About: React.FC = () => {
  return (
    <div className="px-4 lg:px-32 xl:px-48 bg-white min-h-[90vh] flex flex-col p-10 items-start w-full">
      <div className="flex flex-col md:flex-row w-full h-full justify-between items-center gap-10">
        <div className="flex-2 w-full md:w-[50%] text-black text-sm leading-relaxed font-light flex flex-col gap-4">
          <h3 className="text-5xl text-left font-medium leading-tight">
            Who Are We??
          </h3>
          <p>
            Welcome to our company! We are dedicated to providing exceptional
            service and delivering innovative solutions to our clients. Our team
            of experts is committed to excellence and strives to exceed
            expectations in everything we do.
          </p>
          <p>
            Our journey began over a decade ago, with a vision to revolutionize
            the industry. Through hard work, dedication, and a passion for
            innovation, we have grown into a leading player in the market. We
            take pride in our achievements and look forward to many more years
            of success.
          </p>
          <p>
            At the core of our company is a commitment to our values: integrity,
            quality, and customer satisfaction. We believe in building long-term
            relationships with our clients, based on trust and mutual respect.
            Our team works tirelessly to ensure that our clients receive the
            best possible service and support.
          </p>
          <p>
            Our mission is to empower businesses with cutting-edge technology
            and innovative solutions. We understand the challenges faced by
            modern businesses and strive to provide tools and strategies that
            help our clients stay ahead of the competition.
          </p>
        </div>
        <div className="image-container w-full md:w-[45%] h-[20rem] md:h-[40rem]">
          <img
            src={image4}
            alt="Team working"
            className="object-cover object-center w-full h-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row w-full h-full justify-between items-center gap-10 mt-10">
        <div className="image-container w-full md:w-[45%] h-[40rem]">
          <img
            src={image2}
            alt="Team working"
            className="object-cover object-center w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-2 w-full md:w-[50%] text-black text-sm leading-relaxed font-light flex flex-col gap-4">
          <h3 className="text-5xl text-left font-medium leading-tight">
            We Value Team Work{" "}
          </h3>
          <p>
            Our team is our greatest asset. Comprised of talented professionals
            from diverse backgrounds, we bring a wealth of knowledge and
            experience to every project. We foster a collaborative environment
            where ideas are shared, and creativity is encouraged.
          </p>
          <p>
            Looking to the future, we are excited about the possibilities that
            lie ahead. We are committed to continuous improvement and
            innovation, always seeking new ways to enhance our services and
            deliver greater value to our clients.
          </p>
          <p>
            Thank you for taking the time to learn more about us. We invite you
            to explore our website to discover more about our services, our
            team, and how we can help your business succeed.
          </p>
          <p>
            If you have any questions or would like to get in touch, please
            don't hesitate to contact us. We look forward to working with you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
