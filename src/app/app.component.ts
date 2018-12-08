import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-providers';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'leaflet-location';

  private map: L.Map = null;

  ngOnInit() {
    this.map = L.map('map')
      .fitWorld();

    L.tileLayer
      .provider('OpenStreetMap.Mapnik')
      .addTo(this.map);

      this.map.locate({setView: true, maxZoom: 16});

      this.map.on('locationfound', (e: any) => {

        let radius = e.accuracy / 2;
        L.marker(L.latLng(e.latitude, e.longitude))
        .bindPopup('marker')
        .addTo(this.map);
        L.circle(e.latlng, radius).addTo(this.map);
      });

  }
}
