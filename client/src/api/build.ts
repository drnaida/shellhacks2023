type Environment = 'local+api' | 'production';

export const environment = process.env.NODE_ENV as Environment;

export function GetBaseUrl(): string {
  switch (environment) {
    case 'local+api':
      return 'https://localhost:7183';
    case 'production':
      return 'https://shellhacks2023-production.up.railway.app';
    default:
      return 'https://localhost:7183';
  }
}
