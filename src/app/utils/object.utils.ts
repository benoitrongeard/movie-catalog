export class ObjectUtils {
  /**
   * Convert a string with snake case to camel case
   * @param s string to convert
   * @returns string with camel case
   */
  static toCamel(s: string): string {
    return s.replace(/([-_][a-z])/gi, $1 => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  /**
   * Convert all properties of object to camel case
   * @param o Object to convert
   * @returns Object with camel case properties
   */
  static keysToCamel(o: { [key: string]: object }): object {
    if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
      const n: { [key: string]: object } = {};
      Object.keys(o).forEach((k: string) => {
        const property: string = this.toCamel(k);
        n[property] = this.keysToCamel(o[k] as { [key: string]: object });
      });
      return n;
    } else if (Array.isArray(o)) {
      return o.map(i => {
        return this.keysToCamel(i);
      });
    }
    return o;
  }

  /**
   * Return the correct type of the object
   * Use to convert an object with snake case properties to camel case
   * @param interfaceObj contains the object to convert
   * @returns T object with camel case properties
   */
  static convertObjectToInterface<T>(interfaceObj: object): T {
    return this.keysToCamel(interfaceObj as { [key: string]: object }) as T;
  }
}
