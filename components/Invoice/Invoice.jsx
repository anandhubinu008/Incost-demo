"use client";

import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";
import Image from "next/image";


const Invoice = ({ invoiceList = [], grandTotal, gst, draftRow, customer, estimate }) => {

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
     <table className="w-full border-collapse border border-black text-center text-xs">
      <thead>
        <tr className="bg-red-700 text-white">
          <th className="border border-black p-2">SR.NO</th>
          <th className="border border-black p-2">WORK</th>
          <th className="border border-black p-2">LENGTH (cm)</th>
          <th className="border border-black p-2">HEIGHT (cm)</th>
          <th className="border border-black p-2">SQ FEET</th>
          <th className="border border-black p-2">RATE PER SQ FEET</th>
          <th className="border border-black p-2">TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {fullList.map((item, index) => (
          <tr key={index} className={index === invoiceList.length ? "bg-yellow-50" : ""}>
            <td className="border border-black p-2">{index + 1}</td>
            <td className="border border-black p-2">
              <div className="flex flex-col">
                <span className="mb-2">{item.workCategory?.category || item.workCategory}</span>
                <span className="text-xs text-gray-500">{item.workMaterial?.meterial || item.workMaterial}</span>
              </div>
            </td>
            <td className="border border-black p-2">{item.length}</td>
            <td className="border border-black p-2">{item.height}</td>
            <td className="border border-black p-2">{item.sqFeet}</td>
            <td className="border border-black p-2">{item.ratePerSqFeet}</td>
            <td className="border border-black p-2">{item.totalRate}</td>
          </tr>
        ))}
        
          <tr>
            <td colSpan="6" className="border border-black p-2 text-right font-bold">
              GST(%)
            </td>
            <td className="border border-black p-2 font-bold">
              {gst}
            </td>
          </tr>

          <tr>
            <td colSpan="6" className="border border-black p-2 text-right font-bold">
              Grand Total
            </td>
            <td className="border border-black p-2 font-bold">
                {Number(grandTotal).toFixed(2)}
            </td>
          </tr>
        </tbody>
    </table>
    </div>
  );
};

export default Invoice;

