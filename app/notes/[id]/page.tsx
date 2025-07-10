import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const note = await fetchNoteById(+params.id);
  return <NoteDetailsClient initialNote={note} />;
}
