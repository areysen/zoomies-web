import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { sanity } from '@/lib/sanity'
import Image from 'next/image'

export default function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await sanity.fetch(`*[_type == "product" && "harnesses" in categories]{_id, title, price, "imageUrl": images[0].asset->url}`)
        setProducts(result)
      } catch (err) {
        console.error('Sanity fetch error:', err)
      }
    }

    getData()
  }, [])

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Harnesses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product._id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
            {product.imageUrl && (
              <div className="relative w-full h-64">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-700">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}