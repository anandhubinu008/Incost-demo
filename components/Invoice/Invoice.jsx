"use client";

import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";
import Image from "next/image";


const Invoice = ({ invoiceList = [], subTotal, gst, gstAmount, grandTotal, draftRow, customer, estimate }) => {

  const fullList = invoiceList.filter(item => item.totalRate > 0);

  if ( draftRow && draftRow.workMaterial && draftRow.totalRate > 0 ) {
    fullList.push(draftRow);
  }

  return (
    <div className="p-6 border border-black text-sm text-black bg-white overflow-auto">
      <div className="flex justify-between border-b-2 border-black pb-4 mb-4 bg-white ">
        <div>
          <p>
            <b>To,</b>
            <br />
           {customer.name} <br />
            Addrress: {customer.address} <br />
            Mob: {customer.phone} <br />
            e-mail ID: {customer.email}
          </p>
        </div>
        <div className="text-right">
          <img
            src="/my-logo.png"
            alt="Logo"
            className="ml-auto mb-2 w-15"
          />
          <p>
            <b>Squarewood India Ventures PVT.LTD</b> <br />
            TC No: 51/1165, Arackal, Armada P.O<br />
            Poojapura  Trivandrum. 695032 <br /><br />
            Mob: +91 6282276583<br />
            Whatsapp: +91 9747211654 <br />
            Email: contact@squarewoodin.com<br />
            www.squarewoodin.com
          </p>
        </div>
      </div>
      <div className="mb-4">
        <p>
          <b>Date:</b> {new Date().toLocaleDateString("en-GB")} <br />
          <b>Estimate No:</b> {estimate.estimateNumber} <br />
          <b>Sales Team Leader:</b> {estimate.name}<br />
          <b>Mob:</b> {estimate.mob} <br />
        </p>
      </div>
      {/* ITEMS TABLE */}
      <table className="w-full border-collapse border border-black text-center text-xs">
        <thead>
          <tr className="bg-red-700 text-white">
            <th className="border border-black p-2 w-5">SR.NO</th>
            <th className="border border-black p-2  w-30">WORK</th>
            <th className="border border-black p-2 w-20">LENGTH (cm)</th>
            <th className="border border-black p-2 w-20">HEIGHT (cm)</th>
            <th className="border border-black p-2 w-20">SQ FEET</th>
            <th className="border border-black p-2 w-20">QUANTITY</th>
            <th className="border border-black p-2 w-20">UNIT PRICE</th>
            <th className="border border-black p-2 w-24">AMOUNT</th>
          </tr>
        </thead>

        <tbody>
          {fullList.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2">
                {index + 1}
              </td>

              <td className="border border-black p-2 ">
                <div className="flex flex-col">
                  <span>
                    {item.workCategory?.category || item.workCategory}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.workMaterial?.meterial || item.workMaterial}
                  </span>
                </div>
              </td>

              <td className="border border-black p-2">
                {item.length || "-"}
              </td>

              <td className="border border-black p-2">
                {item.height || "-"}
              </td>

              <td className="border border-black p-2">
                {item.sqFeet || "-"}
              </td>

              <td className="border border-black p-2">
                {item.count || "-"}
              </td>

              <td className="border border-black p-2 text-right">
                {item.ratePerSqFeet}
              </td>

              <td className="border border-black p-2 text-right">
                {item.totalRate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* TOTALS TABLE */}
      <table className="ml-auto mt-4 border-collapse text-xs">
        <tbody>
          <tr className="border-t border-black">
            <td className="p-2 text-right font-bold w-40">
              Subtotal
            </td>
            <td className="p-2 text-right font-bold w-32">
              {subTotal}
            </td>
          </tr>

          <tr className="border-b border-black">
            <td className="p-2 text-right font-bold">
              GST ({gst}%)
            </td>
            <td className="p-2 text-right font-bold">
              {gstAmount}
            </td>
          </tr>

          <tr className="border-b-2 border-black">
            <td className="p-2 text-right font-bold text-sm">
              Total
            </td>
            <td className="p-2 text-right font-bold text-sm">
              {Number(grandTotal).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default Invoice;

