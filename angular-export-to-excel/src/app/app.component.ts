import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ExportExcelService} from './services/export-excel.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angular-export-to-excel';

  dataForExcel = [];

  empPerformance = [
    { top_anlge:0.7613056, bottom_angle:1.1693019 },
    { top_anlge:0.7613456, bottom_angle:1.163434019 },
    { top_anlge:0.7613056, bottom_angle:1.1693019 },
    { top_anlge:2.734234056, bottom_angle:1.1019 },
  ];

  constructor(public ete: ExportExcelService, private http: HttpClient) { }
  // callServer() {
  //
  //   }

  exportToExcel() {


    console.log("hi");
   const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.get('http://localhost:3000/api/upload_camera_alignment_results', {
      headers: headers
    })
    .subscribe((data:any) => {
      if(data != null){
        if(data.result)
          this.empPerformance= data.result;
        if(this.empPerformance) {
          this.empPerformance.forEach((row: any) => {
            this.dataForExcel.push(Object.values(row))
          })
          let reportData = {
            title: 'Deviation In Data',
            data: this.dataForExcel,
            headers: Object.keys(this.empPerformance[0])
          }

          this.ete.exportExcel(reportData);
        }

      }

    });

  }
}
