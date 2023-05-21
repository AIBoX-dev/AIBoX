import { get } from "http";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
});

const createNormalCustomer = async (id: string, email: string) => {
    const customer = await stripe.customers.create({
        metadata: {
            user_id: id,
        },
        email: email,
        description: "Normal Customer : " + id,
    });

    return customer;
}

const updateCreatorCustomer = async (stripe_id: string,id: string, email: string, phone: string) => {
    const customer = await stripe.customers.update(stripe_id, {
        metadata: {
            user_id: id,
        },
        email: email,
        description: "Creator Customer : " + id,
        phone: phone,
    });

    return customer;
}

const DeleteCustomer = async (stripe_id: string) => {
    const customer = await stripe.customers.del(stripe_id);
    return customer;
}

const getCustomer = async (id: string) => {
    const customer = await stripe.customers.search({
        query: "metadata[\'user_id\']:" + id,
    });
    return customer;
}

const createPlan = async (name: string, plan_id: string, price: number, creator_id: string) => {
    const plan = await stripe.plans.create({
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
    return plan;
}

const getPlan = async (id: string) => {
    const plan = await stripe.plans.retrieve(id);
    return plan;
}

const createSubscription = async (customer_id: string, plan_id: string) => {
    const subscription = await stripe.subscriptions.create({
        customer: customer_id,
        items: [
            { plan: plan_id },
        ],
    });
    return subscription;
}

const getSubscription = async (id: string) => {
    const subscription = await stripe.subscriptions.retrieve(id);
    return subscription;
}

const cancelSubscription = async (id: string) => {
    const subscription = await stripe.subscriptions.del(id);
    return subscription;
}

const createSubscriptionCheckoutSession = async (customer_id: string, plan_id: string, success_url: string, cancel_url: string) => {
    const session = await stripe.checkout.sessions.create({
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
    return session;
}