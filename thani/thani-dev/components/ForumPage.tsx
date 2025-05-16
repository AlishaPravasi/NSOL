import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "./Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import Post from "./Post";
import { useState } from "react";

type ForumPostsProps = {
  forum: string;
};

type PostType = {
  id: string;
  author: string;
  content: string;
  timestamp?: string;
  image: any;
  liked?: boolean;
  pinned?: boolean;
  comments?: string[]; // Can be expanded to full objects later
};

const conservationistPosts: PostType[] = [
  {
    id: "1",
    author: "Leo",
    content: "Great meetup today, thanks Conservationists Club for hosting 🙌",
    timestamp: "4h ago",
    image: require("../assets/images/pfp.jpg"),
    likeCount: 0,
  },
  {
    id: "2",
    author: "Diego",
    content: "New conservation volunteering opportunity posted by Denver Parks & Rec!",
    timestamp: "25m ago",
    image: require("../assets/images/pfp.jpg"),
    likeCount: 0,
  },
  {
    id: "3",
    author: "Elena",
    content: "Helped clean up Bear Creek this weekend—feeling proud 🌱",
    timestamp: "1d ago",
    image: require("../assets/images/pfp.jpg"),
    likeCount: 0,
  },
];

const birdWatcherPosts: PostType[] = [
  {
    id: "4",
    author: "Jamal",
    content: "Can someone ID this bird I spotted near Sloan’s Lake? (pic below)",
    timestamp: "2h ago",
    image: require("../assets/images/pfp.jpg"),
    likeCount: 0,
  },
  {
    id: "5",
    author: "Sofia",
    content: "Saw a bald eagle at Washington Park today! 🦅",
    timestamp: "10m ago",
    image: require("../assets/images/pfp.jpg"),
    likeCount: 0,
  },
  {
    id: "6",
    author: "Mina",
    content: "Anyone going to the bird migration watch event tomorrow?",
    timestamp: "3h ago",
    image: require("../assets/images/pfp.jpg"),
    likeCount: 0,
  },
];

const hikingBikingPosts: PostType[] = [
  {
    id: "7",
    author: "Aria",
    content: "Anyone want to do the Cherry Creek Trail on Saturday? 🚲",
    timestamp: "1h ago",
    image: require("../assets/images/pfp.jpg"),
    likeCount: 0,
  },
  {
    id: "8",
    author: "Tasha",
    content: "Looking to start a weekly bike group—intermediate level riders welcome!",
    timestamp: "3h ago",
    image: require("../assets/images/pfp.jpg"),
    likeCount: 0,
  },
  {
    id: "9",
    author: "Rohan",
    content: "What’s the best scenic route for beginners near Red Rocks?",
    timestamp: "2d ago",
    image: require("../assets/images/pfp.jpg"),
    likeCount: 0,
  },
];

export default function ForumPosts({ forum }: { forum: string }) {
  const colorScheme = useColorScheme() || "light";
  const normalizedForum = forum.toLowerCase();
  
  const posts =
  normalizedForum.includes("conservation") ? conservationistPosts :
  normalizedForum.includes("bird") ? birdWatcherPosts :
  hikingBikingPosts;

  const [postState, setPostState] = useState<PostType[]>(
    [...posts].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
  );
  
  const toggleLike = (id: string) => {
    setPostState((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likeCount: post.liked
                ? Math.max(0, (post.likeCount || 1) - 1)
                : (post.likeCount || 0) + 1,
            }
          : post
      )
    );
  };  
  
  const togglePin = (id: string) => {
    setPostState((prev) => {
      const updated = prev.map((post) =>
        post.id === id ? { ...post, pinned: !post.pinned } : post
      );
      return [...updated].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    });
  };  
  
  const addComment = (id: string, comment: string) => {
    setPostState((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };
  
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Post
            author={item.author}
            content={item.content}
            timestamp={item.timestamp}
            image={item.image}
            liked={item.liked}
            likeCount={item.likeCount}
            pinned={item.pinned}
            onLike={() => toggleLike(item.id)}
            onPin={() => togglePin(item.id)}
            onComment={(comment: string) => addComment(item.id, comment)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20, // Extra space so it's not hidden behind the tab bar
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});
