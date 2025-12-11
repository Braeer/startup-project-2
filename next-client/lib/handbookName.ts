import { handbooksTypes } from '@/constant/handbooksTypes';

export function handbookName(key: string): string {
  const rule = handbooksTypes.find((r) => r.before === key);
  return rule ? rule.after : key;
}
