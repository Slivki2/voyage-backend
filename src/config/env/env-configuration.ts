import * as process from "process"

export const DEFAULT_APP_PORT = 4000

export type EnvironmentConfig = {
  app_port: number
  db: {
    host: string
    port: number
    name: string
    username: string
    password: string
    url: string
  }
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const config = {
    app_port: parseInt(process.env.APP_PORT, 10) || DEFAULT_APP_PORT,
    db: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      name: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      url: process.env.DB_URL,
    },
  }

  return config
}
