import { daysBetween } from "./date";

const rollStreak = (prefix, data, gap) => {
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
    ...rollStreak("japa", prevData, gap),
    ...rollStreak("mala", prevData, gap),
    daily_activity,
    today_japa_count: 0,
    today_mala_count: 0,
    chant_count: 0,
    last_active_date: today,
  };
};

export const creditStreakIfReached = (prevData, currData) => {
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
