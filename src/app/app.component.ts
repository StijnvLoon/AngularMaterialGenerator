import { Component, ViewEncapsulation } from '@angular/core';
import { routeAnimation } from './animations/routeTransit';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation]
})
export class AppComponent {

  constructor(public themeService: ThemeService) {
    
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
