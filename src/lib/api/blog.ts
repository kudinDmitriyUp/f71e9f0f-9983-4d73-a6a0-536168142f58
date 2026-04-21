type BlogPost = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt?: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  onBlogClick?: () => void;
};

const defaultPosts: BlogPost[] = [
  {
    id: "1",
    category: "Design",
    title: "UX review presentations",
    excerpt: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    imageSrc: "/placeholders/placeholder-1.webp",
    imageAlt: "Abstract design with purple and silver tones",
    authorName: "Olivia Rhye",
    authorAvatar: "/placeholders/placeholder-1.webp",
    date: "20 Jan 2025",
  },
  {
    id: "2",
    category: "Development",
    title: "Building scalable applications",
    excerpt: "Learn the best practices for building applications that can handle millions of users.",
    imageSrc: "/placeholders/placeholder-2.webp",
    imageAlt: "Development workspace",
    authorName: "John Smith",
    authorAvatar: "/placeholders/placeholder-2.webp",
    date: "18 Jan 2025",
  },
  {
    id: "3",
    category: "Marketing",
    title: "Content strategy essentials",
    excerpt: "Discover how to create a content strategy that drives engagement and conversions.",
    imageSrc: "/placeholders/placeholder-3.webp",
    imageAlt: "Marketing strategy board",
    authorName: "Sarah Johnson",
    authorAvatar: "/placeholders/placeholder-3.webp",
    date: "15 Jan 2025",
  },
  {
    id: "4",
    category: "Product",
    title: "Product management 101",
    excerpt: "Everything you need to know to become an effective product manager in 2025.",
    imageSrc: "/placeholders/placeholder-1.webp",
    imageAlt: "Product planning session",
    authorName: "Mike Davis",
    authorAvatar: "/placeholders/placeholder-1.webp",
    date: "12 Jan 2025",
  },
];

const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const projectId = import.meta.env.VITE_PROJECT_ID;

  if (!apiUrl || !projectId) {
    console.warn("VITE_API_URL or VITE_PROJECT_ID not configured");
    return [];
  }

  try {
    const url = `${apiUrl}/posts/${projectId}?status=published`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`API request failed with status ${response.status}`);
      return [];
    }

    const resp = await response.json();
    const data = resp.data;

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((post: Record<string, unknown>) => ({
      id: (post.id as string) || String(Math.random()),
      category: (post.category as string) || "General",
      title: (post.title as string) || "Untitled",
      excerpt: (post.excerpt as string) || (post.content as string)?.slice(0, 30) || "",
      imageSrc: (post.imageUrl as string) || "/placeholders/placeholder-1.webp",
      imageAlt: (post.imageAlt as string) || (post.title as string) || "",
      authorName: (post.author as Record<string, string>)?.name || "Anonymous",
      authorAvatar: (post.author as Record<string, string>)?.avatar || "/placeholders/placeholder-1.webp",
      date: (post.date as string) || (post.createdAt as string) || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export { fetchBlogPosts, defaultPosts, type BlogPost };
