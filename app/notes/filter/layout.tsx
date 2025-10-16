import css from "./LayoutNotes.module.css";

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function LayoutNotes({ children, sidebar }: NotesLayoutProps) {
  return (
    <section className={css.notesWrapper}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.container}>{children}</div>
    </section>
  );
}
