import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'average',
  standalone: true,
})
export class AveragePipe implements PipeTransform {
  transform(value: number): string {
    const average = Math.round(value * 10);
    return average.toString() ?? '??';
  }
}
