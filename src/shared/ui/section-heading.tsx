type SectionHeadingProps = {
  kicker: string;
  title: string;
  text?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  kicker,
  title,
  text,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align}`}>
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
