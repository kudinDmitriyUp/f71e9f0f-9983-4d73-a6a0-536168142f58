import { useEffect, useState } from "react";
import { fetchBlogPosts, defaultPosts, type BlogPost } from "@/lib/api/blog";

const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch posts"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, isLoading, error };
};

export default useBlogPosts;
export type { BlogPost };
