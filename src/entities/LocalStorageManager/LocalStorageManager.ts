export class LocalStorageManager {
  numberOfItems: number
  hasData: boolean

  constructor () {
    this.numberOfItems = localStorage.length;
    this.hasData = this.numberOfItems > 0;
  }

  set (key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get (key: string) {
    const data = localStorage.getItem(key);
    return data !== null ? this.parse(data) : null;;
  }

  parse (data: any) {
    return JSON.parse(data);
  }
}