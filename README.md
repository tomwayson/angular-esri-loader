# angular2-esri-loader
An [Angular](https://angular.io/) library to help you load [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) modules. 

Exposes a service that wraps the functions from the [esri-loader](https://github.com/tomwayson/esri-loader) library in new functions that return promises.

To understand why this is needed, and the benefits of using esri-loader over other techniques, see the [esri-loader README](https://github.com/tomwayson/esri-loader#why-is-this-needed).

## Install
```bash
npm install angular2-esri-loader esri-loader
```

## Usage
Example of using the loader service in a component to lazy load the ArcGIS API and create a map

```ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EsriLoaderService } from 'angular2-esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {
  @ViewChild('map') mapEl: ElementRef;
  
  map: any;

  constructor(private esriLoader: EsriLoaderService) { }

  ngOnInit() {
    // only load the ArcGIS API for JavaScript when this component is loaded
    return this.esriLoader.load({
      // use a specific version of the API instead of the latest
      url: '//js.arcgis.com/3.18/'
    }).then(() => {
      // load the map class needed to create a new map
      this.esriLoader.loadModules(['esri/map']).then(([Map]) => {
        // create the map at the DOM element in this component
        this.map = new Map(this.mapEl.nativeElement, {
          center: [-118, 34.5],
          zoom: 8,
          basemap: 'dark-gray'
        });
      });
    });
  }
}
```

### In an Angular CLI Application

To use this library in an [Angular CLI](https://github.com/angular/angular-cli) application, the best place to start is to follow the instructions in [this gist](https://gist.github.com/tomwayson/e6260adfd56c2529313936528b8adacd).

For an example of how to use this service to lazy load the ArcGIS API and resolve modules in a route, see 
[esri-angular-cli-example's esri-map-resolve.service.ts](https://github.com/tomwayson/esri-angular-cli-example/blob/ab4540912904cf78ccfd904fb3bfa4c69b4aa1da/src/app/esri-map/esri-map-resolve.service.ts).

### In an angular2-webpack-starter Application

See [this gist](https://gist.github.com/jwasilgeo/00855ee002aca822e33abd8a7a031f56) for instructions on how to use this library in an [AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) application.

## ArcGIS Types
This service doesn't make any assumptions about which version of the ArcGIS API you are using, so you will have to manually install the appropriate types.

### 4.x Types
Follow [these instructions](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript) to install the 4.x types.

For Angular CLI applications, you will also need to add "arcgis-js-api" to `compilerOptions.types` in src/tsconfig.app.json and src/tsconfig.spec.json [as shown here](https://gist.github.com/tomwayson/e6260adfd56c2529313936528b8adacd#adding-the-arcgis-api-for-javascript-types).

Then you can use the `__esri` namespace for the types as seen in [this example](https://github.com/kgs916/angular2-esri4-components/blob/68861b286fd3a4814c495c2bd723e336e917ced2/src/lib/esri4-map/esri4-map.component.ts#L20-L26).

### 3.x Types
Unfortunately the `__esri` namespace is not defined for 3.x types. You can use [these instructions](https://github.com/Esri/jsapi-resources/tree/master/3.x/typescript) to install the 3.x types, but then [you will still need to use `import` statements to get the types](https://github.com/Esri/jsapi-resources/issues/60). This may cause build errors that may or may not result in actual runtime errors depending on your environment.

## Examples
This service is in use in these applications:
- [esri-angular-cli-example](https://github.com/tomwayson/esri-angular-cli-example)

## Resources
* [Using the ArcGIS API for JavaScript in Applications built with webpack](http://tomwayson.com/2016/11/27/using-the-arcgis-api-for-javascript-in-applications-built-with-webpack/)
* [esri-loader](https://github.com/tomwayson/esri-loader)

## Credit
Thanks to [@kgs916](https://github.com/kgs916) for helping me figure out how to publish a TypeScript library for Angular 2. I'll never do that again.
