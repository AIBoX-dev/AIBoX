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

const createPlan = async (name: string, plan_id: string, price: number) => {
    const plan = await stripe.plans.create({
        amount: price,
        currency: "usd",
        interval: "month",
        product: {
            name: name,
        },
        id: plan_id,
    });
    return plan;
}
