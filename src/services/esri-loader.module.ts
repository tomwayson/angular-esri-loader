import {NgModule} from '@angular/core';
import { EsriLoaderService } from './esri-loader.service';
export * from './esri-loader.service';

@NgModule({
  providers: [EsriLoaderService]
})
export class EsriLoaderModule {}
