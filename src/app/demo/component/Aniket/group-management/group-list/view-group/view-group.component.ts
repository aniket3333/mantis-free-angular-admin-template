import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProviderList } from 'src/app/app-provider.registrar';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../../Ishare-point.service';

@Component({
  selector: 'app-view-group',
imports:[CommonModule,HttpClientModule,FormsModule],
  providers: [ProviderList], 
  templateUrl: './view-group.component.html',
  styleUrl: './view-group.component.scss'
})
export class ViewGroupComponent implements OnInit {
constructor(@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService){}
ngOnInit(): void {
  
}
}
