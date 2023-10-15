export class StringUtils {
  static removeDiacitic(str: string) {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  }

  static toLowerCase(str: string) {
    return str.toLowerCase();
  }

  static ignoreCaseAndDiacritic(str: string) {
    return this.toLowerCase(this.removeDiacitic(str));
  }
}
