import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapContentComponent} from "./map-content/map-content.component";
import {GoogleMapsAPIWrapper,MapsAPILoader} from "angular2-google-maps/core";
import {FormBuilder} from "@angular/forms";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers:[MapContentComponent, GoogleMapsAPIWrapper,FormBuilder]
})
export class AppComponent implements OnInit{

    @ViewChild('serachAddress') searchElement: ElementRef;
    autocomplete:any;
    title:string = 'Google Map';
    markers:any  = [];
    lat:number   = 40.177200;
    lng:number   = 44.503490;

    constructor(
        private mapApiLoader:MapsAPILoader,
        private ngZone:NgZone
    ){}

    ngOnInit() {
        this.mapApiLoader.load().then(
            () => {
                    this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {/*types:['address']*/});
                }
            );
    }

    confirmSelection(){
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        this.mapApiLoader.load().then (
            () => {
                var place = this.autocomplete.getPlace();

                if(!place || place.geometry === undefined || place.geometry === null ){
                    return;
                }
                console.log(place);
                this.markers.push({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: place.name,
                });
                this.lat = place.geometry.location.lat();
                this.lng = place.geometry.location.lng();
            }
        );
    }
}
