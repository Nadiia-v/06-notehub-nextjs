import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default async function NotesPage() {
  const initialData = await fetchNotes({ page: 1 });
  return (
    <TanStackProvider>
      <NotesClient initialData={initialData} />
    </TanStackProvider>
  );
}
