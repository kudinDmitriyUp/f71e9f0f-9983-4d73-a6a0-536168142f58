import { motion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { useButtonClick } from "@/hooks/useButtonClick";
import useBlogPosts from "@/hooks/useBlogPosts";

type BlogItem = {
  title: string;
  excerpt: string;
  authorName: string;
  authorImageSrc: string;
  date: string;
  tags: string[];
  imageSrc: string;
  href?: string;
  onClick?: () => void;
};

const BlogCardItem = ({ item }: { item: BlogItem }) => {
  const handleClick = useButtonClick(item.href, item.onClick);

  return (
    <article
      className="card group flex flex-col gap-5 p-5 rounded cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-4/3 rounded overflow-hidden">
        <ImageOrVideo
          imageSrc={item.imageSrc}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
          <button
            className="primary-button flex items-center justify-center size-12 rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 cursor-pointer"
            onClick={handleClick}
          >
            <ArrowUpRight className="size-5 text-primary-cta-text" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ImageOrVideo
              imageSrc={item.authorImageSrc}
              className="size-5 rounded-full object-cover"
            />
            <span className="text-xs opacity-75">
              {item.authorName} • {item.date}
            </span>
          </div>

          <h3 className="text-xl font-medium leading-tight">{item.title}</h3>
          <p className="text-sm leading-tight opacity-75">{item.excerpt}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="primary-button rounded px-2 py-0.5 text-xs text-primary-cta-text"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

type BlogTagCardsProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items?: BlogItem[];
};

const BlogTagCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items: itemsProp,
}: BlogTagCardsProps) => {
  const { posts, isLoading } = useBlogPosts();
  const isFromApi = posts.length > 0;
  const items = isFromApi
    ? posts.map((p) => ({
        title: p.title,
        excerpt: p.excerpt,
        authorName: p.authorName,
        authorImageSrc: p.authorAvatar,
        date: p.date,
        tags: [p.category],
        imageSrc: p.imageSrc,
        onClick: p.onBlogClick,
      }))
    : itemsProp;

  if (isLoading && !itemsProp) {
    return (
      <section aria-label="Blog section" className="py-20">
        <div className="w-content-width mx-auto flex justify-center">
          <Loader2 className="size-8 animate-spin text-foreground" strokeWidth={1.5} />
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section aria-label="Blog section" className="py-20">
      <div className="w-content-width mx-auto flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 md:gap-2">
          <span className="card rounded px-3 py-1 text-sm">{tag}</span>

          <TextAnimation
            text={title}
            variant="slide-up"
            tag="h2"
            className="text-6xl font-medium text-center text-balance"
          />

          <TextAnimation
            text={description}
            variant="slide-up"
            tag="p"
            className="md:max-w-6/10 text-lg leading-tight text-center"
          />

          {(primaryButton || secondaryButton) && (
            <div className="flex flex-wrap justify-center gap-3 mt-1 md:mt-2">
              {primaryButton && <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />}
              {secondaryButton && <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GridOrCarousel>
            {items.map((item, index) => (
              <BlogCardItem key={index} item={item} />
            ))}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogTagCards;
