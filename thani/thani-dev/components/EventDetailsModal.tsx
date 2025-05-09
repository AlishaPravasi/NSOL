// 📍 Event Details Modal Logic
// This should be added to your `home.tsx` file to support viewing event details

import React, { useState } from "react";
import { Modal, View, Text, Image, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: any;
}

interface EventDetailsModalProps {
  event: Event | null;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  const [comments, setComments] = useState<{ text: string; timestamp: number }[]>([]);
  const [newComment, setNewComment] = useState("");

  React.useEffect(() => {
    if (event) loadComments();
  }, [event]);

  const loadComments = async () => {
    try {
      const stored = await AsyncStorage.getItem(`event_comments_${event?.id}`);
      if (stored) setComments(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const saveComments = async (updated: any) => {
    try {
      await AsyncStorage.setItem(`event_comments_${event?.id}`, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save comments", err);
    }
  };

  const addComment = async () => {
    if (newComment.trim()) {
      const entry = { text: newComment, timestamp: Date.now() };
      const updated = [...comments, entry];
      setComments(updated);
      setNewComment("");
      await saveComments(updated);
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min ago`;
    const hrs = Math.floor(diff / 60);
    if (hrs < 24) return `${hrs} hr ago`;
    return `${Math.floor(hrs / 24)} day(s) ago`;
  };

  if (!event) return null;

  return (
    <Modal visible={!!event} animationType="slide" onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <Image source={event.image} style={styles.image} />
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>{event.date} @ {event.location}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <Text style={styles.sectionTitle}>Comments</Text>
        {comments.length > 0 ? comments.map((c, i) => (
          <View key={i} style={styles.commentBox}>
            <Text>{c.text}</Text>
            <Text style={styles.timestamp}>{formatTimeAgo(c.timestamp)}</Text>
          </View>
        )) : <Text>No comments yet.</Text>}

        <Text style={styles.sectionTitle}>Add a Comment</Text>
        <TextInput
          placeholder="Write something..."
          value={newComment}
          onChangeText={setNewComment}
          style={styles.input}
        />
        <Button title="Post" onPress={addComment} />

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { padding: 20, backgroundColor: "white", flexGrow: 1 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  meta: { fontSize: 14, color: "gray", marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  commentBox: { marginBottom: 10 },
  timestamp: { fontSize: 12, color: "gray" },
  input: { borderWidth: 1, borderColor: "gray", borderRadius: 5, padding: 10, marginBottom: 10 },
  closeButton: { marginTop: 20, alignItems: "center" },
  closeText: { color: "blue", fontSize: 16 },
});

export default EventDetailsModal;
