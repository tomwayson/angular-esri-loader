# angular2-esri-loader
An [Angular 2](https://angular.io/) service to help you load [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) modules. 

Exposes a service that wraps the functions from the [esri-loader](https://github.com/tomwayson/esri-loader) library in new functions that return promises. 

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

For an example of how to use this service to lazy load the ArcGIS API and resolve modules in a route, see 
[esri-angular-cli-example's esri-map-resolve.service.ts](https://github.com/tomwayson/esri-angular-cli-example/blob/ab4540912904cf78ccfd904fb3bfa4c69b4aa1da/src/app/esri-map/esri-map-resolve.service.ts).

## Examples
This service is in use in these applications:
- [esri-angular-cli-example]((https://github.com/tomwayson/esri-angular-cli-example)

## Resources
* [Using the ArcGIS API for JavaScript in Applications built with webpack](http://tomwayson.com/2016/11/27/using-the-arcgis-api-for-javascript-in-applications-built-with-webpack/)
* [esri-loader](https://github.com/tomwayson/esri-loader)

## Credit
Thanks to [@kgs916](https://github.com/kgs916) for helping me figure out how to publish a TypeScript library for Angular 2. I'll never do that again.
