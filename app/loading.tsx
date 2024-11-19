import Container from "./components/Container";

const Loading = () => {
  return (
    <Container>
      <div className="flex gap-2 items-center justify-center h-screen  ">
        <div className="w-5 h-5 rounded-full animate-pulse bg-cyan-500"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-cyan-500"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-cyan-500"></div>
      </div>
    </Container>
  );
};

export default Loading;
