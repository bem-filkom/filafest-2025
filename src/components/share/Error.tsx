import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Terjadi Kesalahan</h1>
      <p className="text-gray-400 mb-6 text-center max-w-md">Maaf, ada sesuatu yang tidak beres. Silakan coba lagi atau hubungi admin untuk bantuan.</p>
      <div className="flex gap-3">
        <Button className="bg-red-600 hover:bg-red-700" onClick={() => window.location.reload()}>
          Coba Lagi
        </Button>
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800" onClick={() => {}}>
          Hubungi Admin
          <ArrowUpRight />
        </Button>
      </div>
    </div>
  );
}
