import type { Metadata } from "next";
import Image from "next/image";
import { getProducts } from "@/components/contentfulFetching";

export const metadata: Metadata = {
  title: "What We Offer",
};

// TypeScript types for Contentful asset and product item
type ContentfulImageAsset = {
  fields: {
    file: {
      url: string;
      details?: { image?: { width: number; height: number } };
      contentType?: string;
    };
    title?: string;
    description?: string;
  };
};

type ProductItem = {
  sys: { id: string };
  fields: {
    title?: string;
    description?: {
      content?: { content?: { value?: string }[] }[];
    };
    icon?: ContentfulImageAsset;
  };
};

export default async function AboutPage() {
  const data = await getProducts();
  const items: ProductItem[] = data.items;

  console.log(items);
    

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/backgroundPicture.jpg')" }}
    >
      <div className="absolute inset-0 bg-violet-950 opacity-60"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <main className="flex min-h-screen flex-col items-center p-10 z-10">
        <h1 className="text-white mb-10 text-6xl font-extrabold tracking-tight z-10">
          What We Offer
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
          {items.slice().reverse().map((item, idx)=> {
            const title = item.fields.title || "No Title";
            const description =
              item.fields.description?.content?.[0]?.content?.[0]?.value ||
              "No description available.";

            // Get icon image URL and alt text
            const iconAsset = item.fields.icon;
            let iconUrl: string | undefined;
            let iconAlt: string = title;

            if (iconAsset && iconAsset.fields.file?.url) {
              iconUrl = iconAsset.fields.file.url.startsWith("//")
                ? `https:${iconAsset.fields.file.url}`
                : iconAsset.fields.file.url;
              iconAlt = iconAsset.fields.title || iconAsset.fields.description || title;
            }

            // Optionally get width/height from Contentful asset
            const width =
              iconAsset?.fields.file.details?.image?.width || 48;
            const height =
              iconAsset?.fields.file.details?.image?.height || 48;

            return (
              <div
                key={item.sys.id || idx}
                className="relative bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transition-colors duration-300 hover:scale-105 hover:bg-white/20"
              >
                {iconUrl ? (
                  <Image
                    src={iconUrl}
                    alt={iconAlt}
                    width={width}
                    height={height}
                    className="mb-4 w-12 h-12 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-blue-400 text-4xl mb-4">🏢</div>
                )}
                <h3 className="text-white text-left font-bold mb-2">{title}</h3>
                <p className="text-white/80 text-left text-sm">{description}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
