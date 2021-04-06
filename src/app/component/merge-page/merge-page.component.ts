import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-merge-page',
  templateUrl: './merge-page.component.html',
  styleUrls: ['./merge-page.component.scss']
})
export class MergePageComponent implements OnInit {

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef | any;
  files : any = [];
  fileName: string | any;

  constructor(private fileService: FileService) { }


  ngOnInit() {
  }


  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.fileName = file.name + " is uploaded"
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }


  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file: any) => {
      this.uploadFile(file);
    });
  }

  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('name', '3ad daba');
    file.inProgress = true;
    this.fileService.upload(formData).subscribe(
      rsp => {
        console.log(rsp)
      },
      error => {
        console.log(error)
      });

  }


  jibLfile(){
    console.log('klikitini');
    this.fileService.get_file('nnnnn');
  }

}
