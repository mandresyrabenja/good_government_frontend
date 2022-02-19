import { RegionService } from './../../services/regionservice';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crud-region',
  templateUrl: './crud-region.component.html'
})
export class CrudRegionComponent implements OnInit {
  regions : any[];
  actualRegion : any;
  modalReference: any;
  closeResult: string;

  constructor(private regionService : RegionService,
    private modalService: NgbModal) { }

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

  /**
   * Ouvrir le modal pour modifier un région
   * @param index Indice du région au tableau des régions
   * @param content Réference de l'html modal
   */
  modifyRegion(index : number, content) {
    this.actualRegion = this.regions[index];
    this.open(content);
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {centered: false, size: 'md'});
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
