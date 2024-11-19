"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdArrowBack, MdCheckCircle } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  inStock: boolean;
  price: number;
};
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className=" w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handelAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    inStock: product.inStock,
    price: product.price,
  });

  const router = useRouter();

  // console.log(cartProducts);
  // console.log(isProductInCart);

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item: any) => item.id === product.id
      );
      // console.log(existingIndex);

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartProduct.selectedImg]
  );
  // console.log(productRating);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }

    setCartProduct((prev) => {
      // console.log(prev.quantity);

      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }

    setCartProduct((prev) => {
      // console.log(prev.quantity);

      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-12 ">
      <ProductImage
        product={product}
        cartProduct={cartProduct}
        handleColorSelect={handleColorSelect}
      />
      <div className=" flex flex-col gap-1 text-[#847577] text-sm">
        <h2 className=" text-3xl font-medium text-[#847577]">{product.name}</h2>
        <Horizontal />
        <h2 className="text-3xl text-[#847577] font-bold">${product.price}</h2>
        <div className=" flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className=" text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className=" font-bold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className=" font-bold">BRAND:</span> {product.brand}
        </div>
        <div className={product.inStock ? " text-teal-400" : " text-rose-400"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className=" flex gap-1 text-[#847577] items-center mb-1">
              <MdCheckCircle size={20} className=" text-teal-400" />
              <span> Product added to cart</span>
            </p>
            <div className=" max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : !cartProduct.inStock ? (
          <>
            <p className=" flex gap-1 text-[#847577] items-center mb-1">
              <CgUnavailable size={20} className=" text-rose-400" />
              <span> We sorry product out of Stock </span>
            </p>
            <div className=" max-w-[300px]">
              <Button
                icon={MdArrowBack}
                label="Start Shopping"
                outline
                onClick={() => {
                  router.push("/");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            <div className=" max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => handelAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
