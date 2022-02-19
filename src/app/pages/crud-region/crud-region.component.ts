import { RegionService } from './../../services/regionservice';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crud-region',
  templateUrl: './crud-region.component.html'
})
export class CrudRegionComponent implements OnInit {
  regions : any[];

  constructor(private regionService : RegionService) { }

  ngOnInit(): void {

    this.regionService.getAllRegions().subscribe(
      (response : any[]) => {
        this.regions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

  }

}
