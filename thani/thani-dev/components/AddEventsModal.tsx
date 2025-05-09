// 📍 Add Event Modal (AddEventModal.tsx)
// React Native modal for submitting new events

import React, { useState } from "react";
import { Event } from "@/types/Event";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: any;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (newEvent: Event) => void;
}

const AddEventModal: React.FC<Props> = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !date || !location) {
      alert("Please fill in all required fields.");
      return;
    }
    const newEvent: Event = {
      id: `event-${Math.random().toString(36).substr(2, 9)}`,
      title,
      description,
      date,
      location,
      image: image || require("../assets/images/human.png"),
    };
    onSubmit(newEvent);
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setImage(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Add New Event</Text>

        <TextInput
          placeholder="Event Title *"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Date (e.g. 2025-06-01) *"
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          placeholder="Location *"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          placeholder="Description *"
          style={[styles.input, { height: 100 }]} multiline
          value={description}
          onChangeText={setDescription}
        />

        {image && <Image source={{ uri: image.uri }} style={styles.preview} />}

        <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Pick Optional Image</Text>
        </TouchableOpacity>

        <Button title="Submit Event" onPress={handleSubmit} />
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white", flexGrow: 1 },
  header: { fontSize: 24, fontWeight: "bold", marginTop: 60, marginBottom: 10, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  imageButton: {
    marginBottom: 10,
    alignItems: "center",
  },
  imageButtonText: {
    color: "blue",
  },
  cancelButton: {
    marginTop: 20,
    alignItems: "center",
  },
  cancelText: {
    color: "red",
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default AddEventModal;