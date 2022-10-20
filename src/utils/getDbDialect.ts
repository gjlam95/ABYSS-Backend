export function getDbDialect(): 'postgres' | 'mssql' {
  return (process.env.DB_DIALECT as any) || 'postgres';
}
