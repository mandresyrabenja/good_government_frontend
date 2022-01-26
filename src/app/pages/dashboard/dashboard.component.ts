import { TopKeyword } from './../../interface/top-keyword';
import { MonthlyReport } from './../../interface/monthly-report';
import { StatisticService } from './../../services/statistic.service';
import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public monthlyReports: MonthlyReport[];
  public newReportNb: number[] = [];
  public processingReportNb: number[] = [];
  public doneReportNb: number[] = [];
  public mostRepetitiveKeywords;
  public top6RegionWithMostReport;

  constructor(private statisticService : StatisticService) {}

  ngOnInit() {

    // Test configuration graphe chartjs
    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 200,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    // Test configuration graphe chartjs
    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    // Test configuration graphe chartjs
    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 110,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    // Test configuration graphe chartjs
    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    //Configuration du courbe chartjs du nombre mensuel des signalements l'année dernière
    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 1,
            suggestedMax: 10,
            padding: 1,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    // Label du de l'axe x du courbe
    var chart_labels = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

    this.statisticService.getLastYearMonthlyReportsNumber().subscribe(
      (response : MonthlyReport[]) => {
        this.monthlyReports = response;

        for(let i = 0; i < this.monthlyReports.length; i++) {
          this.newReportNb[i] = this.monthlyReports[i].newReportNb;
          this.processingReportNb[i] = this.monthlyReports[i].processingReportNb;
          this.doneReportNb[i] = this.monthlyReports[i].doneReportNb;
        }

        // Datasets des courbes des signalements nouveaux, en cours de traitement et fini
        this.datasets = [ this.newReportNb, this.processingReportNb, this.doneReportNb ];
        this.data = this.datasets[0];

        // Elemnt HTML pour dessiner le courbe
        this.canvas = document.getElementById("chartBig1");
        this.ctx = this.canvas.getContext("2d");

        // Couleur du courbe chartjs
        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
        gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

        // Dessin du courbe chartjs
        var config = {
          type: 'line',
          data: {
            labels: chart_labels,
            datasets: [{
              label: "Nombre des signalements",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: '#ec250d',
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: '#ec250d',
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: '#ec250d',
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.data,
            }]
          },
          options: gradientChartOptionsConfigurationWithTooltipRed
        };
        this.myChartData = new Chart(this.ctx, config);
      }
    );

    this.statisticService.getTop5MostRepetitiveKeywords().subscribe(
      (response: any) => {
          this.mostRepetitiveKeywords = Object.entries(response);
          this.mostRepetitiveKeywords = this.mostRepetitiveKeywords.sort((a, b) => b[1] - a[1]);
      }
    );

    // Configuration du diagramme chartjs contenant les top 6 des régions qui ont le plus des signalements
    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 1,
            suggestedMax: 20,
            padding: 2,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    this.statisticService.getTop6RegionWithMostReport().subscribe(
      (response: any) => {
        this.top6RegionWithMostReport = Object.entries(response);
        this.top6RegionWithMostReport = this.top6RegionWithMostReport.sort((a, b) => a[1] - b[1]);

        let regionNames : string[] = [];
        let regionReportNumbers : number[] = [];

        for(let i = 0; i < this.top6RegionWithMostReport.length; i++) {
          regionNames[i] = this.top6RegionWithMostReport[i][0];
          regionReportNumbers[i] = this.top6RegionWithMostReport[i][1];
        }

        // Récuperation de l'élément HTML où on va dessiner le diagramme
        this.canvas = document.getElementById("CountryChart");
        this.ctx  = this.canvas.getContext("2d");

        // Coleur en gradient du diagramme
        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
        gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

        // Dessiner le diagramme chartjs
        var myChart = new Chart(this.ctx, {
          type: 'bar',
          responsive: true,
          legend: {
            display: false
          },
          data: {
            labels: regionNames,
            datasets: [{
              label: "Nombre des signalements",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: '#1f8ef1',
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: regionReportNumbers,
            }]
          },
          options: gradientBarChartConfiguration
        });
      }
    );
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
}
