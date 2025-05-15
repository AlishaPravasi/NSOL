import React, { useState, useMemo, useEffect } from "react";
import { Event } from "@/types/Event";
import {
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import EventDetailsModal from "@/components/EventDetailsModal";
import { useColorScheme } from "@/components/useColorScheme";
import AddEventModal from "@/components/AddEventsModal";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const H_CARD_WIDTH = SCREEN_WIDTH * 0.7;
const H_CARD_MARGIN = 15;

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: any;
}

export default function EventsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const placeholderColor = Colors[colorScheme].tabIconDefault;
  const textColor = Colors[colorScheme].text;
  const borderColor = Colors[colorScheme].tabIconDefault;
  const backgroundColor = Colors[colorScheme].background;
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState<Event[]>([
    {
      id: "event-001",
      title: "Frisco Trail Clean-Up Day",
      description: "Join local students and volunteers to clean up Rainbow Lake Trail and learn about native plants and erosion prevention.",
      date: "2025-05-17",
      location: "Rainbow Lake Trailhead, Frisco, CO",
      image: require("../../assets/images/frisco_trail.jpg"),
    },
    {
      id: "event-002",
      title: "Frisco HS Water Testing Workshop",
      description: "Learn about water quality and conservation while collecting samples from Tenmile Creek.",
      date: "2025-05-19",
      location: "Frisco High School, Frisco, CO",
      image: require("../../assets/images/frisco_hs.jpg"),
    },
    {
      id: "event-003",
      title: "West HS Urban Garden Build",
      description: "Help construct a sustainable vegetable garden and learn about urban food justice in West Denver.",
      date: "2025-05-21",
      location: "West High School, Denver, CO",
      image: require("../../assets/images/west_hs.jpg"),
    },
    {
      id: "event-004",
      title: "George Washington HS Tree Mapping Walk",
      description: "Walk the campus with a local arborist to identify and map native tree species.",
      date: "2025-05-23",
      location: "George Washington High School, Denver, CO",
      image: require("../../assets/images/gw_hs.jpg"),
    },
    {
      id: "event-005",
      title: "CHSC Environmental Film Night",
      description: "Watch and discuss a documentary on Colorado’s forest fires and climate resilience.",
      date: "2025-05-24",
      location: "Colorado High School Charter, Denver, CO",
      image: require("../../assets/images/film_cover.jpg"),
    },
    {
      id: "event-006",
      title: "Denver Eco-Leadership Summit",
      description: "An all-day summit bringing together student leaders across NSOLE chapters for workshops and idea exchange.",
      date: "2025-05-25",
      location: "Denver Botanic Gardens",
      image: require("../../assets/images/summit.png"),
    },
    {
      id: "event-007",
      title: "Colorado River Awareness Hike",
      description: "Family-friendly hike and teach-in about the importance of the Colorado River to our ecosystems.",
      date: "2025-05-28",
      location: "Chatfield State Park, CO",
      image: require("../../assets/images/CO_river.jpg"),
    },
    {
      id: "event-008",
      title: "Frisco Reuse Fair",
      description: "Bring gently used gear, clothes, and books to exchange with the community—plus upcycling workshops!",
      date: "2025-05-30",
      location: "Frisco Community Center",
      image: require("../../assets/images/rrr.jpg"),
    },
    {
      id: "event-009",
      title: "Westwood Community Tree Planting",
      description: "Partner with local residents and NSOLE volunteers to plant shade trees in the Westwood neighborhood.",
      date: "2025-06-01",
      location: "West Denver, CO",
      image: require("../../assets/images/westwood.jpg"),
    },
    {
      id: "event-010",
      title: "Sustainable Art Workshop",
      description: "Students will turn recycled materials into community art pieces while learning about waste reduction.",
      date: "2025-06-03",
      location: "Colorado High School Charter, Denver, CO",
      image: require("../../assets/images/art_ws.jpg"),
    },
    {
      id: "event-011",
      title: "Frisco Lake Ecology Walk",
      description: "Guided nature walk around Dillon Reservoir with hands-on exploration of aquatic ecosystems.",
      date: "2025-06-04",
      location: "Frisco Bay Marina, Frisco, CO",
      image: require("../../assets/images/frisco_lake.jpg"),
    },
    {
      id: "event-012",
      title: "Environmental Career Panel",
      description: "Meet professionals working in sustainability, conservation, and green tech. Open Q&A afterward.",
      date: "2025-06-05",
      location: "George Washington High School, Denver, CO",
      image: require("../../assets/images/career_panel.jpg"),
    },
    {
      id: "event-013",
      title: "Zero Waste Picnic & Cleanup",
      description: "Bring your own containers, enjoy an eco-friendly lunch, and join a trash pickup afterward!",
      date: "2025-06-06",
      location: "City Park, Denver, CO",
      image: require("../../assets/images/picnic.jpg"),
    },
    {
      id: "event-014",
      title: "CHSC Rooftop Garden Tour",
      description: "Learn how students are turning rooftops into green, edible spaces—and how you can do the same.",
      date: "2025-06-08",
      location: "Colorado High School Charter, Denver, CO",
      image: require("../../assets/images/chsc.jpg"),
    },
    {
      id: "event-015",
      title: "Youth Climate Action Hackathon",
      description: "Collaborate to design solutions to local climate challenges. Open to middle and high schoolers.",
      date: "2025-06-10",
      location: "Denver Central Library",
      image: require("../../assets/images/hackathon.jpg"),
    },
    {
      id: "event-016",
      title: "Solar 101: Student Workshop",
      description: "Interactive demo on how solar panels work—plus build your own mini-solar lantern!",
      date: "2025-06-11",
      location: "Frisco High School, Frisco, CO",
      image: require("../../assets/images/solar_panels.jpg"),
    },
    {
      id: "event-017",
      title: "Pollinator Garden Planting Day",
      description: "Join the effort to plant a pollinator garden that supports bees and butterflies in the city.",
      date: "2025-06-12",
      location: "West High School, Denver, CO",
      image: require("../../assets/images/pollinator_garden.jpg"),
    },
    {
      id: "event-018",
      title: "Green Leaders Recognition Picnic",
      description: "Celebrate outstanding environmental work by NSOLE chapters with food, awards, and games.",
      date: "2025-06-14",
      location: "Ruby Hill Park, Denver, CO",
      image: require("../../assets/images/picnic.jpg"),
    },
    {
      id: "event-019",
      title: "Bike to Nature Challenge",
      description: "Students log miles biking to local parks, promoting fitness and emissions-free travel.",
      date: "2025-06-15",
      location: "Denver Metro Parks",
      image: require("../../assets/images/biking.jpg"),
    },
    {
      id: "event-020",
      title: "Frisco Outdoor Skills Camp",
      description: "One-day workshop for middle schoolers to learn orienteering, Leave No Trace, and basic survival skills.",
      date: "2025-06-16",
      location: "Walter Byron Park, Frisco, CO",
      image: require("../../assets/images/camping.jpg"),
    },
    {
      id: "event-021",
      title: "Eco-Entrepreneurship Pitch Night",
      description: "Student teams present green business ideas to a panel of community leaders.",
      date: "2025-06-18",
      location: "George Washington High School, Denver, CO",
      image: require("../../assets/images/human.png"),
    },
    {
      id: "event-022",
      title: "Wetlands Exploration Day",
      description: "Hands-on activities to learn about the role of wetlands in flood control and biodiversity.",
      date: "2025-06-20",
      location: "Platte River Wetlands, Denver, CO",
      image: require("../../assets/images/wetlands.jpg"),
    },
    {
      id: "event-023",
      title: "CHSC Upcycle Fashion Show",
      description: "Students design and model outfits made from recycled materials to raise awareness on textile waste.",
      date: "2025-06-21",
      location: "Colorado High School Charter, Denver, CO",
      image: require("../../assets/images/chsc.jpg"),
    },
    {
      id: "event-024",
      title: "Solar Cook-Off",
      description: "Use DIY solar ovens to cook food using only sunlight—prizes for most creative dishes!",
      date: "2025-06-23",
      location: "Frisco Middle School, Frisco, CO",
      image: require("../../assets/images/solar_panels.jpg"),
    },
    {
      id: "event-025",
      title: "Plastic-Free July Kickoff Rally",
      description: "Launch your commitment to a plastic-free month with local speakers and sustainability kits.",
      date: "2025-06-30",
      location: "Civic Center Park, Denver, CO",
      image: require("../../assets/images/plastic_free.jpg"),
    },
    {
      id: "event-026",
      title: "West HS Rain Barrel Build",
      description: "Learn water conservation and help install rain barrels to support the school's garden.",
      date: "2025-07-01",
      location: "West High School, Denver, CO",
      image: require("../../assets/images/west_hs.jpg"),
    },
    {
      id: "event-027",
      title: "Frisco Forest Bathing Walk",
      description: "A mindful nature immersion experience designed to reduce stress and reconnect students with the outdoors.",
      date: "2025-07-03",
      location: "Frisco Peninsula Recreation Area",
      image: require("../../assets/images/frisco_forest.jpg"),
    },
    {
      id: "event-028",
      title: "Climate Justice Mural Project",
      description: "Paint a mural with your chapter that highlights community resilience and environmental justice.",
      date: "2025-07-05",
      location: "George Washington High School, Denver, CO",
      image: require("../../assets/images/climate_change.jpg"),
    },
        
  ]);

  const filtered = useMemo(
    () =>
      events.filter((e) => {
        const q = searchText.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
        );
      }),
    [searchText, events]
  );

  const renderHorizontal = ({ item }: { item: Event }) => (
    <TouchableOpacity onPress={() => setSelectedEvent(item)}>
    <View
      style={[
        styles.card,
        styles.horizontalCard,
        { borderColor, width: H_CARD_WIDTH, marginRight: H_CARD_MARGIN },
      ]}
    >
      <Image
        source={item.image}
        style={{
          width: "100%",
          height: 180,
          borderRadius: 10,
        }}
        style={{
          width: "100%",
          height: 180,
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
      <Text style={[styles.eventTitle, { color: textColor }]} numberOfLines={2}>
        {item.title}
      </Text> 
      <Text style={[styles.eventDetails, { color: placeholderColor, textAlign: "center" }]}>
        {item.date}
      </Text>
      <Text style={[styles.eventDetails, { color: placeholderColor, textAlign: "center" }]}>
        {item.location}
      </Text>
    </View>
    </TouchableOpacity>
  );

  const renderVertical = ({ item }: { item: Event }) => {
    const shortDesc =
      item.description.length > 100
        ? item.description.slice(0, 100) + "…"
        : item.description;

    return (
    <TouchableOpacity onPress={() => setSelectedEvent(item)}>
      <View style={[styles.card, { borderColor }]}>
        <Image
          source={item.image}
          style={{
            width: "100%",
            height: 150,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
        <Text
          style={[styles.eventTitle, { color: textColor }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[styles.eventDescription, { color: placeholderColor }]}
          numberOfLines={3}
        >
          {shortDesc.replace(/https?:\/\/[^\s]+/g, "")}
        </Text>
        <Text style={[styles.eventDetails, { color: placeholderColor }]}>
          {item.date} @ {item.location}
        </Text>
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
  
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.container}>
          <TextInput
            placeholder="Search events..."
            placeholderTextColor={placeholderColor}
            style={[styles.searchBar, { color: textColor, borderColor }]}
            value={searchText}
            onChangeText={setSearchText}
          />
  
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            📅 Upcoming Events
          </Text>
  
          <FlatList
            data={filtered.slice(0, 5)}
            renderItem={renderHorizontal}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
          />
  
          <Text style={[styles.sectionTitle, { color: textColor, marginTop: 20 }]}>
            🦚 More Events
          </Text>
  
          <FlatList
            data={filtered.slice(5)}
            renderItem={renderVertical}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingTop: 10 }}
          />
        </View>
      </ScrollView>
  
      {/* Floating + Button */}
      <TouchableOpacity
  onPress={() => setIsAddModalVisible(true)}
  style={{
    position: "absolute",
    bottom: 120, 
    right: 30,
    backgroundColor: "#75d481",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 6,
  }}
>
  <Text style={{ fontSize: 32, color: "white", marginBottom: 4 }}>+</Text>
</TouchableOpacity>

  
      {/* Modal for adding events */}
      <AddEventModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSubmit={(newEvent) => {
          setEvents((prev) =>
            [...prev, newEvent].sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
          );
        }}
      />
    </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  } as ViewStyle,
  searchBar: {
    fontFamily: "Poppins",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  sectionTitle: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
  },
  horizontalList: {
    paddingBottom: 12,
  },
  horizontalCard: {
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    backgroundColor: "transparent",
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  eventTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    textAlign: "center",
  },
  eventDescription: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginBottom: 6,
    textAlign: "center",
  },
  eventDetails: {
    fontFamily: "Poppins",
    fontSize: 13,
  },
});
