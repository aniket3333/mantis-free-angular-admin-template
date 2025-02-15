import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports:[CommonModule],
  standalone:true
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
  ngOnInit(): void {
  }

}
