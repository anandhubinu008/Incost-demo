"use client";

import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";


const Invoice = (cart) => {

useEffect(() => {
  console.log(cart)
, cart})

  return (
    <div className="p-6 border border-black text-sm text-black bg-white overflow-auto">
      <div className="flex justify-between border-b-2 border-black pb-4 mb-4 bg-white ">
        <div>
          <p>
            <b>To,</b>
            <br />
            Mr. SHEHIN SALAM <br />
            ADDRESS: TRIVANDRUM <br />
            MOB: +9895844765 <br />
            E-MAIL ID :
          </p>
        </div>
        <div className="text-right">
          <img
            src="https://via.placeholder.com/120x60?text=LOGO"
            alt="Logo"
            className="ml-auto mb-2"
          />
          <p>
            <b>D2R INTERIORS</b> <br />
            20/473A, Veluthadath Building <br />
            Cochin - 682021 <br />
            www.d2rinteriors.com
          </p>
        </div>
      </div>
      <div className="mb-4">
        <p>
          <b>Estimate No:</b> D2R.23673 <br />
          <b>Date:</b> 08-01-2025 <br />
          <b>Sales Team Leader:</b> REJOY ANTONY C <br />
          <b>MOB:</b> +91 75949 01999
        </p>
      </div>
      <table className="w-full border-collapse border border-black text-center text-xs">
        <thead>
          <tr className="bg-red-700 text-white">
            <th className="border border-black p-2">S.NO</th>
            <th className="border border-black p-2">DESCRIPTION OF ITEM</th>
            <th className="border border-black p-2">UNIT</th>
            <th className="border border-black p-2">QTY</th>
            <th className="border border-black p-2">MRP</th>
            <th className="border border-black p-2">AFTER DISCOUNT</th>
            <th className="border border-black p-2">TOTAL</th>
          </tr>
        </thead>
        {/* {cart && cart.length > 0  && cart.map((item,index) => ( 
        <tbody key={index}>
        
          <tr>
            <td className="border border-black p-2">1</td>
            <td
              colSpan={6}
              className="border border-black bg-gray-200 font-bold text-left p-2"
            >
             {item.category}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2">a</td>
            <td className="border border-black text-left p-2">
             {item.description}
            </td>
            <td className="border border-black p-2"></td>
            <td className="border border-black p-2"></td>
            <td className="border border-black p-2"></td>
            <td className="border border-black p-2"></td>
            <td className="border border-black p-2"></td>
          </tr>
          <tr>
            <td className="border border-black p-2"></td>
            <td className="border border-black text-left p-2">
            {item.work}
            </td>
            <td className="border border-black p-2">Sqft</td>
            <td className="border border-black p-2">41</td>
            <td className="border border-black p-2">106307</td>
            <td className="border border-black p-2">74415</td>
            <td className="border border-black p-2"></td>
          </tr>
        </tbody>
        ))} */}
        {cart?.cart && cart.cart.length > 0 && cart.cart.map((item, index) => (
  <tbody key={index}>
    <tr>
            <td colSpan={7} className="bg-blue-200 font-bold text-left p-2">
             {item.category}
            </td>
          </tr>
    <tr>
      <td className="border border-black p-2">1</td>
      <td colSpan={6} className="border border-black bg-gray-200 font-bold text-left p-2">
        {item.work} ( Material : { item.material}) 
      </td>
    </tr>
    <tr>
      <td className="border border-black p-2"></td>
      <td className="border border-black text-left p-2">
        {item.description}
      </td>
      <td className="border border-black p-2">Sqft({item.sqft})</td>
      <td className="border border-black p-2">{item.quantity}</td>
      <td className="border border-black p-2">{item.price}</td>
      <td className="border border-black p-2"> {item.price - (item.price * 0.1)}</td>
      <td className="border border-black p-2">₹{(item.quantity * (item.price - item.price * 0.1)).toFixed(2)}</td>
    </tr>
  </tbody>
))}

      </table>
      {/* <Button onClick={handlePrint}>Print</Button> */}
    </div>
  );
};

export default Invoice;
