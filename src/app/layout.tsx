import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { cookies } from "next/headers";

export const metadata = {
  title: "CampusConnect",
  description: "CampusConnect App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const studentCookie = cookieStore.get("student")?.value;
  const student = studentCookie ? JSON.parse(studentCookie) : null;

  return (
    <html lang="en">
      <body>
        <ClientLayout initialStudent={student}>{children}</ClientLayout>
      </body>
    </html>
  );
}
