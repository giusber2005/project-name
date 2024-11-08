import { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

interface CardProps {
  title: string;
  description: string;
  demo: React.ReactNode;
  large?: boolean;
  imagePosition?: string;
  className?: string;
  imageSrc?: string;
}

export default function Card({
  title,
  description,
  demo,
  large,
  imagePosition = "left",
  className = "",
  imageSrc = "",
}: CardProps) {
  return (
    <div
      className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 ${
        large ? "md:col-span-2" : ""
      } ${className}`}
    >
      <div className="flex h-60 items-center justify-center">
        {imagePosition === "left" && imageSrc && <ImagePlaceholder src={imageSrc} />}
        <div className={`${imageSrc ? 'w-2/3' : 'w-full'} h-full flex items-center justify-center ${imagePosition === "right" ? "order-first" : ""}`}>
          {demo}
        </div>
        {imagePosition === "right" && imageSrc && <ImagePlaceholder src={imageSrc} />}
      </div>
      <div className="mx-auto max-w-lg text-center">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent [text-wrap:balance] md:text-3xl md:font-normal">
          {title}
        </h2>
        <div className="prose-sm mt-3 leading-normal text-gray-500 [text-wrap:balance] md:prose">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  target="_blank"
                  {...props}
                  className="font-medium text-gray-800 underline transition-colors"
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  {...props}
                  // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                  inline="true"
                  className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                />
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

function ImagePlaceholder({ src }: { src: string }) {
  return (
    <div className="relative w-1/3 h-full overflow-hidden group">
      <Image
        src={src}
        alt="Placeholder Image"
        width={160}
        height={240}
        className="object-contain w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
        style={{ objectPosition: 'center' }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-20"></div>
    </div>
  )
}
