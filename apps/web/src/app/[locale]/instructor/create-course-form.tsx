"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function CreateCourseForm() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [slug, setSlug] = useState("");
  const [titleId, setTitleId] = useState("");
  const create = useMutation(
    trpc.courses.create.mutationOptions({
      onSuccess: () => {
        setSlug("");
        setTitleId("");
        queryClient.invalidateQueries({ queryKey: trpc.courses.list.queryKey() });
      },
    })
  );

  return (
    <form
      className="mt-6 rounded-2xl border border-ink/10 bg-card p-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (slug && titleId) create.mutate({ slug, titleId });
      }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Kursus baru</p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <label className="grid gap-2 text-sm">
          Slug
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="mis. akuntansi-dasar"
            className="field" />
        </label>
        <label className="grid gap-2 text-sm">
          Judul (ID)
          <input value={titleId} onChange={(e) => setTitleId(e.target.value)} placeholder="mis. Akuntansi Dasar"
            className="field" />
        </label>
        <div className="flex items-end">
          <button disabled={create.isPending} className="btn-primary w-full justify-center px-5 py-2.5 text-sm disabled:opacity-50">
            {create.isPending ? "Menyimpan…" : "Buat draf"}
          </button>
        </div>
      </div>
      {create.isError && <p className="mt-2 text-sm text-action">Gagal menyimpan. Coba lagi.</p>}
    </form>
  );
}
