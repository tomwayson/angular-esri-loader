import { Injectable } from '@angular/core';
import { isLoaded, bootstrap, dojoRequire } from 'esri-loader';

@Injectable()
export class EsriLoaderService {

  constructor() { }

  isLoaded() {
    return isLoaded();
  }

  // lazy load the ArcGIS API for JavaScript
  load(options?: Object): Promise<Function> {
    return new Promise((resolve: Function, reject: Function) => {
      // don't try to load a second time
      if (isLoaded()) {
        resolve(dojoRequire);
      }
      // wrap bootstrap in a promise
      bootstrap((err: Error) => {
        if (err) {
          reject(err);
        } else {
          resolve(dojoRequire);
        }
      }, options);
    });
  }

  // wrap Dojo require in a promise
  loadModules(moduleNames: string[]): Promise<any[]> {
    return new Promise((resolve: Function) => {
      dojoRequire(moduleNames, (...modules: any[]) => {
        resolve(modules);
      });
    });
  }

  // convenience function to allow calling Dojo require w/ callback
  require(moduleNames: string[], callback: (...modules: any[]) => void) {
    return dojoRequire(moduleNames, callback);
  }
}
