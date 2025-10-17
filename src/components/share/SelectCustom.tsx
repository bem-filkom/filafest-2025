"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

interface SelectCustomProps {
  title: string;
  items: string[] | { label: string; value: string }[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function SelectCustom({ title, items, placeholder, onChange }: SelectCustomProps) {
  const isStringArray = typeof items[0] === "string";

  return (
    <div className="space-y-3">
      <Label>{title}</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full border-border">
          <SelectValue placeholder={placeholder || `Pilih ${title}`} />
        </SelectTrigger>
        <SelectContent className="border-border outline">
          <SelectGroup>
            <SelectLabel>{title}</SelectLabel>
            {items.map((item, index) => {
              const label = isStringArray ? (item as string) : (item as any).label;
              const value = isStringArray ? (item as string).toLowerCase() : (item as any).value;
              return (
                <SelectItem key={index} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
