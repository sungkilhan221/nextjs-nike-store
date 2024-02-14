import { simplifiedProduct } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(category: string) {
  const query = `
    *[_type == 'product' && category->name == "${category}"] {
      _id,
      "imageUrl": images[0].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name
    }
  `;

  const data = await client.fetch(query);

  return data;
}

async function CategoryPage({ params }: { params: { category: string } }) {
  const data: simplifiedProduct[] = await getData(params.category);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products for {params.category}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <Link href={`/product/${product.slug}`}>
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:h-full lg:w-full"
                    width={800}
                    height={800}
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-md text-gray-700 font-bold">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-md font-medium text-gray-500">
                      {product.categoryName}
                    </p>
                  </div>
                </div>
                <p className="text-md font-bold text-gray-900 mt-2">
                  ${product.price}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
