type SingleNumber = 0 | 1;

export type Code =
  `${SingleNumber}${SingleNumber}${SingleNumber}-${SingleNumber}${SingleNumber}${SingleNumber}-${SingleNumber}${SingleNumber}${SingleNumber}`;

export function codeToDecimal(code: Code) {
  const groups = code.split('-');
  const decimalGroups = groups.map((group) => {
    return parseInt(group, 2);
  });

  return decimalGroups.join('');
}
