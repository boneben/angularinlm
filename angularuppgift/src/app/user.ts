export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthDate: Date;
    billingAddress: string;
    billingPostalNumber: string;
    billingCity: string;
    billingCountry: string;
    shippingAddress: string;
    shippingPostalNumber: string;
    shippingCity: string;
    shippingCountry: string;
}