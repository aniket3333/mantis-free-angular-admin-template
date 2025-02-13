import { Provider } from "@angular/core";
import { SHARE_POINTS_SERVICE } from "./demo/component/Aniket/Ishare-point.service";
import { SharePointService } from "./demo/component/Aniket/share-point.service";
export const ProviderList: Provider[] = [
  {
    provide: SHARE_POINTS_SERVICE,
    useClass: SharePointService,
  }
];
