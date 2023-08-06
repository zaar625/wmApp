import format from 'date-fns/format';

export function monthTotalHour(workData: any) {
  if (workData === undefined) return;

  const totalTimePerItem = workData.map((work: any) => {
    const endTime = work.end;
    const startTime = work.start;

    const totalFireBaseTimeStamp = endTime.seconds - startTime.seconds;
    const hours = Math.floor(totalFireBaseTimeStamp / 3600);
    const minutes = Math.floor((totalFireBaseTimeStamp % 3600) / 60);
    return { date: work.date, totalTime: hours };
  });

  const monthTotalWorkHour = totalTimePerItem.reduce((acc: number, curr: any) => {
    return acc + curr.totalTime;
  }, 0);

  return monthTotalWorkHour;
}

export function dailyWorkInfo(day: string, workData: any) {
  if (workData === 'undefined') return;

  const findDailyWorkInfo = workData.filter((work: any) => {
    const dateTimeStamp = work.date;
    const formatDay = format(dateTimeStamp.toDate(), 'd');

    return formatDay === day;
  });
  return findDailyWorkInfo;
}
