import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutwalaForm from "../../components/checkoutForm/CheckoutwalaForm";

const stripePromise = loadStripe(
  "pk_test_51Nvvg7SDBCKvhokhgxywuwpBWYeCS2a3rsAGyht4EIAGdblvJ2P0dvKByW9LZJptKBNDPjEVxaEzLXeBfd7JoNFd00ZoUH99kW"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutwalaForm />
        </Elements>
      )}
  </div>;
};

export default Pay;