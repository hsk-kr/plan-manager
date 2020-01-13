import theme from '../theme';

/**
 * Returns a percentage of progess per 100.
 * @param {number} progress current progress
 * @param {number} goal miximum progress
 * @returns {number} A percentage with Math.floor
 */
export const getProgressRate = (progress, goal) => {
  return Math.floor(progress / goal * 100);
};

/**
 * Returns a background color of the plan button depends on progress.
 * @param {string} themeName themeName that you want to apply
 * @param {number} progress progress
 * @param {number} goal miximum progress
 * @returns {string} RGB in string
 */
export const getColorOfPlan = (themeName, progress, goal) => {
  const progressRate = getProgressRate(progress, goal);

  if (progressRate <= 0) {
    return theme(themeName).notDoneBackground;
  } else if (progressRate < 100) {
    return theme(themeName).progressingBackground;
  } else if (progressRate === 100) {
    return theme(themeName).doneBackground;
  } else {
    return theme(themeName).overDoneBackground;
  }
};