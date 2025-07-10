export interface Note {
  id: number;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  createdAt: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NoteLoad {
  title: string;
  content: string;
  tag: string;
}
