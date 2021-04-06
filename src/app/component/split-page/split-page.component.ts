import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-split-page',
  templateUrl: './split-page.component.html',
  styleUrls: ['./split-page.component.scss']
})
export class SplitPageComponent implements OnInit {

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef | any;
  files: any = [];
  fileName: string | any;
  myFileName = '';
  loading = false;
  dowload = false;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }


  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.fileName = file.name

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
    this.loading = true;
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('name', this.fileName);
    formData.append('start_page', '1');
    formData.append('end_page', '2');
    file.inProgress = true;
    this.fileService.split_file(formData).subscribe(
      (rsp: any) => {
        this.loading = false
        const body = rsp['body']
        this.myFileName = body?.file_id
        this.dowload = true;
      }
    );
    this.loading = false
  }


  downloadFile(fileName: string) {
    this.fileService.get_file(fileName);
  }

}
