export function GradientText({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <span>{children}</span>
      <span className="gradient-text-overlay" aria-hidden="true">{children}</span>
    </span>
  );
}
