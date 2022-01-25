/**
 * Interface dénifinissant la structutre du nombre des signalements par mois
 */
export interface MonthlyReport {
  "id": number;
  "date": string;
  "newReportNb": number;
  "processingReportNb": number;
  "doneReportNb": number;
}
