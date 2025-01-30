import { type Config } from 'drizzle-kit'

export default {
  schema: './db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: true
  },
  out: './drizzle',
  tablesFilter: ['nutrical_*'],
  verbose: true,
  strict: true
} satisfies Config
