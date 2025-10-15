"use client";

import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";


const Invoice = ({ invoiceList = [], grandTotal = 0, draftRow }) => {

  const fullList = [...invoiceList];

  if (
    draftRow &&
    draftRow.workMaterial &&
    draftRow.totalRate !== null &&
    draftRow.totalRate !== undefined
  ) {
    fullList.push(draftRow);
  }

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
          <th className="border border-black p-2">SR.NO</th>
          <th className="border border-black p-2">WORK</th>
          <th className="border border-black p-2">MATERIAL</th>
          <th className="border border-black p-2">LENGTH</th>
          <th className="border border-black p-2">WIDTH</th>
          <th className="border border-black p-2">SQ FEET</th>
          <th className="border border-black p-2">RATE PER SQ FEET</th>
          <th className="border border-black p-2">GST</th>
          <th className="border border-black p-2">TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {fullList.map((item, index) => (
          <tr key={index} className={index === invoiceList.length ? "bg-yellow-50" : ""}>
            <td className="border border-black p-2">{index + 1}</td>
            <td className="border border-black p-2">
              <div className="flex flex-col">
                <span>{item.workCategory?.category || item.workCategory}</span>
                <span className="text-xs text-gray-500">
                  { item.workCategory?.note || item.note || 'No note available'}
                </span>
              </div>
            </td>
            <td className="border border-black p-2">{item.workMaterial?.meterial || item.workMaterial}</td>
            <td className="border border-black p-2">{item.length}</td>
            <td className="border border-black p-2">{item.width}</td>
            <td className="border border-black p-2">{item.sqFeet}</td>
            <td className="border border-black p-2">{item.ratePerSqFeet}</td>
            <td className="border border-black p-2">{item.gst}%</td>
            <td className="border border-black p-2">{item.totalRate}</td>
          </tr>
        ))}

          <tr>
            <td colSpan="8" className="border border-black p-2 text-right font-bold">
              Grand Total
            </td>
            <td className="border border-black p-2 font-bold">
              {fullList.reduce((sum, row) => sum + (row.totalRate || 0), 0).toFixed(2)}
            </td>
          </tr>
        </tbody>
    </table>

      {/* <Button onClick={handlePrint}>Print</Button> */}
    </div>
  );
};

export default Invoice;

