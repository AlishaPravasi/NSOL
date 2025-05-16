import { StyleSheet, FlatList, TextInput, Image, Linking, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useState, useMemo, useEffect } from "react"; // Add useEffect

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  pay: string;
  url: string;
}

export default function JobsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const placeholderColor = Colors[colorScheme].tabIconDefault;
  const textColor = Colors[colorScheme].text;
  const borderColor = Colors[colorScheme].tabIconDefault;
  
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Let's Go Birding Internship (High School)",
      company: "National Park Service",
      description: "Assist rangers in conservation education and habitat restoration for birds and separate programs during the summer.",
      location: "Mulitple locations across USA",
      pay: "$620/week",
      url: "https://environmentamericas.org/job/accessible-birding-internship-onsite-multiple-national-park-service-sites/"
    },
    {
      id: "2",
      title: "Accessible Outdoor Experiences Intern (Collegiate)",
      company: "National Park Service",
      description: "As an Accessible Outdoor Experiences Intern, you will play a vital role in developing and implementing this program.",
      location: "Boulder, CO",
      pay: "$16.57/hour",
      url: "https://environmentamericas.org/job/accessible-outdoor-experiences-intern/"
    },
    {
      id: "3",
      title: "Trail Development Internship (Collegiate)",
      company: "Rails to Trails",
      description: "Work on community and stakeholder engagement and/or trail planning and developmen",
      location: "Remote",
      pay: "$17.50/hour",
      url: "https://recruiting.paylocity.com/recruiting/jobs/Details/3253462/Rails-to-Trails-Conservancy/Summer-2025---Trail-Development-Internship"
    },
    {
      id: "4",
      title: "TrailLink Digital Marketing Internship (High School/Collegiate)",
      company: "Rails to Trails",
      description: "Work on the digital marketing related to the broader community and stakeholder engagement connected to trail planning and development",
      location: "Remote",
      pay: "$17.50/hour",
      url: "https://recruiting.paylocity.com/recruiting/jobs/Details/3258056/Rails-to-Trails-Conservancy/Summer-2025---TrailLink-Digital-Marketing-Internship"
    },
    {
      id: "5",
      title: "Communications Design + Digital Media Internship (High School/Collegiate)",
      company: "Rails to Trails",
      description: "Through social media (@railstotrails), online engagement (railstotrails.org), our quarterly magazine, news media and events, you will engage with RTC’s diverse audiences—including trail enthusiasts and those discovering the joy of trails for the first time, lawmakers, trail builders and partners nationwide.",
      location: "Remote",
      pay: "$17.50/hour",
      url: "https://recruiting.paylocity.com/recruiting/jobs/Details/3258417/Rails-to-Trails-Conservancy/Summer-2025---Communications-Design-Digital-Media-Internship"
    },
    {
      id: "6",
      title: "Public Policy Internship (High School/Collegiate)",
      company: "Rails to Trails",
      description: "Interns working with the RTC Policy team will have the opportunity to learn from some of the most experienced policy professionals in Washington, D.C., and from around the country, and advocate on the state and federal level for transformative policy on active transportation and trail infrastructure.",
      location: "Remote",
      pay: "$17.50/hour",
      url: "https://recruiting.paylocity.com/recruiting/jobs/Details/3253499/Rails-to-Trails-Conservancy/Summer-2025---Public-Policy-Internship"
    },
    {
      id: "7",
      title: "Audubon Conservation Ranching Intern (High School/Collegiate)",
      company: "National Audubon Society",
      description: "Paid summer internship focused on equity in environmental policy and non-profit communications.",
      location: "Sacramento, CA",
      pay: "$20/hour",
      url: "https://audubon.wd5.myworkdayjobs.com/en-US/Audubon/job/Sacramento-CA/Audubon-Conservation-Ranching-Intern_JR770"
    },
  ]);

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(searchText.toLowerCase()) ||
          j.company.toLowerCase().includes(searchText.toLowerCase()) ||
          j.description.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, jobs]
  );
  

  const renderItem = ({ item }: { item: Job }) => (
    <View style={[styles.card, { borderColor }]}>
      <Text style={[styles.eventTitle, { color: textColor }]}>
        {item.title}
      </Text>
      <Text style={[styles.eventDescription, { color: textColor }]}>
        {item.company}
      </Text>
      <Text style={[styles.eventDescription, { color: textColor }]}>
        {item.location}
      </Text>
      <Text style={[styles.eventDescription, { color: textColor }]}>
        {item.pay}
      </Text>
      <Text style={[styles.eventDescription, { color: placeholderColor }]}>
        {item.description}
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <Text style={[styles.eventDetails, { color: "#1e90ff" }]}>
          View Job →
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.searchBar, { color: textColor, borderColor }]}        placeholder="Search jobs..."
        placeholderTextColor={placeholderColor}
        value={searchText}
        onChangeText={setSearchText}
      />
    <FlatList
      data={filteredJobs}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 100 }} // this avoids the tab bar overlap
    />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchInput: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  eventDetails: {
    fontSize: 14,
    fontWeight: "600",
  },
  searchBar: {
    fontFamily: "Poppins",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});