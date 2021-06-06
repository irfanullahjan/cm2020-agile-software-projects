export function getAsString(param: string | string[]): string {
  if (typeof param === 'string') return param;
  else return param[0];
}
