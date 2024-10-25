
import React, { useState, useEffect } from "react";

const CybersourceCheckout = () => {
  const [formData, setFormData] = useState({

    //     access_key: "4e8523e0c7f83076b52cffcbbe39ecbf",
//     profile_id: "40C5FB8D-5675-4BC7-AD56-2F63B394F7A4",
    access_key: "4e8523e0c7f83076b52cffcbbe39ecbf",
    profile_id: "40C5FB8D-5675-4BC7-AD56-2F63B394F7A4",
    transaction_uuid: generateUUID(),
    currency: "USD",
    locale: "en",
    amount: "100.00",
    signed_date_time: new Date().toISOString(),
    reference_number: "ORDER_12345",
    transaction_type: "sale",
    payment_method: "card",

    // Billing information (signed fields)
    bill_to_forename: "John",
    bill_to_surname: "Doe",
    bill_to_email: "johndoe@example.com",
    bill_to_phone: "1234567890",
    bill_to_address_line1: "123 Main St",
    bill_to_address_city: "San Francisco",
    bill_to_address_state: "CA",
    bill_to_address_country: "US",
    bill_to_address_postal_code: "94105",

    // Card details (unsigned fields)
    // card_type: "Visa", // Example card type
    // card_number: "4111111111111111", // Example card number
    // card_expiration: "12/25", // Example expiration
    // card_security_code: "123", // Example CVV

    // Signed and unsigned fields
    signed_field_names:
      "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code",
    unsigned_field_names: "card_type,card_number,card_expiration",
    signature: ""
  });

  function generateUUID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  useEffect(() => {
    const fetchSignature = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getSignature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (data.signature) {
          setFormData((prev) => ({ ...prev, signature: data.signature }));
        } else {
          console.error("Signature not returned from server:", data);
        }
      } catch (error) {
        console.error("Error fetching signature:", error);
      }
    };

    fetchSignature();
  }, [formData.signed_date_time]);

  return (
    <form
      method="POST"
      action="https://testsecureacceptance.cybersource.com/pay"
      id="cybersourceForm"
    >
      {Object.keys(formData).map((field) => (
        <input key={field} type="hidden" name={field} value={formData[field]} />
      ))}
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default CybersourceCheckout;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
