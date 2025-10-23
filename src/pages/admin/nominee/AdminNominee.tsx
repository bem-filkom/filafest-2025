import SidebarAdmin from "@/components/admin/SidebarAdmin";
import Error from "@/components/share/Error";
import Loading from "@/components/share/Loading";
import { useFetch } from "@/hooks/use-fetch";
import type { Nomination } from "@/types/nomination.type";

export default function AdminNominee() {
  const { data, loading, error } = useFetch<Nomination[]>("/nominations");

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (data)
    return (
      <SidebarAdmin>
        <h1 className="text-3xl font-semibold mb-2">List Nominasi</h1>
        <div className="grid grid-cols-3 gap-2">
          {data.map((item, index) => (
            <article key={index} className="p-4 border border-border rounded">
              {item.name}
            </article>
          ))}
        </div>
      </SidebarAdmin>
    );
}
