import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, format: string = 'USD'): string {
    if (value == null) return '';

    let currencyCode = 'USD';
    let locale = 'en-US';

    switch (format) {
      case 'USD':
        currencyCode = 'USD';
        locale = 'en-US';
        break;
      case 'EUR':
        currencyCode = 'EUR';
        locale = 'en-IE';
        break;
      case 'VND':
        currencyCode = 'VND';
        locale = 'vi-VN';
        break;
      default:
        currencyCode = 'USD';
        locale = 'en-US';
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
    }).format(value);
  }
}
