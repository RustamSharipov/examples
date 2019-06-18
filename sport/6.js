function largestPossibleTime(payloadTimeDigits) {
  const possibleTimeDigits = Array(10).fill(0);
  const FAIL_STATE_MESSAGE = 'IMPOSSIBLE';
  const TIME_TEMPLATE = [0, 0, 0, 0, 0, 0];
  const STARTS_WITH_1_TEMPLATE = [1, 3, 5, 9, 5, 9];
  const STARTS_WITH_2_TEMPLATE = [2, 3, 5, 9, 5, 9];
  
  for (let i = 0; i < payloadTimeDigits.length; i++) {
    for (let j = payloadTimeDigits[i]; j < possibleTimeDigits.length; j++) {
      possibleTimeDigits[j]++;
    }
  }

  if (possibleTimeDigits[2] === 0) {
    return FAIL_STATE_MESSAGE;
  }

  const shouldHoursStartsWith2 = possibleTimeDigits[1] === 0;
  if (shouldHoursStartsWith2 && possibleTimeDigits[3] === 1) {
    return FAIL_STATE_MESSAGE;
  }

  const numbersAvailableForMinute = possibleTimeDigits[5] - (shouldHoursStartsWith2 ? 2 : 1);
  if (numbersAvailableForMinute === 0) {
    return FAIL_STATE_MESSAGE;
  }

  const time = TIME_TEMPLATE;
  const isHoursStartsWith2 = shouldHoursStartsWith2
    || (numbersAvailableForMinute >= 2 && possibleTimeDigits[2] > possibleTimeDigits[1]);

  const maxDigits = isHoursStartsWith2
    ? STARTS_WITH_2_TEMPLATE
    : STARTS_WITH_1_TEMPLATE;

  for (let i = 0; i < maxDigits.length; i++) {
    time[i] = possibleTimeDigits.indexOf(possibleTimeDigits[maxDigits[i]]);

    for (let j = time[i]; j < possibleTimeDigits.length; j++) {
      possibleTimeDigits[j]--;
    };
  }

  const formattedTime = time.reduce(
    (result, item) => result.replace('x', item),
    `xx:xx:xx`,
  );

  return formattedTime;
}
