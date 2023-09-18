import express from "express";

const router = express.Router();


router.post("/paymentMade", async (req, res) => {
    const event = req.body;

    switch (event.type) {
        case "charge.succeeded":
            const charge = event.data.object;
            console.log(charge)
            break;
        //// case "payment_method.attached":
        ////    const payment_method = event.data.object;
        ////   console.log(payment_method)
        //// break;
        //  case "customer.created":
        //     const customer = event.data.object;
        //    console.log(customer)
        //   break;
        ////   case "checkout.session.completed":
        ////      const checkout_completed = event.data.object;
        ////     console.log(checkout_completed)
        ////    break;
        case "customer.updated":
            const customerupdated = event.data.object;
            console.log(customerupdated)
            break;
        ////    case "invoice.created":
        ////       const invoice = event.data.object;
        ////      console.log(invoice)
        ////     break;
        ////  case "invoice.finalized":
        ////      const invoice_f = event.data.object;
        ////     console.log(invoice_f)
        ////    break;
        //  case "customer.subscription.created":
        //     const subscription = event.data.object;
        //    console.log(subscription)
        //   break;
        ////  case "invoice.updated":
        ////     const invoiceU = event.data.object;
        ////    console.log(invoiceU)
        ////   break;
        ////case "invoice.paid":
        ////  const invoiceP = event.data.object;
        ////  console.log(invoiceP)
        ////   break;
        ////  case "invoice.payment_succeeded":
        ////     const payment_succeeded = event.data.object;
        ////    console.log(payment_succeeded)
        ////   break;
        case "customer.subscription.updated":
            const subscriptionU = event.data.object;
            console.log(subscriptionU)
            break;
        ////  case "payment_intent.succeeded":
        ////     const payment_intent = event.data.object;
        ////    console.log(payment_intent)
        ////   break;
        //// case "payment_intent.created":
        ////    const payment_intentC = event.data.object;
        ////   console.log(payment_intentC)
        ////  break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }


    //// Return a response to acknowledge receipt of the event
    res.json({received: true});
});


export default router;





