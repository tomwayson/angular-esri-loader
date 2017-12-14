import { Injectable } from '@angular/core';
import { loadModules, loadScript, ILoadScriptOptions } from 'esri-loader';

@Injectable()
export class EsriLoaderService {

  constructor() { }

  //use to save options passed to load()
  private loadScriptOptions: ILoadScriptOptions;

  // lazy load the ArcGIS API for JavaScript
  // only need to use load() is specifying something other than the default options
  load(options?: ILoadScriptOptions): Promise<HTMLScriptElement> {
    this.loadScriptOptions = options ? options : {};
    return loadScript(options);
  }

  // will use defaults if load() has not been called
  loadModules(moduleNames: string[]): Promise<any[]> {
    return loadModules(moduleNames, this.loadScriptOptions);
  }

  // convenience function to allow calling Dojo require w/ callback
  require(moduleNames: string[], callback: any) {
    return loadModules(moduleNames, this.loadScriptOptions).then(callback);
  }
}
