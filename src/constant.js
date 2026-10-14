export const STORAGE_KEY = "naam_japa_data";
export const BEADS_PER_MAALA = 108;
 
export const DEFAULT_DATA = {
  total_mala: 0,
  today_mala: 0,
  total_naam_japa: 0,
  today_naam_japa: 0,
  last_active_date: "",
  naam_count: 0,
  chant_name: "Radha Radha"
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
    icon: "home"
  },
  {
    key: "rename",
    label: "Rename Chant",
    path: "/rename",
    icon: "edit"
  },
  {
    key: "streak",
    label: "Streak",
    path: "/streak",
    icon: "fire"
  },
  {
    key: "stats",
    label: "Stats",
    path: "/stats",
    icon: "chart"
  },
];
