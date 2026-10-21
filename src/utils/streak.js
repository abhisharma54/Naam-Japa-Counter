import { daysBetween } from "./date";

// Checks whether the current streak should continue or reset based on the missed days and daily target
const validateStreak = (prefix, data, gap) => {
  const metTarget =
    data[`today_${prefix}_count`] >= data[`${prefix}_daily_target`];
  let current = data[`${prefix}_current_streak`];

  if (gap > 1) {
    current = 0; // missed at least one full day
  } else if (!metTarget) {
    current = 0; // yesterday ended below target
  }

  return {
    [`${prefix}_current_streak`]: current,
  };
};

// Handles the transition to a new day by saving the previous day's activity,
// validating streaks, resetting daily counters, and updating the last active date.
export const applyRollover = (prevData, today) => {
  // first ever launch
  if (!prevData.last_active_date) {
    return { ...prevData, last_active_date: today };
  }

  const gap = daysBetween(prevData.last_active_date, today);
  if (gap <= 0) return prevData;

  const daily_activity = {
    ...prevData.daily_activity,
    [prevData.last_active_date]: {
      japa: prevData.today_japa_count,
      mala: prevData.today_mala_count,
    },
  };

  return {
    ...prevData,
    ...validateStreak("japa", prevData, gap),
    ...validateStreak("mala", prevData, gap),
    daily_activity,
    today_japa_count: 0,
    today_mala_count: 0,
    chant_count: 0,
    last_active_date: today,
  };
};

// Increases the current streak when the daily target is reached for the first time
// and updates the best streak if a new record is achieved.
export const updateStreakOnTargetReached = (prevData, currData) => {
  const next = { ...currData };

  for (const p of ["japa", "mala"]) {
    const target = prevData[`${p}_daily_target`];
    const prev = prevData[`today_${p}_count`];
    const curr = currData[`today_${p}_count`];

    if (target > 0 && prev < target && curr >= target) {
      const streak = prevData[`${p}_current_streak`] + 1;
      next[`${p}_current_streak`] = streak;
      next[`${p}_best_streak`] = Math.max(prevData[`${p}_best_streak`], streak);
    }
  }
  return next;
};
