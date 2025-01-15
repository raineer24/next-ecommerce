import { db } from "@/configs/db";
import { cartTable, OrderTable } from "@/configs/schema";
import OrderEmail from "@/emails/emails";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

const totalAmount = orderDetail.reduce(
    (acc, order) => acc + parseFloat(order.price),
    0
);

export async function POST(req) {
    const { orderDetail, email} = await req.json();

    let orderList=[];
    orderDetail.forEach((order)=> {
        orderList.push({
            email: email,
            productId: order.productId
        })
    });

    const result = await db.insert(OrderTable).values(orderList);

    //Delete user cart items after order
    const deleteResult = await db.delete(cartTable).where(eq(cartTable.email, email));

    //Send Email
    const sendEmailResult = await SendEmail(email, orderDetail, totalAmount);
    console.log('sendemailresult', sendEmailResult);
    return NextResponse.json({
        result,
        message: 'Order placed and email sent successfully',
    });
}

const SendEmail= async (orderDetail)=> {
    const result = await resend.emails.send({
        from: 'Ecommerce email <onboarding@resend.dev>',
        to: 'delaritaraineer81@gmail.com',
        subject: 'Order detail',
        react: <OrderEmail orderDetail={orderDetail} />,
      });

      return result;
}