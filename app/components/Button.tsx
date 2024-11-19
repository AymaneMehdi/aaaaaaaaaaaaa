"use client";

import { IconBase, IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabeld?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabeld,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabeld}
      className={` disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-[#847577] flex justify-center text-center gap-2 
  ${outline ? " bg-[#ffffff]" : " bg-[#847577]"}
  ${outline ? "text-[#847577] " : " text-white"}
  ${small ? " py-1 px-2 border-[1px] " : " py-3 px-4 border-2"}
  ${custom ? custom : ""}

  `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
