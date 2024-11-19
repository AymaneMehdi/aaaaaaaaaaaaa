import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncatetext } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handelRemoveProductFromCart,
    handelCartQtyIncrease,
    handelCartQtyDecrease,
  } = useCart();
  return (
    <div className=" grid grid-cols-5 text-xs md:text-sm gap-4 border-slate-200 py-4 items-center ">
      <div className=" col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className=" relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              unoptimized
              className=" object-contain"
            />
          </div>
        </Link>
        <div className=" flex flex-col justify-between text-cyan-500">
          <Link href={`/product/${item.id}`}>{truncatetext(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className=" text-[#A6A2A2] underline"
              onClick={() => handelRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className=" justify-self-center text-cyan-500">
        {formatPrice(item.price)}
      </div>
      <div className=" justify-self-center text-cyan-500">
        {" "}
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {
            handelCartQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handelCartQtyDecrease(item);
          }}
        />
      </div>
      <div className=" justify-self-end font-semibold text-cyan-500">
        {item.price * item.quantity}
      </div>
    </div>
  );
};

export default ItemContent;
