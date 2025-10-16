"use client";

import { NoteTag } from "@/types/note";
import css from "./TagsMenu.module.css";
import { useState } from "react";
import Link from "next/link";

interface TagsMenuProps {
  tags: NoteTag[];
}

export default function TagsMenu({ tags }: TagsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href={"/notes/filter/All"} className={css.menuLink} onClick={close}>
              All
            </Link>
          </li>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={close}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
