export type OfficeStatus = {
  isOpen: boolean;
  nextWindowLabel: string;
};

const weekdayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekdayBg = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function getTimeParts(now: Date, timeZone: string): { weekday: string; hour: number; minute: number } {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short"
  }).format(now);

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(now);

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return { weekday, hour, minute };
}

type WindowConfig = {
  tz: string;
  open: string;
  close: string;
  weekdays: number[];
};

export function getOfficeStatus(now: Date, locale: "en" | "bg", config: WindowConfig): OfficeStatus {
  const { weekday, hour, minute } = getTimeParts(now, config.tz);
  const dayIndex = weekdayOrder.indexOf(weekday);
  const minutesNow = hour * 60 + minute;
  const [openHour, openMinute] = config.open.split(":").map(Number);
  const [closeHour, closeMinute] = config.close.split(":").map(Number);
  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;

  const isWeekday = config.weekdays.includes(dayIndex);
  const isOpen = isWeekday && minutesNow >= openMinutes && minutesNow < closeMinutes;

  if (isOpen) {
    return {
      isOpen,
      nextWindowLabel:
        locale === "bg"
          ? `Днес до ${config.close} (София)`
          : `Today until ${config.close} (Sofia)`
    };
  }

  if (isWeekday && minutesNow < openMinutes) {
    return {
      isOpen,
      nextWindowLabel:
        locale === "bg" ? `Днес ${config.open} (София)` : `Today ${config.open} (Sofia)`
    };
  }

  const nextDayMap = [1, 1, 2, 3, 4, 5, 1];
  const nextIndex = nextDayMap[dayIndex] ?? 1;
  const nextDayLabel = locale === "bg" ? weekdayBg[nextIndex] : weekdayOrder[nextIndex];

  return {
    isOpen,
    nextWindowLabel:
      locale === "bg"
        ? `${nextDayLabel} ${config.open} (София)`
        : `${nextDayLabel} ${config.open} (Sofia)`
  };
}

export function formatClock(timeZone: string, locale: "en" | "bg", now: Date): string {
  return new Intl.DateTimeFormat(locale === "bg" ? "bg-BG" : "en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);
}
