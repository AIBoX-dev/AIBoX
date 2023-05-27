import { stripeDatabase } from "@/hooks/database";
import { stripePayment } from '@/hooks/stripe'

export const paymentHandler = async () => {
    const {
        createCustomerRow,
        updateCustomerRow,
        DeleteCustomerRow,
        createPlanRow,
        createSubscriptionRow,
        CancelSubscriptionArray
    } = stripeDatabase()
    const {
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
    } = stripePayment();
    
    const createCustomer = async (uid: string, email: string) => {
        const customer = await stripeCreateNormalCustomer(uid, email)
        if (!customer) return
        await createCustomerRow(uid, customer.id)
    }
    
    const updateCustomer = async (stripe_id: string, uid: string, email: string, phone: string) => {
        const customer = await stripeUpdateCreatorCustomer(stripe_id, uid, email, phone)
        if (!customer) return
        await updateCustomerRow(stripe_id, uid, email, phone)
    }
    
    const DeleteCustomer = async (stripe_id: string, uid: string) => {
        const customer = await stripeDeleteCustomer(stripe_id)
        if (!customer) return
        await DeleteCustomerRow(uid)
    }
    
    const GetCustomer = (uid: string) => {
        return stripeGetCustomer(uid)
    }

    const createPlan = async (name: string, plan_id: string, price: number, uid: string) => {
        const plan = await stripeCreatePlan(name, plan_id, price, uid)
        if (!plan) return
        await createPlanRow(name, plan_id, price, uid)
    }

    const getPlan = async (id: string) => {
        return stripeGetPlan(id)
    }

    const createSubscription = async (uid: string, plan_id: string) => {
        const subscription = await stripeCreateSubscription(uid, plan_id)
        if (!subscription) return
        await createSubscriptionRow(uid, plan_id)
    }

    const GetSubscription = async (id: string) => {
        return await stripeGetSubscription(id)
    }
    
    const CancelSubscription = async (id: string, uid: string) => {
        const subscription = await stripeCancelSubscription(id)
        if (!subscription) return
        await CancelSubscriptionArray(id, uid)

    }

    const CreateSubscriptionCheckoutSession = async (uid: string, plan_id: string, success_url: string, cancel_url: string) => {
        return await stripeCreateSubscriptionCheckoutSession(uid, plan_id, success_url, cancel_url)
    }

    return {
        createCustomer,
        updateCustomer,
        DeleteCustomer,
        GetCustomer,
        createPlan,
        getPlan,
        createSubscription,
        GetSubscription,
        CancelSubscription
    }
    
    
}
