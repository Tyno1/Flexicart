import { AuthContext } from "@/context/AuthContext";
import { OrderContext } from "@/context/OrdersContext";
import { currencyConverter } from "@/utils/currencyConverter";
import React, { useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

export default function MyOrders() {
  const { getOrderByUserId, orders, loading, error } = useContext(OrderContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getOrderByUserId(user.user._id);
    }
  }, [user]);

  // Handle loading and error states
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading your orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(order) => order._id}
          renderItem={({ item: order }) => (
            <View style={styles.orderCard}>
              {/* Order Header */}
              <View style={styles.orderHeader}>
                <Text style={styles.orderTitle}>Order ID: {order._id}</Text>
                <Text style={styles.orderDate}>
                  Ordered on {new Date(order.orderDate).toLocaleDateString()}
                </Text>
                <Text style={styles.orderStatus}>
                  Status:{" "}
                  {order.status === "Completed" ? "Delivered" : order.status}
                </Text>
              </View>

              {/* Order Summary */}
              <View style={styles.orderSummary}>
                {order.items.map((item: any, index: any) => (
                  <View key={index} style={styles.itemRow}>
                    <Image
                      source={{ uri: item.image }} // Assuming item has an image URL
                      style={styles.itemImage}
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.description}</Text>
                      <Text>Quantity: {item.quantity}</Text>
                      <Text>
                        Price: {currencyConverter(item.price.currency)}{" "}
                        {item.price.unit_amount / 100}
                      </Text>
                      <Text>
                        Total: {currencyConverter(item.price.currency)}{" "}
                        {item.amount_subtotal / 100}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Order Total */}
              <View style={styles.orderTotal}>
                <Text style={styles.totalText}>
                  Order Total: {currencyConverter("gbp")} {order.total}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#f3f3f3",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orderCard: {
    backgroundColor: "#fff",
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  orderStatus: {
    fontSize: 14,
    color: "#007600",
    marginTop: 2,
  },
  orderSummary: {
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderTotal: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  noOrdersText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});
