"use client"

import AppSidebar from '@/components/AppSidebar/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { Children, useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown, } from "lucide-react";
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReactToPrint } from 'react-to-print';
import Invoice from '@/components/Invoice/Invoice';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

const interiorWorks = [
  { id: 1, category: "Kitchen" },
  { id: 2, category: "Work area" },
  { id: 3, category: "Living" },
  { id: 4, category: "Dining" },
  { id: 5, category: "Bedroom" },
  { id: 6, category: "Furniture" },
  { id: 7, category: "Bathroom" },
  { id: 8, category: "Ceiling work" },
  { id: 9, category: "Accessories" },
];

const page = () => {

  const pdfRef = useRef(null);    
  const handlePrint = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `Invoice`,
    onAfterPrint: () => console.log('Printing completed'),
  });

   
  const [sqft, setSqft] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [budget, setBudget] = useState("");

  const [showPdf, setShowPdf] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const floorObj = interiorWorks.find((f) => f.floor === selectedFloor);
  const categoryObj = floorObj?.categories.find((c) => c.name === selectedCategory);
  const workObj = categoryObj?.works.find((w) => w.name === selectedWork);

  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const generateEstimateNo = () => {
    const prefix = "D2R.";
    const randomNum = Math.floor(10000 + Math.random() * 90000); 
    return prefix + randomNum;
  };
  const [estimateNo, setEstimateNo] = useState(generateEstimateNo()); 
  const [salesLeader, setSalesLeader] = useState("REJOY ANTONY C");
  const [mobile, setMobile] = useState("+91 6282276583");

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [workCategory, setWorkCategory] = useState(null);
  const [workMaterial, setWorkMaterial] = useState(null);
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [sqFeet, setSqFeet] = useState("");
  const [count, setCount] = useState("");
  const [ratePerSqFeet, setRatePerSqFeet] = useState("");
  const [gst, setGST] = useState(18);
  const [subTotal, setSubTotal] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [totalRate, setTotalRate] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);

  const [invoiceList, setInvoiceList] = useState([]);

  const isAccessory = selectedCategory?.category === "Accessories";

  const reset = () => {
    setSelectedCategory("");
    setWorkMaterial("");
    setLength("");
    setHeight("");
    setSqFeet("");
    setCount("");
    setRatePerSqFeet("");
    setTotalRate("");
  };

  const addRow = () => {
    if (!selectedCategory || !ratePerSqFeet || !totalRate) return;

    if (isAccessory && !count) return;
    if (!isAccessory && (!length || !height)) return;

    const newRow = {
      workCategory: selectedCategory,
      workMaterial,
      count: isAccessory ? count : null,
      length: isAccessory ? null : length,
      height: isAccessory ? null : height,
      sqFeet: isAccessory ? null : sqFeet,
      ratePerSqFeet,
      totalRate,
    };

    setInvoiceList(prev => [...prev, newRow]);
    reset();
  };


  const updateRow = (index, field, value) => {
    setInvoiceList(prev =>
      prev.map((row, i) => {
        if (i !== index) return row;

        const updatedRow = { ...row, [field]: value };
        const isAccessoryRow = updatedRow.workCategory?.category === "Accessories";

        let total = 0;

        if (isAccessoryRow) {
          // Accessories
          const qty = parseFloat(updatedRow.count) || 0;
          const rate = parseFloat(updatedRow.ratePerSqFeet) || 0;

          total = qty * rate;

          updatedRow.sqFeet = null;
          updatedRow.length = null;
          updatedRow.height = null;
        } else {
          // Normal works
          const L = (parseFloat(updatedRow.length) || 0) / 30.48;
          const H = (parseFloat(updatedRow.height) || 0) / 30.48;
          const rate = parseFloat(updatedRow.ratePerSqFeet) || 0;

          const area = L * H;
          total = area * rate;

          updatedRow.sqFeet = area.toFixed(2);
        }

        updatedRow.totalRate = total.toFixed(2);
        return updatedRow;
      })
    );
  };


  const handleCategoryChange = (id) => {
    const cat = interiorWorks.find((c) => c.id === Number(id));
    setSelectedCategory(cat);
    setWorkCategory(cat?.category || "");
  };


  useEffect(() => {
    const rowsSubtotal = invoiceList.reduce((sum, row) => {
      return sum + (parseFloat(row.totalRate) || 0);
    }, 0);

    let rowAmount = 0;
    let area = 0;

    if (isAccessory) {
      // Accessories calculation
      const qty = parseFloat(count) || 0;
      const rate = parseFloat(ratePerSqFeet) || 0;

      rowAmount = qty * rate;
    } else {
      // sq ft calculation
      const L = (parseFloat(length) || 0) / 30.48;
      const H = (parseFloat(height) || 0) / 30.48;
      const rate = parseFloat(ratePerSqFeet) || 0;

      area = L * H;
      rowAmount = area * rate;

      setSqFeet(area.toFixed(2));
    }

    setTotalRate(rowAmount.toFixed(2));

    const currentSubtotal = rowsSubtotal + rowAmount;
    const calculatedGst = (currentSubtotal * gst) / 100;

    setSubTotal(currentSubtotal.toFixed(2));
    setGstAmount(calculatedGst.toFixed(2));
    setGrandTotal((currentSubtotal + calculatedGst).toFixed(2));

  }, [length, height, count, ratePerSqFeet, invoiceList, gst, gstAmount, isAccessory]);


  const handleLengthChange = (len) =>{
    setLength(len);
  };

  const handleHeightChange = (wd) =>{
    setHeight(wd);
  }

  const handleCountChange = (qty) =>{
    setCount(qty);
  }

  const handleGSTChange = (val) =>{
    setGST(val);
  }

  const isFormValid = () => {
    return (
      selectedCategory &&
      length &&
      height &&
      sqFeet &&
      ratePerSqFeet &&
      totalRate &&
      grandTotal
    );
  };

  const handleInvoiceOpen = () => {
    if (customerName && customerPhone && estimateNo && salesLeader &&grandTotal != 0) {
      setShowPdf(true);
    } else {
      alert("Please fill all required fields before generating the invoice.");
    }
  };

  const capitalizeFirst = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="px-5 py-5 mt-2 bg-cover relative right-0 top-0 h-[90dvh] rounded-2xl lg:border-1">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

      <div className='grid grid-cols-2 gap-10' >
        <div className='mb-5'>
          <h5><b>Customer Details</b></h5>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-3">
            <div>
              <Label className="mb-2">Customer Name<span className='text-red-500'>*</span></Label>
              <Input
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(capitalizeFirst(e.target.value))}
                className="dark:border-#FFF-600"
              />
            </div>
            <div>
              <Label className="mb-2">Address</Label>
              <Input
                type="text"  
                value={customerAddress}
                onChange={(e) => setCustomerAddress(capitalizeFirst(e.target.value))}
                className="dark:border-#FFF-600"
              />
            </div>
            <div>
              <Label className="mb-2">Phone Number<span className='text-red-500'>*</span></Label>
              <Input 
                type="text" 
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="dark:border-#FFF-600"
              />
            </div>
            <div>
              <Label className="mb-2">Email</Label>
              <Input
                type="email"  
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="dark:border-#FFF-600"
              />
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <h5><b>Estimate Details</b></h5>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-3">
            <div>
              <Label className="mb-2">Estimate No<span className='text-red-500'>*</span></Label>
              <Input
                type="text" 
                value={estimateNo}
                onChange={(e) => setEstimateNo(e.target.value)}
                className="dark:border-#FFF-600"
              />
            </div>
            {/* <div>
              <Label className="mb-2">Date</Label>
              <Input
                type="date"  
                value={formattedDate}
                onChange={(e) => setFormattedDate(e.target.value)}
                className="dark:border-#FFF-600"
              />
            </div> */}
            <div>
              <Label className="mb-2">Sales Team Leader<span className='text-red-500'>*</span></Label>
              <Input 
                type="text" 
                value={salesLeader}
                onChange={(e) => setSalesLeader(e.target.value)}  
                className="dark:border-#FFF-600"
              />
            </div>
            <div>
              <Label className="mb-2">Mobile</Label>
              <Input
                type="text"  
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}    
                className="dark:border-#FFF-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SR.</TableHead>
              <TableHead>WORKS</TableHead>
              <TableHead>LENGTH (cm)<span className='text-red-500'>*</span></TableHead>
              <TableHead>HEIGHT (cm)<span className='text-red-500'>*</span></TableHead>
              <TableHead>SQ FEET</TableHead>
              <TableHead>QTY</TableHead>
              <TableHead>RATE PER SQ FEET/QTY <span className='text-red-500'>*</span></TableHead>
              <TableHead>TOTAL RATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              invoiceList.length > 0 && invoiceList.map((row, index) => (
              <TableRow key={`row-${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Select  value={row.workCategory?.id}>
                    <SelectTrigger className="w-[240px] bg-blue-100 py-[20px] dark:border-#FFF-600">
                      <SelectValue placeholder="Select a work" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Works</SelectLabel>
                          <SelectItem Select value={row.workCategory?.id}>
                            <div className="flex flex-col items-start text-left ">
                              <span>{row.workCategory?.category}</span>
                            </div>
                          </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input value={row.workMaterial} readOnly className="bg-blue-100 w-[240px] dark:border-#FFF-600" />
                </TableCell>
                {row.workMaterial ? (
                  <>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        value={row.length}
                        onChange={(e) => updateRow(index, "length", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        value={row.height}
                        onChange={(e) => updateRow(index, "height", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        value={row.sqFeet}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.count}
                        onChange={(e) => updateRow(index, "count", e.target.value)}
                        className=" w-25 dark:border-#FFF-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600"
                        value={row.ratePerSqFeet}
                        onChange={(e) => updateRow(index, "ratePerSqFeet", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600"
                        value={
                          row.totalRate
                        }
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </>
                )}
              </TableRow> ))
            }

              {/* New row input fields */}
              <TableRow>
                <TableCell>{invoiceList.length + 1}</TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Select value={selectedCategory ? selectedCategory.id : ""} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-[240px] bg-blue-100 py-[20px] dark:border-#FFF-600">
                      <SelectValue placeholder="Select a work" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Works</SelectLabel>
                        {interiorWorks.map((work, index) => (
                          <SelectItem key={work.id} value={work.id}>
                            <div className="flex flex-col items-start text-left">
                              <span>{work.category}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {selectedCategory && (
                    <Input
                      className="bg-blue-100 w-[240px] dark:border-#FFF-600"
                      placeholder="Enter material"
                      value={workMaterial}
                      onChange={e => setWorkMaterial(e.target.value)}
                    />
                  )}
                </TableCell>
                {workMaterial ? (
                  <>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        value={length}
                        onChange={(e) => handleLengthChange(e.target.value)}
                        disabled={isAccessory} 
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        value={height}
                        onChange={(e) => handleHeightChange(e.target.value)}
                        disabled={isAccessory} 
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        value={sqFeet}
                        disabled={isAccessory} 
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="w-25 dark:border-#FFF-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        value={count}
                        onChange={(e) => handleCountChange(e.target.value)}
                        disabled={!isAccessory}   
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600"
                        value={ratePerSqFeet}
                        onChange={e => setRatePerSqFeet(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25 dark:border-#FFF-600"
                        value={
                          totalRate
                        }
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </>
                )}
              </TableRow>
              <TableRow>
                <TableCell colSpan="6"></TableCell>
                <TableCell className="font-bold">SUB TOTAL</TableCell>
                <TableCell className="font-bold">{subTotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="5"></TableCell>
                <TableCell className="font-bold">GST(%)</TableCell>
                <TableCell>
                  <Input
                    type="text"
                    className="w-25 dark:border-#FFF-600"
                    value={gst}
                    onChange={(e) => handleGSTChange(e.target.value)}
                  />
                </TableCell>
                <TableCell className="font-bold">{gstAmount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="6">
                  <div className="items-center flex mt-4">
                    <Button className="cursor-pointer" onClick={addRow}>
                      <Plus className="w-4" />
                    </Button>
                    <Button className="cursor-pointer ms-2" onClick={handleInvoiceOpen}>Invoice</Button>
                    <Button className="cursor-pointer ms-2" disabled={!isFormValid()} >Save</Button>
                  </div>
                </TableCell>
                <TableCell className="font-bold">TOTAL</TableCell>
                <TableCell className="font-bold">{grandTotal}</TableCell>
              </TableRow>
          </TableBody>
        </Table>

        <Dialog open={showPdf} onOpenChange={setShowPdf}>
          <DialogContent className="lg:max-w-[1200px] h-[90vh] rounded-lg overflow-y-auto"  hideClose >
            <div className="w-full h-full flex flex-col" ref={ pdfRef}>
              <div className="flex-1 p-6" >
                <Invoice
                  invoiceList={invoiceList}
                  subTotal={subTotal}
                  gst={gst}
                  gstAmount={gstAmount}
                  grandTotal={grandTotal}
                  draftRow={{
                    workCategory,
                    workMaterial,
                    isAccessory,
                    length,
                    height,
                    sqFeet,
                    count,
                    ratePerSqFeet,
                    totalRate,
                  }}
                  customer={{
                    name: customerName,
                    address: customerAddress,
                    phone: customerPhone,
                    email: customerEmail
                  }}
                  estimate={{
                    estimateNumber: estimateNo,
                    name: salesLeader,
                    // date: formattedDate,
                    mob: mobile
                  }}
                />
              </div>
              <div className="flex justify-end gap-2 p-4 border-t">
                <Button className="cursor-pointer" onClick={handlePrint}>Print</Button>
                <Button className="cursor-pointer"  variant="secondary" onClick={() => setShowPdf(false)}>Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      
      </div>
    </div>
  );
}

export default page