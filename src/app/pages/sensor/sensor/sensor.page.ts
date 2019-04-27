import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
})
export class SensorPage implements OnInit {

  descSensor;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.descSensor = this.activatedRoute.snapshot.paramMap.get('descSensor');
  }

}
