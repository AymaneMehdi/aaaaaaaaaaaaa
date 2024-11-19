import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheackoutClient from "./CheackoutClient";

const Cheackout = () => {
  return (
    <div className=" p-8">
      <Container>
        <FormWrap>
          <CheackoutClient />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Cheackout;
