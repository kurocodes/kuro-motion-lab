export function GradientCard({ src }: { src: string }) {
  return (
    <div className="relative w-full h-full place-content-center place-items-center">
      <img
        src={src}
        className="absolute inset-0 w-1/2 h-1/2 object-cover translate-y-2.5 scale-[1.25] opacity-40 dark:opacity-20 blur-md"
      />
      <img
        src={src}
        className="relative w-1/2 h-1/2 object-cover rounded-full"
      />
    </div>
  );
}
