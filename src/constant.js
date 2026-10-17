export const STORAGE_KEY = "japa_data";
export const BEADS_PER_MALA = 108;

export const DEFAULT_DATA = {
  total_mala_count: 0,
  today_mala_count: 0,
  total_japa_count: 0,
  today_japa_count: 0,
  last_active_date: "",
  chant_count: 0,
  chant_name: "Radha Radha",

  // streak
  // Japa streak data
  japa_current_streak: 0,
  japa_best_streak: 0,
  japa_daily_target: 1080,
  japa_milestone: 7,

  // Mala streak data
  mala_current_streak: 0,
  mala_best_streak: 0,
  mala_daily_target: 10,
  mala_milestone: 7,

  daily_activity: {},

  // stats
};

export const MAX_CHANT_LENGTH = 30;

export const chantQuickPicks = [
  "Ram Ram",
  "Radha Radha",
  "Samb Sadashiv",
  "Shri Radha",
  "Hare Krishna",
];

export const navLinks = [
  {
    key: "home",
    label: "Home",
    path: "/",
    icon: "home",
  },
  {
    key: "rename",
    label: "Rename Chant",
    path: "/rename",
    icon: "edit",
  },
  {
    key: "streak",
    label: "Streak",
    path: "/streak",
    icon: "fire",
  },
  {
    key: "stats",
    label: "Stats",
    path: "/stats",
    icon: "chart",
  },
];

export const streakMilestones = [7, 21, 40, 108, 365];

export const weekDayLabels = ["S", "M", "T", "W", "T", "F", "S"]

export const chantAchievements = [
  {
    level: 1,
    requiredChantCount: 1000,
    name: "Bronze",
    iconKey: "bronze"
  },
  {
    level: 2,
    requiredChantCount: 5000,
    name: "Silver",
    iconKey: "silver"
  },
  {
    level: 3,
    requiredChantCount: 10000,
    name: "Gold",
    iconKey: "gold"
  },
  {
    level: 4,
    requiredChantCount: 25000,
    name: "Platinum",
    iconKey: "platinum"
  },
  {
    level: 5,
    requiredChantCount: 50000,
    name: "Diamond",
    iconKey: "diamond"
  },
  {
    level: 6,
    requiredChantCount: 100000,
    name: "Crown",
    iconKey: "crown"
  },
  {
    level: 7,
    requiredChantCount: 500000,
    name: "Ace",
    iconKey: "ace"
  },
  {
    level: 8,
    requiredChantCount: 1000000,
    name: "Ace Master",
    iconKey: "ace_master"
  },
  {
    level: 9,
    requiredChantCount: 5000000,
    name: "Ace Dominator",
    iconKey: "ace_dominator"
  },
  {
    level: 10,
    requiredChantCount: 10000000,
    name: "Conqueror",
    iconKey: "conqueror"
  },
]