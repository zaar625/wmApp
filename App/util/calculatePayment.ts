export function calculatePayment(totalTime: number) {
  const costPerMinute = Math.floor(9620 / 60);
  const pay = totalTime * costPerMinute;

  const won = pay.toLocaleString('ko-KR');

  return won;
}
