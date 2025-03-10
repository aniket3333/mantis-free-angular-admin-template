import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../Ishare-point.service';
import { ProviderList } from 'src/app/app-provider.registrar';

@Component({
   selector: 'app-login',
    standalone: true,
    imports: [HttpClientModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
      providers:[ProviderList]
})
export class LoginComponent implements OnInit {

  //#region Fields

  
  loginForm: UntypedFormGroup;
  submitted: boolean = false;
  error: string = '';
  returnUrl: string;
  code: string | null = null;
 

  //#endregion

  // set the currenr year
  year: number = new Date().getFullYear();

  //#region Constructor

  constructor(private http: HttpClient,private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,private route: ActivatedRoute,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService
) { }

  //#endregion

  //#region Properties

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  //#endregion

  //#region Methods

  ngOnInit() {
    localStorage.removeItem('accesstoken');
localStorage.removeItem('name');
    this.route.queryParams.subscribe((params) => {
      debugger
      this.code = params['code'];
      console.log('Code parameter:', this.code);
      if(this.code )
      {
        this.getAccessToken();
      }
     
    });
    

   
  }

  getAccessToken() {
    this.sharePointService.getAccessToken(this.code).subscribe((res) => {
console.log(res.Data.AccessToken,'jkjkjkjkjkjk');
localStorage.setItem('accesstoken',res.Data.AccessToken);
localStorage.setItem('name',res?.Data?.Name);
localStorage.setItem('email',res?.Data?.EmailAddress);

this._router.navigate(['/pages/all-sites']);
    
    });
  }

  onSubmit() {
    // Make the API call
    this.http
      .get('https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/GetLoginUrl')
      .subscribe(
        (response: any) => {
          console.log(response);
          // Assuming the response contains the URL you want to navigate to
          const loginUrl = response.Data; // Adjust this if the response structure is different

          // Navigate to the URL in the same tab
          window.location.href = loginUrl;
        },
        (error) => {
          console.error('API call failed', error);
        }
      );
  }
   

  

  //#endregion

}