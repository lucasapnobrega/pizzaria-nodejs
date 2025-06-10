"use client"

import { UploadCloud } from "lucide-react"
import { Category } from "@/types"
import { productSchema, ProductSchemaType } from "@/schemas/product-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { registerProduct } from "@/app/actions/product-actions"
import { toast } from "sonner"
import Image from "next/image"
import Input from "./Input"

interface Props {
  categories: Category[];
}

export default function ProductForm({ categories }: Props) {
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema)
  })

  const [image, setImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState("")

  console.log(errors)

  const handleFile = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      const imageFile = ev.target.files[0]

      setImage(imageFile)
      setPreviewImage(URL.createObjectURL(imageFile))
    }
  }

  const onSubmit = async(data: ProductSchemaType) => {
    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("price", String(data.price))
    formData.append("category_id", data.category_id)
    formData.append("description", data.description)
    formData.append("file", image as File)

    try {
      const response = await registerProduct(formData)

      if (response) {
        toast.success("Produto cadastrado com sucesso")
        reset()
        setImage(null)
        setPreviewImage("")
      }
    } catch (error: any) {
      console.log("Erro ao cadastrar produto: ", error)
      toast.error(error.message)
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

      <label 
        htmlFor="banner" 
        className={`w-full h-[280px] relative bg-dark1 rounded-lg cursor-pointer border border-lightGray flex flex-col justify-center items-center transition-all ${image ? "" : "hover:brightness-125"}`}
        title="Clique para enviar a imagem do produto"
      >
        <span>
          <UploadCloud size={48} color="#fff" />
        </span>

        <input
          type="file" 
          name="banner" 
          id="banner"
          accept="image/*"
          onChange={handleFile}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
          required
        />
        
        {previewImage && (
          <Image 
            src={previewImage}
            alt="Imagem do Produto"
            fill
            priority
            quality={100}
            className="rounded-lg"
          />
        )}
      </label>

      <div className="flex flex-col gap-1">
        <select
          {...register("category_id")}
          name="category_id"
          id="category_id"
          className={`border border-lightGray rounded-md p-2 bg-dark1 text-white text-[0.92rem] w-full ${errors.category_id && "border-red-600"}`}
          defaultValue={""}
        >
          <option value="" disabled>
            Selecione a Categoria
          </option>
        
          {categories.map(category => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {errors.category_id && typeof errors.category_id.message === "string" && (
          <span className="text-red-500 font-semibold text-[0.80rem] ml-[0.1rem]">
            {errors.category_id.message === "Required" ? "Preencha esse campo" : errors.category_id.message}
          </span>
        )}
      </div>

      <Input 
        {...register("name")}
        name="name"
        placeholder="Digite o nome do produto..."
        error={errors.name}
      />

      <Input 
        {...register("price", { valueAsNumber: true })}
        type="number"
        name="price"
        placeholder="Preço do produto..."
        step={0.01}
        error={errors.price}
      />

      <div className="flex flex-col gap-1">
        <textarea
          {...register("description")}
          name="description"
          id="description"
          className={`border border-lightGray rounded-md p-2 bg-dark1 text-white text-[0.95rem] placeholder:text-[0.82rem] min-h-[100px] w-full ${errors.description && "border-red-600"}`}
          placeholder="Digite a descrição do produto..."
        ></textarea>

        {errors.description && typeof errors.description.message === "string" && (
          <span className="text-red-500 font-semibold text-[0.80rem] ml-[0.1rem]">
            {errors.description.message === "Required" ? "Preencha esse campo" : errors.description.message}
          </span>
        )}
      </div>

      <button type="submit" className="bg-green1 py-2 rounded-lg text-[0.95rem] font-semibold transition-all hover:bg-green-400">
        Cadastrar Produto
      </button>
    </form>
  )
}