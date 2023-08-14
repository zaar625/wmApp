import format from 'date-fns/format';

export type TWorkData = {
  date: any;
  end: any;
  start: any;
  storeName: string;
};

export function monthlyTotalHour(workData: TWorkData[]) {
  if (workData === undefined) return;

  const totalTimePerItem = workData.map((work: TWorkData) => {
    const endTime = work.end;
    const startTime = work.start;

    const totalFireBaseTimeStamp = endTime.seconds - startTime.seconds;
    const hours = Math.floor(totalFireBaseTimeStamp / 3600);
    // const minutes = Math.floor((totalFireBaseTimeStamp % 3600) / 60);
    return { date: work.date, totalTime: hours };
  });

  const monthTotalWorkHour = totalTimePerItem.reduce((acc: number, curr: any) => {
    return acc + curr.totalTime;
  }, 0);

  return monthTotalWorkHour;
}

function changeHour(totalMin: number | undefined) {
  if (!totalMin) return 0;

  const hour = Math.floor(totalMin / 60);
  const min = totalMin % 60;
  return Number(`${hour}.${min}`);
}

function totalTimePerWork(workInfoArr: TWorkData[] | undefined) {
  if (!workInfoArr) return;

  const totalTimePerItem = workInfoArr.map((work: TWorkData) => {
    const endTime = work.end;
    const startTime = work.start;

    if (!endTime || !startTime) return;

    const totalFireStoreTimeStamp = endTime.seconds - startTime.seconds;
    const minutes = Math.floor(totalFireStoreTimeStamp / 60);

    return { date: work.date, totalTime: minutes };
  });

  return totalTimePerItem;
}

export function dailyTotalHour(day: Date, dailyWorkData: TWorkData[] | undefined) {
  const date = format(day, 'yyyy-MM-dd');

  if (!dailyWorkData) return 0;

  const findSameDateData: TWorkData[] | undefined = dailyWorkData.filter((work: TWorkData) => {
    const dateTimeStamp = work.date;
    const formatTimeStempDay = format(dateTimeStamp.toDate(), 'yyyy-MM-dd');

    return date === formatTimeStempDay;
  });

  const dailyTotalWorkMinutes = totalTimePerWork(findSameDateData)?.reduce(
    (acc: number, curr: any) => {
      if (!curr) return;
      return acc + curr.totalTime;
    },
    0
  );

  return changeHour(dailyTotalWorkMinutes);
}

export function weeklyTotalHour(datesOfweek: Date[], workData: TWorkData[] | undefined) {
  if (workData === undefined) return;

  const dateOfWeekHour = datesOfweek.map(date => dailyTotalHour(date, workData));

  const weeklyTotal = dateOfWeekHour.reduce((acc, curr) => acc + curr);

  return weeklyTotal.toFixed(2);
}

export function dailyTime(start: any, end: any) {
  const startWork = format(start.toDate(), 'k:mm');
  const endWork = format(end.toDate(), 'k:mm');

  const totalMin = (end.seconds - start.seconds) / 60;
  const totalHour = changeHour(Math.floor(totalMin));
  return { startWork, endWork, totalHour };
}
