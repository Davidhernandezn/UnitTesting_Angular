import { Pipe, PipeTransform } from '@angular/core';
//PIPE PARA REDUCIR TEXTO
@Pipe({
  name: 'reduceText'
})
export class ReduceTextPipe implements PipeTransform {

  //RECIBE UN VALOR TEXTO Y UN NUMERO COMO PARAMETRO
  transform(value: string, ...args: number[]): string {
    return value.substring(0, args[0]);//CORTA EL TEXTO
  }

}
