export function generateRandomEmail(
  domain = 'yopmail.com'
): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);

  return `test_${timestamp}_${random}@${domain}`;
}

export function generateRandomPassword(
  length = 12
): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';

  const all = upper + lower + numbers + symbols;

  // ensure password complexity
  const required = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  const rest = Array.from({ length: length - required.length }, () =>
    all[Math.floor(Math.random() * all.length)]
  );

  return [...required, ...rest]
    .sort(() => 0.5 - Math.random())
    .join('');
}
