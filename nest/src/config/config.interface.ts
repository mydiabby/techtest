interface PostgresConfigProps {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  log: ('query' | 'error')[];
}

export interface ConfigProps {
  port: number;
  environment: string;
  database: PostgresConfigProps;
}
