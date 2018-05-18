import {Component, OnInit} from '@angular/core';

import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core';

declare var google:any;

@Component({
  selector: 'app-map-content',
  templateUrl: 'map-content.component.html'
})
export class MapContentComponent implements OnInit {

constructor(public mapApiWrapper:GoogleMapsAPIWrapper) {}

    ngOnInit() {
      this.mapApiWrapper.getNativeMap()
        .then((map)=> {
            let position = new google.maps.LatLng(40.177200, 44.503490);

            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: position,
                radius: 10000
            });
            var drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.MARKER,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: ['polygon'/*, 'marker', 'circle', 'polyline', 'rectangle'*/]
                },
                markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
                circleOptions: {
                    fillColor: '#ffff00',
                    fillOpacity: 1,
                    strokeWeight: 5,
                    clickable: false,
                    editable: true,
                    zIndex: 1
                }
            });
            drawingManager.setMap(map);
        });


    }

}
