import axios from "axios";
import type { Note, NoteFormData } from "@/types/note";

interface FetchNotesParams {
  search?: string;
  page: number;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchNotes = (params: FetchNotesParams) =>
  api.get<NotesResponse>("/notes", { params }).then((res) => res.data);
export const fetchNoteById = (id: number) =>
  api.get<Note>(`/notes/${id}`).then((res) => res.data);
export const deleteNote = (id: number) =>
  api.delete<Note>(`/notes/${id}`).then((res) => res.data);
export const createNote = (note: NoteFormData) =>
  api.post<Note>("/notes", note).then((res) => res.data);
