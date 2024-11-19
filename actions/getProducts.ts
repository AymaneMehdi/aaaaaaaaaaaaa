import prisma from "@/libs/prismadb";

export interface IproductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IproductParams) {
  try {
    const { category, searchTerm } = params;

    const query: any = {};
    let searchString = "";

    if (searchTerm) {
      searchString = searchTerm.toLowerCase(); // Convert to lowercase for case-insensitive search
      const isCompleteWord = /\b\w+\b/.test(searchString); // Check if searchTerm is a complete word

      if (isCompleteWord && searchString.length >= 2) {
        query.OR = [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ];
      }
    }

    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: query,
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
