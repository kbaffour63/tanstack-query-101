"use client";

import { useQuery } from "@tanstack/react-query";
import PostById from "./postid/page";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Error fetching posts");
  return response.json();
};

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occured {error.message}</p>;

  return (
    <>
      {data?.map((post: any) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </>
  );
}
