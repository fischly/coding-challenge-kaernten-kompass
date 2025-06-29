import type { Event } from "./types/Event";
import type { Schedule } from "./types/Schedule";

export interface EventOccurrence {
  /** The specific date of this occurrence in ISO 8601 format */
  date: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
}

// Maximum number of iterations to prevent infinite loops while generating occurrences
const MAX_ITERATIONS = 1000;

/**
 * Parses ISO 8601 duration format and returns the number of days to add
 * Examples: P1D = 1 day, P1W = 7 days, P1M = 30 days (approximate), P1Y = 365 days (approximate)
 */
function parseRepeatFrequency(frequency: string): number {
  const match = frequency.match(/^P(\d+)([DWMY])$/);
  if (!match) return 0;

  const [, amount, unit] = match;
  const num = parseInt(amount, 10);

  switch (unit) {
    case 'D': return num; // days
    case 'W': return num * 7; // weeks to days
    case 'M': return num * 30; // months to days (approximate)
    case 'Y': return num * 365; // years to days (approximate)
    default: return 0;
  }
}

/**
 * Adds days to a date string and returns the new date string
 */
function addDays(dateString: string, days: number): string {
  // enforce UTC, since otherwise 2024-03-31 + 1 day = 2024-03-31 ???
  // fuck you, sommerzeit...
  const date = new Date(dateString + 'T00:00:00.000Z');
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().split('T')[0];
}

/**
 * Checks if a date is within the range (inclusive)
 */
function isDateInRange(date: string, startDate: string, endDate?: string): boolean {
  if (!endDate) return date === startDate;
  return date >= startDate && date <= endDate;
}

/**
 * Converts schema.org day URLs to JavaScript day numbers (0 = Sunday, 6 = Saturday)
 */
function schemaOrgDayToJSDay(dayUrl: string): number {
  const dayMap: { [key: string]: number } = {
    'https://schema.org/Sunday': 0,
    'https://schema.org/Monday': 1,
    'https://schema.org/Tuesday': 2,
    'https://schema.org/Wednesday': 3,
    'https://schema.org/Thursday': 4,
    'https://schema.org/Friday': 5,
    'https://schema.org/Saturday': 6
  };
  return dayMap[dayUrl] ?? -1;
}

/**
 * Checks if a date matches the byDay constraint
 */
function matchesByDay(dateString: string, byDay: string | string[]): boolean {
  const date = new Date(dateString + 'T00:00:00.000Z');
  const dayOfWeek = date.getUTCDay();

  const byDayArray = Array.isArray(byDay) ? byDay : [byDay];

  for (const dayConstraint of byDayArray) {
    // Check if it's a schema.org URL
    if (dayConstraint.startsWith('https://schema.org/')) {
      const expectedDay = schemaOrgDayToJSDay(dayConstraint);
      if (expectedDay === dayOfWeek) {
        return true;
      }
    } else {
      console.error('INVALID DAY CONSTRAINT', dayConstraint);
    }
  }

  return false;
}

/**
 * Creates a single occurrence from schedule data
 */
function createOccurrence(schedule: Schedule, date: string): EventOccurrence {
  return {
    date,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    duration: schedule.duration,
  };
}

/**
 * Determines the end date for occurrence generation
 */
function getEffectiveEndDate(schedule: Schedule): Date {
  if (schedule.endDate) {
    return new Date(schedule.endDate + 'T00:00:00.000Z');
  }

  // Default to 1 year from start date if no end date specified
  const endDate = new Date(schedule.startDate + 'T00:00:00.000Z');
  endDate.setFullYear(endDate.getFullYear() + 1);
  return endDate;
}

/**
 * Generates occurrences for a single (non-repeating) schedule
 */
function generateSingleOccurrence(schedule: Schedule): EventOccurrence[] {
  // Check if the single occurrence matches byDay constraint
  if (schedule.byDay && !matchesByDay(schedule.startDate, schedule.byDay)) {
    return [];
  }

  return [createOccurrence(schedule, schedule.startDate)];
}

/**
 * Generates occurrences with byDay constraints for each repeat period
 */
function generateOccurrencesWithByDay(
  schedule: Schedule,
  intervalDays: number
): EventOccurrence[] {
  // HARDCODED INTERVAL DAYS FOR NOW AS A FIX TO HOW THE API IS IMPLEMENTED
  intervalDays = 1;

  const occurrences: EventOccurrence[] = [];
  const byDayArray = Array.isArray(schedule.byDay) ? schedule.byDay : [schedule.byDay!];

  let periodStart = new Date(schedule.startDate + 'T00:00:00.000Z');
  const endDate = getEffectiveEndDate(schedule);

  let iterationCount = 0;

  while (periodStart <= endDate && iterationCount < MAX_ITERATIONS) {
    const periodEnd = new Date(periodStart);
    periodEnd.setUTCDate(periodEnd.getUTCDate() + intervalDays - 1);

    // Find occurrences for each specified day within this period
    for (const dayConstraint of byDayArray) {
      if (dayConstraint.startsWith('https://schema.org/')) {
        const targetDayOfWeek = schemaOrgDayToJSDay(dayConstraint);

        if (targetDayOfWeek !== -1) {
          if (periodEnd.getUTCDay() === targetDayOfWeek) {
            occurrences.push(createOccurrence(schedule, periodEnd.toISOString().split('T')[0]));
          }
        } else {
          console.error('INVALID DAY CONSTRAINT', dayConstraint);
        }
      } else {
        console.error('INVALID DAY CONSTRAINT', dayConstraint);
      }
    }

    periodStart.setUTCDate(periodStart.getUTCDate() + intervalDays);
    iterationCount++;
  }

  return occurrences;
}

/**
 * Generates occurrences without byDay constraints (simple interval repeating)
 */
function generateSimpleRepeatingOccurrences(
  schedule: Schedule,
  intervalDays: number
): EventOccurrence[] {
  const occurrences: EventOccurrence[] = [];
  let currentDate = schedule.startDate;
  const endDate = schedule.endDate;

  let iterationCount = 0;
  const maxIterations = 1000;

  while (isDateInRange(currentDate, schedule.startDate, endDate) &&
    iterationCount < maxIterations) {
    occurrences.push(createOccurrence(schedule, currentDate));
    currentDate = addDays(currentDate, intervalDays);
    iterationCount++;
  }

  return occurrences;
}

/**
 * Generates occurrences for a repeating schedule
 */
function generateRepeatingOccurrences(schedule: Schedule): EventOccurrence[] {
  const intervalDays = parseRepeatFrequency(schedule.repeatFrequency!);

  if (intervalDays === 0) {
    // Invalid repeat frequency, treat as single occurrence
    return generateSingleOccurrence(schedule);
  }

  // If start and end date are the same, treat as single occurrence
  if (schedule.startDate === schedule.endDate) {
    return generateSingleOccurrence(schedule);
  }

  if (schedule.byDay) {
    return generateOccurrencesWithByDay(schedule, intervalDays);
  } else {
    return generateSimpleRepeatingOccurrences(schedule, intervalDays);
  }
}

/**
 * Checks if a schedule has ended (is in the past)
 */
function isScheduleEnded(schedule: Schedule): boolean {
  return schedule.endDate ? new Date() > new Date(schedule.endDate) : false;
}

/**
 * Filters and sorts occurrences
 */
function finalizeOccurrences(occurrences: EventOccurrence[]): EventOccurrence[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter out past occurrences and sort
  return occurrences
    .filter(occurrence => new Date(occurrence.date) >= today)
    .sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return dateComparison;

      const aTime = a.startTime || '00:00:00';
      const bTime = b.startTime || '00:00:00';
      return aTime.localeCompare(bTime);
    });
}

/**
 * Generates all individual occurrences of an event based on its schedules
 */
export function generateEventOccurrences(event: Event): EventOccurrence[] {
  const allOccurrences: EventOccurrence[] = [];

  for (const schedule of event.schedule) {
    // Skip ended schedules
    if (isScheduleEnded(schedule)) {
      continue;
    }

    let scheduleOccurrences: EventOccurrence[];

    if (!schedule.repeatFrequency) {
      scheduleOccurrences = generateSingleOccurrence(schedule);
    } else {
      scheduleOccurrences = generateRepeatingOccurrences(schedule);
    }

    allOccurrences.push(...scheduleOccurrences);
  }

  return finalizeOccurrences(allOccurrences);
}
