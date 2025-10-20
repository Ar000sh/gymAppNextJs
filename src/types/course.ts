export interface Course {
  id: string;
  category?: string;
  title: string;
  subtitle?: string;
  description: string;
  image_url?: string;
  start_date: string;
  start_time?: string;
  end_date: string;
  end_time?: string;
  age_restriction: "NO_RESTRICTION" | "ADULT_18_PLUS";
  address: string;
  email: string;
  sessions?: Array<{
    startDate: string;
    startTime?: string;
    endDate: string;
    endTime?: string;
  }>;
}
