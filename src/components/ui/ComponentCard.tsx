import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ComponentMeta } from "../../data/componentsData";

type ComponentCardProps = {
  component: ComponentMeta;
};

export function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Link
      to={`/${component.slug}`}
      className="group overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-(--color-border-strong) hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.28)]"
    >
      {/* <div className="border-b border-(--color-border) bg-(--color-preview) p-4">
        <img
          src={component.preview}
          alt={`${component.name} preview`}
          className="h-52 w-full rounded-2xl object-cover"
          loading="lazy"
        />
      </div> */}

      <div className="flex items-center justify-between px-5 py-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-(--color-text)">
            {component.name}
          </h2>
          <p className="description-preview mt-1 text-sm text-(--color-muted)">
            {component.description}
          </p>
        </div>

        <span
          className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center 
        rounded-full border border-(--color-border) bg-(--color-surface-strong) 
        text-(--color-muted) transition-colors duration-200 group-hover:text-(--color-text)"
        >
          <ArrowUpRight size={18} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}
