import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-background-picture',
  templateUrl: './background-picture.component.html',
  styleUrls: ['./background-picture.component.scss']
})
export class BackgroundPictureComponent {
  @Input() src: string = '';
}
