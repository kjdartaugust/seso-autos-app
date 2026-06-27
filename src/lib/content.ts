// Static marketing/content data shared across pages.

export const CONTACT = {
  phone: "0533872888",
  phoneDisplay: "0533 872 888",
  email: "info@sesoautos.com",
  address: "Spintex Road, Accra, Ghana",
  hours: "Mon – Sat: 8:00am – 6:00pm",
};

export const services = [
  {
    slug: "sales",
    title: "Car Sales & Importation",
    short: "Quality vehicles imported from the USA, Canada & China.",
    icon: "car",
    href: "/sales",
  },
  {
    slug: "rentals",
    title: "Car Rentals",
    short: "Flexible daily, weekly & long-term rentals with delivery.",
    icon: "key",
    href: "/rentals",
  },
  {
    slug: "insurance",
    title: "Insurance",
    short: "Comprehensive cover tailored to your vehicle and budget.",
    icon: "shield",
    href: "/insurance",
  },
  {
    slug: "licensing",
    title: "Licensing & Registration",
    short: "Hassle-free DVLA registration, transfers & renewals.",
    icon: "doc",
    href: "/licensing",
  },
  {
    slug: "tracking",
    title: "GPS Tracking & Fleet Security",
    short: "Real-time tracking, geo-fencing & anti-theft protection.",
    icon: "satellite",
    href: "/tracking",
  },
];

export const stats = [
  { label: "Vehicles Sold", value: 2400, suffix: "+" },
  { label: "Happy Clients", value: 5600, suffix: "+" },
  { label: "Fleet Vehicles", value: 180, suffix: "" },
  { label: "Years Experience", value: 12, suffix: "" },
];

export const testimonials = [
  {
    name: "Kwabena Mensah",
    role: "Business Owner, Accra",
    quote:
      "SESO Autos handled my Land Cruiser import end-to-end — customs, registration, the works. Picked it up looking brand new. Truly driving more than cars.",
    rating: 5,
  },
  {
    name: "Ama Owusu",
    role: "Logistics Manager",
    quote:
      "We track our entire delivery fleet with their GPS solution. Geo-fencing alerts alone have saved us thousands. Excellent support team.",
    rating: 5,
  },
  {
    name: "Daniel Asare",
    role: "First-time Buyer",
    quote:
      "Rented a Camry for two weeks while my insurance was sorted out. Smooth booking, car delivered to my door. Will use again.",
    rating: 5,
  },
  {
    name: "Linda Boateng",
    role: "Fleet Coordinator",
    quote:
      "Their insurance team found me comprehensive cover at a better rate than my bank quoted. Professional from start to finish.",
    rating: 5,
  },
];

export const insuranceCoverage = [
  {
    title: "Third-Party",
    desc: "Mandatory cover for damage or injury you cause to others. The legal minimum to keep you on the road.",
    icon: "users",
  },
  {
    title: "Comprehensive",
    desc: "Full protection covering your vehicle, third parties, theft, fire and accidental damage.",
    icon: "shield",
  },
  {
    title: "Fire & Theft",
    desc: "Covers loss or damage to your vehicle from fire outbreaks and theft incidents.",
    icon: "flame",
  },
  {
    title: "Personal Accident",
    desc: "Financial protection for the driver and passengers in the event of injury.",
    icon: "heart",
  },
  {
    title: "Windscreen",
    desc: "Repair or replacement of cracked or shattered windscreens without affecting your no-claim bonus.",
    icon: "window",
  },
  {
    title: "Add-ons",
    desc: "Roadside assistance, towing, courtesy car and excess protection extras.",
    icon: "plus",
  },
];

export const insuranceWhy = [
  "Partnered with Ghana's leading underwriters",
  "Quotes in under 24 hours",
  "Fast, fair claims processing",
  "Flexible monthly payment plans",
];

export const licensingServices = [
  {
    title: "New Registration",
    desc: "First-time DVLA registration and number plate issuance for new and imported vehicles.",
    icon: "doc",
  },
  {
    title: "Ownership Transfer",
    desc: "Smooth change-of-ownership processing when buying or selling a vehicle.",
    icon: "swap",
  },
  {
    title: "Licence Renewal",
    desc: "Renew expired road-worthy and vehicle licences without queues.",
    icon: "refresh",
  },
  {
    title: "Customs Clearance",
    desc: "End-to-end clearing of imported vehicles at the port, duties calculated upfront.",
    icon: "ship",
  },
  {
    title: "Number Plate",
    desc: "Standard and customised number plate application and collection.",
    icon: "plate",
  },
  {
    title: "Roadworthy Certificate",
    desc: "Vehicle inspection booking and roadworthy certification.",
    icon: "check",
  },
];

export const licensingSteps = [
  { step: 1, title: "Submit Request", desc: "Tell us the service you need and share your vehicle documents." },
  { step: 2, title: "Document Review", desc: "Our team verifies and prepares all required paperwork." },
  { step: 3, title: "Processing", desc: "We handle DVLA / Customs submissions and follow-ups on your behalf." },
  { step: 4, title: "Collection", desc: "Pick up your completed documents or have them delivered to you." },
];

export const trackingFeatures = [
  { title: "Real-Time Tracking", desc: "Pinpoint your vehicle's live location on a map, 24/7.", icon: "satellite" },
  { title: "Geo-Fencing", desc: "Set virtual boundaries and get instant alerts on entry or exit.", icon: "fence" },
  { title: "Speed Monitoring", desc: "Track speed history and receive over-speeding notifications.", icon: "gauge" },
  { title: "Engine Cut-Off", desc: "Remotely immobilise the engine if your vehicle is stolen.", icon: "power" },
  { title: "Reports", desc: "Detailed trip, mileage and idling reports for your whole fleet.", icon: "chart" },
  { title: "Anti-Theft", desc: "Tamper and tow-away alerts keep your asset protected around the clock.", icon: "lock" },
];

export const trackingIdealFor = [
  "Logistics & Delivery Fleets",
  "Ride-Hailing Drivers",
  "Corporate Vehicle Pools",
  "Personal Cars",
  "Construction Equipment",
  "Rental Companies",
];

export const trackingPlans = [
  {
    name: "Basic",
    price: 25,
    period: "per device / month",
    features: ["Real-Time Tracking", "Speed Monitoring", "30-Day History", "Email Alerts"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: 45,
    period: "per device / month",
    features: ["Everything in Basic", "Geo-Fencing", "Engine Cut-Off", "90-Day History", "SMS + App Alerts"],
    highlighted: true,
  },
  {
    name: "Fleet",
    price: 75,
    period: "per device / month",
    features: ["Everything in Pro", "Fleet Dashboard", "Custom Reports", "Driver Behaviour", "Priority Support"],
    highlighted: false,
  },
];

export const rentalCategories = [
  { value: "ECONOMY", label: "Economy" },
  { value: "SEDAN", label: "Sedan" },
  { value: "SUV", label: "SUV" },
  { value: "LUXURY", label: "Luxury" },
  { value: "VANS_AND_BUSES", label: "Vans & Buses" },
];

export const importSources = [
  { value: "USA", label: "USA" },
  { value: "CANADA", label: "Canada" },
  { value: "CHINA", label: "China" },
  { value: "LOCAL", label: "Local" },
];
