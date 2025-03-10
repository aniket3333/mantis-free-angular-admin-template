import { Component, Inject, OnInit } from '@angular/core';
import { SharePointService } from '../share-point.service';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../Ishare-point.service';
import { HttpStatus } from '../common/http-status';
import { SitesModal } from '../common/siteModal';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProviderList } from 'src/app/app-provider.registrar';
import { LoaderService } from '../loader.service';
import { ToastrService } from 'ngx-toastr';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-all-sites-list',
  standalone: true, // This indicates that the component is standalone
  imports: [HttpClientModule, CommonModule, RouterModule], // List of imported modules
  templateUrl: './all-sites-list.component.html', // Path to the HTML template
  styleUrls: ['./all-sites-list.component.css'], // Use styleUrls (plural)
  providers: [ProviderList] // List of providers (services)
})
export class AllSitesListComponent implements OnInit {
  sitesModel: SitesModal = new SitesModal();
  sitesData:any;
   responseData = {
    createdDateTime: "2020-07-03T09:35:09Z",
    description: null,
    displayName: "User Management",
    id: "111",
    lastModifiedDateTime: "2020-06-27T19:31:33Z",
    name: "sdaemoninfo.sharepoint.com",
    root: {},
    siteCollection: { hostname: 'sdaemoninfo.sharepoint.com' },
    webUrl: "https://sdaemoninfo.sharepoint.com"
  };
  constructor(
    @Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService,private router :Router,
    private _loaderService: LoaderService,private _toaster:HotToastService
  ) {

  }

navigate(siteId:string){
  if(siteId=='111')
  {
    this.router.navigate(["/pages/user-management/user-list"])
  }
  else{
    this.router.navigate(["/pages/drive-list", siteId])
  }

}
  ngOnInit(): void {
    this.getAllSites();
  }
  getAllSites() {
     this._loaderService.isLoading.next(true),
    this.sharePointService.getAllSites().subscribe((res) => {
      if (res.Status == HttpStatus.Success) {
        this.sitesModel = res.Data.value;
        this.sitesData= res.Data.value;
        this._loaderService.isLoading.next(false);

        // this.sitesData.push({
        //   displayName: this.responseData.displayName,
        //   id: this.responseData.id
        // });
        // console.log(this.sitesData);
      }
      else{
        this._loaderService.isLoading.next(false);

      }
    },
  (error)=>{
this._toaster.error(error.Message);
  });
  }

  // You can add logic for assigning file types here if needed


}

