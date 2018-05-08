import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'destinationsDirection'
})
export class DestinationsDirectionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
