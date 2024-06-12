export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT)
      : 5432,
    name: process.env.DATABASE_NAME,
  },
});
