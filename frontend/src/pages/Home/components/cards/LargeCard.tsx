interface LargeCardProps {
  largeText: string;
  mediumText: string;
  smallText: string;
}

const LargeCard = ({ largeText, mediumText, smallText }: LargeCardProps) => {
  return (
    <div className="bg-[#EEF0F2] flex flex-col flex-1 px-6 py-8 min-w-[300px] max-w-[315px] min-h-[250px] rounded-2xl items-center md:items-start">
      <h3 className="text-6xl font-normal text-center">{largeText}</h3>
      <h4 className="text-2xl font-normal">{mediumText}</h4>
      <h5 className="text-sm md:text-justify pt-4 text-center">{smallText}</h5>
    </div>
  );
};

export default LargeCard;
