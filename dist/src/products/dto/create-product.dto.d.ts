export declare class CreateProductDto {
    name: string;
    discountedPrice: number;
    actualPrice: number;
    description?: string;
    stockCount?: number;
    isStock?: boolean;
    isActive?: boolean;
    categoryId: string;
    sizeAndQuantity: Record<string, number>;
}
