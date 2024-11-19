import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    // Find the product to get associated reviews
    const product = await prisma?.product.findUnique({
      where: { id: params.id },
      include: {
        reviews: true,
      },
    });

    if (!product) {
      return NextResponse.error();
    }

    // Delete associated reviews
    const deleteReviews = product.reviews.map(async (review) => {
      await prisma?.review.delete({
        where: { id: review.id },
      });
    });

    await Promise.all(deleteReviews);

    // Now, you can delete the product
    const deletedProduct = await prisma?.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product and associated reviews:", error);
    return NextResponse.error();
  } finally {
    await prisma?.$disconnect();
  }
}
