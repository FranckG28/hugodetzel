import { QuotationOutput } from "types/quotation-output";

type Props = {
    name: string;
    email: string;
    message: string;
    quotation: QuotationOutput;
}

export const QuotationEmailTemplate = ({ name, email, message, quotation }: Props) => {

    return (
        <div>
            <h1>Quotation request</h1>
            <p>From: {name} ({email})</p>
            <p>Message: {message}</p>
            <h2>Quotation</h2>
            <p>Total: {quotation.total}</p>
            <p>Titles: {quotation.titles}</p>
            <p>Tracks: {quotation.tracks}</p>
            <p>Minutes: {quotation.minutes}</p>
            <p>Options: {quotation.options.join(", ")}</p>
        </div>
    )

}