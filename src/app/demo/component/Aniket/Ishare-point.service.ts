import { TestBed } from '@angular/core/testing';

import { SharePointService } from './share-point.service';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from './common/base-response.model';
import { DataTableModel } from './common/datatable.model';
import { SitesModal } from './common/siteModal';
import { UserSearch } from './model/user.search.model';
import { UserModel } from './model/user.model';
import { GroupModel } from './model/group-model';
import { MemberModel, OwnerModel } from './model/owner-model';

export const SHARE_POINTS_SERVICE = new InjectionToken("share points service");

export interface ISharePointService{

  // getAllSites():Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  // getDrivesBySiteId(SiteId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  // getDrivesItemByDriveId(DriveId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  // viewDrivesfile(fileUrl:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>;


  
  getAllSites():Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  getDrivesBySiteId(SiteId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  getDrivesItemByDriveId(DriveId:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  viewDrivesfile(fileUrl:string):Observable<BaseResponseModel<DataTableModel<SitesModal>>>;
  getAccessToken(AuthorizationCode:any):Observable<BaseResponseModel<DataTableModel<any>>>;
  getUserList(model:UserSearch):Observable<BaseResponseModel<DataTableModel<UserModel>>>;
  deleteByIdUser(id:number):Observable<BaseResponseModel<DataTableModel<any>>>;
  addUser(model:FormData):Observable<BaseResponseModel<string>>;
  uploadFile(model:FormData):Observable<BaseResponseModel<DataTableModel<any>>>;

  //group
  getAllGroups():Observable<BaseResponseModel<DataTableModel<GroupModel>>>;
  getGroupById(GroupId:string):Observable<BaseResponseModel<GroupModel>>
  addOwners(email:string,groupid:string):Observable<BaseResponseModel<string>>;
  addMembers(email:string,groupid:string):Observable<BaseResponseModel<string>>;
  getGroupOwners(groupId:string):Observable<BaseResponseModel<DataTableModel<OwnerModel>>>;
  getGroupMembers(groupId:string):Observable<BaseResponseModel<DataTableModel<OwnerModel>>>;
  deleteOwner(groupid:string,ownerkid:string):Observable<BaseResponseModel<any>>;
  deleteMember(groupid:string,memberid:string):Observable<BaseResponseModel<any>>;

  //owner
  // addUser(model:string):Observable<BaseResponseModel<string>>;
}
