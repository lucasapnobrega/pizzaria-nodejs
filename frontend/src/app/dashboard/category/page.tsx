import CategoryForm from "@/components/CategoryForm";

export default function Category() {
  return (
    <main className="max-w-[720px] px-4 flex flex-col mt-4 mx-auto">
      <h1 className="text-white font-bold mb-4 text-2xl">
        Nova Categoria
      </h1>

      <CategoryForm />
    </main>
  )
}