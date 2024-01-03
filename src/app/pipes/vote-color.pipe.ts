import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voteColor',
  standalone: true,
})
export class VoteColorPipe implements PipeTransform {
  transform(value: number): string {
    if (value <= 3) {
      return 'bg-red-400/60 ring-red-400';
    } else if (value <= 7) {
      return 'bg-yellow-400/60 ring-yellow-400';
    } else if (value <= 10) {
      return 'bg-green-400/60 ring-green-400';
    }
    return '';
  }
}
