import { StaggeredText } from "./StaggeredText";

export default function RevealLinks() {
  return (
    <section className="links grid h-[80%] place-content-center place-items-center">
      <StaggeredText value="Twitter" />
      <StaggeredText value="LinkedIn" />
      <StaggeredText value="Instagram" />
      <StaggeredText value="GitHub" />
    </section>
  );
}