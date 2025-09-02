"use client"

import AppSidebar from '@/components/AppSidebar/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { Children, useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown, } from "lucide-react";
import { Plus } from 'lucide-react';

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

import { Button } from '@/components/ui/button';
import { useReactToPrint } from 'react-to-print';
import Invoice from '@/components/Invoice/Invoice';

const interiorWorks = [
  {
    category: "Kitchen",
    id: 1,
    products: [
      {
        id: 1,
        meterial : "Ply Wood",
        legth: 250,
        width: 83,
        sqfeet : 22,
        ratePerSqFeet : 2233.74,
        discount : 20,
      },
      {
        id: 2,
        meterial : "Multi Wood",
        legth: 250,
        width: 83,
        sqfeet : 22,
        ratePerSqFeet : 3233.74,
        discount : 10,
      },
    ],
  },
  {
    category: "TV",
    id: 2,
    products: [
      {
        id: 1,
        meterial : "HDF",
        legth: 250,
        width: 83,
        sqfeet : 22,
        ratePerSqFeet : 1233.74,
        discount : 8,
      },
    ],
  },
]

const page = () => {

  const pdfRef = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: "Title",
    contentRef: pdfRef,
  });
   
  const [sqft, setSqft] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [budget, setBudget] = useState("");

  const [showPdf, setShowPdf] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const floorObj = interiorWorks.find((f) => f.floor === selectedFloor);
  const categoryObj = floorObj?.categories.find((c) => c.name === selectedCategory);
  const workObj = categoryObj?.works.find((w) => w.name === selectedWork);

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [workCategory, setWorkCategory] = useState(null);
  const [workMaterial, setWorkMaterial] = useState(null);
  const [length, setLength] = useState(null);
  const [width, setWidth] = useState(null);
  const [sqFeet, setSqFeet] = useState(null);
  const [ratePerSqFeet, setRatePerSqFeet] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [totalRate, setTotalRate] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);

  const [invoiceList, setInvoiceList] = useState([]);

  const reset = () => {
    setSelectedCategory(null);
    setSelectedProduct(null);
    setLength(null);
    setWidth(null);
    setSqft(null);
    setRatePerSqFeet(null);
    setDiscount(null);
    setTotalRate(null);
  }

const addRow = () => {
  if (
    selectedCategory &&
    selectedProduct &&
    length &&
    width &&
    sqFeet &&
    ratePerSqFeet &&
    totalRate
  ) {
    const newRow = {
      workCategory: selectedCategory,
      workMaterial: selectedProduct,
      length,
      width,
      sqFeet,
      ratePerSqFeet,
      discount,
      totalRate
    };

    console.log("Adding Row:", newRow);
    setInvoiceList((prev) => [...prev, newRow]);
    reset(); 
  }

};

 

//  useEffect(() => {
//   invoiceList
//  }, [totalRate])


  useEffect(() => {
    const draftRowTotal = totalRate || 0;

    const invoiceListTotal = invoiceList.reduce((sum, row) => sum + (row.totalRate || 0), 0);

    const total = invoiceListTotal + draftRowTotal;

    setGrandTotal(total);
  }, [invoiceList, totalRate]);


  
  const handleCategoryChange = (id) => {
    const cat = interiorWorks.find((c) => c.id === id);
    if (cat) {
      setSelectedCategory(cat);
    }
  setWorkCategory(cat.category);
  };

  const handleMaterialChange = (id) => {
    if (selectedCategory && selectedCategory.products) {
      const mat = selectedCategory.products.find((m) => m.id === id);
      setSelectedProduct(mat);
      console.log(mat)
      setWorkMaterial(mat.meterial)
      setLength(mat.legth);
      setWidth(mat.width);
      setSqFeet(mat.sqfeet);
      setRatePerSqFeet(mat.ratePerSqFeet)
      setDiscount(mat.discount)
      setTotalRate(mat.sqfeet * mat.ratePerSqFeet)
    }
  };

  return (
    <div className="px-5 py-5 mt-2 bg-cover relative right-0 top-0 h-[90dvh] rounded-2xl lg:border-1">

      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SR.</TableHead>
              <TableHead>WORKS</TableHead>
              <TableHead>MATERIAL</TableHead>
              <TableHead>LENGTH</TableHead>
              <TableHead>WIDTH</TableHead>
              <TableHead>SQ FEET</TableHead>
              <TableHead>RATE PER SQ FEET</TableHead>
              <TableHead>DISCOUNT</TableHead>
              <TableHead>TOTAL RATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>-</TableCell>
              <TableCell>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[180px] bg-blue-100">
                    <SelectValue placeholder="Select a work" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Works</SelectLabel>
                      {interiorWorks.map((work, index) => (
                        <SelectItem key={index} value={work.id}>
                          {work.category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>

              {selectedCategory ? (
                <TableCell>
                  <Select onValueChange={handleMaterialChange}>
                    <SelectTrigger className="w-[180px] bg-blue-100">
                      <SelectValue placeholder="Select a material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Materials</SelectLabel>
                        {selectedCategory.products.map((m, index) => (
                          <SelectItem key={index} value={m.id}>
                            {m.meterial}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              ) : (
                <TableCell> - </TableCell>
              )}
              {selectedProduct ? (
                <>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={length}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={width}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={sqFeet}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={ratePerSqFeet}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={discount}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
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
                  <TableCell>-</TableCell>
                </>
              )}
            </TableRow>
            {
              invoiceList.length > 0 && 
                invoiceList.map((row, index) => (
              <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Select  value={row.workCategory?.id}>
                  <SelectTrigger className="w-[180px] bg-blue-100">
                    <SelectValue placeholder="Select a work" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Works</SelectLabel>
                        <SelectItem Select value={row.workCategory?.id}>
                          {row.workCategory?.category}
                        </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>

              {row.workMaterial ? (
                <TableCell>
                  <Select value={row.workMaterial.id}>
                    <SelectTrigger className="w-[180px] bg-blue-100">
                      <SelectValue placeholder="Select a work" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Materials</SelectLabel>
                          <SelectItem key={index} value={row.workMaterial.id}>
                            {row.workMaterial.meterial}
                          </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              ) : (
                <TableCell> - </TableCell>
              )}
              {row.workMaterial ? (
                <>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={row.length}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={row.width}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={row.sqFeet}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={row.ratePerSqFeet}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
                      value={
                        row.discount
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-25"
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
                  <TableCell>-</TableCell>
                </>
              )}
              </TableRow> ))
            }
            <TableRow>
              <TableCell colSpan="7">
                <div className="items-center flex mt-4">
                  <Button className="cursor-pointer" onClick={addRow}>
                    <Plus className="w-4" />
                  </Button>
                  <Button className="cursor-pointer ms-2" onClick={() => setShowPdf(!showPdf)}>Invoice</Button>
                </div>
              </TableCell>
              <TableCell className="font-bold">TOTAL</TableCell>
              {/* <TableCell className="font-bold">49895.83</TableCell> */}
              <TableCell className="font-bold">{grandTotal?.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* <div className='mt-3'>
          {showPdf && (
            <Invoice
              invoiceList={invoiceList}
              grandTotal={grandTotal}
              draftRow={{
                workCategory,
                workMaterial,
                length,
                width,
                sqFeet,
                ratePerSqFeet,
                discount,
                totalRate,
              }}
            />
          )}
        </div> */}
       <Dialog open={showPdf} onOpenChange={setShowPdf}>
        <DialogContent className="lg:max-w-[1200px] h-[90vh] rounded-lg overflow-y-auto"  hideClose >
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 p-6" ref={pdfRef}>
              <Invoice
                invoiceList={invoiceList}
                grandTotal={grandTotal}
                draftRow={{
                  workCategory,
                  workMaterial,
                  length,
                  width,
                  sqFeet,
                  ratePerSqFeet,
                  discount,
                  totalRate,
                }}
              />
            </div>

            <div className="flex justify-end gap-2 p-4 border-t bg-white">
              <Button onClick={handlePrint}>Print</Button>
              <Button variant="secondary" onClick={() => setShowPdf(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      </div>
    </div>
  );
}

export default page