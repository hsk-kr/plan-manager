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

/**
 * Returns Is the date ended or not. It depends on the type.
 * @param {string} type 'daily' | 'weekly' | 'monthly'
 * @param {Date} date 
 */
export const isOverDate = (type, date) => {
  const today = new Date(Date.now());
  today.setHours(0, 0, 0);

  switch (type) {
    case 'daily':
      return date.getTime() < today.getTime();
    case 'weekly':
      {
        const subtractValues = [6, 0, 1, 2, 3, 4, 5];
        today.setDate(today.getDate() - subtractValues);
        return date.getTime() < today.getTime();
      }
    case 'monthly':
      {
        today.setDate(1);
        return date.getTime() < today.getTime();
      }
    default:
      return false;
  }
};

/**
 * Returns type string. like 'DAILY', 'WEEKLY', 'MONTHLY'...
 * @param {Function} t translation function that to use
 * @param {string} type daily | weekly | monthly
 */
export const getTypeString = (t, type) => {
  switch (type) {
    case 'daily':
      return t('DAILY_PLAN');
    case 'weekly':
      return t('WEEKLY_PLAN');
    case 'monthly':
      return t('MONTHLY_PLAN');
    default:
      return '';
  }
};

/**
 * Returns Unit string. like 'COUNT', 'TIME', 'ONCE'...
 * @param {Function} t translation function that to use
 * @param {string} unit count | time | once
 */
export const getUnitString = (t, unit) => {
  switch (unit) {
    case 'count':
      return t('PLAN_ACHIEVEMENT_TYPES_COUNT');
    case 'time':
      return t('PLAN_ACHIEVEMENT_TYPES_TIME');
    case 'once':
      return t('PLAN_ACHIEVEMENT_TYPES_ONCE');
    default:
      return '';
  }
};

/**
 * Returns progress string. like '3 hours 30 minutes'
 * @param {Function} t translation function that to use
 * @param {string} unit unit 'count' | 'time'
 * @param {Number} progress progress
 */
export const getProgressString = (t, unit, progress) => {
  switch (unit) {
    case 'count':
      return `${progress} ${t('COUNT_SUFFIX')}`;
    case 'time':
      {
        const hours = Math.floor(progress / 3600);
        const minutes = Math.floor(progress % 3600 / 60);

        return `${hours} ${t('HOURS')} ${minutes} ${t('MINUTES')}`;
      }
    default:
      return 'clear';
  }
};