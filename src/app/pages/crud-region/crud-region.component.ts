import { ToastrService } from 'ngx-toastr';
import { RegionService } from './../../services/regionservice';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Region } from 'src/app/interface/region';

@Component({
  selector: 'app-crud-region',
  templateUrl: './crud-region.component.html'
})
export class CrudRegionComponent implements OnInit {
  regions : any[];
  actualRegion : any;
  modalReference: any;
  closeResult: string;
  currentPage : number = 0;
  pageNumber : number;

  constructor(private regionService : RegionService,
    private modalService: NgbModal, private toastr : ToastrService) { }

  ngOnInit(): void {

    this.regionService.getAllRegions(0).subscribe(
      (response : any[]) => {
        this.regions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    this.regionService.getPageNumber().subscribe(
      (response : any) => {
        this.pageNumber = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

  }

  /**
   * Page des régions suivant
   */
   nextPage() {
    this.regionService.getAllRegions(this.currentPage+1).subscribe(
      (response : any[]) => {
        this.regions = response;
        this.currentPage++;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  /**
   * Page des régions précedent
   */
   previousPage() {
    this.regionService.getAllRegions(this.currentPage-1).subscribe(
      (response : any[]) => {
        this.regions = response;
        this.currentPage--;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  /**
   * Effacer un région
   * @param i Indice du région au tableau des régions
   */
  deleteRegion(i : number) {
    this.regionService.deleteRegion(this.regions[i].id)
    .subscribe(
      (response) => {
        this.toastr.success(
          '<span class="tim-icons icon-check-2" [data-notify]="icon"></span> Région supprimé',
          '',
          {
            enableHtml: true,
            closeButton: false,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-top-center'
          }
        );
        this.regionService.getAllRegions(this.currentPage).subscribe(
          (response : any[]) => {
            this.regions = response;
            this.modalReference.close();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(
          '<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> Echec du suppression du région',
          '',
          {
            enableHtml: true,
            closeButton: false,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-top-center'
          }
        );
        return;
      }
    );;
  }

  /**
   * Modifier un région
   * @param form Formulaire du modication du région
   */
  executeModifyRegion(form: NgForm) {
    this.regionService.modifyRegion(this.actualRegion.id, form.value.region_name)
    .subscribe(
      (response) => {
        this.toastr.success(
          '<span class="tim-icons icon-check-2" [data-notify]="icon"></span> Région modifié avec succès',
          '',
          {
            enableHtml: true,
            closeButton: false,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-top-center'
          }
        );
        this.regionService.getAllRegions(this.currentPage).subscribe(
          (response : any[]) => {
            this.regions = response;
            this.modalReference.close();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(
          '<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> Echec de modification du région',
          '',
          {
            enableHtml: true,
            closeButton: false,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-top-center'
          }
        );
        return;
      }
    );
  }

  /**
   * Créer un région vers la base de données
   * @param form Formulaire d'ajout de région
   */
  addRegion(form: NgForm) {
    let region : Region = {
      name: form.value.region_name,
      password: form.value.region_password
    };

    this.regionService.createRegion(region)
    .subscribe(
      (response) => {
        this.toastr.success(
          '<span class="tim-icons icon-check-2" [data-notify]="icon"></span> Nouveau région créé avec succès',
          '',
          {
            enableHtml: true,
            closeButton: false,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-top-center'
          }
        );
        this.regionService.getAllRegions(this.currentPage).subscribe(
          (response : any[]) => {
            this.regions = response;
            this.modalReference.close();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(
          '<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> Echec du création du nouveau région',
          '',
          {
            enableHtml: true,
            closeButton: false,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-top-center'
          }
        );
        return;
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

  /**
   * Ouvrir le modal pour créer un région
   */
   createRegion(content) {
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
