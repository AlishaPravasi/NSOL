import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Pressable,
  View,
} from "react-native";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import ForumPosts from "@/components/ForumPage";

// Static blue for close button
const thaniBlue = "#75d481";

interface Forum {
  id: string;
  name: string;
  description: string;
  image: any;
  lastActive: string;
}

const dummyForums: Forum[] = [
  {
    id: "1",
    name: "Conservationists",
    description: "Discuss all things conserving the environment!",
    image: require("../../assets/images/human.png"),
    lastActive: "2 mins ago",
  },
  {
    id: "2",
    name: "Bird Watchers Club",
    description: "Let's watch birds together!",
    image: require("../../assets/images/human.png"),
    lastActive: "5 mins ago",
  },
  {
    id: "3",
    name: "Hiking and Biking",
    description: "What are your favorite trails? Let's talk about it!",
    image: require("../../assets/images/human.png"),
    lastActive: "15 mins ago",
  },
];

export default function ForumScreen() {
  const leaderboardData = [
    { id: "1", name: "Alice", points: 120 },
    { id: "2", name: "Bob", points: 100 },
    { id: "3", name: "Charlie", points: 90 },
  ];
  
  const renderLeaderboard = () => {
    const medals = ['🥇', '🥈', '🥉'];
  
    return (
      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>🏆 Top Outdoor Leaders of the Week</Text>
        {leaderboardData.map((user, index) => (
          <View key={user.id} style={[styles.leaderboardCard, index === 0 && styles.gold, index === 1 && styles.silver, index === 2 && styles.bronze]}>
            <Text style={styles.leaderboardMedal}>{medals[index]}</Text>
            <View style={styles.leaderboardInfo}>
              <Text style={styles.leaderboardName}>{user.name}</Text>
              <Text style={styles.leaderboardPoints}>{user.points} points</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };  

  const colorScheme = useColorScheme() || "light";
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);

  const renderForumItem = ({ item }: { item: Forum }) => (
    <Pressable onPress={() => setSelectedForum(item)}>
      <View
        style={[
          styles.forumItem,
          { borderBottomColor: Colors[colorScheme].border },
        ]}
      >
        <Image source={item.image} style={styles.forumImage} />
        <View style={styles.forumContent}>
          <Text style={[styles.forumName, { color: Colors[colorScheme].text }]}>
            {item.name}
          </Text>
          <Text
            style={[
              styles.forumDescription,
              { color: Colors[colorScheme].tabIconDefault },
            ]}
          >
            {item.description}
          </Text>
          <Text
            style={[
              styles.lastActive,
              { color: Colors[colorScheme].tabIconDefault },
            ]}
          >
            {item.lastActive}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
        Student Forum
      </Text>

      {renderLeaderboard()}

      <FlatList
        data={dummyForums}
        keyExtractor={(item) => item.id}
        renderItem={renderForumItem}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors[colorScheme].border,
            }}
          />
        )}
      />

      <Modal
        visible={!!selectedForum}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setSelectedForum(null)}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          {selectedForum && (
            <>
              <SafeAreaView
                style={[
                  styles.modalHeader,
                  { borderBottomColor: Colors[colorScheme].border },
                ]}
              >
                <Text
                  style={[
                    styles.modalTitle,
                    { color: Colors[colorScheme].text },
                  ]}
                >
                  {selectedForum.name}
                </Text>
                <Pressable
                  style={[styles.closeButton, { backgroundColor: thaniBlue }]}
                  onPress={() => setSelectedForum(null)}
                >
                  <Text style={[styles.closeButtonText, { color: "#000" }]}>
                    Close
                  </Text>
                </Pressable>
              </SafeAreaView>
              <ForumPosts forum={selectedForum.name} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: { width: "100%" },
  listContent: { paddingBottom: 100 },
  forumItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  forumImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  forumContent: { fontFamily: "Poppins", flex: 1, justifyContent: "center" },
  forumName: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
  },
  forumDescription: { fontFamily: "Poppins", fontSize: 14, marginBottom: 4 },
  lastActive: { fontFamily: "Poppins", fontSize: 12 },
  modalContainer: { flex: 1 },
  modalHeader: {
    fontFamily: "Poppins",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: { fontFamily: "Poppins", fontSize: 24, fontWeight: "bold" },
  closeButton: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8 },
  closeButtonText: { fontFamily: "Poppins", fontSize: 14, fontWeight: "600" },
  leaderboardContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#f4fdf6',
    borderRadius: 12,
  },
  
  leaderboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginBottom: 12,
    color: '#2f2f2f',
  },
  
  leaderboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  
  leaderboardMedal: {
    fontSize: 28,
    marginRight: 12,
  },
  
  leaderboardInfo: {
    flex: 1,
  },
  
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#333',
  },
  
  leaderboardPoints: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
  },
  
  // Optional themed colors for each place
  gold: {
    backgroundColor: '#fff7dc',
  },
  silver: {
    backgroundColor: '#f0f0f0',
  },
  bronze: {
    backgroundColor: '#fdf0e3',
  },   
});
