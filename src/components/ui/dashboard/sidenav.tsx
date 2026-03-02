// src/components/ui/dashboard/sidenav.tsx

import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HiPowerOutline } from "@qwikest/icons/heroicons";
import { NavLinks } from "./nav-links";

export const SideNav = component$(() => {
  return (
    <div class="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        class="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div class="w-32 text-xl font-bold text-white md:w-40">LRD Qwik</div>
      </Link>
      <div class="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
        <NavLinks />
        <div class="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button class="flex h-12 w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <HiPowerOutline class="w-6" />
            <div class="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
});
