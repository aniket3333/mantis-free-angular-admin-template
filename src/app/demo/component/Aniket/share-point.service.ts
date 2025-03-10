import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from './common/base-response.model';
import { DataTableModel } from './common/datatable.model';
import { SitesModal } from './common/siteModal';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ISharePointService } from './Ishare-point.service';
import { UserModel } from './model/user.model';
import { UserSearch } from './model/user.search.model';
import { GroupModel } from './model/group-model';

@Injectable({
  providedIn: 'root'
})
export class SharePointService  implements ISharePointService{

  constructor(private http:HttpClient) { }
  private getAuthToken(): string | null {
    return localStorage.getItem('accesstoken');  // Get the token from localStorage (or sessionStorage)
  }
  private createHttpOptions(): { headers: HttpHeaders } {
    const token = this.getAuthToken();  // Retrieve the token dynamically
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'AccessToken': token ? `${token}` : '' // Only add Authorization if token exists
    });
    return { headers };
  }
  private createHttpOptionsBearer(): { headers: HttpHeaders } {
    const token = this.getAuthToken();  // Retrieve the token dynamically
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '' // Only add Authorization if token exists
    });
    return { headers };
  }
  private createHttpOption(): { headers: HttpHeaders } {
    const token = this.getAuthToken();  // Retrieve the token dynamically
    
    // Only add Authorization header if the token exists
    const headers = new HttpHeaders({
      'AccessToken': token ? `${token}` : ''  // Include AccessToken header with token
    });
    
    return { headers };
  }
  getAllSites():Observable<BaseResponseModel<DataTableModel<SitesModal>>>{

    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    // const options = this.createHttpOptions();
    const options = this.createHttpOption();
    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>(
     "https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites",options

    );
  }
  getDrivesBySiteId(SiteId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>{
    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    let params = new HttpParams().set("SiteId", SiteId)
    const options = this.createHttpOptions(); 
    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetDrivesBySiteId",{params,...options}

    );
  }
  getDrivesItemByDriveId(DriveId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>{
    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    let params = new HttpParams().set("DriveId", DriveId)
    const options = this.createHttpOptions(); 
    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetDrivesItemByDriveId",{params,...options}

    );
  }
  viewDrivesfile(fileUrl:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>{
    // return this.http.get("https://rnapi.sdaemon.com/Api/api/v1/SharePoint/GetSites")
    let params = new HttpParams().set("fileUrl", fileUrl)
    const url = "https://rnapi.sdaemon.com/Api/api/v1/SharePoint/NewReadExcelFile";
    const options = this.createHttpOptions(); 
    return this.http.get<BaseResponseModel<DataTableModel<SitesModal>>>(url,{params,...options}
    );
  }
  getAccessToken(AuthorizationCode:any):Observable<BaseResponseModel<DataTableModel<any>>>{
    return this.http.post<BaseResponseModel<DataTableModel<any>>>("https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/GetAccessToken",{AuthorizationCode}
    );
  }
  getUserList(model:UserSearch):Observable<BaseResponseModel<DataTableModel<UserModel>>>{
    
    let params = new HttpParams().set("SearchText", model.searchText)
    .set("Page", model.page).set("PageSize", model.pageSize)
    return this.http.get<BaseResponseModel<DataTableModel<UserModel>>>("https://rnapi.sdaemon.com/Api/api/v1/User/GetUserList",{params}
    );
  }

 
  deleteByIdUser(id:number):Observable<BaseResponseModel<DataTableModel<any>>>{
    
    let params = new HttpParams().set("Id", id)
   
    return this.http.delete<BaseResponseModel<DataTableModel<UserModel>>>("https://rnapi.sdaemon.com/Api/api/v1/User/DeleteUser",{params}
    );
  }
  // addUser(model:UserModel):Observable<BaseResponseModel<DataTableModel<UserModel>>>{
    
  
  //   return this.http.post<BaseResponseModel<DataTableModel<UserModel>>>("https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/CreateUser",{model}
  //   );
  // }

//   addUser(model: FormData): Observable<BaseResponseModel<string>> {
//     const url = 'https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/CreateUser';
// debugger
//     const options = this.createHttpOptions();  // Get the HTTP options with Authorization header
    
//     return this.http.post<BaseResponseModel<string>>(url, model , options);
//   }

  addUser(model: FormData): Observable<BaseResponseModel<string>> {
    const url = 'https://rnapi.sdaemon.com/Api/api/v1/Microsoft365User/CreateUser';
  
    // Prepare HTTP options if you need additional headers
    const options = this.createHttpOption();
  
    // Send the FormData directly as the body of the POST request
    return this.http.post<BaseResponseModel<string>>(url, model, options);
  }
  uploadFile(model: FormData): Observable<BaseResponseModel<DataTableModel<any>>> {
    const url = 'https://rnapi.sdaemon.com/Api/api/v1/MicrosoftSharePoint/UploadFile';

    const options = this.createHttpOption();  // Get the HTTP options with Authorization header
    
    return this.http.post<BaseResponseModel<DataTableModel<UserModel>>>(url,  model , options);
  }

  //group
  getAllGroups():Observable<BaseResponseModel<DataTableModel<GroupModel>>>{
    const options = this.createHttpOptionsBearer();
    return this.http.get<BaseResponseModel<DataTableModel<GroupModel>>>(
     "https://graph.microsoft.com/v1.0/groups",options

    );
  }
 
  getGroupById(GroupId:string):Observable<BaseResponseModel<GroupModel>>{
    const options = this.createHttpOptionsBearer(); 
    return this.http.get<BaseResponseModel<DataTableModel<GroupModel>>>(`https://graph.microsoft.com/v1.0/groups/${GroupId}`,options);
  }

  addOwners(email: string,groupid:string): Observable<BaseResponseModel<string>> {
    const url = `https://graph.microsoft.com/v1.0/groups/${groupid}/owners/$ref`;
    const options = this.createHttpOptionsBearer();
  
    // Construct the body with the correct @odata.id format
    const body = {
      "@odata.id": `https://graph.microsoft.com/v1.0/users/${email}`
    };
  
    // Send the request with the body and options
    return this.http.post<BaseResponseModel<string>>(url, body, options);
  }
  addMembers(email: string,groupid:string): Observable<BaseResponseModel<string>> {
    const url = `https://graph.microsoft.com/v1.0/groups/${groupid}/members/$ref`;
    const options = this.createHttpOptionsBearer();

    // Construct the body with the correct @odata.id format
    const body = {
       "@odata.id": `https://graph.microsoft.com/v1.0/users/${email}`
    };
    // Send the request with the body and options
    return this.http.post<BaseResponseModel<string>>(url, body, options);
  }

  getGroupOwners(groupId:string):Observable<BaseResponseModel<DataTableModel<any>>>{
    const options = this.createHttpOptionsBearer();
    return this.http.get<BaseResponseModel<DataTableModel<any>>>(
     `https://graph.microsoft.com/v1.0/groups/${groupId}/owners`,options

    );
  }
  getGroupMembers(groupId:string):Observable<BaseResponseModel<DataTableModel<any>>>{
    const options = this.createHttpOptionsBearer();
    return this.http.get<BaseResponseModel<DataTableModel<any>>>(
     `https://graph.microsoft.com/v1.0/groups/${groupId}/members`,options

    );
  }
  deleteOwner(groupid: string, ownerkid: string): Observable<BaseResponseModel<any>> {
    const options = this.createHttpOptionsBearer();
    return this.http.delete<BaseResponseModel<any>>(
      `https://graph.microsoft.com/v1.0/groups/${groupid}/owners/${ownerkid}/$ref`,options
    );
  }
  deleteMember(groupid: string, memberid: string): Observable<BaseResponseModel<any>> {
    const options = this.createHttpOptionsBearer();
    return this.http.delete<BaseResponseModel<any>>(
      `https://graph.microsoft.com/v1.0/groups/${groupid}/members/${memberid}/$ref`,options
    );
  }
  
  }
