"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Course } from "@/types/course";
import { format, parseISO, isSameDay } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faCalendarDays,
  faLocationDot,
  faEnvelope,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const {
    title,
    subtitle,
    category,
    image_url,
    start_date,
    start_time,
    end_date,
    end_time,
    age_restriction,
    address,
    email,
  } = course;

  const [isFavorite, setIsFavorite] = useState(false);

  const dateTimeDisplay = useMemo(() => {
    const start = parseISO(
      `${start_date}${start_time ? `T${start_time}` : ""}`,
    );
    const end = parseISO(`${end_date}${end_time ? `T${end_time}` : ""}`);

    const startStr = format(start, "dd MMM yyyy, HH:mm");
    const endStrSameDay = format(end, "HH:mm");
    const endStrFull = format(end, "dd MMM yyyy, HH:mm");

    if (isSameDay(start, end)) {
      return `${startStr} – ${endStrSameDay}`;
    }
    return `${startStr} – ${endStrFull}`;
  }, [start_date, start_time, end_date, end_time]);

  const sessionDisplays = useMemo(() => {
    if (!course.sessions || course.sessions.length === 0) return [];
    return course.sessions.map((s) => {
      const sStart = parseISO(
        `${s.startDate}${s.startTime ? `T${s.startTime}` : ""}`,
      );
      const sEnd = parseISO(`${s.endDate}${s.endTime ? `T${s.endTime}` : ""}`);
      const sStartStr = format(sStart, "dd MMM yyyy, HH:mm");
      const sEndSameDay = format(sEnd, "HH:mm");
      const sEndFull = format(sEnd, "dd MMM yyyy, HH:mm");
      if (isSameDay(sStart, sEnd)) return `${sStartStr} – ${sEndSameDay}`;
      return `${sStartStr} – ${sEndFull}`;
    });
  }, [course.sessions]);

  return (
    <motion.section className="min-h-[370px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left: textual and interactive info */}
        <div className="flex flex-col gap-4 p-5 md:p-8">
          {/* Category badge */}
          <div className="flex items-center gap-2">
            {category ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gray-20)] px-3 py-1 text-[11px] font-semibold tracking-wide text-gray-700 uppercase">
                <FontAwesomeIcon icon={faTag} className="h-3 w-3" />
                {category}
              </span>
            ) : null}
          </div>

          {/* Title + 18+ badge */}
          <div className="flex items-start gap-2">
            <h1 className="text-3xl leading-snug font-extrabold md:text-[32px]">
              {title}
            </h1>
            {age_restriction === "ADULT_18_PLUS" ? (
              <span className="ml-2 inline-flex items-center rounded-md border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-600">
                18+
              </span>
            ) : null}
          </div>

          {subtitle ? (
            <p className="text-lg text-gray-600">{subtitle}</p>
          ) : null}

          {/* Date/Time */}
          <div className="flex items-start gap-3 text-gray-700">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="mt-1.5 h-5 w-5 text-gray-500"
            />
            <div className="flex flex-col gap-1">
              {sessionDisplays.length > 0 ? (
                sessionDisplays.map((line, idx) => (
                  <p key={idx} className="font-medium">
                    {line}
                  </p>
                ))
              ) : (
                <p className="font-medium">{dateTimeDisplay}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 text-gray-700">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="mt-1.5 h-5 w-5 text-gray-500"
            />
            <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {address}
            </p>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 text-gray-700">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="mt-1.5 h-5 w-5 text-gray-500"
            />
            <a
              className="text-blue-600 hover:underline"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          </div>

          {/* Buttons */}
          <div className="mt-2 flex items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-secondary-500)] px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-[var(--color-secondary-400)]"
            >
              Website & Tickets
            </a>
            <button
              type="button"
              aria-pressed={isFavorite}
              onClick={() => setIsFavorite((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-50"
            >
              <FontAwesomeIcon
                icon={isFavorite ? faHeartSolid : faHeartRegular}
                className={isFavorite ? "text-red-500" : "text-gray-600"}
              />
              Favorite
            </button>
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden md:border-l md:border-gray-100">
          {image_url ? (
            <motion.div>
              <Image
                src={image_url}
                alt={title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}
