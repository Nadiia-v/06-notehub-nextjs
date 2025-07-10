import axios from "axios";
import type { NoteLoad } from "@/types/note";

interface FetchNotesParams {
  search?: string;
  page: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchNotes = (params: FetchNotesParams) =>
  api.get("/notes", { params }).then((res) => res.data);
export const fetchNoteById = (id: number) =>
  api.get(`/notes/${id}`).then((res) => res.data);
export const deleteNote = (id: number) => api.delete(`/notes/${id}`);
export const createNote = (note: NoteLoad) => api.post("/notes", note);
