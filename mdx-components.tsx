import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="text-3xl font-bold text-white mt-10 mb-4 leading-tight" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-xl font-semibold text-white/95 mt-8 mb-3 leading-snug" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-lg font-medium text-white/85 mt-6 mb-2 leading-snug" {...props} />
    ),
    p: (props) => (
      <p className="text-base leading-7 text-white/85 mb-4" {...props} />
    ),
    a: (props) => (
      <a className="text-sky-300 underline underline-offset-2 hover:text-sky-200 transition-colors" {...props} />
    ),
    ul: (props) => (
      <ul className="list-disc list-inside text-white/85 mb-4 space-y-1" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal list-inside text-white/85 mb-4 space-y-1" {...props} />
    ),
    li: (props) => (
      <li className="text-base leading-7" {...props} />
    ),
    code: (props) => (
      <code className="bg-white/15 text-white/90 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
    ),
    pre: (props) => (
      <pre className="bg-black/30 border border-white/15 rounded-xl p-4 overflow-x-auto text-sm leading-relaxed mb-4 text-white/85" {...props} />
    ),
    blockquote: (props) => (
      <blockquote className="border-l-[3px] border-white/30 bg-white/5 pl-4 py-2 text-white/75 italic my-4 rounded-r-lg" {...props} />
    ),
    img: (props) => (
      <img className="rounded-xl my-4 max-w-full" {...props} />
    ),
    hr: () => (
      <hr className="my-8 border-white/15" />
    ),
    ...components,
  };
}
