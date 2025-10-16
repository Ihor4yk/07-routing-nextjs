"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <Modal>
      <div className={css.container}>
        <button className={css.backBtn} onClick={handleClose}>
          ✕
        </button>
        <h2 className={css.title}>{data.title}</h2>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{new Date(data.createdAt).toLocaleString()}</p>
      </div>
    </Modal>
  );
}
