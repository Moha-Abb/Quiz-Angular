import { Component, Output, EventEmitter } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFronts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFronts.pdfMake.vfs;
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Output() ShowMain = new EventEmitter();
  public finalResult: any;

  generatePdf() {
    let docDefinition = {
      content: ['Aqui se mostrara los resultados'],
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
