interface SectionHeadProps {
  title: string;
  lede?: string;
}

/** S2 hanging section head: the title floats in negative space, one line beneath it. No eyebrow, no rule. */
const SectionHead = ({ title, lede }: SectionHeadProps) => (
  <header className="section-head">
    <h2 className="reveal">{title}</h2>
    {lede && (
      <p className="reveal" style={{ "--i": 1 } as React.CSSProperties}>
        {lede}
      </p>
    )}
  </header>
);

export default SectionHead;
