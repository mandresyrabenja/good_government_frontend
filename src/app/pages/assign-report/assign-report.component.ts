import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Report } from './../../interface/report';
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-report',
  templateUrl: './assign-report.component.html'
})
export class AssignReportComponent implements OnInit {
  nonAssignedReports : Report[];
  actualReport: Report;
  closeResult: string;
  imageToShow: any;
  isImageLoading = false;
  regions : any[];
  regionId: any;
  modalReference: any;

  affectReport(form : NgForm) {
    this.reportService.assignReport(this.actualReport.id, form.value.region).subscribe(
      res => {
        this.reportService.getNonAssignedReport().subscribe(
          (response: Report[]) => {
            this.nonAssignedReports = response;
            this.modalReference.close();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  /**
   * Créer une image à partir d'un fichier obtenu à partir d'une requête HTTP
   * @param image Reponse HTTP
   */
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
        "load",
        () => { this.imageToShow = reader.result; },
        false
    );

    if (image) { reader.readAsDataURL(image); }
  }

  /**
   * Avoir le photo d'un signalement
   * @param idReport ID su signalement
   */
  getImageFromService(idReport) {
    this.isImageLoading = true;
    this.reportService.getImage(idReport).subscribe(
      data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      error => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  constructor(private reportService: ReportService,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.reportService.getNonAssignedReport().subscribe(
      (response: Report[]) => {
        this.nonAssignedReports = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

    this.reportService.getAllRegions().subscribe(
      (response : any[]) => {
        this.regions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  /**
   * Afficher un signalement particulier
   * @param index Index du signalement dans le tableau des signalement this.nonAssignedReport
   * @param content Modal pour l'afficher
   */
  reportDetails(index : number, content) {
    this.actualReport = this.nonAssignedReports[index];
    this.getImageFromService(this.actualReport.id);
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
