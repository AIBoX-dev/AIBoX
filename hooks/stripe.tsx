import { get } from "http";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
});

export const stripePayment = ()  => {
    const stripeCreateNormalCustomer = async (id: string, email: string) => {

        return await stripe.customers.create({
            metadata: {
                user_id: id,
            },
            email: email,
            description: "Normal Customer : " + id,
        });
    };

    const stripeUpdateCreatorCustomer = async (
        stripe_id: string,
        id: string,
        email: string,
        phone: string
    ) => {
        return await stripe.customers.update(stripe_id, {
            metadata: {
                user_id: id,
            },
            email: email,
            description: "Creator Customer : " + id,
            phone: phone,
        });
    };

    const stripeDeleteCustomer = async (stripe_id: string) => {
        return await stripe.customers.del(stripe_id);
    };

    const stripeGetCustomer = async (id: string) => {
        return stripe.customers.search({
            query: "metadata['user_id']:" + id,
        });
    };

    const stripeCreatePlan = async (
        name: string,
        plan_id: string,
        price: number,
        uid: string
    ) => {
        return await stripe.plans.create({
            amount: price,
            currency: "jpy",
            interval: "month",
            product: {
                name: name,
            },
            metadata: {
                plan_id: plan_id,
                user_id: uid,
            },
            id: plan_id,
        });
    };

    const stripeGetPlan = async (id: string) => {
        return await stripe.plans.retrieve(id);
    };

    const stripeCreateSubscription = async (uid: string, plan_id: string) => {
        return await stripe.subscriptions.create({
            customer: uid,
            items: [{ plan: plan_id }],
        });
    };

    const stripeGetSubscription = async (id: string) => {
        return await stripe.subscriptions.retrieve(id);
    };

    const stripeCancelSubscription = async (id: string) => {
        return await stripe.subscriptions.del(id);
    };

    const stripeCreateSubscriptionCheckoutSession = async (
        uid: string,
        plan_id: string,
        success_url: string,
        cancel_url: string
    ) => {
        return await stripe.checkout.sessions.create({
            customer: uid,
            line_items: [
                {
                    price: plan_id,
                    quantity: 1,
                },
            ],
            success_url: success_url,
            cancel_url: cancel_url,
        });
    };
    

    return {
        stripeCreateNormalCustomer,
        stripeUpdateCreatorCustomer,
        stripeDeleteCustomer,
        stripeGetCustomer,
        stripeCreatePlan,
        stripeGetPlan,
        stripeCreateSubscription,
        stripeGetSubscription,
        stripeCancelSubscription,
        stripeCreateSubscriptionCheckoutSession
    }

}
