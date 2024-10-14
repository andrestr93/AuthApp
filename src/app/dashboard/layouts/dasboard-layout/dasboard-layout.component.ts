import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dasboard-layout',
  templateUrl: './dasboard-layout.component.html',
  styleUrl: './dasboard-layout.component.css'
})
export class DasboardLayoutComponent {

  private authService = inject(AuthService)

  public user = computed(() => this.authService.currentUser())





}
