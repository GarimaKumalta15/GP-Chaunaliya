import type { NavLink, StaffMember, Course, Facility, Notice, GalleryImage, ImportantLink } from "../types";

import principal from "../assets/staff/principal.jpg";
import vinayKumar from "../assets/staff/vinay-kumar.jpg";
import sandeepChandra from "../assets/staff/sandeep-chandra.jpg";
import premaArya from "../assets/staff/prema-arya.jpg";
import tarunPal from "../assets/staff/tarun-pal.jpg";
import pankajKumar from "../assets/staff/pankaj-kumar.jpg";
import kuldeepLohani from "../assets/staff/kuldeep-lohani.jpg";
import harishSingh from "../assets/staff/harish-singh.jpg";
import irfan from "../assets/staff/irfan.jpg";
import pradeepChand from "../assets/staff/pradeep-chand.jpg";
import sandeepKharola from "../assets/staff/sandeep-kharola.jpg";
import mahendraSingh from "../assets/staff/mahendra-singh.jpg";

// Real campus photographs only — no unrelated stock imagery.
import campusMain from "../assets/campus/campus-main.jpg";
import campusVisit from "../assets/campus/campus-visit.jpg";
import campusClassroom from "../assets/campus/campus-3.jpg";
import galleryLab from "../assets/gallery/gallery-5.jpg";

export { principal, campusMain, campusClassroom };

export const SITE = {
  name: "Government Polytechnic Chaunaliya",
  shortName: "GP Chaunaliya",
  district: "Almora, Uttarakhand",
  established: 2007,
  affiliations: [
    "Uttarakhand Board of Technical Education (UBTER), Roorkee",
    "All India Council for Technical Education (AICTE), New Delhi",
  ],
  address: "Government Polytechnic Chaunaliya, Almora – 263680, Uttarakhand",
  phone: "+91-9690654009",
  email: "gpchaunaliya@gmail.com",
  hours: "10:00 AM – 5:00 PM, Monday to Saturday (Second Saturday off)",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Departments", path: "/departments" },
  { label: "Facilities", path: "/facilities" },
  { label: "Faculty", path: "/faculty" },
  { label: "Admission", path: "/admission" },
  { label: "Student Corner", path: "/student-corner" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

// Centralised external/important links — verified, working URLs only.
export const IMPORTANT_LINKS: ImportantLink[] = [
  { id: "ubter", label: "UBTER Official Website", url: "https://ubter.in" },
  { id: "jeep-application", label: "JEEP Application / Registration", url: "https://ubterjeep.co.in" },
  { id: "jeep-counselling", label: "JEEP Counselling & Results Login", url: "https://admissions.ubterjeep.co.in" },
  { id: "aicte", label: "AICTE", url: "https://www.aicte-india.org" },
];

export const COURSES: Course[] = [
  {
    id: "civil",
    name: "Civil and Environmental Engineering",
    shortName: "Civil Engineering",
    description:
      "A core discipline covering structural design, surveying, construction technology, environmental engineering and site management — preparing diploma holders for site supervision, government infrastructure works and private construction roles.",
    duration: "3 Years (6 Semesters)",
    intake: "60 Seats",
  },
  {
    id: "cse",
    name: "Computer Science and Engineering",
    shortName: "Computer Science",
    description:
      "Covers programming, data structures, networking, database management and web technologies, building the practical computing skills needed for IT support, software and hardware roles across industry and government.",
    duration: "3 Years (6 Semesters)",
    intake: "60 Seats",
  },
];

export const FACILITIES: Facility[] = [
  {
    id: "library",
    title: "Library",
    icon: "book",
    description:
      "Every student is issued a Borrower's Card, recommended by the concerned Head of Department, for access to books and journals.",
    points: [
      "Limit: 2 books per student for 15 days",
      "Issue hours: Mon–Sat, 10:30 AM–1:00 PM & 2:00 PM–4:30 PM",
      "Overdue charge: ₹1 per day per book",
      "Cost recovery applies on loss or damage of issued books",
    ],
  },
  {
    id: "smart-classroom",
    title: "Smart Classroom",
    icon: "monitor",
    description:
      "Equipped to support short-term courses and AICTE programmes delivered through the SWAYAM portal, bringing digital learning into everyday classes.",
    points: [
      "Access to AICTE SWAYAM courses",
      "Digital teaching aids for core subjects",
      "Used for short-term skill certifications",
    ],
  },
  {
    id: "language-lab",
    title: "Language Lab",
    icon: "mic",
    description:
      "A dedicated lab for improving students' communication skills in English, with focused attention on grammar and pronunciation.",
    points: [
      "Structured spoken-English practice",
      "Grammar and pronunciation modules",
      "Builds interview and workplace communication skills",
    ],
  },
];

export const STAFF: StaffMember[] = [
  { id: "1", name: "Shailendra Joshi", designation: "Coordinator", photo: principal },
  { id: "2", name: "Vinay Kumar", designation: "Lecturer (Civil)", photo: vinayKumar },
  { id: "3", name: "Sandeep Chandra", designation: "Lecturer (Physics)", photo: sandeepChandra },
  { id: "4", name: "Prema Arya", designation: "Lecturer (Chemistry)", photo: premaArya },
  { id: "5", name: "Tarun Pal", designation: "Lecturer (Civil)", photo: tarunPal },
  { id: "6", name: "Pankaj Kumar", designation: "Lecturer (Civil)", photo: pankajKumar },
  { id: "7", name: "Kuldeep Lohani", designation: "Assistant Accountant", photo: kuldeepLohani },
  { id: "8", name: "Harish Singh", designation: "Lab Attendant", photo: harishSingh },
  { id: "9", name: "Irfan", designation: "Workshop Instructor", photo: irfan },
  { id: "10", name: "Pradeep Chand", designation: "Workshop Instructor", photo: pradeepChand },
  { id: "11", name: "Sandeep Kharola", designation: "Workshop Instructor", photo: sandeepKharola },
  { id: "12", name: "Mahendra Singh Adhikari", designation: "Workshop Instructor", photo: mahendraSingh },
];

export const NOTICES: Notice[] = [
  { id: "1", title: "JEEP counselling schedule released on ubter.in — check your rank and slot", date: "Updated regularly", tag: "Admission" },
  { id: "2", title: "Second Saturday remains off; regular hours 10:00 AM – 5:00 PM", date: "Standing notice", tag: "General" },
  { id: "3", title: "Library borrower cards issued on HoD recommendation — visit the library desk", date: "Standing notice", tag: "Library" },
  { id: "4", title: "Anti-Ragging Campaign guidelines applicable to all enrolled students", date: "Standing notice", tag: "Student Welfare" },
];

export const GALLERY: GalleryImage[] = [
  { id: "1", src: campusMain, caption: "Main institute building, GP Chaunaliya" },
  { id: "2", src: campusClassroom, caption: "Students in class" },
  { id: "3", src: galleryLab, caption: "Computer lab session" },
  { id: "4", src: campusVisit, caption: "Institute visit and inspection" },
];

export const RULES_REGULATIONS: string[] = [
  "Each 3-year Diploma course offered by the institute is divided into 6 semesters.",
  "The Uttarakhand Board of Technical Education (UBTE), Roorkee conducts semester examinations twice a year.",
  "Students must maintain a minimum of 80% attendance in their classes to be eligible to appear in the board semester exams.",
  "Prior to each semester examination, every student must appear in two class tests and a mid-term examination.",
  "Sessional marks are awarded on the basis of attendance, marks obtained in class tests, and mid-term exam performance.",
];

export const ANTI_RAGGING = {
  intro:
    "Government Polytechnic Chaunaliya has maintained a \"Ragging Free Campus\" over the years, with invaluable support from students and their guardians in this endeavour.",
  definition:
    "Ragging is treated as a cognizable and heinous offence. It includes any conduct — spoken, written or by act — that has the effect of teasing, treating or handling a fresher or any other student with rudeness; exploiting students for academic tasks or financial extortion; any act of physical or sexual abuse, forcing obscene acts or causing bodily harm; and any act that disrupts the regular academic activity of other students.",
  punishments: [
    "Cancellation of admission",
    "Suspension from attending classes",
    "Withholding of results, scholarships or other benefits",
    "Debarring from appearing in examinations",
    "Rustication from the institute for a specified period",
    "Expulsion from the institute",
    "Referral to the police where applicable",
  ],
};

export const ADMISSION_STEPS: string[] = [
  "Buy the JEEP application form from the designated distribution centre.",
  "Fill the form and submit it to the Uttarakhand Board of Technical Education, or any Government Polytechnic in Uttarakhand.",
  "Download your entrance exam admit card from www.ubter.in once issued.",
  "Check your JEEP result on www.ubter.in on the declared date.",
  "Attend counselling on your allotted date, based on your rank, to choose your branch and college.",
  "Report to the allotted college with original documents to confirm admission.",
];
