import format from 'date-fns/format';

type TWorkData = {
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

export function dailyTotalHour(day: Date, workData: TWorkData[]) {
  const formatPropsDay = format(day, 'yyyy-MM-dd');

  if (workData === undefined) return;

  const findDailyWorkInfo = workData.filter((work: TWorkData) => {
    const dateFireStoreTimeStamp = work.date;
    const formatTimeStempDay = format(dateFireStoreTimeStamp.toDate(), 'yyyy-MM-dd');

    return formatPropsDay === formatTimeStempDay;
  });

  const totalTimePerItem = findDailyWorkInfo.map((work: TWorkData) => {
    const endTime = work.end;
    const startTime = work.start;

    const totalFireBaseTimeStamp = endTime.seconds - startTime.seconds;
    const hours = Math.floor(totalFireBaseTimeStamp / 3600);
    // const minutes = Math.floor((totalFireBaseTimeStamp % 3600) / 60);
    return { date: work.date, totalTime: hours };
  });

  const dailyTotalWorkHour = totalTimePerItem.reduce((acc: number, curr: any) => {
    return acc + curr.totalTime;
  }, 0);

  return dailyTotalWorkHour;
}

export function weeklyTotalHour(datesOfweek: Date[], workData: TWorkData[]) {
  if (workData === undefined) return;

  const dateOfWeekHour = datesOfweek.map(date => dailyTotalHour(date, workData));

  const weeklyTotal = dateOfWeekHour.reduce((acc, curr) => acc + curr);
  console.log(weeklyTotal);
  return weeklyTotal;
}
