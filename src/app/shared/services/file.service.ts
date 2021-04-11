import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';








@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }
  SERVER_URL = "http://127.0.0.1:5000/file/";

  upload(formData: any) {
    console.log("upload service function is called")
    console.log(formData)
    return this.httpClient.post<FormData>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  split_file(formData: any): any {
    return this.httpClient.post('http://127.0.0.1:5000/convert/split', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


  get_file(fileName: string): any {
    const QLF = 'QLF'
    var mediaType = 'application/pdf';
    return this.httpClient.post('http://127.0.0.1:5000/file/' + fileName, { location: "convert.pdf" }, { responseType: 'blob' }).subscribe(
      (response) => {
        var blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'report.pdf')
      })
  }

  delete_file(fileName: string): any {
    return this.httpClient.delete('http://127.0.0.1:5000/file/'+fileName);
  }
}
