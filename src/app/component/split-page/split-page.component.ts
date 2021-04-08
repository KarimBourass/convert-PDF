import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-split-page',
  templateUrl: './split-page.component.html',
  styleUrls: ['./split-page.component.scss']
})
export class SplitPageComponent implements OnInit, OnDestroy {

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef | any;
  files: any = [];
  fileName: string | any;
  myFileName = '';
  upload = false;
  dowload = false;
  showPages = false;
  stratPage = 1;
  endPage = 1;
  spinner= false;

  constructor(private fileService: FileService) { }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('hhhhhhhhhhhhhhh');
  }


  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.fileName = file.name
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.showPages = true;
    };
    fileUpload.click();
  }

  splitFile(contactForm:any){
    this.upload= true;
    this.stratPage = contactForm.value.startPage;
    this.endPage = contactForm.value.endPage;
    this.uploadFiles();
  }



  private uploadFiles() {
    this.showPages= false;
    this.spinner= true;
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file: any) => {
      this.uploadFile(file);
    });
  }

  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('name', this.fileName);
    formData.append('start_page', String(this.stratPage));
    formData.append('end_page', String(this.endPage));
    file.inProgress = true;
    this.fileService.split_file(formData).subscribe(
      (rsp: any) => {
        const body = rsp['body']
        this.myFileName = body?.file_id
        setTimeout(() => {
          this.dowload = true;
          this.spinner = false;
        }, 2000)
      }
    );
  }

  downloadFile(fileName: string) {
    this.fileService.get_file(fileName);
  }

}
