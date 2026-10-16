export interface BreadcrumbItem {
  name: string;
  href: string;
  children?: BreadcrumbItem[];
}

export const breadcrumbs: BreadcrumbItem[] = [
  {
    name: "Course",
    href: "/course",
    children: [
      {
        name: "Year",
        href: "/course/year",
        children: [
          {
            name: "Semester",
            href: "/course/year/semester",
            children: [
              { name: "Syllabus", href: "/course/year/semester/syllabus" },
              {
                name: "Notifications",
                href: "/course/year/semester/notifications",
              },
              {
                name: "Previous Papers",
                href: "/course/year/semester/question-papers",
              },
              { name: "Timetable", href: "/course/year/semester/timetable" },
            ],
          },
        ],
      },
    ],
  },
];
