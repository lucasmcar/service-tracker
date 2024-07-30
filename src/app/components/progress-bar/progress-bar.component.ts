import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input() steps: {name: string, complete: boolean }[] = [];

  get progress(): number {
    const total = this.steps.length;
    const completed = this.steps.filter(step => step.complete).length;
    return total === 0 ? 0 : (completed/total) * 100;
  }
}
