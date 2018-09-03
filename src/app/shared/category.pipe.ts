import { Pipe, PipeTransform } from '@angular/core';
import * as Const from './data.service';

@Pipe({ name: 'category' })
export class CategoryPipe implements PipeTransform {
  transform(categoryNum: number, isPublic: boolean): string {
    if (isPublic) {
      return Const.PUBLIC_CATEGORY_LIST[categoryNum];
    }
    return Const.PRIVATE_CATEGORY_LIST[categoryNum];
  }
}
