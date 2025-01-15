import { db } from "@/configs/db";
import { cartTable, OrderTable } from "@/configs/schema";
import OrderEmail from "@/emails/emails";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { render } from "@react-email/components";

//const resend = new Resend(process.env.RESEND_API_KEY)



export async function POST(req) {
    const { orderDetail, email} = await req.json();

    const totalAmount = orderDetail.reduce(
        (acc, order) => acc + parseFloat(order.price),
        0
    );

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
    const sendEmailResult = await SendEmail(email,orderDetail, totalAmount);
    console.log('sendemailresult', sendEmailResult);
    return NextResponse.json({result,
        message:" Order placed and email sent successfully.",
    });
}

const SendEmail= async (email, orderDetail, totalAmount)=> {
    // const result = await resend.emails.send({
    //     from: 'Ecommerce email <onboarding@resend.dev>',
    //     to: 'delaritaraineer81@gmail.com',
    //     subject: 'Order detail',
    //     react: <OrderEmail orderDetail={orderDetail} totalAmount={totalAmount} />,
    //   });

    //   return result;

    //render email content dynamically
    const emailHtml = await render(
        <OrderEmail orderDetail={orderDetail} totalAmount={totalAmount}/>
    )

    const mailerSend = new MailerSend({
        apiKey : process.env.MAILERSEND_API_KEY || "",
    });

    // const sentFrom = new Sender(
    //     "onboarding@resend.dev",
    //     "raineer"
    // );

    const sentFrom = new Sender(
        "raineer@trial-neqvygmpn1jg0p7w.mlsender.net",
        "raineer"
      );

    const recipients = [new Recipient(email, 'Your Client')];

    const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('Order Receipt')
    .setHtml(emailHtml);

    try {
        const result = await mailerSend.email.send(emailParams);
        return result;
    } catch (error) {
     console.error('Error sending email:', error);
     throw new Error('Failed to send email');
    }
}