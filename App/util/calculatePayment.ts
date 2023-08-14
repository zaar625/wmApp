export function calculatePayment(totalTime: number) {
  const pay = Math.floor(totalTime * 9620);

  const won = pay.toLocaleString('ko-KR');

  return won;
}
