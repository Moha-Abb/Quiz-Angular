import { Component, ViewChild } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { QuizComponent } from '../quiz/quiz.component';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public questionsLimit: number;
  public dificulty: string;

  public showQuizScreen: boolean;
  public showMainMenu: boolean;
  public showResult: boolean;

  public spinner: boolean;

  @ViewChild('quiz', { static: true }) quiz!: QuizComponent;
  @ViewChild('result', { static: true }) result!: ResultComponent;

  constructor(private quizService: QuizService) {
    this.questionsLimit = 10;
    this.dificulty = 'Facil';
    this.showMainMenu = true;
    this.showQuizScreen = false;
    this.showResult = false;

    this.spinner = false;
  }

  quizQuestions(): void {
    this.toggleSpinner();
    this.quizService
      .getQuestions(this.dificulty, this.questionsLimit)
      .subscribe((response) => {
        this.quiz.questions = response;
        this.quiz.showQuestion(0);
        this.showQuizScreen = true;
        this.showMainMenu = false;
        this.toggleSpinner();
      });
  }

  finalResult(result: any): void {
    console.log(result);
    this.showQuizScreen = false;
    this.showResult = true;
    this.result.finalResult = result;
  }

  toggleSpinner() {
    this.spinner = !this.spinner;
  }
}
