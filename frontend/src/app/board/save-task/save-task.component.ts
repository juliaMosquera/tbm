import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;

  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.taskData = {};
  }

  saveTask(){
    if (
      !this.taskData.name || 
      !this.taskData.description || 
      !this.taskData.imageUrl ||
      !this.taskData.taskStatus 
  

      ) {
        this.message = 'Incomplete data'
        this.openSnackBarError();
    } else {
      this._taskService.saveTask(this.taskData).
       subscribe({
         next: (v) => {
          localStorage.setItem('token', v.token)
          this._router.navigate(['/listTask']);
          this.message = 'Succesfull task registration';
          this.opeSnackBarSuccesfull();
         },
         error:(e) => {
          this.message = e.error.message;
          this.openSnackBarError();
         },
      });
    }
  }

  opeSnackBarSuccesfull(){
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass:['styleSnackBarSuccesfull']
    })
  }
  openSnackBarError(){
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass:['styleSnackBarError']
    })
  }

  ngOnInit(): void {}

}
