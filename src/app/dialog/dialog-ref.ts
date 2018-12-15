import { Observable, Subject } from 'rxjs';

export class DialogRef {
  constructor() {}

  close(result?: any) {
    this._afterClosed.next(result);
    this.unFreeze();
  }

  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();
  
  unFreeze() {
    document.getElementsByTagName('html')[0].style.overflow = ""
    document.getElementsByTagName('body')[0].style.overflowY = "";
  };
}
