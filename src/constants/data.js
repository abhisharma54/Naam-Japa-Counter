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
};

export const MAX_CHANT_LENGTH = 30;

export const chantQuickPicks = [
  "Ram Ram",
  "Radha Radha",
  "Samb Sadashiv",
  "Shri Radha",
  "Hare Krishna",
];

export const streakMilestones = [7, 21, 40, 108, 365];

export const weekDayLabels = ["S", "M", "T", "W", "T", "F", "S"]