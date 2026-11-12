// Free, publicly readable Google Docs. These are NOT sold: keep them separate
// from products.ts / the paid catalog (which is matched to payments by price)
// so they never enter the checkout or webhook flow.
export type FreeGuide = {
  id: string;
  title: string;
  description: string;
  url: string;
  kicker: string;
};

const doc = (id: string) => `https://docs.google.com/document/d/${id}/edit?usp=sharing`;

export const FREE_GUIDES: FreeGuide[] = [
  {
    id: "fde-roadmap-2026",
    title: "FDE Roadmap 2026: How to Become a Forward Deployed Engineer",
    description: "A step-by-step roadmap for breaking into forward deployed engineering in 2026.",
    url: doc("1pMQkICH2rGcxkz28Nan6Q8LwLDvDOx0ipwjmEG4Xj7M"),
    kicker: "Free · Google Doc",
  },
  {
    id: "ai-beginners-roadmap-2026",
    title: "AI Beginners Roadmap 2026",
    description: "A beginner-friendly path for learning AI in 2026, from first concepts to real projects.",
    url: doc("1LKZFEvhASb58vzpCmQ-tulr-ZESZWbkZAQUqduBNnXc"),
    kicker: "Free · Google Doc",
  },
  {
    id: "react-nextjs-interview-prep-2026",
    title: "React/Next.js Interview Prep: Jobs, Q&A & Coding 2026",
    description: "Job-hunting tips, common questions with answers and coding practice for React and Next.js interviews.",
    url: doc("1TNqqE-0qZEj1hZmzb_auduzRub12XrsVtqMmAkk6Ffw"),
    kicker: "Free · Google Doc",
  },
  {
    id: "datadog-overview",
    title: "Datadog Overview",
    description: "A plain introduction to what Datadog is and how teams use it to monitor their apps.",
    url: doc("1FaLf466WCOphadvBr5u5E7J1oRYENH4DAwTpPDEjIVE"),
    kicker: "Free · Google Doc",
  },
];
