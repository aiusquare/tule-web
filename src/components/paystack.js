import { usePaystackPayment } from "react-paystack";

export const payWithPayStack = (req) => {
  const config = {
    reference: new Date().getTime().toString(),
    email: "ahmadibrahimusmanmkk@gmail.com",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_fda6860d25df0e5631d4f2354e5dee58f3dd2f49",
  };
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

// const initializePayment = usePaystackPayment(config);
