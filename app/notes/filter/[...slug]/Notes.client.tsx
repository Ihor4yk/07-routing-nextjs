"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, isNoteTag } from "@/lib/api";
import { NoteTag } from "@/types/note";

import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const safeTag: NoteTag | undefined = tag && isNoteTag(tag) ? tag : undefined;

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["notes", safeTag ?? "all", searchValue, currentPage],
    queryFn: () => fetchNotes(searchValue, currentPage, perPage, safeTag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = useDebouncedCallback((val: string) => {
    setSearchValue(val);
    setCurrentPage(1);
  }, 500);

  const openModalForm = () => setIsModalOpen(true);
  const closeModalForm = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchValue} onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        )}
        <button className={css.button} onClick={openModalForm}>
          Create note +
        </button>
      </header>

      {isFetching && <p className={css.fetching}>Refreshing notes...</p>}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModalForm}>
          <NoteForm onSuccess={closeModalForm} />
        </Modal>
      )}
    </div>
  );
}
