"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import React from "react";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handelClearCart, cartTotalAmount } = useCart();

  // console.log(cartProducts);

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className=" flex flex-col items-center text-cyan-500">
        <div className=" text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className=" text-[#A6A2A2] flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading titel="Shopping Cart" center />
      <div className=" grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8 text-cyan-500">
        <div className=" col-span-2 justify-self-center">PRODUCT</div>
        <div className=" justify-self-center">PRICE</div>
        <div className=" justify-self-center">QUANTITY</div>
        <div className=" justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item: any) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className=" border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className=" w-[100px] text-[13px] font-bold  ">
          <Button
            label="Clear Cart"
            onClick={() => {
              handelClearCart();
            }}
            small
            outline
            custom="hover:bg-cyan-500 hover:text-white"
          />
        </div>
        <div className=" text-sm flex flex-col gap-1 items-start">
          <div className=" flex justify-between w-full text-base font-semibold text-cyan-500">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)} </span>
          </div>

          <p className=" text-cyan-500">
            Taxes and shipping calculate at checkout
          </p>
          <Button
            label={currentUser ? "Cheackout" : "login To Cheackout"}
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          />
          <Link
            href={"/"}
            className=" text-cyan-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
