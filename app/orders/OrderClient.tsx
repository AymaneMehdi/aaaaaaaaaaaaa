/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
interface OrdersClientProps {
  orders: ExtendedOrder[];
}
type ExtendedOrder = Order & {
  user: User;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  let rows: any = [];
  if (orders) {
    rows = orders.map((orders) => {
      return {
        id: orders.id,
        customer: orders.user.name,
        amount: formatPrice(orders.amount / 100),
        paymentStatus: orders.status,
        date: moment(orders.createdDate).fromNow(),
        deliverStatus: orders.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 220 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className=" font-bold text-[#463f3a]">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="Pending"
                icon={MdAccessTimeFilled}
                bg=" bg-slate-200"
                color=" text-slate-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="complete"
                icon={MdDone}
                bg=" bg-green-200"
                color=" text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliverStatus",
      headerName: "Deliver Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliverStatus === "pending" ? (
              <Status
                text="Pending"
                icon={MdAccessTimeFilled}
                bg=" bg-slate-200"
                color=" text-slate-700"
              />
            ) : params.row.deliverStatus === "dispatched" ? (
              <Status
                text="Dispatched"
                icon={MdDeliveryDining}
                bg=" bg-purple-200"
                color=" text-purple-700"
              />
            ) : params.row.deliverStatus === "delivered" ? (
              <Status
                text="Delivered"
                icon={MdDeliveryDining}
                bg=" bg-green-200"
                color=" text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className=" flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className=" max-w-[1150px] m-auto text-xl">
      <div className=" mb-4 mt-8">
        <Heading titel=" Orders" center />
      </div>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[0, 9]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrdersClient;
