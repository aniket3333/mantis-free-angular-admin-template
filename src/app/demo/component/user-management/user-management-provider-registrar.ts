import { Provider } from "@angular/core";
import { UserService } from "./services/UserService";
import { USER_SERVICE } from "./services/IUserService";
;
export const ProviderList: Provider[] =
  [

    {
      provide: USER_SERVICE,
      useClass: UserService
    },
  

  ];


