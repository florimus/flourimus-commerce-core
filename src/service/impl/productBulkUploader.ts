import { ContextObjectType, ProductType } from "@core/types";
import { getProductInfoById } from "@repositories/productRepository";
import { createProduct, updateProduct } from "@services/productService";

const formatMedias = (urls: string) => {
  return urls ? urls.split(",").map((each) => each.trim()) : [];
};

const handleProductOtions = async (each: ProductType, email: string) => {
  const productId: string = each?._id;
  const existingProduct = await getProductInfoById(productId);
  try {
    if (existingProduct?._id) {
      await updateProduct(
        {
          _id: productId,
          productUpdateInput: {
            name: each?.name,
            brand: each?.brand,
            category: each?.category,
            isSellable: each?.isSellable,
            medias: formatMedias(each?.medias as unknown as string),
          },
        },
        { email } as ContextObjectType
      );
    } else {
      await createProduct(
        {
          productCreateInput: {
            name: each?.name,
            brand: each?.brand,
            category: each?.category,
            isSellable: each?.isSellable,
            medias: formatMedias(each?.medias as unknown as string),
            isVariant: each?.isVariant,
            parentId: each?.parentId || "",
          },
        },
        { email } as ContextObjectType
      );
    }
  } catch (error) {
    console.error({ error });
  }
};

const productBulkUploader = async (products: ProductType[], email: string) => {
  Promise.all(
    products.map(
      async (each: ProductType) => await handleProductOtions(each, email)
    )
  );
  return true;
};

export default productBulkUploader;
