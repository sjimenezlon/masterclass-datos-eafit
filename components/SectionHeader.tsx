type Props = {
  number: string;
  tag: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ number, tag, title, subtitle }: Props) {
  return (
    <header className="mb-12 max-w-4xl">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-[#C8A24C]">MÓDULO {number}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-[#C8A24C]/40 to-transparent" />
        <span className="pill">{tag}</span>
      </div>
      <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#C9D2E8]">{subtitle}</p>
      )}
    </header>
  );
}
