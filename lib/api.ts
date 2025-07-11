import axios from "axios";
import { Note, NoteFormData } from "@/types/note";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = (params: {
  search?: string;
  page: number;
}): Promise<NotesResponse> => {
  const cleanParams = { ...params };
  if (!cleanParams.search) {
    delete cleanParams.search;
  }

  return api
    .get<NotesResponse>("/notes", { params: cleanParams })
    .then((res) => res.data);
};

export const fetchNoteById = (id: number): Promise<Note> =>
  api.get<Note>(`/notes/${id}`).then((res) => res.data);

export const deleteNote = (id: number): Promise<Note> =>
  api.delete<Note>(`/notes/${id}`).then((res) => res.data);

export const createNote = (note: NoteFormData): Promise<Note> =>
  api.post<Note>("/notes", note).then((res) => res.data);
