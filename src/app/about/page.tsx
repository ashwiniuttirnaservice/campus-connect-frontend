"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  "/university.jpg",
  "/university1.jpg",
  "/university.jpg",
];

export default function AboutPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left side: University Info */}
      <div className="md:w-2/3 space-y-4 text-gray-700 text-justify">
        <h1 className="text-4xl font-bold mb-4">About Sappu University</h1>
        <p>
          Sappu University, established in [Year], is a premier institution
          dedicated to excellence in higher education, research, and community
          development. Located in the heart of [City/State], the university
          spans a sprawling campus that combines modern infrastructure with
          natural beauty, fostering an environment conducive to learning and
          innovation.
        </p>
        <p>
          The university offers a wide range of undergraduate, postgraduate, and
          doctoral programs across multiple disciplines including Science,
          Technology, Engineering, Arts, Humanities, and Business. With a
          curriculum designed to meet global standards, Sappu University ensures
          students gain both theoretical knowledge and practical experience,
          preparing them for diverse career paths.
        </p>
        <p>
          Faculty at Sappu University are highly qualified professionals, many
          of whom are recognized internationally for their research
          contributions. Regular seminars, workshops, and conferences provide
          students and faculty opportunities to stay at the forefront of
          academic and technological advancements.
        </p>
        <p>
          The campus infrastructure includes state-of-the-art laboratories,
          modern lecture halls, a central library with vast collections of books
          and digital resources, sports facilities, and student hostels that
          provide a safe and comfortable living environment. Additionally, the
          university emphasizes sustainability, with green spaces,
          energy-efficient buildings, and initiatives to reduce the
          environmental footprint.
        </p>{" "}
        <p>
          The university offers a wide range of undergraduate, postgraduate, and
          doctoral programs across multiple disciplines including Science,
          Technology, Engineering, Arts, Humanities, and Business. With a
          curriculum designed to meet global standards, Sappu University ensures
          students gain both theoretical knowledge and practical experience,
          preparing them for diverse career paths.
        </p>
        <p>
          Faculty at Sappu University are highly qualified professionals, many
          of whom are recognized internationally for their research
          contributions. Regular seminars, workshops, and conferences provide
          students and faculty opportunities to stay at the forefront of
          academic and technological advancements.
        </p>
        <p>
          The campus infrastructure includes state-of-the-art laboratories,
          modern lecture halls, a central library with vast collections of books
          and digital resources, sports facilities, and student hostels that
          provide a safe and comfortable living environment. Additionally, the
          university emphasizes sustainability, with green spaces,
          energy-efficient buildings, and initiatives to reduce the
          environmental footprint.
        </p>{" "}
        <p>
          The university offers a wide range of undergraduate, postgraduate, and
          doctoral programs across multiple disciplines including Science,
          Technology, Engineering, Arts, Humanities, and Business. With a
          curriculum designed to meet global standards, Sappu University ensures
          students gain both theoretical knowledge and practical experience,
          preparing them for diverse career paths.
        </p>
        <p>
          Faculty at Sappu University are highly qualified professionals, many
          of whom are recognized internationally for their research
          contributions. Regular seminars, workshops, and conferences provide
          students and faculty opportunities to stay at the forefront of
          academic and technological advancements.
        </p>
        <p>
          The campus infrastructure includes state-of-the-art laboratories,
          modern lecture halls, a central library with vast collections of books
          and digital resources, sports facilities, and student hostels that
          provide a safe and comfortable living environment. Additionally, the
          university emphasizes sustainability, with green spaces,
          energy-efficient buildings, and initiatives to reduce the
          environmental footprint.
        </p>
      </div>

      <div className="md:w-1/3 h-[600px] overflow-hidden relative">
        <motion.div
          animate={{ y: ["0%", "-50%"] }} // scroll up by half the total height
          transition={{
            duration: 20, // adjust speed
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="flex flex-col gap-4">
            {/* Duplicate images for smooth loop */}
            {galleryImages.concat(galleryImages).map((src, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg w-full h-48"
              >
                <Image
                  src={src}
                  alt={`Campus Image ${index + 1}`}
                  width={400}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
