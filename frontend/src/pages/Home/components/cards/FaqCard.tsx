import { FiMinus, FiPlus } from "react-icons/fi";

interface FaqCardProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard = ({ title, content, isOpen, onClick }: FaqCardProps) => {
  return (
    <div className="mb-2">
      <button
        className="flex justify-between w-full text-xs md:text-sm text-left text-black font-bold p-4 px-10 border-b-[1px] border-black"
        onClick={onClick}
      >
        {title}
        {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
      </button>
      <div
        className={`transition-all text-black leading-normal text-xs md:text-sm duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen px-10 p-4" : "max-h-0"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default FaqCard;
