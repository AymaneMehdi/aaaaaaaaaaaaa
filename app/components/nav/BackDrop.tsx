interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = () => {
  return (
    <div className=" z-20 bg-[#CFD2CD] opacity-50 w-screen h-full fixed top-0 left-0"></div>
  );
};

export default BackDrop;
