"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Icon from "@/components/icons";

type ThemeMode = "system" | "light" | "dark";
type Accent =
  "blue" | "cyan" | "teal" | "green" | "lime" | "yellow" | "purple" | "pink" | "red" | "orange";

const themes: Array<{ value: ThemeMode; title: string; description: string }> = [
  { value: "system", title: "System", description: "Follow your device appearance." },
  { value: "light", title: "Light", description: "Use a bright workspace." },
  { value: "dark", title: "Dark", description: "Use a low-light workspace." },
];

const accents: Array<{ value: Accent; title: string }> = [
  { value: "blue", title: "Numeriq blue" },
  { value: "cyan", title: "Cyan" },
  { value: "teal", title: "Teal" },
  { value: "green", title: "Green" },
  { value: "lime", title: "Lime" },
  { value: "yellow", title: "Yellow" },
  { value: "purple", title: "Purple" },
  { value: "pink", title: "Pink" },
  { value: "red", title: "Red" },
  { value: "orange", title: "Orange" },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [accent, setAccent] = useState<Accent>("blue");
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedAccent = window.localStorage.getItem("numeriq-accent") as Accent | null;
    const savedAngle = window.localStorage.getItem("numeriq-angle-mode") as "DEG" | "RAD" | null;
    if (savedAccent && accents.some((item) => item.value === savedAccent)) setAccent(savedAccent);
    if (savedAngle === "DEG" || savedAngle === "RAD") setAngleMode(savedAngle);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.accent = accent;
    window.localStorage.setItem("numeriq-accent", accent);
    window.localStorage.setItem("numeriq-angle-mode", angleMode);
  }, [accent, angleMode, mounted]);

  const selectedTheme = (theme ?? "system") as ThemeMode;

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <span className="eyebrow">APPLICATION</span>
          <h1>Settings</h1>
          <p>Choose how Numeriq looks and behaves across your workspace.</p>
        </div>
      </div>

      <section className="settings-card">
        <div className="settings-group">
          <span className="settings-eyebrow">APPEARANCE</span>
          <h2>Theme</h2>
          <p>
            Select System, Light, or Dark. Your choice is applied immediately and saved for this
            browser context.
          </p>
          <div className="theme-options" aria-label="Theme options">
            {themes.map((option) => (
              <button
                type="button"
                key={option.value}
                className={`theme-option ${mounted && selectedTheme === option.value ? "selected" : ""}`}
                aria-pressed={mounted && selectedTheme === option.value}
                onClick={() => setTheme(option.value)}
              >
                <span className={`theme-preview ${option.value}`} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <strong>{option.title}</strong>
                <small>{option.description}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="settings-group">
          <span className="settings-eyebrow">ACCENT COLOR</span>
          <h2>Color</h2>
          <p>
            Use Numeriq blue by default or choose an accent that fits your workspace. The selection
            works with every theme.
          </p>
          <div className="accent-options" aria-label="Accent color options">
            {accents.map((option) => (
              <button
                type="button"
                key={option.value}
                className={`accent-option ${accent === option.value ? "selected" : ""}`}
                aria-pressed={accent === option.value}
                onClick={() => setAccent(option.value)}
                title={option.title}
              >
                <span className={`accent-swatch ${option.value}`} />
                <strong>{option.title}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className="settings-group settings-flow">
          <span className="settings-eyebrow">HOW NUMERIQ WORKS</span>
          <h2>From input to result</h2>
          <p>
            Numeriq keeps calculations, graphing, analysis, and mathematical tools together in one
            focused workspace.
          </p>
          <div className="flow-grid">
            <article className="flow-card">
              <div className="flow-visual">
                <Icon name="calculator" size={42} />
              </div>
              <div>
                <strong>Input</strong>
                <p>Enter equations, values, datasets, matrices, or mathematical expressions.</p>
              </div>
            </article>
            <article className="flow-card">
              <div className="flow-visual">
                <Icon name="equation" size={42} />
              </div>
              <div>
                <strong>Calculation</strong>
                <p>Numeriq processes the selected operation using the active tool and settings.</p>
              </div>
            </article>
            <article className="flow-card">
              <div className="flow-visual">
                <Icon name="graph" size={42} />
              </div>
              <div>
                <strong>Visualization</strong>
                <p>
                  Graphs, metrics, tables, and structured results make the output easier to inspect.
                </p>
              </div>
            </article>
            <article className="flow-card">
              <div className="flow-visual">
                <Icon name="check" size={42} />
              </div>
              <div>
                <strong>Result</strong>
                <p>
                  Review the result and continue refining the calculation without leaving the
                  workspace.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="settings-group about-build">
          <span className="settings-eyebrow">ABOUT THIS BUILD</span>
          <h2>Numeriq mathematics workspace</h2>
          <p>
            Numeriq brings calculators, mathematical solvers, graphing, advanced mathematics,
            finance, and AI-assisted tools together in one focused workspace.
          </p>
          <strong className="build-credit">
            Built with Next.js · TypeScript © 2026 Saran Raj Saravanan
          </strong>
        </div>
      </section>
    </div>
  );
}
