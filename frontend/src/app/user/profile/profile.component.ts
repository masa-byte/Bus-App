import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { adventurer } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Store } from '@ngrx/store';
import { Observable, of, take } from 'rxjs';
import { User } from '../user.model';
import { selectUser } from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null> = of();
  avatar: any;
  svg: SafeResourceUrl = '';

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.createProfilePicture();
  }

  createProfilePicture() {
    this.avatar = createAvatar(adventurer, {
      seed: this.determineSeed(),
      earringsProbability: 30,
      earrings: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06'],
      featuresProbability: 50,
      features: ["birthmark", "blush", "freckles"],
      glasses: ["variant01", "variant02", "variant04"],
      glassesProbability: 30,
      hairProbability: 100
    });
    const svgData = this.avatar.toString();
    this.svg = this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/svg+xml;base64,' + btoa(svgData)
    );
  }

  determineSeed(): string {
    const seedList = [
      'Jack',
      'Maggie',
      'Sasha',
      'Chloe',
      'Dusty',
      'Cookie',
      'Snuggles',
      'Daisy',
      'Tigger',
      'Harley',
      'Tinkerbell',
      'Peanut',
      'Trouble',
      'Bella'
    ];
    const seed = seedList[Math.floor((Math.random() * 100) % seedList.length)];
    return seed;
  }

  deleteProfile() {
    // const dialogRef = this.dialog.open(DeleteDialogComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.user$.pipe(take(1)).subscribe((user) => {
    //       if (user) {
    //         localStorage.removeItem('userId');
    //         localStorage.removeItem('rememberMe');
    //         this.store.dispatch(UserActions.deleteUser({ userId: user.id }));
    //         this.router.navigate(['']);
    //       }
    //     });
    //   }
    // });
  }

  editProfile() {
    // const dialogRef = this.dialog.open(EditProfileComponent);
    // dialogRef.afterClosed().subscribe(() => {});
  }
}
