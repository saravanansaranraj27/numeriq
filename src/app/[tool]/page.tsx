import NumeriqApp from "@/components/numeriq-app";

export function generateStaticParams() {
  return [
    "home",
    "calculator",
    "equation",
    "quadratic",
    "statistics",
    "matrix",
    "units",
    "percentage",
    "graphing",
    "calculus",
    "complex",
    "vectors",
    "emi",
    "compound",
    "investment",
    "settings",
  ].map((tool) => ({ tool }));
}

export default function ToolPage() {
  return <NumeriqApp />;
}
