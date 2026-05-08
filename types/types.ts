export type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export type EventItem = {
  id: number;
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  description: string;
  location: string;
};

export type EventRecord = {
  id: number;
  slug: string;
  title: string;
  event_date: string;
  image: string;
  excerpt: string;
  description: string;
  location: string;
  created_at?: string;
  updated_at?: string;
};
