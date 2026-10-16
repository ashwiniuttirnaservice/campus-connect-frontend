import ProtectedLayout from "@/components/ProtectedLayout";
import SyllabusClient from "./SyllabusFrom";

export default async function SyllabusPage() {
  // Server-side fetch
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/semesters/68bacee20636eaa847ca9aac`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const syllabus = data.data.syllabus?.[0] || null;

  return (
    <ProtectedLayout>
      <SyllabusClient syllabus={syllabus} />
    </ProtectedLayout>
  );
}
