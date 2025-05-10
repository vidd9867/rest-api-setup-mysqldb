export interface IProduct {
    uid?: string; // Unique identifier for the product
    product_name: string | null; // Name of the product
    price: string; // Price of the product
    image_url?: string | null; // URL of the product image
    category_code: string; // Category code associated with the product
    active_status?: boolean | null; // Status indicating if the product is active
    created_at?: Date | null; // Date when the product was created
    updated_at?: Date | null; // Date when the product was last updated
}