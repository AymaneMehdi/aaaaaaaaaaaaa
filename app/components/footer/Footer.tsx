import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-cyan-500 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className=" text-base font-bold">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className=" text-base font-bold">Customer Service</h3>
            <Link href="#">Content Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Return & Exchanges</Link>
            <Link href="#">Watches</Link>
            <Link href="#">FAQs</Link>
          </FooterList>

          <div className=" w-full  mb-6 md:mb-0 ">
            <h3 className="text-base font-bold mb-2 "> About Us</h3>
            <p className="mb-2">
              At our electronics store, we are dedicated to providing the latest
              and greatest devices and accessories to our customers. With a wide
              selection of phones, TVS, laptops, watches, and accessoriesk
            </p>
            <p>&copy; {new Date().getFullYear()} FeizhouStore. All rights reserved</p>
          </div>
          <FooterList>
            <h3 className=" text-base font-bold mb-2">Follow us</h3>
            <div className=" flex gap-2 ">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
