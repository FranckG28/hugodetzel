import { Resend } from "resend";

export const getResend = () => {

    const API_KEY = process.env.RESEND_API_KEY;

    if (!API_KEY) {
        throw new Error("RESEND_API_KEY not found");
    }

    return new Resend(API_KEY);

}