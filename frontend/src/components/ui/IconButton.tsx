import { ReactNode } from "react";

interface IconButtonProps {
  onClick?: (e: any) => void;
  className?: string;
  variant?: string;
  isSubmitting?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  icon?: ReactNode;
}

const IconButton = ({
  icon,
  onClick,
  className,
  variant,
  isSubmitting,
  type,
}: IconButtonProps) => {
  let classNames = className;
  switch (variant) {
    case "outlined":
      classNames += " px-3 py-2 border border-2 rounded-lg";
      break;
    case "filled":
      classNames += " px-3 py-2 text-black rounded-lg";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isSubmitting}
      className={classNames}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {icon}
    </button>
  );
};

export default IconButton;
