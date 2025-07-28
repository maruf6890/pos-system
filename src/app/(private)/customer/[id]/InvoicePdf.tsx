"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import { Transaction } from "./TransactionHistory";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: 1,
    paddingBottom: 5,
    marginTop: 15,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  col1: { width: "50%" },
  col2: { width: "15%", textAlign: "right" },
  col3: { width: "15%", textAlign: "right" },
  col4: { width: "20%", textAlign: "right" },
  total: {
    marginTop: 10,
    paddingTop: 5,
    borderTop: 1,
    fontWeight: "bold",
  },
});
//any
export const InvoicePDF = ({ transaction }: { transaction: Transaction }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>INVOICE</Text>
        <View style={styles.row}>
          <Text>Invoice #: {transaction.invoiceNumber}</Text>
          <Text>Date: {format(transaction.date, "PPP")}</Text>
        </View>
      </View>

      <View style={[styles.row, styles.section]}>
        <View>
          <Text style={styles.label}>Bill To:</Text>
          <Text>{transaction.customer.name}</Text>
          <Text>{transaction.customer.phone}</Text>
          {transaction.customer.email && (
            <Text>{transaction.customer.email}</Text>
          )}
        </View>
        <View>
          <Text style={styles.label}>Seller:</Text>
          <Text>Your Business Name</Text>
          <Text>Business Address</Text>
          <Text>Contact Info</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description: {transaction.description}</Text>
        <Text>Status: {transaction.status}</Text>
        <Text>Payment Method: {transaction.paymentMethod}</Text>
      </View>

      {transaction.items && (
        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Item</Text>
            <Text style={styles.col2}>Qty</Text>
            <Text style={styles.col3}>Price</Text>
            <Text style={styles.col4}>Total</Text>
          </View>
          {transaction.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{item.name}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>৳{item.price.toFixed(2)}</Text>
              <Text style={styles.col4}>৳{item.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={[styles.row, styles.total]}>
        <Text>Amount:</Text>
        <Text>৳{transaction.amount.toFixed(2)}</Text>
      </View>
      {transaction.type === "DuePayment" && (
        <View style={styles.row}>
          <Text>Previous Due:</Text>
          <Text>
            ৳{(transaction.balanceBefore - transaction.amount).toFixed(2)}
          </Text>
        </View>
      )}
      <View style={styles.row}>
        <Text>Balance After:</Text>
        <Text>৳{transaction.balanceAfter.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);
