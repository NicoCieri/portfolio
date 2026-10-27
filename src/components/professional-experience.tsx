import {
  professionalExperience,
  type EmployerExperience,
  type ExperiencePeriod as Period,
} from "@/content/experience";

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
}

function ExperiencePeriod({ start, end }: Period) {
  return (
    <>
      <time dateTime={start}>{formatMonth(start)}</time>
      {" – "}
      {end ? <time dateTime={end}>{formatMonth(end)}</time> : "present"}
    </>
  );
}

function ExperienceEntry({ entry }: { entry: EmployerExperience }) {
  const progression = entry.roles.length > 1;

  return (
    <li className={`grid grid-cols-1 gap-3 border-b border-border last:border-b-0 min-[801px]:grid-cols-[minmax(0,0.25fr)_minmax(0,0.75fr)] min-[801px]:gap-10 ${entry.recent ? "py-8 min-[801px]:py-10" : "py-6"}`}>
      <p className="font-mono text-meta leading-[1.6] text-muted min-[801px]:pt-1">
        <ExperiencePeriod {...entry.period} />
      </p>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className={`leading-tight font-medium tracking-[-0.025em] ${entry.recent ? "text-[28px] min-[801px]:text-[32px]" : "text-[22px]"}`}>
            {entry.employer}
          </h2>
          {!entry.period.end && <span className="text-meta text-accent-mint">Current employer</span>}
        </div>
        <ol className={`mt-3 list-none p-0 ${progression ? "space-y-5" : ""}`} aria-label={`Roles at ${entry.employer}`}>
          {entry.roles.map((role) => (
            <li key={`${role.title}-${role.period.start}`}>
              <h3 className="text-body leading-[1.6] font-medium">{role.title}</h3>
              {progression && (
                <p className="mt-1 font-mono text-meta leading-[1.6] text-muted">
                  <ExperiencePeriod {...role.period} />
                </p>
              )}
              <p className="mt-2 max-w-[72ch] text-body leading-[1.7] text-secondary">{role.summary}</p>
            </li>
          ))}
        </ol>
        {entry.teaching && (
          <div className="mt-6 border-l-2 border-accent-mint/30 pl-4">
            <p className="text-meta leading-[1.6] text-muted">Concurrent teaching appointment</p>
            <h3 className="mt-2 text-body leading-[1.6] font-medium">{entry.teaching.institution}</h3>
            <p className="text-small leading-[1.6] text-secondary">{entry.teaching.title}</p>
            <p className="mt-1 font-mono text-meta leading-[1.6] text-muted">
              <ExperiencePeriod {...entry.teaching.period} />
              <span className="font-sans"> · Alongside {entry.employer}</span>
            </p>
            {entry.teaching.summary && <p className="mt-2 max-w-[72ch] text-small leading-[1.7] text-secondary">{entry.teaching.summary}</p>}
          </div>
        )}
      </div>
    </li>
  );
}

export function ProfessionalExperience() {
  return (
    <section className="page-shell mt-4 pt-8 pb-10 min-[541px]:mt-6 min-[541px]:pt-12 min-[541px]:pb-16" id="experience" aria-labelledby="experience-heading">
      <p className="text-body text-secondary">Professional Experience</p>
      <div className="mt-5 grid grid-cols-1 gap-6 min-[901px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] min-[901px]:items-end min-[901px]:gap-18">
        <h1 className="max-w-[22ch] text-[clamp(32px,3.6vw,48px)] leading-[1.15] font-medium tracking-[-0.04em]" id="experience-heading">
          Experience shaped by complex products.
        </h1>
        <p className="max-w-[52ch] text-lead leading-[1.7] text-secondary">
          From building interfaces to guiding technical decisions, I stay close
          to implementation while supporting the teams around me.
        </p>
      </div>
      <ol className="mt-8 list-none border-t border-border p-0 min-[801px]:mt-10" aria-label="Employment history, most recent first">
        {professionalExperience.map((entry) => <ExperienceEntry key={entry.employer} entry={entry} />)}
      </ol>
    </section>
  );
}
