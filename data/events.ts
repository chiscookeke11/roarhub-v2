import { EventItem } from "@/types/types";

export const events: EventItem[] = [
  {
    id: 1,
    slug: "minimalist-manifesto",
    title: "The Minimalist Manifesto",
    date: "October 24, 2023",
    image: "/homepage/roarhub-image.jpg",
    excerpt: "An evening session on simplifying product strategy for founders.",
    description:
      "Join founders, operators, and designers for a practical session on how to identify what matters most in your startup and remove distractions. We will cover prioritization frameworks, storytelling, and execution rituals that keep teams aligned.",
    location: "Roar Hub Main Hall",
  },
  {
    id: 2,
    slug: "future-of-african-startups",
    title: "Future of African Startups",
    date: "January 13, 2024",
    image: "/homepage/roar.jpg",
    excerpt: "Panel discussion with ecosystem leaders on scaling sustainably.",
    description:
      "A high-energy panel featuring investors and founders discussing the opportunities and constraints in the next decade of African innovation. Expect practical insight on market entry, regulation, and funding strategies.",
    location: "Roar Hub Conference Room",
  },
  {
    id: 3,
    slug: "creator-tools-workshop",
    title: "Creator Tools Workshop",
    date: "March 02, 2024",
    image: "/homepage/adobe.png",
    excerpt: "Hands-on workshop for building faster creative workflows.",
    description:
      "In this interactive workshop, creators and product teams explore modern tooling, collaboration methods, and distribution playbooks. You will leave with a practical checklist to improve your creative execution.",
    location: "Roar Hub Studio",
  },
];

export const getEventBySlug = (slug: string) =>
  events.find((event) => event.slug === slug);
