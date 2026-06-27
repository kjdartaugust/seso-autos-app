// Static demo data used for seeding and for "demo mode" when no
// PlanetScale database is connected. Images are royalty-free Unsplash URLs.

export type DemoVehicle = {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  engine: string;
  description: string;
  images: string[];
  importSource: "USA" | "CANADA" | "CHINA" | "LOCAL";
  status: "AVAILABLE" | "RESERVED" | "SOLD";
  featured: boolean;
};

export const demoVehicles: DemoVehicle[] = [
  {
    id: "veh-001",
    title: "2022 Toyota Land Cruiser VXR",
    make: "Toyota",
    model: "Land Cruiser",
    year: 2022,
    price: 78500,
    mileage: 18000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Pearl White",
    engine: "3.5L V6 Twin-Turbo",
    description:
      "Flagship full-size SUV with premium leather interior, adaptive suspension, and full off-road package. Freshly imported and customs-cleared.",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
    ],
    importSource: "USA",
    status: "AVAILABLE",
    featured: true,
  },
  {
    id: "veh-002",
    title: "2021 Mercedes-Benz C300",
    make: "Mercedes-Benz",
    model: "C300",
    year: 2021,
    price: 42000,
    mileage: 26000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Obsidian Black",
    engine: "2.0L Turbo I4",
    description:
      "Elegant executive sedan with MBUX infotainment, panoramic roof, and AMG styling line. Canadian import in pristine condition.",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
    ],
    importSource: "CANADA",
    status: "AVAILABLE",
    featured: true,
  },
  {
    id: "veh-003",
    title: "2023 BYD Atto 3 Electric",
    make: "BYD",
    model: "Atto 3",
    year: 2023,
    price: 31500,
    mileage: 9000,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Surf Blue",
    engine: "Single Motor 150kW",
    description:
      "All-electric compact SUV with 420km range, blade battery technology, and rotating touchscreen. Direct China import.",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80",
    ],
    importSource: "CHINA",
    status: "AVAILABLE",
    featured: true,
  },
  {
    id: "veh-004",
    title: "2020 Ford F-150 Lariat",
    make: "Ford",
    model: "F-150",
    year: 2020,
    price: 38900,
    mileage: 41000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Pickup",
    color: "Race Red",
    engine: "3.5L EcoBoost V6",
    description:
      "Hard-working full-size pickup with towing package, crew cab, and SYNC 3. American import, customs duties settled.",
    images: [
      "https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=1200&q=80",
    ],
    importSource: "USA",
    status: "AVAILABLE",
    featured: false,
  },
  {
    id: "veh-005",
    title: "2022 Honda Accord Sport",
    make: "Honda",
    model: "Accord",
    year: 2022,
    price: 29500,
    mileage: 22000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Modern Steel",
    engine: "1.5L Turbo",
    description:
      "Reliable, fuel-efficient sedan with Honda Sensing safety suite and sporty trim. Canadian import.",
    images: [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=1200&q=80",
    ],
    importSource: "CANADA",
    status: "RESERVED",
    featured: false,
  },
  {
    id: "veh-006",
    title: "2023 Range Rover Sport",
    make: "Land Rover",
    model: "Range Rover Sport",
    year: 2023,
    price: 95000,
    mileage: 7000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Santorini Black",
    engine: "3.0L MHEV I6",
    description:
      "Luxury performance SUV with terrain response, massage seats, and Meridian sound. USA import, fully loaded.",
    images: [
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=80",
    ],
    importSource: "USA",
    status: "AVAILABLE",
    featured: true,
  },
];

export type DemoRental = {
  id: string;
  name: string;
  category: "ECONOMY" | "SEDAN" | "SUV" | "LUXURY" | "VANS_AND_BUSES";
  seats: number;
  transmission: string;
  image: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  available: boolean;
};

export const demoRentals: DemoRental[] = [
  {
    id: "rent-001",
    name: "Toyota Vitz",
    category: "ECONOMY",
    seats: 5,
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80",
    dailyRate: 45,
    weeklyRate: 280,
    monthlyRate: 1050,
    available: true,
  },
  {
    id: "rent-002",
    name: "Toyota Camry",
    category: "SEDAN",
    seats: 5,
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80",
    dailyRate: 70,
    weeklyRate: 450,
    monthlyRate: 1700,
    available: true,
  },
  {
    id: "rent-003",
    name: "Toyota Prado",
    category: "SUV",
    seats: 7,
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
    dailyRate: 120,
    weeklyRate: 780,
    monthlyRate: 2900,
    available: true,
  },
  {
    id: "rent-004",
    name: "Mercedes-Benz S-Class",
    category: "LUXURY",
    seats: 5,
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80",
    dailyRate: 250,
    weeklyRate: 1600,
    monthlyRate: 6000,
    available: true,
  },
  {
    id: "rent-005",
    name: "Toyota Hiace 14-Seater",
    category: "VANS_AND_BUSES",
    seats: 14,
    transmission: "Manual",
    image:
      "https://images.unsplash.com/photo-1632878860698-7d8c9e3b3d3a?w=1200&q=80",
    dailyRate: 150,
    weeklyRate: 950,
    monthlyRate: 3600,
    available: true,
  },
  {
    id: "rent-006",
    name: "Hyundai Accent",
    category: "ECONOMY",
    seats: 5,
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
    dailyRate: 50,
    weeklyRate: 310,
    monthlyRate: 1150,
    available: true,
  },
];
