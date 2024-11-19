"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className=" max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading titel="Order Details" />
      </div>
      <div className=" text-[#463f3a]">
        Order ID : <span className=" text-[#847577]">{order.id}</span>{" "}
      </div>
      <div className=" text-[#463f3a]">
        {" "}
        Total Amount:{" "}
        <span className="font-bold text-[#847577]">
          {formatPrice(order.amount)}
        </span>
      </div>
      <div className=" flex gap-2 items-center">
        <div className=" text-[#463f3a]">Payment Status:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="Completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className=" flex gap-2 items-center">
        <div className=" text-[#463f3a]">Delever Status:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="Dispatched"
              icon={MdDone}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="Delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className=" text-[#463f3a]">
        Date:{" "}
        <span className=" text-[#847577]">
          {moment(order.createdDate).fromNow()}
        </span>{" "}
      </div>
      <div>
        <h2 className=" font-semibold mt-4 mb-2 text-[#847577] ">
          Product order
        </h2>
        <div className=" grid grid-cols-5 text-xs gap-4 pb-2 items-center text-[#463f3a] ">
          <div className=" col-span-2 justify-self-start">PRODUCT</div>
          <div className="  justify-self-center">PRICE</div>
          <div className="  justify-self-center">QTY</div>
          <div className="  justify-self-end">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
    </div>
  );
};

export default OrderDetails;
