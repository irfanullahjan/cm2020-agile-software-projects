export function getAsString(param: string | string[] | undefined): string {
  if (typeof param === 'string') return param;
  else if (typeof param === 'undefined') return '';
  else return param[0];
}
