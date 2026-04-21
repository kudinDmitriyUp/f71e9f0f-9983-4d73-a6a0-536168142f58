import { cls } from "@/lib/utils";

type ContentItem =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "numbered-list"; items: string[] };

type ContentSection = {
  heading: string;
  content: ContentItem[];
};

const PolicyContent = ({
  title,
  subtitle,
  sections,
}: {
  title: string;
  subtitle?: string;
  sections: ContentSection[];
}) => {
  return (
    <article aria-label="Policy content" className="w-content-width mx-auto pt-40 pb-20">
      <div className="md:max-w-1/2 mx-auto flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-medium leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm opacity-50">{subtitle}</p>
          )}
        </div>

        <div className="w-full h-px bg-foreground/20" />

        <div className="flex flex-col gap-5">
          {sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="text-xl md:text-2xl font-medium leading-tight">{section.heading}</h2>
              {section.content.map((item, i) => {
                if (item.type === "paragraph") {
                  return (
                    <p key={i} className="text-sm md:text-base opacity-75 leading-relaxed">
                      {item.text}
                    </p>
                  );
                }

                const ListTag = item.type === "numbered-list" ? "ol" : "ul";

                return (
                  <ListTag
                    key={i}
                    className={cls(
                      "flex flex-col gap-3 pl-5 text-sm md:text-base opacity-75 leading-relaxed",
                      item.type === "numbered-list" ? "list-decimal" : "list-disc"
                    )}
                  >
                    {item.items.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ListTag>
                );
              })}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PolicyContent;
