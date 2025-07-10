import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const id = Number(params.id);
  const initialNote = await fetchNoteById(id);
  return <NoteDetailsClient initialNote={initialNote} />;
}
