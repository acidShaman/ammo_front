import { Component, OnInit } from '@angular/core';
import {faMapMarkedAlt, faPhone} from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  phoneIcon = faPhone;
  markerIcon = faMapMarkedAlt;
  clockIcon = faClock;

  constructor() { }

  ngOnInit(): void {
  }

}
