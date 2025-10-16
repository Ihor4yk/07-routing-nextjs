import axios from "axios";
import type { CreateNoteRequest, Note, NoteTag } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const allTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export function isNoteTag(value: unknown): value is NoteTag {
  return typeof value === "string" && allTags.includes(value as NoteTag);
}

export const fetchNotes = async (
  searchValue?: string,
  page?: number,
  perPage?: number,
  tag?: NoteTag,
  sortBy?: string,
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      search: searchValue,
      page,
      perPage,
      tag,
      sortBy,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const createNote = async (data: CreateNoteRequest): Promise<Note> => {
  const response = await axios.post<Note>("/notes", data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const getTags = async (): Promise<NoteTag[]> => {
  return allTags;
};
