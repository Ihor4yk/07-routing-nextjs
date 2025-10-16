import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNotes, isNoteTag } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesByTag({ params }: NotesByTagProps) {
  const resolvedParams = await params;
  const tagParam = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : "all";

  const tag = tagParam === "all" ? undefined : isNoteTag(tagParam) ? tagParam : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag ?? "all", "", 1],
    queryFn: () => fetchNotes("", 1, 12, tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
