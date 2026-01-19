function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

function optionalBoolean(name: string, fallback: boolean): boolean {
  const v = process.env[name];
  if (!v) return fallback;
  return v.toLowerCase() === 'true';
}

export const env = {
  baseUrl: required('BASE_URL'),
  headless: optionalBoolean('HEADLESS', false),

  testEmail: required('TEST_EMAIL'),
  testPassword: required('TEST_PASSWORD'),
};
