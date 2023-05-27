import { stripeDatabase } from "@/hooks/database";
import { stripePayment } from '@/hooks/stripe'

export const paymentHandler = async () => {
    const {
        createCustomerRow,
        updateCustomerRow,
        DeleteCustomerRow
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
    
    const DeleteCustomer = async (stripe_id: string) => {
        const customer = await stripeDeleteCustomer(stripe_id)
        if (!customer) return
        await DeleteCustomerRow()
    }
    
    const GetCustomer = (uid: string) => {
        stripeGetCustomer(uid)
    }
    
    const createPlan = async (name: string, plan_id: string, price: number, creator_id: string) => {
        
    }
    
    return {
        createCustomer,
        updateCustomer,
        DeleteCustomer,
        GetCustomer
    }
    
    
}