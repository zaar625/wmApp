import format from 'date-fns/format';

export type TWorkData = {
  date: any;
  end: any;
  start: any;
  storeName: string;
};

export function monthlyTotalHour(workData: TWorkData[] | undefined) {
  if (!workData) return;

  const totalTime = totalTimePerWork(workData);

  const monthlyTotalMinute = totalTime?.reduce((acc: number, curr: any) => {
    if (!curr) return acc;
    return acc + curr.totalTime;
  }, 0);

  return monthlyTotalMinute;
}

export function changeTime(totalMinute: number | undefined) {
  if (!totalMinute) return { hour: 0, minute: 0 };
  console.log(totalMinute);

  const hour = Math.floor(totalMinute / 60);
  const minute = totalMinute - hour * 60;

  return { hour, minute };
}

function totalTimePerWork(workInfoArr: TWorkData[] | undefined) {
  if (!workInfoArr) return;

  const totalTimePerItem = workInfoArr.map((work: TWorkData) => {
    const endTime = work.end;
    const startTime = work.start;

    if (!endTime || !startTime) return;

    const totalFireStoreTimeStamp = endTime.seconds - startTime.seconds;
    const minute = Math.floor(totalFireStoreTimeStamp / 60);

    return { date: work.date, totalTime: minute };
  });

  return totalTimePerItem;
}

export function dailyTotalTime(day: Date, dailyWorkData: TWorkData[] | undefined) {
  const date = format(day, 'yyyy-MM-dd');

  if (!dailyWorkData) return 0;

  const findSameDateData: TWorkData[] | undefined = dailyWorkData.filter((work: TWorkData) => {
    const dateTimeStamp = work.date;
    const formatTimeStempDay = format(dateTimeStamp.toDate(), 'yyyy-MM-dd');

    return date === formatTimeStempDay;
  });

  const dailyTotalWorkMinute = totalTimePerWork(findSameDateData)?.reduce(
    (acc: number, curr: any) => {
      if (!curr) return acc;
      return acc + curr.totalTime;
    },
    0
  );

  return dailyTotalWorkMinute ? dailyTotalWorkMinute : 0;
}

export function weeklyTotalTime(datesOfweek: Date[], workData: TWorkData[] | undefined) {
  if (!workData) return 0;

  const dateOfWeekMinute = datesOfweek.map(date => dailyTotalTime(date, workData));

  const weeklyTotalMinute = dateOfWeekMinute.reduce((acc, curr) => acc + curr);

  return weeklyTotalMinute;
}

export function dailyTime(start: any, end: any) {
  if (!start || !end) return;

  const startWork = format(start.toDate(), 'k:mm');
  const endWork = format(end.toDate(), 'k:mm');

  const totalMin = Math.floor((end.seconds - start.seconds) / 60);

  return { startWork, endWork, totalMin };
}
