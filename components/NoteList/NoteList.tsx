import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
          <div>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button className={css.button} onClick={() => onDelete(note.id)}>
              Delete a note
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
