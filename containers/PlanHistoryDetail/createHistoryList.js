/**
 * Create a history list with plans and history.
 * @param {Array} plan plan
 * @param {Array} history history
 */
const createHistoryList = (plan, planHistory) => {
  return new Promise((resolve, reject) => {
    // generate since endingDate
    const createLatestPeriod = (startingDate, endingDate, type) => {
      const period = { startingDate: null, endingDate: null };
      const tmpdate = new Date(endingDate || Date.now());
      tmpdate.setHours(0, 0, 0);

      if (type === 'daily') {
        period.startingDate = new Date(tmpdate);

        tmpdate.setHours(23, 59, 59);
        period.endingDate = new Date(tmpdate);
      } else if (type === 'weekly') {
        const daySubtractWeight = [6, 0, 1, 2, 3, 4, 5];

        tmpdate.setDate(tmpdate.getDate() - daySubtractWeight[tmpdate.getDay()]);
        period.startingDate = new Date(tmpdate);

        tmpdate.setDate(tmpdate.getDate() + 6);
        tmpdate.setHours(23, 59, 59);
        period.endingDate = new Date(tmpdate);
      } else if (type === 'monthly') {
        tmpdate.setDate(1);
        period.startingDate = new Date(tmpdate);

        tmpdate.setMonth(tmpdate.getMonth() + 1);
        tmpdate.setDate(tmpdate.getDate() - 1);
        period.endingDate = new Date(tmpdate);
      }

      if (period.startingDate.getTime() < startingDate.getTime()) {
        period.startingDate = startingDate;
      }

      return period;
    }

    // doesn't generate over startingDate
    function generatePreviousPeriod(startingDate, type) {
      return () => {
        if (!this.startingDate || !this.endingDate) {
          return;
        }

        if (type === 'daily') {
          this.startingDate.setDate(this.startingDate.getDate() - 1);
          this.endingDate.setDate(this.endingDate.getDate() - 1);
        } else if (type === 'weekly') {
          this.startingDate.setDate(this.startingDate.getDate() - 7);
          this.endingDate.setDate(this.endingDate.getDate() - 7);
        } else if (type === 'monthly') {
          this.startingDate.setMonth(this.startingDate.getMonth() - 1);
          this.endingDate.setDate(1);
          this.endingDate.setDate(this.endingDate.getDate() - 1);
        }

        if (this.endingDate.getTime() < startingDate.getTime()) {
          this.startingDate = null;
          this.endingDate = null;
          this.hasDone = true;
        } else if (this.startingDate.getTime() < startingDate.getTime()) {
          this.startingDate = new Date(startingDate);
        }
      };
    }

    const isDateInBetweenPeriod = (date, period) => (
      date.getTime() >= period.startingDate.getTime() && date.getTime() <= period.endingDate.getTime()
    );

    const createHistory = (period) => ({
      startingDate: new Date(period.startingDate),
      endingDate: new Date(period.endingDate),
      totalProgress: 0,
      list: []
    });

    /**
     * historyList
     * type - title
     * {
     *  titled,
     *  startingDate,
     *  endingDate
     * }
     * type - plan
     * {
     *  history
     * }
     */
    const historyList = [];

    const { type } = plan;
    let period = createLatestPeriod(new Date(plan.startingDate), plan.endingDate !== undefined ? new Date(plan.endingDate) : null, type);
    period.generatePreviousPeriod = generatePreviousPeriod.bind(period)(new Date(plan.startingDate), type);

    let totalProgress = 0;
    let cntDone = 0;
    let cntOverDone = 0;
    let cntNotDone = 0;
    let cntProgress = 0;

    let history = createHistory(period);
    historyList.push(history);

    const countProgress = () => {
      if (history.totalProgress <= 0 || history.list.length === 0) {
        cntNotDone += 1;
      } else if (history.totalProgress < plan.goal) {
        cntProgress += 1;
      } else if (history.totalProgress === plan.goal) {
        cntDone += 1;
      } else {
        cntOverDone += 1;
      }
    };

    for (let i = planHistory.length - 1; i >= 0; i--) {
      if (isDateInBetweenPeriod(new Date(planHistory[i].regDate), period)) {
        history.list.push({ ...planHistory[i] });
        history.totalProgress += planHistory[i].progress;
        totalProgress += planHistory[i].progress;
      } else {
        countProgress();
        period.generatePreviousPeriod();

        if (period.hasDone) {
          break;
        }

        history = createHistory(period);
        historyList.push(history);

        i++; // Iterate this step again
      }
    }
    countProgress(); // last step isn't recorded so after looping, It records.

    resolve({
      totalProgress,
      cntDone,
      cntOverDone,
      cntNotDone,
      cntProgress,
      historyList
    });
  });
};

export default createHistoryList;