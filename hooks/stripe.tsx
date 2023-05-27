import { get } from "http";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
});

export const stripePayment = async ()  => {
    const createNormalCustomer = async (id: string, email: string) => {
        return await stripe.customers.create({
            metadata: {
                user_id: id,
            },
            email: email,
            description: "Normal Customer : " + id,
        });
    };

    const updateCreatorCustomer = async (
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

    const DeleteCustomer = async (stripe_id: string) => {
        return await stripe.customers.del(stripe_id);
    };

    const getCustomer = async (id: string) => {
        return stripe.customers.search({
            query: "metadata['user_id']:" + id,
        });
    };

    const createPlan = async (
        name: string,
        plan_id: string,
        price: number,
        creator_id: string
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
                creator_id: creator_id,
            },
            id: plan_id,
        });
    };

    const getPlan = async (id: string) => {
        return await stripe.plans.retrieve(id);
    };

    const createSubscription = async (customer_id: string, plan_id: string) => {
        return await stripe.subscriptions.create({
            customer: customer_id,
            items: [{ plan: plan_id }],
        });
    };

    const getSubscription = async (id: string) => {
        return await stripe.subscriptions.retrieve(id);
    };

    const cancelSubscription = async (id: string) => {
        return await stripe.subscriptions.del(id);
    };

    const createSubscriptionCheckoutSession = async (
        customer_id: string,
        plan_id: string,
        success_url: string,
        cancel_url: string
        ) => {
        return await stripe.checkout.sessions.create({
            customer: customer_id,
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
        createNormalCustomer,
        updateCreatorCustomer,
        DeleteCustomer,
        getCustomer,
        createPlan,
        getPlan,
        createSubscription,
        getSubscription,
        cancelSubscription,
        createSubscriptionCheckoutSession
    }

}
