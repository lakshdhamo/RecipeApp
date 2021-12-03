import { Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandlerService {
    constructor() {

  }

  handleError(error: Error) {
    console.error('An error occurred:', error.message);
    console.error(error);
    alert(error);

  }

}
