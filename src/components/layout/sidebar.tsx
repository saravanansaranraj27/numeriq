import { useLayoutEffect, useRef, type MouseEvent } from "react";
import Icon, { type IconName } from "@/components/icons";
import type { ToolDefinition, ToolId } from "@/types/numeriq";

type SidebarProps = {
  active: ToolId;
  onSelect: (id: ToolId) => void;
  open: boolean;
};

const groups: Array<{ name: string; items: ToolDefinition[] }> = [
  {
    name: "Workspace",
    items: [{ id: "home", label: "Home", group: "Workspace", description: "Numeriq dashboard" }],
  },
  {
    name: "Calculator",
    items: [
      {
        id: "calculator",
        label: "Scientific Calculator",
        group: "Calculator",
        description: "Scientific calculations",
      },
    ],
  },
  {
    name: "Math Tools",
    items: [
      {
        id: "equation",
        label: "Equation Solver",
        group: "Math Tools",
        description: "Solve linear equations",
      },
      {
        id: "quadratic",
        label: "Quadratic Solver",
        group: "Math Tools",
        description: "Find quadratic roots",
      },
      {
        id: "statistics",
        label: "Statistics",
        group: "Math Tools",
        description: "Analyze datasets",
      },
      {
        id: "matrix",
        label: "Matrix Calculator",
        group: "Math Tools",
        description: "Matrix operations",
      },
      {
        id: "units",
        label: "Unit Converter",
        group: "Math Tools",
        description: "Convert measurements",
      },
      {
        id: "percentage",
        label: "Percentage Calculator",
        group: "Math Tools",
        description: "Percent calculations",
      },
    ],
  },
  {
    name: "Graphing",
    items: [
      {
        id: "graphing",
        label: "Function Plotter",
        group: "Graphing",
        description: "Plot functions",
      },
    ],
  },
  {
    name: "Advanced Math",
    items: [
      {
        id: "calculus",
        label: "Calculus",
        group: "Advanced Math",
        description: "Derivatives and integrals",
      },
      {
        id: "complex",
        label: "Complex Numbers",
        group: "Advanced Math",
        description: "Complex arithmetic",
      },
      { id: "vectors", label: "Vectors", group: "Advanced Math", description: "Vector analysis" },
    ],
  },
  {
    name: "Finance",
    items: [
      {
        id: "emi",
        label: "EMI Calculator",
        group: "Finance",
        description: "Loan payment estimates",
      },
      {
        id: "compound",
        label: "Compound Interest",
        group: "Finance",
        description: "Compounding projections",
      },
      {
        id: "investment",
        label: "Investment Calculator",
        group: "Finance",
        description: "Investment projections",
      },
    ],
  },
];

const icons: Record<ToolId, IconName> = {
  home: "home",
  calculator: "calculator",
  equation: "equation",
  quadratic: "quadratic",
  statistics: "statistics",
  matrix: "matrix",
  units: "converter",
  percentage: "percentage",
  graphing: "graph",
  calculus: "calculus",
  complex: "complex",
  vectors: "vector",
  emi: "finance",
  compound: "finance",
  investment: "finance",
  settings: "settings",
};

const sidebarScrollKey = "numeriq-sidebar-scroll-top";

export default function Sidebar({ active, onSelect, open }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = sidebarRef.current;
    if (!element) return;

    try {
      const savedScrollTop = window.sessionStorage.getItem(sidebarScrollKey);
      if (savedScrollTop !== null) {
        const parsedScrollTop = Number(savedScrollTop);
        if (Number.isFinite(parsedScrollTop) && parsedScrollTop >= 0) {
          element.scrollTop = parsedScrollTop;
        }
      }
    } catch {}

    const saveScrollPosition = () => {
      try {
        window.sessionStorage.setItem(sidebarScrollKey, String(element.scrollTop));
      } catch {}
    };

    element.addEventListener("scroll", saveScrollPosition, { passive: true });
    return () => {
      saveScrollPosition();
      element.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);

  const selectFromSidebar = (id: ToolId, event: MouseEvent<HTMLButtonElement>) => {
    const element = sidebarRef.current;
    if (element) {
      try {
        window.sessionStorage.setItem(sidebarScrollKey, String(element.scrollTop));
      } catch {}
    }
    if (event.detail > 0) event.currentTarget.blur();
    onSelect(id);
  };

  return (
    <aside ref={sidebarRef} className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {groups.map((group) => (
          <section className="nav-group" key={group.name}>
            <div className="nav-group-label">{group.name}</div>
            <div
              className="nav-items"
              id={`nav-group-${group.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              {group.items.map((item) => (
                <button
                  className={`nav-item ${active === item.id ? "active" : ""}`}
                  key={item.id}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={(event) => selectFromSidebar(item.id, event)}
                >
                  <span className="nav-icon">
                    <Icon name={icons[item.id]} size={18} />
                  </span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </nav>
      <button
        className={`settings-nav ${active === "settings" ? "active" : ""}`}
        onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => selectFromSidebar("settings", event)}
      >
        <span className="nav-icon">
          <Icon name="settings" size={18} />
        </span>
        <span className="nav-label">Settings</span>
      </button>
    </aside>
  );
}
