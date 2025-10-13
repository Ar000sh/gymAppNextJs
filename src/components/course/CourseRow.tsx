"use client";

import * as React from "react";
import Image from "next/image";
import { format, parseISO, isSameDay } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import type { Course } from "@/types/course";
import useMediaQuery from "@/hooks/useMediaQuery";

type DateLike = {
  startDate: string;
  startTime?: string;
  endDate: string;
  endTime?: string;
};

function formatRange(d: DateLike): string {
  const start = parseISO(
    `${d.startDate}${d.startTime ? `T${d.startTime}` : ""}`,
  );
  const end = parseISO(`${d.endDate}${d.endTime ? `T${d.endTime}` : ""}`);

  const startStr = format(start, "dd MMM yyyy, HH:mm");
  const endStrSameDay = format(end, "HH:mm");
  const endStrFull = format(end, "dd MMM yyyy, HH:mm");

  return isSameDay(start, end)
    ? `${startStr} – ${endStrSameDay}`
    : `${startStr} – ${endStrFull}`;
}

export default function CourseRow({ course }: { course: Course }) {
  const {
    title,
    subtitle,
    category,
    imageUrl,
    startDate,
    startTime,
    endDate,
    endTime,
    ageRestriction,
    address,
    sessions,
  } = course;

  // compact sessions: show up to two, then +n more
  const lines = React.useMemo(() => {
    const base =
      sessions && sessions.length > 0
        ? sessions.map((s) => formatRange(s))
        : [formatRange({ startDate, startTime, endDate, endTime })];
    //console.log("testing: ", base);
    if (base.length <= 2) return base;
    const head = base.slice(0, 2);
    const more = base.length - 2;
    return [...head, `+${more} more session${more > 1 ? "s" : ""}`];
    //return [];
  }, [sessions, startDate, startTime, endDate, endTime]);

  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div className="w-full items-center gap-3 rounded-xl border border-gray-200/80 p-3 transition hover:bg-gray-50 md:gap-4 md:p-4">
        <div className="grid w-full grid-cols-[auto_minmax(0,_1fr)] gap-3 md:gap-4">
          <div className="relative h-[72px] w-[84px] overflow-hidden rounded-lg md:h-[96px] md:w-[112px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="112px"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-[11px] text-gray-500">
                No image
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-3">
            {/* Top row: left = title + category, right = 18+ badge */}
            {isAboveSmallScreens ? (
              <div className="flex items-center justify-between gap-3">
                {/* Left side */}
                <div className="flex min-w-0 items-center gap-2">
                  <h3 className="text-base font-semibold break-words whitespace-normal md:text-lg">
                    {title}
                  </h3>

                  {category ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide whitespace-nowrap text-gray-700">
                      <FontAwesomeIcon icon={faTag} className="h-3 w-3" />
                      {category}
                    </span>
                  ) : null}
                </div>

                {/* Right side */}
                {ageRestriction === "ADULT_18_PLUS" ? (
                  <span className="inline-flex shrink-0 items-center rounded-md border border-red-500/20 bg-red-500/10 px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap text-red-600">
                    18+
                  </span>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  {category ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide whitespace-nowrap text-gray-700">
                      <FontAwesomeIcon icon={faTag} className="h-3 w-3" />
                      {category}
                    </span>
                  ) : null}

                  {/* Right side */}
                  {ageRestriction === "ADULT_18_PLUS" ? (
                    <span className="inline-flex shrink-0 items-center rounded-md border border-red-500/20 bg-red-500/10 px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap text-red-600">
                      18+
                    </span>
                  ) : null}
                </div>
                <h3 className="truncate text-base font-semibold md:text-lg">
                  {title}
                </h3>
              </div>
            )}

            {/* Meta: date(s) + location with icons */}
            <div className="flex flex-col items-start justify-between gap-2 text-xs text-gray-700 md:flex-row md:gap-3">
              <div className="flex min-w-0 items-start gap-2">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="mt-0.5 h-4 w-4 shrink-0 text-gray-500"
                />
                <div className="min-w-0">
                  {lines.map((l, i) => (
                    <p key={i} className="break-words whitespace-normal">
                      {l}
                    </p>
                  ))}
                </div>
              </div>

              {address ? (
                <p className="inline-flex items-start gap-2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="h-4 w-4 text-gray-500"
                  />
                  <span className="break-words whitespace-normal">
                    {address}
                  </span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
