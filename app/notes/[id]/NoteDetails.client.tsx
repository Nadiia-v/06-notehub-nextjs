"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  initialNote: Note;
}

export default function NoteDetailsClient({
  initialNote,
}: NoteDetailsClientProps) {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    initialData: initialNote,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2 className={css.h2}>{data.title}</h2>
        </div>
        <div className={css.content}>{data.content}</div>
        <div className={css.date}>{data.createdAt}</div>
      </div>
    </div>
  );
}
