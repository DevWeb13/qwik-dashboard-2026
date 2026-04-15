// src/lib/loaders.ts

import { customers, invoices, revenue } from "~/data/placeholder-data";
import type { LatestInvoice, Revenue } from "~/types/placeholder-data-types";
import { formatCurrency } from "~/utils/utils";

export const fetchRevenue = async (): Promise<Revenue[]> => {
  // We artificially delay a response for demo purposes.
  // Don't do this in production :)
  console.log("Fetching revenue data...");
  
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("Revenue data fetched after 3 seconds.");
  return revenue;
};

export const fetchLatestInvoices = async (): Promise<LatestInvoice[]> => {
  const sortedInvoices = [...invoices].sort((firstInvoice, secondInvoice) => {
    return (
      new Date(secondInvoice.date).getTime() -
      new Date(firstInvoice.date).getTime()
    );
  });

  const latestInvoices = sortedInvoices.slice(0, 5).map((invoice) => {
    const customer = customers.find(
      (currentCustomer) => currentCustomer.id === invoice.customer_id,
    );

    if (!customer) {
      throw new Error(`Customer not found for invoice ${invoice.id}`);
    }

    return {
      id: invoice.id,
      name: customer.name,
      email: customer.email,
      image_url: customer.image_url,
      amount: formatCurrency(invoice.amount),
    };
  });

  return latestInvoices;
};

export const fetchCardData = async () => {
  const numberOfInvoices = invoices.length;
  const numberOfCustomers = customers.length;

  const totalPaidInvoicesAmount = invoices.reduce((total, invoice) => {
    if (invoice.status !== "paid") {
      return total;
    }

    return total + invoice.amount;
  }, 0);

  const totalPendingInvoicesAmount = invoices.reduce((total, invoice) => {
    if (invoice.status !== "pending") {
      return total;
    }

    return total + invoice.amount;
  }, 0);

  const totalPaidInvoices = formatCurrency(totalPaidInvoicesAmount);
  const totalPendingInvoices = formatCurrency(totalPendingInvoicesAmount);

  return {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  };
};