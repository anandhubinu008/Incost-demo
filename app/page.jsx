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

// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import {
//   Command,
//   CommandInput,
//   CommandEmpty,
//   CommandGroup,
//   CommandItem,
// } from "@/components/ui/command";


const interiorWorks = [
  {
    id: 1,
    category: "Kitchen",
    note: "Includes cabinets, countertops, and tiling",    
    products: [
      { id: 1, meterial: "Plywood", ratePerSqFeet: 2234 },
      { id: 2, meterial: "WPC", ratePerSqFeet: 190 },
      { id: 3, meterial: "HDF", ratePerSqFeet: 210 },
      { id: 4, meterial: "MDF", ratePerSqFeet: 150 },
      { id: 5, meterial: "St Gobain", ratePerSqFeet: 650 },
      { id: 6, meterial: "Gyproc", ratePerSqFeet: 110 },
    ],
  },
  {
    id: 2,
    category: "Work area",
    note: "Customized desks, shelves, and lighting",
    products: [
      { id: 1, meterial: "Plywood", ratePerSqFeet: 2234 },
      { id: 2, meterial: "WPC", ratePerSqFeet: 190 },
      { id: 3, meterial: "HDF", ratePerSqFeet: 210 },
      { id: 4, meterial: "MDF", ratePerSqFeet: 150 },
      { id: 5, meterial: "St Gobain", ratePerSqFeet: 650 },
      { id: 6, meterial: "Gyproc", ratePerSqFeet: 110 },
    ],
  },
  {
    id: 3,
    category: "Living",
    note: "TV units, wall décor, and false ceiling",
    products: [
      { id: 1, meterial: "Plywood", ratePerSqFeet: 2234 },
      { id: 2, meterial: "WPC", ratePerSqFeet: 190 },
      { id: 3, meterial: "HDF", ratePerSqFeet: 210 },
      { id: 4, meterial: "MDF", ratePerSqFeet: 150 },
      { id: 5, meterial: "St Gobain", ratePerSqFeet: 650 },
      { id: 6, meterial: "Gyproc", ratePerSqFeet: 110 },
    ],
  },
  {
    id: 4,
    category: "Dining",
    note: "Dining table setup and lighting fixtures",
    products: [
      { id: 1, meterial: "Plywood", ratePerSqFeet: 2234 },
      { id: 2, meterial: "WPC", ratePerSqFeet: 190 },
      { id: 3, meterial: "HDF", ratePerSqFeet: 210 },
      { id: 4, meterial: "MDF", ratePerSqFeet: 150 },
      { id: 5, meterial: "St Gobain", ratePerSqFeet: 650 },
      { id: 6, meterial: "Gyproc", ratePerSqFeet: 110 },
    ],
  },
  {
    id: 5,
    category: "Bedroom",
    note: "Wardrobes, bed frames, and side tables",
    products: [
      { id: 1, meterial: "Plywood", ratePerSqFeet: 2234 },
      { id: 2, meterial: "WPC", ratePerSqFeet: 190 },
      { id: 3, meterial: "HDF", ratePerSqFeet: 210 },
      { id: 4, meterial: "MDF", ratePerSqFeet: 150 },
      { id: 5, meterial: "St Gobain", ratePerSqFeet: 650 },
      { id: 6, meterial: "Gyproc", ratePerSqFeet: 110 },
    ],
  },
  {
    id: 6,
    category: "Furniture",
    note: "Modular furniture and storage units",
    products: [
      { id: 1, meterial: "Plywood", ratePerSqFeet: 2234 },
      { id: 2, meterial: "WPC", ratePerSqFeet: 190 },
      { id: 3, meterial: "HDF", ratePerSqFeet: 210 },
      { id: 4, meterial: "MDF", ratePerSqFeet: 150 },
      { id: 5, meterial: "St Gobain", ratePerSqFeet: 650 },
      { id: 6, meterial: "Gyproc", ratePerSqFeet: 110 },
    ],
  },
  {
    id: 7,
    category: "Bathroom",
    note: "Vanity units, storage, and partitions",
    products: [
      { id: 1, meterial: "Plywood", ratePerSqFeet: 2234 },
      { id: 2, meterial: "WPC", ratePerSqFeet: 190 },
      { id: 3, meterial: "HDF", ratePerSqFeet: 210 },
      { id: 4, meterial: "MDF", ratePerSqFeet: 150 },
      { id: 5, meterial: "St Gobain", ratePerSqFeet: 650 },
      { id: 6, meterial: "Gyproc", ratePerSqFeet: 110 },
    ],
  },
  {
    id: 8,
    category: "Ceiling work",
    note: "False ceiling and LED lighting designs",
    products: [
      { id: 1, meterial: "Plywood", ratePerSqFeet: 2234 },
      { id: 2, meterial: "WPC", ratePerSqFeet: 190 },
      { id: 3, meterial: "HDF", ratePerSqFeet: 210 },
      { id: 4, meterial: "MDF", ratePerSqFeet: 150 },
      { id: 5, meterial: "St Gobain", ratePerSqFeet: 650 },
      { id: 6, meterial: "Gyproc", ratePerSqFeet: 110 },
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
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [sqFeet, setSqFeet] = useState("");
  const [ratePerSqFeet, setRatePerSqFeet] = useState("");
  const [gst, setGST] = useState("");
  const [totalRate, setTotalRate] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);
  const [note, setNote] = useState(null);

  const [invoiceList, setInvoiceList] = useState([]);

  const reset = () => {
      setSelectedCategory(null);
      setLength("");
      setWidth("");
      setSqFeet("");
      setRatePerSqFeet("");
      setTotalRate("");
  };

  const addRow = () => {
    if (selectedCategory && selectedProduct && length && width && sqFeet && ratePerSqFeet && totalRate ) {
      const newRow = {
        workCategory: selectedCategory,
        workMaterial: selectedProduct,
        length,
        width,
        sqFeet,
        ratePerSqFeet,
        totalRate
      };
      setInvoiceList((prev) => [...prev, newRow]);
      reset(); 
    }
  };

  useEffect(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const area = (l * w) / 144;
    setSqFeet(area.toFixed(2));

    if (selectedProduct) {
      const subtotal = area * selectedProduct.ratePerSqFeet;
      setTotalRate(subtotal.toFixed(2));
    } else {
      setTotalRate(0);
    }

    const subtotalAll = invoiceList.reduce(
      (sum, row) => sum + parseFloat(row.totalRate || 0),
      0
    );

    const currentDraftSubtotal = parseFloat(totalRate || 0);
    const totalBeforeGST = subtotalAll + currentDraftSubtotal;

    const gstValue = parseFloat(gst) || 0;
    const gstAmount = (totalBeforeGST * gstValue) / 100;
    const grandTotalWithGST = totalBeforeGST + gstAmount;
    setGrandTotal(grandTotalWithGST);

  }, [length, width, selectedProduct, gst, invoiceList]);

  const handleCategoryChange = (id) => {
    const cat = interiorWorks.find((c) => c.id === id);
    if (cat) {
      setSelectedCategory(cat);
    }
    setWorkCategory(cat.category);
    setNote(cat.note);
  };

  const handleMaterialChange = (id) => {
    if (selectedCategory && selectedCategory.products) {
      const mat = selectedCategory.products.find((m) => m.id === id);
      setSelectedProduct(mat);
      console.log(mat)

      const subtotal = sqFeet * mat.ratePerSqFeet;
      const gstRate = gst || 0;
      const gstAmount = (subtotal * gstRate) / 100;
      const totalWithGST = subtotal + gstAmount;

      setWorkMaterial(mat.meterial)
      setLength("");
      setWidth("");
      setSqFeet("");
      setRatePerSqFeet(mat.ratePerSqFeet);
      setTotalRate(subtotal);
      setGrandTotal(totalWithGST);
    }
  };

  const handleLengthChange = (len) =>{
    setLength(len);
  };

  const handleWidthChange = (wd) =>{
    setWidth(wd);
  }

  const handleGSTChange = (val) =>{
    setGST(val);
  }

  return (
    <div className="px-5 py-5 mt-2 bg-cover relative right-0 top-0 h-[90dvh] rounded-2xl lg:border-1">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SR.</TableHead>
              <TableHead>WORKS</TableHead>
              {/* <TableHead>MATERIAL</TableHead> */}
              <TableHead>LENGTH</TableHead>
              <TableHead>WIDTH</TableHead>
              <TableHead>SQ FEET</TableHead>
              <TableHead>RATE PER SQ FEET</TableHead>
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
                    <SelectTrigger className=" bg-blue-100 py-[26px]">
                      <SelectValue placeholder="Select a work" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Works</SelectLabel>
                          <SelectItem Select value={row.workCategory?.id}>
                            <div className="flex flex-col items-start text-left">
                              <span>{row.workCategory?.category}</span>
                              <span className="text-xs text-gray-500">{row.workCategory?.note}</span>
                            </div>
                          </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {row.workMaterial && (
                      <Select value={row.workMaterial.id}>
                        <SelectTrigger className=" bg-blue-100">
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
                  )}
                </TableCell>
                {/* {row.workMaterial ? (
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
                )} */}
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
              <TableRow>
                <TableCell>{invoiceList.length + 1}</TableCell>
                <TableCell className="flex flex-col gap-2">
                  <Select value={selectedCategory?.id} onValueChange={handleCategoryChange}>
                    <SelectTrigger className=" bg-blue-100 py-[26px]">
                      <SelectValue placeholder="Select a work" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Works</SelectLabel>
                        {interiorWorks.map((work, index) => (
                          <SelectItem key={work.id} value={work.id}>
                            <div className="flex flex-col items-start text-left">
                              <span>{work.category}</span>
                              <span className="text-xs text-gray-500">{work.note}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {selectedCategory && (
                    <div>
                      <Select value={selectedProduct?.id} onValueChange={handleMaterialChange}>
                        <SelectTrigger className=" bg-blue-100">
                          <SelectValue placeholder="Select a material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Materials</SelectLabel>
                            {selectedCategory.products.map((m) => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.meterial}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </TableCell>

                {/* {selectedCategory ? (
                  <TableCell>
                    <Select value={selectedProduct?.id} onValueChange={handleMaterialChange}>
                      <SelectTrigger className="w-[180px] bg-blue-100">
                        <SelectValue placeholder="Select a material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Materials</SelectLabel>
                          {selectedCategory.products.map((m, index) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.meterial}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                ) : (
                  <TableCell> - </TableCell>
                )} */}
                {selectedProduct ? (
                  <>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25"
                        value={length}
                        onChange={(e) => handleLengthChange(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        className="w-25"
                        value={width}
                        onChange={(e) => handleWidthChange(e.target.value)}
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
                <TableCell colSpan="5"></TableCell>
                <TableCell className="font-bold">GST (%)</TableCell>
                <TableCell>
                  <Input
                    type="text"
                    className="w-20"
                    value={gst}
                    onChange={(e) => handleGSTChange(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="5">
                  <div className="items-center flex mt-4">
                    <Button className="cursor-pointer" onClick={addRow}>
                      <Plus className="w-4" />
                    </Button>
                    <Button className="cursor-pointer ms-2" onClick={() => setShowPdf(!showPdf)}>Invoice</Button>
                    <Button className="cursor-pointer ms-2" >Save</Button>
                  </div>
                </TableCell>
                <TableCell className="font-bold">TOTAL</TableCell>
                <TableCell className="font-bold">{grandTotal?.toFixed(2)}</TableCell>
              </TableRow>
          </TableBody>
        </Table>

        <Dialog open={showPdf} onOpenChange={setShowPdf}>
          <DialogContent className="lg:max-w-[1200px] h-[90vh] rounded-lg overflow-y-auto"  hideClose >
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 p-6" ref={pdfRef}>
                <Invoice
                  invoiceList={invoiceList}
                  grandTotal={grandTotal}
                  gst={gst}
                  draftRow={{
                    workCategory,
                    note,
                    workMaterial,
                    length,
                    width,
                    sqFeet,
                    ratePerSqFeet,
                    totalRate,
                  }}
                />
              </div>
              <div className="flex justify-end gap-2 p-4 border-t">
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