import { Component, Inject } from '@angular/core';
import { HttpStatus } from '../common/http-status';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SitesModal } from '../common/siteModal';
import { SHARE_POINTS_SERVICE, ISharePointService } from '../Ishare-point.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UploadFile } from '../model/upload-file.model';
import { ProviderList } from 'src/app/app-provider.registrar';
import { HotToastService } from '@ngxpert/hot-toast';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-drive-item-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterModule],
  templateUrl: './drive-item-list.component.html',
  styleUrls: ['./drive-item-list.component.css'],
  providers:[ProviderList]
})
export class DriveItemListComponent {
  sitesModel: SitesModal = new SitesModal();
  sitesData:any
  DriveId: string='';
  uploafFileFlag: boolean;
  selectedFile: File;
  uploadFilei:UploadFile;
  successMessage: string;
  constructor(private _toaster:HotToastService,private _loaderservice:LoaderService,
    @Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService, private router :Router,private activateRoute:ActivatedRoute
  ) {
    this.activateRoute.paramMap.subscribe(res=>{
     this.DriveId = res.get("DriveId")?.toString() ?? ''
    })
  }

navigate(site:any){
 let fileUrl= this.getDownloadUrl(site);
 localStorage.setItem("fileUrl",fileUrl);
  this.router.navigate(['/pages/drive-view-file'])
}
  ngOnInit(): void {
    this.uploadFilei =new  UploadFile();

    this.getAllSites();
  }
  getAllSites() {
    this._loaderservice.isLoading.next(true);
    this.sharePointService.getDrivesItemByDriveId(this.DriveId).subscribe((res) => {
      if (res.Status == HttpStatus.Success) {
        this._loaderservice.isLoading.next(false);

        this.sitesModel = res.Data.Value;
        this.sitesData= res.Data.Value;
      }
      else{
        this._loaderservice.isLoading.next(false);
this._toaster.error(res.Message);
      }
    }
  ,
(error)=>{
  this._toaster.error(error.Message);

});
  }
  getDownloadUrl(site: any): string {
    return site['@microsoft.graph.downloadUrl'];
  }
  uploadFile()
  {
   this.uploafFileFlag = true; 
  }
  createFormData(formValue: any): FormData {
    const formData = new FormData();
  console.log(formValue);
    formData.append('file', formValue.file);
    formData.append('DriveId', formValue.DriveId);
    formData.append('SiteId', formValue.SiteId);
    return formData;
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.uploadFilei.file = file;
      this.uploadFilei.DriveId = this.DriveId;
      this.uploadFilei.SiteId = '4b9eabb3-e8c0-4bfa-8568-1c7addced90f,7ac7501c-6905-4db8-b7a9-3b04184102ef';
      const formData = this.createFormData(this.uploadFilei);
      console.log(formData);
      this.sharePointService.uploadFile(formData).subscribe((res) => {
        if (res.Status == HttpStatus.Success) {
          this.uploafFileFlag = false;
          this.successMessage = 'File uploaded successfully';
          console.log(res);
          setTimeout(()=>{
            this.successMessage='';
            this.getAllSites();
          },2000);
        
         
        }
      });
    } else {
   
    }
  }
}
