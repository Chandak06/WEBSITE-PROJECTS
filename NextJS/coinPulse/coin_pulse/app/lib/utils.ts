import {clsx,type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge'
import { Time } from 'lightweight-charts';

export function cn(...inputs : ClassValue[]){
    return twMerge(clsx(inputs));
}

export function convertOHLCData(data: OHLCData[]) {
  return data
    .map((d) => ({
      time: d[0] as Time,
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }))
    .filter((item, index, arr) => index === 0 || item.time !== arr[index - 1].time);
}

export function formatCurrency(
  value: number | null | undefined,
  digits = 2,
  currency = 'USD',
  showSymbol = true,
) {
  if (value == null || Number.isNaN(value)) {
    return showSymbol ? '$0.00' : '0.00';
  }

  return value.toLocaleString(undefined, {
    ...(showSymbol && {
      style: 'currency',
      currency: currency.toUpperCase(),
    }),
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}