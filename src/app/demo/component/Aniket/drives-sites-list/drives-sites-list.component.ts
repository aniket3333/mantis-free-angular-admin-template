import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpStatus } from '../common/http-status';
import { SitesModal } from '../common/siteModal';
import { SHARE_POINTS_SERVICE, ISharePointService } from '../Ishare-point.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProviderList } from 'src/app/app-provider.registrar';
import { LoaderService } from '../loader.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-drives-sites-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule,RouterModule],
  templateUrl: './drives-sites-list.component.html',
  styleUrls: ['./drives-sites-list.component.css'],
    providers:[ProviderList]
})
export class DrivesSitesListComponent {
 sitesModel: SitesModal = new SitesModal();
  sitesData:any
  siteId: string='';
  constructor(private _loaderService: LoaderService,private _toaster:HotToastService,
    @Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService, private router :Router,private activateRoute:ActivatedRoute
  ) {
    this.activateRoute.paramMap.subscribe(res=>{
     this.siteId = res.get("siteId")?.toString() ?? ''
    })
  }

navigate(id:string){
  this.router.navigate(["/pages/drive-item",id])
}
  ngOnInit(): void {
    this.getAllSites();
  }
  getAllSites() {
    this._loaderService.isLoading.next(true);
    this.sharePointService.getDrivesBySiteId(this.siteId).subscribe((res) => {
      if (res.Status == HttpStatus.Success) {
        this._loaderService.isLoading.next(false);
        this.sitesModel = res.Data.Value;
        this.sitesData= res.Data.Value;
      }
      else{
        this._loaderService.isLoading.next(false);
        this._toaster.error(res.Message);

      }
    },
  (error)=>{
this._toaster.error(error.Message);
  });
  }
}
