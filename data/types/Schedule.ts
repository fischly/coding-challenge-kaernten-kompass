export interface Schedule {
  /** The start date of the schedule in ISO 8601 format (e.g., "2017-01-01") */
  startDate: string;
  
  /** The end date of the schedule in ISO 8601 format (e.g., "2017-12-31") */
  endDate?: string;
  
  /** The start time in ISO 8601 format (e.g., "19:00:00") */
  startTime?: string;
  
  /** The end time in ISO 8601 format (e.g., "20:00:00") */
  endTime?: string;
  
  /** The duration in ISO 8601 format (e.g., "PT60M" for 60 minutes) */
  duration?: string;
  
  /** The repeat frequency in ISO 8601 format (e.g., "P1W" for weekly, "P1M" for monthly) */
  repeatFrequency?: string;
}   