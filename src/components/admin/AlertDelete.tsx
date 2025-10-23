import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { api } from "@/config/axios";
import { toast } from "sonner";
import { useState } from "react";

interface DeletableItem {
  id: string;
  name: string;
}

interface AlertDeleteProps<T extends DeletableItem> {
  item: T;
  endpoint: string;
  onSuccess: () => void;
}

export default function AlertDelete<T extends { id: string; name: string }>({ item, endpoint, onSuccess }: AlertDeleteProps<T>) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`${endpoint}/${item.id}`);
      toast.success(`${item.name} berhasil dihapus!`);
      onSuccess();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Gagal menghapus item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-800 hover:bg-red-900" type="button">
          Hapus <Trash className="ml-2 h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini akan menghapus <strong>{item.name}</strong> secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700">
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
