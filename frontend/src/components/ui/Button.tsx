import { FaSpinner } from "react-icons/fa";

interface ButtonProps {
  text: string;
  onClick?: (e: any) => void;
  className?: string;
  variant?: string;
  isSubmitting?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button = ({ text, onClick, className, variant, isSubmitting, type }: ButtonProps) => {
  let classNames = className;
  switch (variant) {
    case "outlined":
      classNames += " px-8 py-2 border border-2 rounded-lg";
      break;
    case "filled":
      classNames += " px-8 py-2 text-black rounded-lg";
      break
    default:
      break;
  }

  return <button
    onClick={onClick}
    type={type}
    disabled={isSubmitting}
    className={classNames}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10
    }}
  >
    {text} {isSubmitting ? <FaSpinner /> : ""}
  </button>
}

export default Button;