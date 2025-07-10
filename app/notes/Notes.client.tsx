"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "@/lib/api";
import { useState } from "react";
import { NotesResponse } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";

interface Props {
  initialData: NotesResponse;
}

export default function NotesClient({ initialData }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { search, page }],
    queryFn: () => fetchNotes({ search, page }),
    initialData,
  });

  const mutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalSuccess = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  };

  return (
    <div>
      <header>
        <SearchBox search={search} setSearch={handleSearchChange} />
        <button onClick={() => setIsModalOpen(true)}>Create note</button>
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
        <NoteList notes={data.notes} onDelete={handleDelete} />
      ) : (
        <p>No notes found</p>
      )}

      {isModalOpen && (
        <NoteModal onClose={handleModalClose} onSuccess={handleModalSuccess} />
      )}
    </div>
  );
}
