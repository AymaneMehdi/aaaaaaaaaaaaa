import prisma from "@/libs/prismadb";
import moment from "moment";

export default async function getGraphData() {
  try {
    //get the start andend datees for the data range(7days ago to today)
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    // Example: Log the start and end dates
    console.log("Start Date:", startDate.format("YYYY-MM-DD"));
    console.log("End Date:", endDate.format("YYYY-MM-DD"));
    //query the database to get order data grouped by createdDate
    const result = await prisma.order.groupBy({
      by: ["createdDate"],
      where: {
        createdDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
      },
      _sum: {
        amount: true,
      },
    });

    //Initialize an object to aggregate the data by day
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    //Create a clone of start date to iterate over each day
    const currentDate = startDate.clone();

    //iterate over each day in the date range
    while (currentDate <= endDate) {
      //format the day as a string (e.g ,"monday")
      const day = currentDate.format("dddd");

      //initialize the aggergated data for the day with the day , data ,and totalAmount
      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY,MM,DD"),
        totalAmount: 0,
      };

      //move to the next
      currentDate.add(1, "day");
    }

    //calculate the total amount for each day by summing the order amounts
    result.forEach((entry) => {
      const day = moment(entry.createdDate).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    //convert the aggregotedData object to an arry and ort it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
