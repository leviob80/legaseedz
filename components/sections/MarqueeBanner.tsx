export function MarqueeBanner() {
  const items = [
    'Legacy Genetics',
    'Seeds',
    'Apparel',
    'Legaseedz',
    'St. Louis Roots',
    'Local Growers',
    'Verified Lineage',
    'Small Batch',
    'Legacy Genetics',
    'Seeds',
    'Apparel',
    'Legaseedz',
    'St. Louis Roots',
    'Local Growers',
    'Verified Lineage',
    'Small Batch',
  ]

  return (
    <div className="overflow-hidden border-y border-border py-3.5 bg-card">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 mx-6 text-[10px] tracking-[0.25em] uppercase text-muted-foreground/50"
          >
            {item}
            <span className="text-primary/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
