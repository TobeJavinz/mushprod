// date-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(timestamp: any): string {
    // Assuming that timestamp is of type Timestamp or a compatible type
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return formatDate(date, 'MM-dd-yyyy', 'en-US');
  }
}
