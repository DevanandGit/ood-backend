import { IsUUID, IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  @Min(1)
  quantity: number;

  @IsUUID()
  sizeId

  @IsUUID()
  productId
}
