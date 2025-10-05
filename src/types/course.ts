export interface Course {
  id: string;
  category?: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  startDate: string; 
  startTime?: string;
  endDate: string;
  endTime?: string;
  ageRestriction: "NO_RESTRICTION" | "ADULT_18_PLUS";
  address: string;
  email: string;
  sessions?: Array<{
    startDate: string;
    startTime?: string;
    endDate: string;
    endTime?: string;
  }>;
}


