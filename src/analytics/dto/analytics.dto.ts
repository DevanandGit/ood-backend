// dto/date-range.dto.ts
import { IsISO8601, IsString } from 'class-validator';

export class DateRangeDto {
    @IsString()
    startDate: string;

    @IsString()
    endDate: string;
}
