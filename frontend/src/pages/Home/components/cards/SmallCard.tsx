interface SmallCardProps {
  mediumText: string;
  smallText: string;
}

const SmallCard = ({ mediumText, smallText }: SmallCardProps) => {
  return (
    <div className="bg-black text-white flex flex-col items-end gap-2 px-4 py-4 min-w-[300px]">
      <div className="bg-white py-1 px-6 text-black">New</div>
      <div>
        <h4 className="text-2xl">{mediumText}</h4>
        <h5 className="text-xs text-justify pt-1">{smallText}</h5>
      </div>
    </div>
  );
};

export default SmallCard;
