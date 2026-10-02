"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function CreateCourseForm() {
  const t = useTranslations("instructor");
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
      className="panel mt-6 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (slug && titleId) create.mutate({ slug, titleId });
      }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{t("formTitle")}</p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <label className="grid gap-2 text-sm">
          {t("slugLabel")}
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={t("slugPh")}
            className="field" />
        </label>
        <label className="grid gap-2 text-sm">
          {t("titleLabel")}
          <input value={titleId} onChange={(e) => setTitleId(e.target.value)} placeholder={t("titlePh")}
            className="field" />
        </label>
        <div className="flex items-end">
          <button disabled={create.isPending} className="btn-primary w-full justify-center px-5 py-2.5 text-sm disabled:opacity-50">
            {create.isPending ? t("saving") : t("create")}
          </button>
        </div>
      </div>
      {create.isError && <p className="mt-2 text-sm font-semibold text-danger">{t("errSave")}</p>}
    </form>
  );
}
