import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

type NotePageProps = {
  params: {
    id: string;
  };
};

export default async function NoteDetailsPage({ params }: NotePageProps) {
  const id = Number(params.id);
  const note = await fetchNoteById(id);
  return <NoteDetailsClient initialNote={note} />;
}
