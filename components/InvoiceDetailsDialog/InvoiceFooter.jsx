export const InvoiceFooter = ({ footerData }) => (
  <div className="invoice-footer leading-snug mt-6">
    <h6 className="font-bold mb-1">MATERIAL SPECIFICATION</h6>
    <table className="w-full border mb-3">
      <thead>
        <tr className="border-b">
          <th className="text-left p-1">Item</th>
          <th className="text-left p-1">Specification</th>
          <th className="text-left p-1">Brand</th>
        </tr>
      </thead>
      <tbody>
        {footerData.materialSpecs.map((row, i) => (
          <tr key={i} className="border-b">
            <td className="p-1">{row.item}</td>
            <td className="p-1">{row.spec}</td>
            <td className="p-1">{row.brand}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h6 className="font-bold mb-1">ITEMS NOT INCLUDED IN THE ESTIMATE</h6>
    <ul className="list-disc pl-4 mb-3">
      {footerData.itemsNotIncluded.map((t, i) => <li key={i}>{t}</li>)}
    </ul>

    <h6 className="font-bold mb-1">SERVICES</h6>
    <ul className="list-disc pl-4 mb-3">
      {footerData.services.map((t, i) => <li key={i}>{t}</li>)}
    </ul>

    <h6 className="font-bold mb-1">TERMS AND CONDITIONS</h6>
    <ul className="list-disc pl-4 mb-3">
      {footerData.termsAndConditions.map((t, i) => <li key={i}>{t}</li>)}
    </ul>

    <h6 className="font-bold mb-1">WHY CHOOSE SQUAREWOOD INTERIORS?</h6>
    <ul className="list-disc pl-4 mb-3">
      {footerData.whyChooseUs.map((t, i) => <li key={i}>{t}</li>)}
    </ul>

    <h6 className="font-bold mb-1">BANK DETAILS</h6>
    <table className="w-full border">
      <tbody>
        <tr><td className="font-semibold p-1">Banking Name</td><td className="p-1">{footerData.bankDetails.bankingName}</td></tr>
        <tr><td className="font-semibold p-1">Bank Name</td><td className="p-1">{footerData.bankDetails.bankName}</td></tr>
        <tr><td className="font-semibold p-1">Branch Name</td><td className="p-1">{footerData.bankDetails.branchName}</td></tr>
        <tr><td className="font-semibold p-1">Account No.</td><td className="p-1">{footerData.bankDetails.accountNo}</td></tr>
        <tr><td className="font-semibold p-1">IFSC</td><td className="p-1">{footerData.bankDetails.ifsc}</td></tr>
      </tbody>
    </table>
  </div>
);

