import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Note } from "@/types/note";

interface PageParams {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: PageParams) {
  const id = Number(params.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const note = queryClient.getQueryData<Note>(["note", id]);
  if (!note) return <div>Note not found</div>;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient initialNote={note} />
    </HydrationBoundary>
  );
}
