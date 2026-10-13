"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header, { type HeaderSearchResult } from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Calculator from "@/components/calculator/calculator";
import EquationSolver from "@/components/tools/equation-solver";
import QuadraticSolver from "@/components/tools/quadratic-solver";
import Statistics from "@/components/tools/statistics";
import MatrixCalculator from "@/components/tools/matrix";
import UnitConverter from "@/components/tools/unit-converter";
import Percentage from "@/components/tools/percentage";
import FunctionPlotter from "@/components/graphing/function-plotter";
import Calculus from "@/components/advanced/calculus";
import ComplexNumbers from "@/components/advanced/complex";
import Vectors from "@/components/advanced/vectors";
import Emi from "@/components/finance/emi";
import CompoundInterest from "@/components/finance/compound-interest";
import Investment from "@/components/finance/investment";
import Settings from "@/components/settings/settings";
import Icon, { type IconName } from "@/components/icons";
import type { ToolId } from "@/types/numeriq";

const titles: Record<ToolId, { eyebrow: string; title: string; description: string }> = {
  home: {
    eyebrow: "Workspace",
    title: "Home",
    description: "Your mathematics workspace at a glance.",
  },
  calculator: {
    eyebrow: "Calculator",
    title: "Scientific Calculator",
    description: "Calculate · Solve · Graph · Analyze · Learn",
  },
  equation: {
    eyebrow: "Math Tools",
    title: "Equation Solver",
    description: "Solve linear equations with a clean result.",
  },
  quadratic: {
    eyebrow: "Math Tools",
    title: "Quadratic Solver",
    description: "Solve quadratic equations and inspect the discriminant.",
  },
  statistics: {
    eyebrow: "Math Tools",
    title: "Statistics",
    description: "Summarize a dataset with core descriptive metrics.",
  },
  matrix: {
    eyebrow: "Math Tools",
    title: "Matrix Calculator",
    description: "Perform common matrix operations.",
  },
  units: {
    eyebrow: "Math Tools",
    title: "Unit Converter",
    description: "Convert practical units instantly.",
  },
  percentage: {
    eyebrow: "Math Tools",
    title: "Percentage Calculator",
    description: "Handle percentage relationships and changes.",
  },
  graphing: {
    eyebrow: "Graphing",
    title: "Function Plotter",
    description: "Explore functions visually.",
  },
  calculus: {
    eyebrow: "Advanced Math",
    title: "Calculus",
    description: "Numerically explore derivatives, integrals and limits.",
  },
  complex: {
    eyebrow: "Advanced Math",
    title: "Complex Numbers",
    description: "Compute with complex values.",
  },
  vectors: {
    eyebrow: "Advanced Math",
    title: "Vectors",
    description: "Analyze vector relationships.",
  },
  emi: {
    eyebrow: "Finance",
    title: "EMI Calculator",
    description: "Estimate loan payments and interest.",
  },
  compound: {
    eyebrow: "Finance",
    title: "Compound Interest",
    description: "Project growth under compounding.",
  },
  investment: {
    eyebrow: "Finance",
    title: "Investment Calculator",
    description: "Estimate long-term value with contributions.",
  },
  settings: {
    eyebrow: "Application",
    title: "Settings",
    description: "Choose how Numeriq looks and behaves across your workspace.",
  },
};

const searchMap: Array<{ id: ToolId; terms: string; icon: IconName }> = [
  {
    id: "calculator",
    icon: "calculator",
    terms:
      "calculator basic scientific arithmetic expression memory history deg rad sin cos tan logarithm exponent square root factorial",
  },
  {
    id: "equation",
    icon: "equation",
    terms: "equation solver linear solve unknown variable algebra roots x",
  },
  {
    id: "quadratic",
    icon: "quadratic",
    terms: "quadratic roots discriminant polynomial parabola equation",
  },
  {
    id: "statistics",
    icon: "statistics",
    terms: "statistics mean median mode variance standard deviation dataset average data",
  },
  {
    id: "matrix",
    icon: "matrix",
    terms: "matrix determinant multiplication addition subtraction inverse transpose rows columns",
  },
  {
    id: "units",
    icon: "converter",
    terms:
      "unit converter length mass weight temperature area volume speed time digital storage pressure energy power angle force frequency measurement convert",
  },
  {
    id: "percentage",
    icon: "percentage",
    terms: "percentage percent change ratio increase decrease discount fraction",
  },
  {
    id: "graphing",
    icon: "graph",
    terms: "graph function plotter graphing zoom curve coordinate plane plot",
  },
  {
    id: "calculus",
    icon: "calculus",
    terms:
      "calculus derivative differentiation integral integration limit slope rate of change area under curve",
  },
  {
    id: "complex",
    icon: "complex",
    terms: "complex numbers imaginary real part magnitude modulus argument polar",
  },
  {
    id: "vectors",
    icon: "vector",
    terms: "vectors dot product cross product angle magnitude direction components",
  },
  {
    id: "emi",
    icon: "finance",
    terms: "emi loan finance monthly payment interest repayment mortgage",
  },
  {
    id: "compound",
    icon: "finance",
    terms: "compound interest finance investment principal growth compounding future value",
  },
  {
    id: "investment",
    icon: "finance",
    terms: "investment future value contribution returns portfolio recurring deposit growth",
  },
];

const routeIds: Record<string, ToolId> = {
  home: "home",
  calculator: "calculator",
  equation: "equation",
  quadratic: "quadratic",
  statistics: "statistics",
  matrix: "matrix",
  units: "units",
  percentage: "percentage",
  graphing: "graphing",
  calculus: "calculus",
  complex: "complex",
  vectors: "vectors",
  emi: "emi",
  compound: "compound",
  investment: "investment",
  settings: "settings",
};

const toolHelp: Record<ToolId, { summary: string; steps: string[]; example: string }> = {
  home: {
    summary: "Find a tool and open it from the dashboard or sidebar.",
    steps: [
      "Choose a tool based on the task you want to complete.",
      "Enter values in the tool's labeled fields.",
      "Review the result and adjust the inputs when needed.",
    ],
    example: "Open Scientific Calculator for arithmetic, or Function Plotter to compare functions.",
  },
  calculator: {
    summary: "Evaluate arithmetic and scientific expressions using the keypad or keyboard.",
    steps: [
      "Enter numbers and operators in the expression.",
      "Choose DEG or RAD before using trigonometric functions.",
      "Use AC to clear the expression and the backspace control to remove the last entry.",
    ],
    example: "Try sin(30) in DEG mode or (8 + 4) ÷ 3.",
  },
  equation: {
    summary: "Solve a linear equation and inspect the value found for the unknown.",
    steps: [
      "Enter an equation in the supported equation field.",
      "Use x as the unknown and include both sides of the equation when requested.",
      "Select Solve and review the solution and any validation message.",
    ],
    example: "2x + 3 = 11 gives x = 4.",
  },
  quadratic: {
    summary: "Find the roots of a quadratic equation in ax² + bx + c = 0 form.",
    steps: [
      "Enter coefficients a, b and c.",
      "Make sure a is not zero for a quadratic equation.",
      "Solve and review the discriminant and real or complex roots.",
    ],
    example: "For x² - 5x + 6 = 0, enter a = 1, b = -5, c = 6.",
  },
  statistics: {
    summary: "Summarize a numeric dataset with descriptive statistics.",
    steps: [
      "Enter numbers using the separator described by the input label.",
      "Check that the dataset contains only valid numeric values.",
      "Review mean, median, mode, variance and standard deviation where available.",
    ],
    example: "Enter 2, 4, 4, 6 to compare the mean and median.",
  },
  matrix: {
    summary: "Perform matrix calculations using compatible matrix dimensions.",
    steps: [
      "Enter each matrix in the format shown by the input hint.",
      "For addition and subtraction, both matrices need matching dimensions.",
      "For multiplication, the first matrix's column count must match the second matrix's row count.",
    ],
    example: "A 2×2 matrix can be multiplied by another 2×2 matrix.",
  },
  units: {
    summary: "Convert a value between supported measurement units.",
    steps: [
      "Choose the unit category.",
      "Select the source and destination units.",
      "Enter a value and read the converted result.",
    ],
    example: "Convert 100 centimeters to meters.",
  },
  percentage: {
    summary: "Calculate percentage values and compare changes between amounts.",
    steps: [
      "Choose the relevant percentage operation.",
      "Enter the base value and percentage or comparison value.",
      "Review the result and confirm which value is treated as the base.",
    ],
    example: "Find 15% of 200, or the percentage change from 80 to 100.",
  },
  graphing: {
    summary: "Compare supported mathematical functions on a responsive coordinate plane.",
    steps: [
      "Choose a preset function from each dropdown.",
      "Add or remove function rows to compare curves.",
      "Adjust the range slider to zoom the visible x-domain.",
    ],
    example: "Compare sin(x), cos(x) and x²; trigonometric functions use radians.",
  },
  calculus: {
    summary: "Explore supported numerical derivatives, integrals and limits.",
    steps: [
      "Enter an expression using the syntax shown by the tool.",
      "Supply the point or integration bounds requested.",
      "Review the numerical result and remember that numerical approximations depend on the selected interval and method.",
    ],
    example: "Use x² to inspect a derivative near x = 3.",
  },
  complex: {
    summary: "Calculate with complex numbers using real and imaginary components.",
    steps: [
      "Enter the real and imaginary parts in the provided fields.",
      "Choose the supported operation.",
      "Review the resulting components and any magnitude or angle values shown.",
    ],
    example: "The complex number 3 + 4i has magnitude 5.",
  },
  vectors: {
    summary: "Compare vectors and calculate common vector properties.",
    steps: [
      "Enter the vector components in the labeled fields.",
      "Choose the required vector operation.",
      "Check the resulting components, magnitude or dot product.",
    ],
    example: "For vectors (1, 2) and (3, 4), the dot product is 11.",
  },
  emi: {
    summary: "Estimate monthly loan payments from principal, interest rate and term.",
    steps: [
      "Enter the principal loan amount.",
      "Enter the annual interest rate and repayment duration.",
      "Review the estimated monthly installment and total interest.",
    ],
    example:
      "Use a hypothetical loan amount and compare how a longer term changes the installment.",
  },
  compound: {
    summary: "Estimate how a balance grows when interest compounds over time.",
    steps: [
      "Enter the starting principal and annual rate.",
      "Choose the compounding frequency and investment duration.",
      "Review the projected value; results are estimates and exclude unentered fees or taxes.",
    ],
    example: "Compare annual and monthly compounding for the same principal and rate.",
  },
  investment: {
    summary:
      "Project an investment value using a starting amount, contributions and an assumed return.",
    steps: [
      "Enter the initial investment and recurring contribution.",
      "Set the expected return and time horizon.",
      "Treat the result as a scenario, not a guaranteed return.",
    ],
    example: "Compare projections with different contribution amounts or return assumptions.",
  },
  settings: {
    summary: "Personalize the appearance and calculator defaults for this browser.",
    steps: [
      "Choose System, Light or Dark appearance.",
      "Select an accent color if you want to change the default Numeriq blue.",
      "Choose DEG or RAD as the calculator's default angle mode.",
    ],
    example: "Select Dark and navigate to another tool to confirm the theme remains applied.",
  },
};

function ToolHelp({ tool }: { tool: ToolId }) {
  if (tool === "settings") return null;
  const help = toolHelp[tool];
  return (
    <section className="tool-help" aria-labelledby="tool-help-title">
      <div className="tool-help-heading">
        <Icon name="info" size={19} />
        <div>
          <span className="eyebrow">GUIDE</span>
          <h2 id="tool-help-title">How to use {titles[tool].title}</h2>
          <p>{help.summary}</p>
        </div>
      </div>
      <ol>
        {help.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="tool-help-example">
        <strong>Example</strong>
        <p>{help.example}</p>
      </div>
    </section>
  );
}

const routePaths: Record<ToolId, string> = {
  home: "/home",
  calculator: "/calculator",
  equation: "/equation",
  quadratic: "/quadratic",
  statistics: "/statistics",
  matrix: "/matrix",
  units: "/units",
  percentage: "/percentage",
  graphing: "/graphing",
  calculus: "/calculus",
  complex: "/complex",
  vectors: "/vectors",
  emi: "/emi",
  compound: "/compound",
  investment: "/investment",
  settings: "/settings",
};

export default function NumeriqApp() {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  const segments = pathname.split("/").filter(Boolean);
  const activeSegment = segments[0] === "numeriq" ? segments[1] : segments[0];
  const active = activeSegment ? (routeIds[activeSegment] ?? "home") : "home";

  const searchResults = useMemo<HeaderSearchResult[]>(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];

    const tokens = query.split(/\\s+/).filter(Boolean);

    return searchMap
      .map((item) => {
        const title = titles[item.id].title;
        const category = titles[item.id].eyebrow;
        const description = titles[item.id].description;
        const normalizedTitle = title.toLowerCase();
        const normalizedTerms = item.terms.toLowerCase();
        const searchableText =
          `${title} ${item.id} ${category} ${description} ${normalizedTerms}`.toLowerCase();

        if (!tokens.every((token) => searchableText.includes(token))) return null;

        const score = tokens.reduce((total, token) => {
          if (normalizedTitle === token || item.id === token) return total + 12;
          if (normalizedTitle.startsWith(token)) return total + 8;
          if (normalizedTitle.includes(token)) return total + 5;
          if (normalizedTerms.split(/\\s+/).includes(token)) return total + 3;
          return total + 1;
        }, 0);

        return {
          result: {
            id: item.id,
            title,
            category,
            description,
            icon: item.icon,
          },
          score,
        };
      })
      .filter((match): match is { result: HeaderSearchResult; score: number } => match !== null)
      .sort((a, b) => b.score - a.score)
      .map(({ result }) => result);
  }, [search]);

  const select = (id: ToolId) => {
    setSidebarOpen(false);
    setSearch("");
    const destination = routePaths[id];
    if (destination && destination !== pathname) router.push(destination);
  };

  const renderTool = () => {
    if (active === "settings") return <Settings />;
    if (active === "calculator") return <Calculator />;
    if (active === "equation") return <EquationSolver />;
    if (active === "quadratic") return <QuadraticSolver />;
    if (active === "statistics") return <Statistics />;
    if (active === "matrix") return <MatrixCalculator />;
    if (active === "units") return <UnitConverter />;
    if (active === "percentage") return <Percentage />;
    if (active === "graphing") return <FunctionPlotter />;
    if (active === "calculus") return <Calculus />;
    if (active === "complex") return <ComplexNumbers />;
    if (active === "vectors") return <Vectors />;
    if (active === "emi") return <Emi />;
    if (active === "compound") return <CompoundInterest />;
    if (active === "investment") return <Investment />;
  };

  const info = titles[active];
  const isDashboard = active === "home";
  const isSettings = active === "settings";

  return (
    <div className="app-shell">
      <Header
        onMenu={() => setSidebarOpen((current) => !current)}
        onHome={() => select("home")}
        searchValue={search}
        onSearch={setSearch}
        searchResults={searchResults}
        onSelectResult={select}
      />
      <div className="app-body">
        <Sidebar active={active} onSelect={select} open={sidebarOpen} />
        {sidebarOpen && (
          <button
            className="sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          />
        )}
        <main className="main-content">
          {isDashboard ? (
            <>
              <section className="hero-banner">
                <div className="hero-copy">
                  <span className="hero-kicker">NUMERIQ</span>
                  <h1>All-in-One Mathematics Toolkit</h1>
                  <p>
                    Calculate <b>•</b> Solve <b>•</b> Graph <b>•</b> Analyze <b>•</b> Learn
                  </p>
                  <button className="hero-cta" onClick={() => select("calculator")}>
                    <span>Get Started</span>
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
                <div className="hero-equations" aria-hidden="true">
                  <span>π</span>
                  <span>∫</span>
                  <span>Σ</span>
                  <span>x²</span>
                  <span>√</span>
                  <span>f(x)</span>
                  <div className="hero-cube">N</div>
                </div>
                <div className="hero-features">
                  <h3>Powerful Math Tools</h3>
                  <p>From basic calculations to advanced AI-powered solutions</p>
                  <span>
                    <Icon name="check" size={13} /> Scientific Calculator
                  </span>
                  <span>
                    <Icon name="check" size={13} /> Equation Solver
                  </span>
                  <span>
                    <Icon name="check" size={13} /> Graphing
                  </span>
                  <span>
                    <Icon name="check" size={13} /> Advanced Mathematics
                  </span>
                  <span>
                    <Icon name="check" size={13} /> Finance Tools
                  </span>
                  <span></span>
                </div>
              </section>

              <div className="dashboard-grid">
                <div className="dashboard-calculator">
                  <Calculator />
                </div>
                <div className="dashboard-graph">
                  <FunctionPlotter />
                </div>
              </div>

              <div className="quick-tools">
                <button onClick={() => select("equation")} className="quick-card equation-card">
                  <span>
                    <Icon name="equation" size={19} />
                  </span>
                  <strong>Equation Solver</strong>
                  <small>Solve for x</small>
                </button>
                <button onClick={() => select("matrix")} className="quick-card matrix-card">
                  <span>
                    <Icon name="matrix" size={19} />
                  </span>
                  <strong>Matrix Calculator</strong>
                  <small>Determinant & operations</small>
                </button>
                <button onClick={() => select("statistics")} className="quick-card statistics-card">
                  <span>
                    <Icon name="statistics" size={19} />
                  </span>
                  <strong>Statistics</strong>
                  <small>Mean, median & variance</small>
                </button>
                <button onClick={() => select("units")} className="quick-card units-card">
                  <span>
                    <Icon name="converter" size={19} />
                  </span>
                  <strong>Unit Converter</strong>
                  <small>Convert measurements</small>
                </button>
              </div>
            </>
          ) : isSettings ? (
            <>{renderTool()}</>
          ) : (
            <>{renderTool()}</>
          )}
          <ToolHelp tool={active} />
        </main>
      </div>
    </div>
  );
}
