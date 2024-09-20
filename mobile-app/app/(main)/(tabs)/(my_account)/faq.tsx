import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FAQPage = () => {
  const { appColors } = useContext(AppDataContext);

  const [faqs, setFaqs] = useState([
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password.",
      open: false,
    },
    {
      question: "Where can I view my order history?",
      answer:
        "You can view your order history in the 'My Orders' section under your profile.",
      open: false,
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact customer support by emailing support@example.com or calling 123-456-7890.",
      open: false,
    },
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{ ...styles.title, color: appColors.primary }}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <TouchableOpacity style={styles.faq} onPress={() => toggleFAQ(index)}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={{ ...styles.icon, color: appColors.primary }}>{faq.open ? "-" : "+"}</Text>
          </TouchableOpacity>
          {faq.open && <Text style={styles.answer}>{faq.answer}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.small,
    color: COLORS.primary,
  },
  faqContainer: {
    marginBottom: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    paddingBottom: SIZES.small,
  },
  faq: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.small,
  },
  question: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
  icon: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  answer: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: SIZES.small,
    lineHeight: SIZES.xLarge,
  },
});

export default FAQPage;
