"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import {
  CiShoppingBasket,
  CiShoppingCart,
  CiShoppingTag,
} from "react-icons/ci";
const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <div
      className=" relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className=" text-3xl text-[#A6A2A2] hover:text-[#847577] ">
        <CiShoppingCart />
      </div>
      <span className=" absolute top-[-10px] right-[-10px] bg-[#A6A2A2] hover:bg-[#847577] text-white h-6 w-6 rounded-full flex items-center justify-center text-sm ">
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
