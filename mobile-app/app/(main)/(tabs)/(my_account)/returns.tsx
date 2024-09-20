import React from "react";
import { Text, StyleSheet, View, ScrollView, Button } from "react-native";

export default function Returns() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Refunds and Returns Policy</Text>
        <Text style={styles.text}>
          We want you to be completely satisfied with your purchase. If you are
          not, you may return the item within 30 days of receipt for a full
          refund or exchange. The item must be in its original condition, with
          all tags and packaging included.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>How to Request a Refund or Return</Text>
        <Text style={styles.text}>
          1. Contact our customer support team at support@example.com.
        </Text>
        <Text style={styles.text}>2. Provide your order number and reason for return.</Text>
        <Text style={styles.text}>
          3. Ship the item back to us using the instructions provided by our
          team.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Refund Process</Text>
        <Text style={styles.text}>
          Once we receive your returned item, we will inspect it and notify you
          of the approval or rejection of your refund. If approved, the refund
          will be processed, and a credit will be applied to your original
          payment method within 5-7 business days.
        </Text>
      </View>

      <View style={styles.section}>
        <Button title="Contact Support" onPress={() => alert("Support Contacted")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  text: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
