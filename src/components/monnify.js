import { Monnify } from "monnify-sdk/monnify";
import React, { useEffect } from "react";

function PayWithMonnify() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.monnify.com/plugin/monnify.js";
    script.onload = () => {
      console.log("successful");

      Monnify.initialize({
        amount: 5000,
        currency: "NGN",
        reference: "" + Math.floor(Math.random() * 1000000000 + 1),
        customerName: "AIU",
        customerEmail: "ahmadibrahimusmanmkk@gmail.com",
        apiKey: "MK_TEST_Y1RPE4Q32V",
        contractCode: "4934121693",
        paymentDescription: "Test Pay",
        isTestMode: true,
        metadata: {
          name: "Damilare",
          age: 45,
        },
        paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
        onComplete: function (response) {
          //Implement what happens when transaction is completed.
          console.log(response);
        },
        onClose: function (data) {
          //Implement what should happen when the modal is closed here
          console.log(data);
        },
      });
    };
    script.onerror = () => {
      console.log("error occoured");
    };
    document.head.appendChild(script);
  });

  return <div>Monify SDK</div>;
  // Monnify.initialize({
  //   amount: 5000,
  //   currency: "NGN",
  //   reference: "" + Math.floor(Math.random() * 1000000000 + 1),
  //   customerName: "AIU",
  //   customerEmail: "ahmadibrahimusmanmkk@gmail.com",
  //   apiKey: "MK_TEST_SAF7HR5F3F",
  //   contractCode: "4934121693",
  //   paymentDescription: "Test Pay",
  //   isTestMode: true,
  //   metadata: {
  //     name: "Damilare",
  //     age: 45,
  //   },
  //   paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
  //   onComplete: function (response) {
  //     //Implement what happens when transaction is completed.
  //     console.log(response);
  //   },
  //   onClose: function (data) {
  //     //Implement what should happen when the modal is closed here
  //     console.log(data);
  //   },
  // });
}

export default PayWithMonnify;
