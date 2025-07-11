"use client";

import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useState, useEffect } from "react";
import type { Note } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import css from "./Page.module.css";

interface Props {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
}

export default function NotesClient({ initialData }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes({ search: debouncedSearch, page }),
    initialData,
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleSearchChange} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note
        </button>
      </header>

      {data?.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching notes</p>}

      {data?.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {isModalOpen && <NoteModal onClose={handleModalClose} />}
    </div>
  );
}
