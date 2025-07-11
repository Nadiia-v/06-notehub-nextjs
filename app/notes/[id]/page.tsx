import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Note } from "@/types/note";

interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: PageParams) {
  const { id } = await params;
  const noteId = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const note = queryClient.getQueryData<Note>(["note", noteId]);
  if (!note) return null;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient initialNote={note} />
    </HydrationBoundary>
  );
}
