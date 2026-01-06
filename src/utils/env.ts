function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

export const env = {
  baseUrl: required('BASE_URL'),
  environment: process.env.ENV ?? 'local',
  headless: process.env.HEADLESS === 'true',
};