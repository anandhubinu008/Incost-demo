"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";

const InvoiceDetailsDialog = ({ open, onOpenChange, data, onSave }) => {
  const [draft, setDraft] = useState(data);

  // Keep draft in sync if dialog reopens with fresh data
  useState(() => setDraft(data), [data]);

  const updateListItem = (key, index, value) => {
    setDraft((prev) => {
      const list = [...prev[key]];
      list[index] = value;
      return { ...prev, [key]: list };
    });
  };

  const addListItem = (key) => {
    setDraft((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const removeListItem = (key, index) => {
    setDraft((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const updateSpecRow = (index, field, value) => {
    setDraft((prev) => {
      const specs = [...prev.materialSpecs];
      specs[index] = { ...specs[index], [field]: value };
      return { ...prev, materialSpecs: specs };
    });
  };

  const addSpecRow = () => {
    setDraft((prev) => ({
      ...prev,
      materialSpecs: [...prev.materialSpecs, { item: "", spec: "", brand: "" }],
    }));
  };

  const removeSpecRow = (index) => {
    setDraft((prev) => ({
      ...prev,
      materialSpecs: prev.materialSpecs.filter((_, i) => i !== index),
    }));
  };

  const updateBank = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: value },
    }));
  };

  const renderEditableList = (title, key) => (
    <div className="mb-6">
      <h6 className="font-semibold mb-2">{title}</h6>
      {draft[key].map((item, i) => (
        <div key={`${key}-${i}`} className="flex col-12 items-start gap-2 mb-2">
          <Textarea
            value={item}
            onChange={(e) => updateListItem(key, i, e.target.value)}
            className="text-sm"
            rows={2}
          />
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer mt-1"
            onClick={() => removeListItem(key, i)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer mt-1"
        onClick={() => addListItem(key)}
      >
        <Plus className="w-4 h-4 mr-1" /> Add point
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-[900px] h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invoice Footer Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Material Specification */}
          <div>
            <h6 className="font-semibold mb-2">Material Specification</h6>
            <div className="space-y-2">
              {draft.materialSpecs.map((row, i) => (
                <div key={`spec-${i}`} className="grid grid-cols-[1fr_2fr_1fr_auto] gap-2 items-center">
                  <Input
                    placeholder="Item"
                    value={row.item}
                    onChange={(e) => updateSpecRow(i, "item", e.target.value)}
                  />
                  <Input
                    placeholder="Specification"
                    value={row.spec}
                    onChange={(e) => updateSpecRow(i, "spec", e.target.value)}
                  />
                  <Input
                    placeholder="Brand"
                    value={row.brand}
                    onChange={(e) => updateSpecRow(i, "brand", e.target.value)}
                  />
                  <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => removeSpecRow(i)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="cursor-pointer mt-2" onClick={addSpecRow}>
              <Plus className="w-4 h-4 mr-1" /> Add material
            </Button>
          </div>

          {renderEditableList("Items Not Included In The Estimate", "itemsNotIncluded")}
          {renderEditableList("Services", "services")}
          {renderEditableList("Terms And Conditions", "termsAndConditions")}
          {renderEditableList("Why Choose Squarewood Interiors?", "whyChooseUs")}

          {/* Bank Details */}
          <div>
            <h6 className="font-semibold mb-2">Bank Details</h6>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1">Banking Name</Label>
                <Input value={draft.bankDetails.bankingName} onChange={(e) => updateBank("bankingName", e.target.value)} />
              </div>
              <div>
                <Label className="mb-1">Bank Name</Label>
                <Input value={draft.bankDetails.bankName} onChange={(e) => updateBank("bankName", e.target.value)} />
              </div>
              <div>
                <Label className="mb-1">Branch Name</Label>
                <Input value={draft.bankDetails.branchName} onChange={(e) => updateBank("branchName", e.target.value)} />
              </div>
              <div>
                <Label className="mb-1">Account No.</Label>
                <Input value={draft.bankDetails.accountNo} onChange={(e) => updateBank("accountNo", e.target.value)} />
              </div>
              <div>
                <Label className="mb-1">IFSC</Label>
                <Input value={draft.bankDetails.ifsc} onChange={(e) => updateBank("ifsc", e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="secondary" className="cursor-pointer" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => {
              onSave(draft);
              onOpenChange(false);
            }}
          >
            Save & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDetailsDialog;