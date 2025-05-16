import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Text, View } from "./Themed";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type PostProps = {
  author: string;
  content: string;
  timestamp?: string;
  image: any;
  liked?: boolean;
  pinned?: boolean;
  onLike?: () => void;
  onPin?: () => void;
  onComment?: (comment: string) => void;
  likeCount?: number;
};

export default function Post({
  author,
  content,
  timestamp,
  image,
  liked = false,
  pinned = false,
  onLike,
  onPin,
  likeCount = 0,
  onComment,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const [isPinned, setIsPinned] = useState(pinned);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      onComment?.(commentInput);
      setCommentInput("");
      setCommentModalVisible(false);
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={image} style={styles.profileImage} />
        <Text style={styles.authorText}>{author}</Text>
      </View>
      <Text style={styles.contentText}>{content}</Text>
      {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}

      <View style={styles.actionsContainer}>
        <Pressable
          style={styles.actionButton}
          onPress={() => {
            setIsLiked(!isLiked);
            onLike?.();
          }}
          >
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            size={20}
            color={isLiked ? "red" : "#000"}
          />
          <Text style={styles.actionText}>
            Like{likeCount ? ` (${likeCount})` : ""}
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => setCommentModalVisible(true)}
        >
          <FontAwesome5 name="comment" size={20} color="#000" />
          <Text style={styles.actionText}>Comment</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => {
            setIsPinned(!isPinned);
            onPin?.();
          }}
        >
          <AntDesign
            name={isPinned ? "pushpin" : "pushpino"}
            size={20}
            color="#000"
          />
          <Text style={styles.actionText}>Pin</Text>
        </Pressable>
      </View>

      <Modal
        visible={commentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Write a comment</Text>
            <TextInput
              value={commentInput}
              onChangeText={setCommentInput}
              placeholder="Type your comment..."
              style={styles.input}
              multiline
            />
            <Button title="Submit" onPress={handleCommentSubmit} />
            <Button title="Cancel" color="gray" onPress={() => setCommentModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  authorText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  contentText: {
    fontSize: 14,
    color: "#000",
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: "#000",
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  actionText: {
    color: "#000",
    marginLeft: 8,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    minHeight: 60,
    textAlignVertical: "top",
  },
});
