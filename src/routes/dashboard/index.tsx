// src/routes/dashboard/index.tsx

import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Card } from "~/components/ui/dashboard/cards";
import { LatestInvoices } from "~/components/ui/dashboard/latest-invoices";
import { RevenueChart } from "~/components/ui/dashboard/revenue-chart";
import {
  fetchCardData,
  fetchLatestInvoices,
  fetchRevenue,
} from "~/lib/loaders";

export const useFetchRevenue = routeLoader$(async () => {
  console.log("Fetching revenue from the dashboard home page...");
  return fetchRevenue();
});

export const useFetchLatestInvoices = routeLoader$(async () => {
  return fetchLatestInvoices();
});

export const useFetchCardData = routeLoader$(async () => {
  return fetchCardData();
});

export default component$(() => {
  const revenue = useFetchRevenue();
  const latestInvoices = useFetchLatestInvoices();
  const cardData = useFetchCardData();

  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = cardData.value;

  return (
    <main>
      <h1 class="lusitana mb-4 text-xl md:text-2xl">Dashboard</h1>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>

      <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue.value} />
        <LatestInvoices latestInvoices={latestInvoices.value} />
      </div>
    </main>
  );
});
