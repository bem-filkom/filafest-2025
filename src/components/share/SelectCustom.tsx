import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

interface SelectCustomProps {
  title: string;
  items: { label: string; value: string }[]; // Disederhanakan, karena form akan selalu butuh label & value
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string; // <-- TAMBAHKAN INI
  disabled?: boolean; // <-- Tambahkan ini untuk status loading
}

export function SelectCustom({ title, items, placeholder, onChange, value, disabled }: SelectCustomProps) {
  return (
    <div className="space-y-3">
      <Label>{title}</Label>
      {/* TAMBAHKAN value={value} dan disabled={disabled} */}
      <Select onValueChange={onChange} value={value} disabled={disabled}>
        <SelectTrigger className="w-full border-border">
          <SelectValue placeholder={placeholder || `Pilih ${title}`} />
        </SelectTrigger>
        <SelectContent className="border-border outline">
          <SelectGroup>
            <SelectLabel>{title}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
