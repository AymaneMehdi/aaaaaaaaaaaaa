interface HeadingProps {
  titel: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ titel, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h1 className=" font-bold text-2xl text-[#847577]">{titel}</h1>
    </div>
  );
};

export default Heading;
