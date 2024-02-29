export const DEV_ENV = "development"
export const PROD_ENV = "production"

export function isDevEnv() {
  return process.env.NODE_ENV === DEV_ENV
}

export function isProdEnv() {
  return process.env.NODE_ENV === PROD_ENV
}
