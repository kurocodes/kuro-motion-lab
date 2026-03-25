import { ComponentCard } from "../components/ui/ComponentCard";
import { componentsData } from "../data/componentsData";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <section className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--color-muted)">
          Kuro Motion Lab
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-(--color-text) sm:text-5xl">
          A minimal component showcase built for calm, tactile exploration.
        </h1>
        <p className="mt-5 text-base leading-7 text-(--color-muted) sm:text-lg">
          Browse polished UI patterns, open each component in a dedicated
          sandbox, and keep the browsing chrome visually separate from the
          component styling itself.
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {componentsData.map((component) => (
          <ComponentCard key={component.slug} component={component} />
        ))}
      </section>
    </div>
  );
}
