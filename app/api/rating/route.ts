import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<void | Response> {
  const currenUser = await getCurrentUser();

  if (!currenUser) {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { comment, rating, product, userId } = body;

    const deliveredOrder = currenUser?.orders.some(
      (order) =>
        order.products.find((item) => item.id === product.id) &&
        order.deliveryStatus === "delivered"
    );

    const userReview = product?.reviews.find((review: Review) => {
      return review.userId === currenUser.id;
    });

    if (userReview || !deliveredOrder) {
      return NextResponse.error();
    }

    const review = await prisma?.review.create({
      data: {
        comment,
        rating,
        productId: product.id,
        userId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}
