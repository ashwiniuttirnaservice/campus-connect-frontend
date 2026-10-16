"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { motion, useAnimation } from "framer-motion";
import Cookies from "js-cookie";
import api from "@/services/api";
import { momentLocalizer, ToolbarProps } from "react-big-calendar";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  startDateTime: string;
  endDateTime: string;
}

interface Course {
  _id: string;
  category: string;
  notifications: Notification[];
}

// Dynamic import for Calendar (no SSR)
const Calendar = dynamic(
  async () => {
    await import("react-big-calendar/lib/css/react-big-calendar.css");
    const mod = await import("react-big-calendar");
    return mod.Calendar;
  },
  {
    ssr: false,
    loading: () => (
      <div className="h-[530px] flex items-center justify-center text-gray-500">
        Loading calendar...
      </div>
    ),
  }
);

// Google Calendar link generator
function getGoogleCalendarLink(n: Notification) {
  const start = moment(n.startDateTime).utc().format("YYYYMMDDTHHmmss[Z]");
  const end = moment(n.endDateTime).utc().format("YYYYMMDDTHHmmss[Z]");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    n.title
  )}&details=${encodeURIComponent(n.message)}&dates=${start}/${end}`;
}

// Custom toolbar for react-big-calendar
function CustomToolbar(toolbar: ToolbarProps) {
  const goToBack = () => toolbar.onNavigate("PREV");
  const goToNext = () => toolbar.onNavigate("NEXT");
  const goToCurrent = () => toolbar.onNavigate("TODAY");
  const changeView = (view: "month" | "week" | "day") => toolbar.onView(view);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 bg-white border-b shadow-sm gap-2 sm:gap-0">
      <div className="flex items-center space-x-2">
        <button
          onClick={goToBack}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          ‹
        </button>
        <button
          onClick={goToCurrent}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          Today
        </button>
        <button
          onClick={goToNext}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          ›
        </button>
      </div>

      <div className="text-lg font-semibold text-[rgb(0,51,102)]">
        {toolbar.label}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => changeView("month")}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          Month
        </button>
        <button
          onClick={() => changeView("week")}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          Week
        </button>
        <button
          onClick={() => changeView("day")}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          Day
        </button>
      </div>
    </div>
  );
}

// Optional: dynamic color based on notification type
function getTypeColor(type: string) {
  switch (type.toLowerCase()) {
    case "exam":
      return "bg-red-200 text-red-800";
    case "assignment":
      return "bg-yellow-200 text-yellow-800";
    case "holiday":
      return "bg-green-200 text-green-800";
    default:
      return "bg-cyan-200 text-blue-800";
  }
}

export default function NotificationsFrom() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Notification | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const localizer = useMemo(() => momentLocalizer(moment), []);

  // Fetch course & notifications
  useEffect(() => {
    let mounted = true;
    const courseId = Cookies.get("courseId");

    const fetchCourse = async () => {
      try {
        if (courseId) {
          const res = await api.get(`/courses/${courseId}`);
          if (res.data?.data) {
            const courseData: Course = res.data.data;
            if (!mounted) return;
            setCourse(courseData);
            setNotifications(courseData.notifications || []);
          } else {
            console.warn("Course data not found");
          }
        }
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCourse();

    // Animate notifications list
    controls.start({
      y: ["0%", "-50%"],
      transition: { duration: 25, ease: "linear", repeat: Infinity },
    });

    return () => {
      mounted = false;
    };
  }, [controls]);

  if (loading) {
    return (
      <div className="p-6 pt-28 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md h-[530px] animate-pulse"></div>
        <div className="lg:col-span-1 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 h-24 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Map notifications to Calendar format
  const calendarEvents = notifications.map((n) => ({
    ...n,
    start: new Date(n.startDateTime),
    end: new Date(n.endDateTime),
  }));

  return (
    <div>
      <div className="px-6 pt-20 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-[rgb(0,51,102)] inline-flex underline underline-offset-8 decoration-[3px] decoration-[rgb(0,51,150)]">
          🔔 Notifications
        </h1>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={["month", "week", "day"]}
            components={{ toolbar: CustomToolbar }}
            style={{ height: 530 }}
            eventPropGetter={() => ({
              style: {
                backgroundColor: "#0b5394",
                color: "white",
                borderRadius: "4px",
                padding: "2px",
                border: "none",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
              },
            })}
            dayPropGetter={() => ({ style: { border: "1px solid #e0e0e0" } })}
            onSelectEvent={(event) => setSelectedEvent(event as Notification)}
          />
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-1 relative h-[530px] overflow-hidden">
          {course && (
            <h2 className="text-lg font-semibold mb-4 text-[rgb(0,51,102)]">
              {course.category}
            </h2>
          )}

          <motion.div
            animate={controls}
            onHoverStart={() => controls.stop()}
            onHoverEnd={() =>
              controls.start({
                y: ["0%", "-50%"],
                transition: { duration: 25, ease: "linear", repeat: Infinity },
              })
            }
          >
            {notifications.map((n, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 shadow-md mb-4 cursor-pointer transform transition hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(0,200,255,0.35),0_0_20px_rgba(0,102,204,0.3)]"
                onClick={() => setSelectedEvent(n)}
              >
                <h3 className="font-semibold text-md text-[rgb(0,51,102)]">
                  {n.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{n.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  📅 {moment(n.startDateTime).format("DD MMM YYYY, hh:mm A")} -{" "}
                  {moment(n.endDateTime).format("hh:mm A")}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getTypeColor(
                    n.type
                  )}`}
                >
                  {n.type}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(getGoogleCalendarLink(n), "_blank");
                  }}
                  className="mt-3 w-full px-3 py-2 text-sm font-medium bg-[rgb(0,51,102)] text-white rounded-lg hover:bg-[rgb(0,61,122)] transition"
                >
                  Open in Calendar
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/5 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-[rgb(0,51,102)]">
              {selectedEvent.title}
            </h2>
            <p className="text-gray-600 mt-2">{selectedEvent.message}</p>
            <p className="text-sm text-gray-500 mt-3">
              📅{" "}
              {moment(selectedEvent.startDateTime).format(
                "DD MMM YYYY, hh:mm A"
              )}{" "}
              - {moment(selectedEvent.endDateTime).format("hh:mm A")}
            </p>
            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getTypeColor(
                selectedEvent.type
              )}`}
            >
              {selectedEvent.type}
            </span>
            <button
              onClick={() =>
                window.open(getGoogleCalendarLink(selectedEvent), "_blank")
              }
              className="mt-4 w-full px-3 py-2 text-sm font-medium bg-[rgb(0,51,102)] text-white rounded-lg hover:bg-[rgb(0,61,122)] transition"
            >
              Open in Calendar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
