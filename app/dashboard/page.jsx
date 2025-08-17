"use client"

import AppSidebar from '@/components/AppSidebar/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { Children, useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '@/components/ui/button';
import Invoice from '@/components/Invoice/Invoice';
import { Modal } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const interiorWorks = [
  {
    floor: "Ground Floor",
    categories: [
      {
        name: "Kitchen",
        works: [
          {
            name: "Cabinetry",
            materials: [
              { material: "Laminate Finish", price: 1200, description: "Durable, budget-friendly surface with a wide range of colors and patterns. Resistant to scratches and stains, making it a practical choice for busy kitchens." },
              { material: "Acrylic Finish", price: 1800, description: "High-gloss, mirror-like surface that enhances the modern look of your kitchen. Easy to clean and resistant to moisture and UV light." },
              { material: "PU Coating", price: 2500, description: "Premium polyurethane-coated finish with excellent scratch, water, and heat resistance. Provides a smooth, luxurious appearance." },
            ],
          },
          {
            name: "Countertops",
            materials: [
              { material: "Granite", price: 2500, description: "Natural stone with unmatched strength and durability. Resistant to heat and scratches, ideal for heavy kitchen use." },
              { material: "Quartz", price: 3200, description: "Engineered stone with non-porous properties, making it highly resistant to stains, bacteria, and moisture. Available in modern finishes." },
              { material: "Marble", price: 4000, description: "Elegant natural stone with unique veining. Adds a luxurious touch but requires regular maintenance and sealing." },
            ],
          },
          {
            name: "Backsplash",
            materials: [
              { material: "Ceramic Tiles", price: 800, description: "Affordable and easy to install. Available in multiple designs, water-resistant and low maintenance." },
              { material: "Glass Mosaic", price: 1500, description: "Stylish, reflective finish that adds brightness and visual interest. Easy to clean and water resistant." },
              { material: "Marble Slab", price: 2500, description: "Creates a seamless, luxurious backsplash. Natural stone offers elegance but requires sealing to prevent stains." },
            ],
          },
        ],
      },
      {
        name: "Bedroom",
        works: [
          {
            name: "Wardrobe",
            materials: [
              { material: "Laminate Finish", price: 1500, description: "Economical and durable surface available in a variety of textures and colors. Easy to clean and long-lasting." },
              { material: "Sliding Wardrobe (Glass)", price: 2500, description: "Space-saving solution with sleek glass panels that enhance modern interiors. Smooth sliding mechanism." },
              { material: "Wooden Veneer Finish", price: 3000, description: "Natural wood veneer finish for a premium look. Provides warmth and sophistication to the bedroom." },
            ],
          },
          {
            name: "False Ceiling",
            materials: [
              { material: "POP Ceiling", price: 1000, description: "Smooth plaster of Paris ceiling with versatile design possibilities. Lightweight and budget-friendly." },
              { material: "Gypsum Board", price: 1800, description: "Modern, lightweight material with fire-resistant and soundproofing qualities. Offers a neat, elegant finish." },
              { material: "Wooden Panel Ceiling", price: 2800, description: "Adds warmth and a luxurious look to the bedroom. Provides acoustic benefits and a cozy ambience." },
            ],
          },
        ],
      },
      {
        name: "Bathroom",
        works: [
          {
            name: "Vanity Unit",
            materials: [
              { material: "PVC Finish", price: 2000, description: "Moisture-resistant, lightweight, and cost-effective. Ideal for bathrooms with high humidity." },
              { material: "Laminate Finish", price: 2500, description: "Stylish, durable finish resistant to scratches and stains. Adds a modern look to the bathroom." },
            ],
          },
          {
            name: "Wall Tiles",
            materials: [
              { material: "Ceramic", price: 800, description: "Affordable and water-resistant. Easy to clean and available in various designs." },
              { material: "Vitrified Tiles", price: 1200, description: "Highly durable and stain-resistant with low porosity. Offers a sleek, glossy finish." },
              { material: "Marble", price: 3500, description: "Premium natural stone that adds elegance and luxury. Requires sealing and regular care." },
            ],
          },
        ],
      },
    ],
  },
  {
    floor: "First Floor",
    categories: [
      {
        name: "Living Room",
        works: [
          {
            name: "TV Unit",
            materials: [
              { material: "Laminate", price: 2000, description: "Durable, budget-friendly material with multiple color and texture choices. Easy to maintain." },
              { material: "Veneer Finish", price: 2800, description: "Premium natural wood finish that enhances the richness of the living room." },
              { material: "Backlit Panel", price: 3500, description: "Modern unit with integrated lighting to create a stylish and cozy ambience." },
            ],
          },
          {
            name: "Wall Paneling",
            materials: [
              { material: "Laminate Panels", price: 1500, description: "Durable panels with a clean and modern look. Available in multiple finishes." },
              { material: "Wooden Veneer", price: 2500, description: "Natural wood finish that gives warmth and elegance to the space." },
              { material: "Fabric Upholstery Panels", price: 3000, description: "Soft-touch panels with acoustic properties. Adds a cozy, premium feel." },
            ],
          },
        ],
      },
      {
        name: "Dining Room",
        works: [
          {
            name: "Dining Table",
            materials: [
              { material: "Wood Finish", price: 5000, description: "Classic solid wood table that is strong, durable, and timeless." },
              { material: "Glass Top", price: 7000, description: "Modern design with a clear or frosted glass surface. Easy to clean and stylish." },
              { material: "Marble Top", price: 9000, description: "Premium table with elegant natural stone top. Adds luxury to dining space." },
            ],
          },
          {
            name: "Lighting",
            materials: [
              { material: "Chandeliers", price: 3500, description: "Adds elegance and grandeur to dining space. Available in traditional and modern designs." },
              { material: "Pendant Lights", price: 2000, description: "Stylish overhead lighting that enhances modern interiors. Perfect for dining tables." },
              { material: "Recessed Lighting", price: 1500, description: "Minimalistic lighting option with a clean look. Provides soft and even illumination." },
            ],
          },
        ],
      },
    ],
  },
  {
    floor: "Second Floor",
    categories: [
      {
        name: "Home Office",
        works: [
          {
            name: "Work Desk",
            materials: [
              { material: "Laminate Desk", price: 2500, description: "Durable, affordable desk surface with multiple finish options. Suitable for daily use." },
              { material: "Solid Wood Desk", price: 4500, description: "Premium desk with strong build and elegant natural wood finish." },
            ],
          },
          {
            name: "Bookshelf",
            materials: [
              { material: "Laminate Finish", price: 2000, description: "Cost-effective, long-lasting shelves resistant to wear and tear." },
              { material: "Glass & Wood Combo", price: 3200, description: "Stylish combination of glass panels and wooden frames. Adds elegance and durability." },
            ],
          },
        ],
      },
      {
        name: "Home Theater",
        works: [
          {
            name: "Acoustic Paneling",
            materials: [
              { material: "Foam Panels", price: 1200, description: "Effective sound-absorbing panels. Affordable and easy to install." },
              { material: "Fabric Finish Panels", price: 2200, description: "Premium acoustic panels with stylish fabric covering. Enhances soundproofing and aesthetics." },
            ],
          },
          {
            name: "Recliner Seating",
            materials: [
              { material: "Fabric", price: 6000, description: "Soft, comfortable recliners with various fabric options. Ideal for long movie sessions." },
              { material: "Leather", price: 10000, description: "Luxurious recliners with premium leather finish. Offers durability and elegance." },
            ],
          },
        ],
      },
    ],
  },
];


const page = () => {

//   useEffect(() => {
//   console.log(interiorWorks);
// })

  const [isOpen, setIsOpen] = useState(false);

  const pdfRef = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: "Title",
    contentRef: pdfRef,
  });
   
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWork, setSelectedWork] = useState();
   const [cart, setCart] = useState([]);

  const [sqft, setSqft] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [budget, setBudget] = useState("");


  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const floorObj = interiorWorks.find((f) => f.floor === selectedFloor);
  const categoryObj = floorObj?.categories.find((c) => c.name === selectedCategory);
  const workObj = categoryObj?.works.find((w) => w.name === selectedWork);

  const materials = workObj?.materials || [];

const handleAdd = (item) => {
  setCart((prev) => [
    ...prev,
    {
      ...item,
      category: selectedCategory,
      work: selectedWork,
      sqft: Number(sqft),
      quantity: Number(quantity),
      budget: budget || null,
    },
  ]);

  // (optional) reset input fields after adding
  setSqft(0);
  setQuantity(1);
  setBudget("");
};

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="px-5 py-5 mt-2 bg-cover relative  right-0 top-0 h-[90dvh] rounded-2xl border-1">
      {cart.length > 0 && 
      <div className="mt-7 absolute top-0 right-7">
        <Button onClick={() => setIsOpen(true)}>Invoice Preview</Button>
      </div>}
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="mt-5">
        <div className="lg:grid grid-cols-3 gap-4 mb-5 mt-4 relative">
          {/* Floor */}
          <div className="mb-3">
            <Label className="text-lg">Select Floor</Label>
            <Select onValueChange={setSelectedFloor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Floor" />
              </SelectTrigger>
              <SelectContent>
                {interiorWorks.map((item) => (
                  <SelectItem key={item.floor} value={item.floor}>
                    {item.floor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="mb-3">
            <Label className="text-lg">Category</Label>
            <Select
              onValueChange={setSelectedCategory}
              disabled={!selectedFloor}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {floorObj?.categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Works */}
          <div className="mb-3">
            <Label className="text-lg">Works</Label>
            <Select
              onValueChange={setSelectedWork}
              disabled={!selectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Work" />
              </SelectTrigger>
              <SelectContent>
                {categoryObj?.works.map((work) => (
                  <SelectItem key={work.name} value={work.name}>
                    <p>{work.name}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Materials</h2>
          <div className="lg:grid grid-cols-4 gap-4 mb-5 mt-4 relative">
            {materials.length > 0 ? (
              materials.map((m, idx) => (
                <Card
                  key={idx}
                  className="p-4 mb-4 flex flex-col justify-between shadow-md rounded-2xl"
                >
                  <div>
                    <h3 className="text-lg font-medium mb-2">{m.material}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {m.description}
                    </p>
                    <p className="font-semibold">₹{m.price}</p>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Select</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="leading-none font-medium">
                            Dimensions
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            Set the dimensions for the estimate.
                          </p>
                        </div>

                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Sqft</Label>
                            <Input
                              id="sqft"
                              defaultValue={100}
                              type="number"
                              value={sqft}
                              onChange={(e) => setSqft(e.target.value)}
                              className="col-span-2 h-8"
                            />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Quantity</Label>
                            <Input
                              id="quantity"
                              defaultValue="1"
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              className="col-span-2 h-8"
                            />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxHeight">Your Budget</Label>
                            <Input
                              id="budget"
                              defaultValue="none"
                              value={budget}
                              onChange={(e) => setBudget(e.target.value)}
                              className="col-span-2 h-8"
                            />
                          </div>
                        </div>

                        {/* ✅ Put your Add button inside the popover */}
                        <Button
                          className="mt-3 w-full"
                          size="sm"
                          onClick={() => handleAdd(m)}
                        >
                          Add Material
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </Card>
              ))
            ) : (
              <p className="col-span-4 text-gray-500">No materials available</p>
            )}
          </div>
        </div>

        <div>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-auto py-10">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-[95%] md:w-[99%] p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Invoice Preview
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Content */}
                <div ref={pdfRef} className="mb-4">
                  <Invoice cart={cart} />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page