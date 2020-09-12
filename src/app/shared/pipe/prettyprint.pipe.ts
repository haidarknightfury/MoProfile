import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'prettyprint',})
export class PrettyprintPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return JSON.stringify(value, null, 2);
  }
}
