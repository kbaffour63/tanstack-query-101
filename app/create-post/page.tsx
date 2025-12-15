"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const createPost = async (newPost) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  return response.json();
};

export default function Page() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries;
      ["posts"];
      const previousPosts = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (old) => [...old]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title, body: "This is a new post" });
  };
  return (
    <>
      <form>
        <input
          type="text"
          className="bg-red-400"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSubmit}>create post</button>
      </form>
    </>
  );
}
