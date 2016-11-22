# angular2-esri-loader
An Angular 2 service to help you load [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) Modules

## Install
```bash
npm install angular2-esri-loader esri-loader
```

## Usage
Example of using the loader service in a resolver to lazy load the ArcGIS API and 

```ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { EsriLoaderService } from 'angular2-esri-loader';

@Injectable()
export class EsriMapResolveService implements Resolve<any> {

  constructor(private esriLoader: EsriLoaderService) { }

  resolve() {
    // only load the ArcGIS API for JavaScript when we get to this route
    return this.esriLoader.load({
      // use a specific version of the API instead of the latest
      url: '//js.arcgis.com/3.18/'
    }).then(() => {
      // load the map class needed to create a new map
      // and make it available in the route's data
      return this.esriLoader.loadModules(['esri/map']);
    });
  }
}
```
 