import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voteColor',
  standalone: true,
})
export class VoteColorPipe implements PipeTransform {
  transform(value: number): string {
    if (value <= 3) {
      return 'text-red-400';
    } else if (value <= 7) {
      return 'text-yellow-400';
    } else if (value <= 10) {
      return 'text-green-400';
    }
    return '';
  }
}
