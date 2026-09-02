export interface NavLink {
  label: string;
  path: string;
}

export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  photo?: string;
}

export interface Course {
  id: string;
  name: string;
  shortName: string;
  description: string;
  duration: string;
  intake: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  points: string[];
  icon: "book" | "monitor" | "mic";
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  tag?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
}

export interface ImportantLink {
  id: string;
  label: string;
  url: string;
  placeholder?: boolean;
}
