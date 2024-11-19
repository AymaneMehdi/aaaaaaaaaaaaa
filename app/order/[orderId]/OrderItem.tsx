"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncatetext } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className=" grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[10px] border-slate-200 py-4 items-center">
      <div className=" col-span-2 justify-self-start flex gap-2 md:gap-4  text-[#847577]">
        <div className=" relative w-[70px] aspect-square ">
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            fill
            unoptimized
            className=" object-contain"
          />
        </div>
        <div className="flex flex-col gap-1 text-[#847577]">
          <div>{truncatetext(item.name)}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className=" justify-self-center text-[#847577]">
        {formatPrice(item.price)}
      </div>
      <div className=" justify-self-center text-[#847577]">{item.quantity}</div>
      <div className=" justify-self-end text-[#847577]">
        {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
