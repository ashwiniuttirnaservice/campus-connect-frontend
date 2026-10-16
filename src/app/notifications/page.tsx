"use client";

import NotificationsFrom from "./NotificationsFrom";
import ProtectedLayout from "@/components/ProtectedLayout";
export default function NotificationsPage() {
  return (
    <ProtectedLayout>
      <NotificationsFrom />
    </ProtectedLayout>
  );
}
