"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/icons";

const definitions = {
  length: {
    label: "Length",
    units: {
      Millimeter: 0.001,
      Centimeter: 0.01,
      Meter: 1,
      Kilometer: 1000,
      Inch: 0.0254,
      Foot: 0.3048,
      Yard: 0.9144,
      Mile: 1609.344,
      "Nautical mile": 1852,
    },
  },
  mass: {
    label: "Mass",
    units: {
      Milligram: 0.000001,
      Gram: 0.001,
      Kilogram: 1,
      Tonne: 1000,
      Ounce: 0.028349523125,
      Pound: 0.45359237,
      Stone: 6.35029318,
    },
  },
  temperature: {
    label: "Temperature",
    units: { Celsius: "C", Fahrenheit: "F", Kelvin: "K", Rankine: "R" },
  },
  area: {
    label: "Area",
    units: {
      "Square millimeter": 0.000001,
      "Square centimeter": 0.0001,
      "Square meter": 1,
      "Square kilometer": 1000000,
      Hectare: 10000,
      Acre: 4046.8564224,
      "Square foot": 0.09290304,
      "Square mile": 2589988.110336,
    },
  },
  volume: {
    label: "Volume",
    units: {
      Milliliter: 0.001,
      Liter: 1,
      "Cubic meter": 1000,
      "US gallon": 3.785411784,
      "Imperial gallon": 4.54609,
      "US cup": 0.2365882365,
      "US fluid ounce": 0.0295735296,
      "Cubic foot": 28.316846592,
    },
  },
  speed: {
    label: "Speed",
    units: {
      "Meters per second": 1,
      "Kilometers per hour": 1 / 3.6,
      "Miles per hour": 0.44704,
      Knot: 0.5144444444,
      "Feet per second": 0.3048,
    },
  },
  time: {
    label: "Time",
    units: {
      Microsecond: 0.000001,
      Millisecond: 0.001,
      Second: 1,
      Minute: 60,
      Hour: 3600,
      Day: 86400,
      Week: 604800,
      "Year (365 days)": 31536000,
    },
  },
  digital: {
    label: "Digital storage",
    units: {
      Bit: 0.125,
      Byte: 1,
      "Kilobyte (kB)": 1000,
      "Megabyte (MB)": 1e6,
      "Gigabyte (GB)": 1e9,
      "Terabyte (TB)": 1e12,
      "Kibibyte (KiB)": 1024,
      "Mebibyte (MiB)": 1048576,
      "Gibibyte (GiB)": 1073741824,
      "Tebibyte (TiB)": 1099511627776,
    },
  },
  pressure: {
    label: "Pressure",
    units: {
      Pascal: 1,
      Kilopascal: 1000,
      Megapascal: 1e6,
      Bar: 100000,
      Atmosphere: 101325,
      "Pound per square inch (psi)": 6894.757293,
      "Millimeter of mercury (mmHg)": 133.322368,
    },
  },
  energy: {
    label: "Energy",
    units: {
      Joule: 1,
      Kilojoule: 1000,
      Calorie: 4.184,
      Kilocalorie: 4184,
      "Watt-hour (Wh)": 3600,
      "Kilowatt-hour (kWh)": 3600000,
      Electronvolt: 1.602176634e-19,
      BTU: 1055.05585262,
    },
  },
  power: {
    label: "Power",
    units: {
      Watt: 1,
      Kilowatt: 1000,
      Megawatt: 1e6,
      "Metric horsepower": 735.49875,
      "Mechanical horsepower": 745.699872,
    },
  },
  angle: {
    label: "Angle",
    units: {
      Radian: 1,
      Degree: Math.PI / 180,
      Gradian: Math.PI / 200,
      Arcminute: Math.PI / 10800,
      Arcsecond: Math.PI / 648000,
      Revolution: 2 * Math.PI,
    },
  },
  force: {
    label: "Force",
    units: {
      Newton: 1,
      Kilonewton: 1000,
      Dyne: 0.00001,
      "Pound-force": 4.4482216153,
      "Kilogram-force": 9.80665,
    },
  },
  frequency: {
    label: "Frequency",
    units: {
      Hertz: 1,
      Kilohertz: 1000,
      Megahertz: 1e6,
      Gigahertz: 1e9,
      "Revolutions per minute (rpm)": 1 / 60,
    },
  },
} as const;

function UnitSelect({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(".plot-select-menu-portal")) return;
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }
    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const top = Math.min(rect.bottom + 6, window.innerHeight - 48);
      setPosition({
        top,
        left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)),
        width: Math.min(rect.width, window.innerWidth - 16),
        maxHeight: Math.min(320, Math.max(96, window.innerHeight - top - 12)),
      });
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  return (
    <div className="plot-select-wrap unit-custom-select" ref={rootRef}>
      <button
        type="button"
        className="plot-select-trigger"
        ref={triggerRef}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span>{value}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20">
          <path
            d="m5 7.5 5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open &&
        position &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="plot-select-menu plot-select-menu-portal"
            role="listbox"
            aria-label={`${label} options`}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
              maxHeight: position.maxHeight,
            }}
          >
            {options.map((option) => (
              <button
                type="button"
                role="option"
                aria-selected={value === option}
                className={`plot-select-option${value === option ? " is-selected" : ""}`}
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                <span>{option}</span>
                {value === option && <Icon name="check" size={15} />}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

type Category = keyof typeof definitions;
const categoryKeys = Object.keys(definitions) as Category[];

function convertTemperature(value: number, from: string, to: string) {
  let celsius: number;
  if (from === "Celsius") celsius = value;
  else if (from === "Fahrenheit") celsius = ((value - 32) * 5) / 9;
  else if (from === "Kelvin") celsius = value - 273.15;
  else celsius = (value * 5) / 9 - 273.15;
  if (to === "Celsius") return celsius;
  if (to === "Fahrenheit") return (celsius * 9) / 5 + 32;
  if (to === "Kelvin") return celsius + 273.15;
  return ((celsius + 273.15) * 9) / 5;
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState<string>("Meter");
  const [to, setTo] = useState<string>("Kilometer");
  const options = Object.keys(definitions[category].units);
  const result = useMemo(() => {
    if (value.trim() === "") return "";
    const number = Number(value);
    if (!Number.isFinite(number)) return "Invalid number";
    let converted: number;
    if (category === "temperature") {
      const absoluteZero =
        from === "Kelvin"
          ? number < 0
          : from === "Rankine"
            ? number < 0
            : from === "Celsius"
              ? number < -273.15
              : number < -459.67;
      if (absoluteZero) return "Below absolute zero";
      converted = convertTemperature(number, from, to);
    } else {
      const table = definitions[category].units as Record<string, number>;
      converted = (number * table[from]) / table[to];
    }
    if (!Number.isFinite(converted)) return "Out of range";
    return new Intl.NumberFormat(undefined, { maximumSignificantDigits: 10 }).format(converted);
  }, [category, value, from, to]);

  const changeCategory = (next: Category) => {
    const nextOptions = Object.keys(definitions[next].units);
    setCategory(next);
    setFrom(nextOptions[0]);
    setTo(nextOptions[1] ?? nextOptions[0]);
  };
  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <section className="tool-card unit-converter-card">
      <div className="tool-copy">
        <span className="eyebrow">Math Tool</span>
        <h2>Unit Converter</h2>
        <p>Convert between common measurement units across 14 categories.</p>
      </div>
      <label className="field-label">
        <span>Category</span>
        <UnitSelect
          label="Category"
          value={definitions[category].label}
          options={categoryKeys.map((key) => definitions[key].label)}
          onChange={(label) =>
            changeCategory(categoryKeys.find((key) => definitions[key].label === label) ?? "length")
          }
        />
      </label>
      <div className="unit-converter-grid">
        <label className="field-label">
          <span>
            Amount <em className="unit-inline-hint">in {from}</em>
          </span>
          <div className="unit-input-wrap">
            <input
              aria-label={`Amount in ${from}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              step="any"
              inputMode="decimal"
            />
          </div>
        </label>
        <label className="field-label">
          <span>From unit</span>
          <UnitSelect label="From unit" value={from} options={options} onChange={setFrom} />
        </label>
        <button
          className="unit-swap-button"
          type="button"
          onClick={swap}
          aria-label="Swap units"
          title="Swap units"
        >
          ⇄
        </button>
        <label className="field-label">
          <span>To unit</span>
          <UnitSelect label="To unit" value={to} options={options} onChange={setTo} />
        </label>
      </div>
      <div className="result-box result-large unit-converter-result">
        <span className="unit-result-label">Converted value</span>
        <strong>{result || "Enter a value"}</strong>
        <span className="unit-result-unit">{to}</span>
      </div>
    </section>
  );
}
