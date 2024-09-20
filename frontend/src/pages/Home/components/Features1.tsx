import React from "react";
import LargeCard from "./cards/LargeCard";
import SmallCard from "./cards/SmallCard";

const Features1: React.FC = () => {
  return (
    <div className="px-4 bg-white w-full min-h-[100vh] flex flex-col items-center justify-center py-16">
      <h4 className="font-normal text-center">
        Building Lasting Relationships Between Our Customers And Their Customers
      </h4>
      <div className="large-cards flex flex-wrap items-center justify-center gap-4 mt-14 w-full">
        <LargeCard
          largeText="300+"
          mediumText="Businesses"
          smallText="Over 300 Businesses have trusted our powerful back-office tools allowing them customise their storefront, track sales, manage inventory, and engage with customers all from a single, user-friendly dashboard."
        />

        <LargeCard
          largeText="8000+"
          mediumText="Mobile App Users"
          smallText="Our sleek mobile app offers a convenient and enjoyable shopping experience. Discover and purchase products from your favourite stores with just a few taps."
        />

        <LargeCard
          largeText="98%"
          mediumText="User Satisfaction"
          smallText="98% of our users report a high level of satisfaction with the app's ease of use and functionality."
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-2xl md:text-5xl font-medium text-black mt-14 mb-6">Who’s New??</h3>
        <div className="small-cards flex gap-6 w-[99vw] overflow-x-scroll no-scrollbar">
          <SmallCard
            mediumText="AMCA"
            smallText="AMCA is a retail business involved in the sales of female underwear."
          />
          <SmallCard
            mediumText="DREAMSCARE"
            smallText="Dreamcare is a retailer involved in the reselling of cosmetics owned by several companies."
          />
          <SmallCard
            mediumText="MEDIKART"
            smallText="MEDIKART is a small business involved in the sale of prescription drugs."
          />
          <SmallCard
            mediumText="NENNY’S HAIR"
            smallText="NENNY’S HAIR is a small business involved in the sale of wigs."
          />
           <SmallCard
            mediumText="NENNY’S HAIR"
            smallText="NENNY’S HAIR is a small business involved in the sale of wigs."
          />
           <SmallCard
            mediumText="NENNY’S HAIR"
            smallText="NENNY’S HAIR is a small business involved in the sale of wigs."
          />
        </div>
      </div>
    </div>
  );
};

export default Features1;
