import { getAllCategories } from "@/app/actions/category-actions";
import ProductForm from "@/components/ProductForm";

export default async function Product() {
  const categories = await getAllCategories()

  return (
    <main className="max-w-[720px] mx-auto my-4 flex flex-col px-2">
      <h1 className="text-white text-2xl font-bold mb-4">
        Novo Produto
      </h1>

      <ProductForm categories={categories} />
    </main>
  )
}