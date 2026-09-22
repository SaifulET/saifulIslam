"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export type Stage = "idle" | "moving" | "filled" | "success";

export interface PremiumAddToCartButtonProps {
  onAddToCart?: () => void | Promise<void>;
  disabled?: boolean;
  className?: string;
  buttonText?: string;
  successText?: string;
}

export default function PremiumAddToCartButton({
  onAddToCart,
  disabled = false,
  className = "",
  buttonText = "Add to Cart",
  successText = "Added to Cart"
}: PremiumAddToCartButtonProps) {
  const [stage, setStage] = useState<Stage>("idle");

  const handleClick = () => {
    if (disabled || stage !== "idle") return;

    setStage("moving");

    if (onAddToCart) {
      onAddToCart();
    }

    setTimeout(() => {
      setStage("filled");
    }, 500);

    setTimeout(() => {
      setStage("success");
    }, 1150);

    setTimeout(() => {
      setStage("idle");
    }, 3200);
  };

  const idle = stage === "idle";
  const moving = stage === "moving";
  const filled = stage === "filled";
  const success = stage === "success";

  return (
    <div className={`w-full max-w-[520px] rounded-[22px] bg-white p-4 shadow-xl select-none ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || !idle}
        aria-label={success ? successText : buttonText}
        className={`
          relative
          h-[64px]
          w-full
          overflow-hidden
          rounded-[14px]
          text-white
          font-sans font-semibold text-base

          transition-all
          duration-500
          ease-out

          ${
            success
              ? `
                bg-emerald-500
                shadow-[0_8px_25px_rgba(16,185,129,.35)]
              `
              : `
                bg-gradient-to-r
                from-violet-600
                via-indigo-500
                to-blue-500
                shadow-[0_8px_25px_rgba(79,70,229,.35)]
              `
          }

          ${
            idle && !disabled
              ? "cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              : "cursor-default"
          }

          ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }
        `}
      >
        <div
          className={`
            absolute
            top-1/2
            z-20

            transition-all
            duration-500
            ease-[cubic-bezier(.4,0,.2,1)]

            ${
              idle
                ? `
                  left-6
                  -translate-y-1/2
                  translate-x-0
                  scale-100
                  opacity-100
                `
                : ""
            }

            ${
              moving || filled
                ? `
                  left-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  scale-110
                  opacity-100
                `
                : ""
            }

            ${
              success
                ? `
                  left-1/2
                  -translate-x-1/2
                  -translate-y-[70px]
                  scale-90
                  opacity-0
                `
                : ""
            }
          `}
        >
          <CartIcon filled={filled || success} />
        </div>

        <span
          className={`
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            font-semibold
            tracking-wide

            transition-all
            duration-300

            ${
              idle
                ? `
                  -translate-y-1/2
                  opacity-100
                `
                : `
                  -translate-y-[55px]
                  opacity-0
                `
            }
          `}
        >
          {buttonText}
        </span>

        <ArrowRight
          size={23}
          strokeWidth={2.2}
          className={`
            absolute
            right-6
            top-1/2

            transition-all
            duration-300

            ${
              idle
                ? `
                  -translate-y-1/2
                  translate-x-0
                  opacity-100
                `
                : `
                  -translate-y-[55px]
                  translate-x-3
                  opacity-0
                `
            }
          `}
        />

        <div
          className={`
            absolute
            inset-0

            flex
            items-center
            justify-center
            gap-3

            transition-all
            duration-500

            ease-[cubic-bezier(.34,1.56,.64,1)]

            ${
              success
                ? `
                  translate-y-0
                  scale-100
                  opacity-100
                `
                : `
                  translate-y-full
                  scale-95
                  opacity-0
                `
            }
          `}
        >
          <span
            className={`
              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-full
              bg-white
              text-emerald-500
              shadow-sm

              transition-all
              delay-100
              duration-400

              ${
                success
                  ? `
                    translate-y-0
                    rotate-0
                    scale-100
                    opacity-100
                  `
                  : `
                    translate-y-5
                    -rotate-90
                    scale-50
                    opacity-0
                  `
              }
            `}
          >
            <Check
              size={20}
              strokeWidth={3}
            />
          </span>

          <span
            className={`
              font-bold
              tracking-wide

              transition-all
              delay-150
              duration-400

              ${
                success
                  ? `
                    translate-y-0
                    opacity-100
                  `
                  : `
                    translate-y-5
                    opacity-0
                  `
              }
            `}
          >
            {successText}
          </span>
        </div>
      </button>
    </div>
  );
}

export function CartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <path
        d="M6.5 7H21L19.3 14.2C19.1 15.1 18.3 15.7 17.4 15.7H8.3L6.5 7Z"
        className={`
          transition-all
          duration-300

          ${
            filled
              ? "fill-white scale-100"
              : "fill-transparent"
          }
        `}
        style={{
          transformOrigin: "center",
        }}
      />
      <path
        d="M2.5 3.5H4.5L6.7 14.1C6.9 15.1 7.8 15.8 8.8 15.8H18.1C19 15.8 19.8 15.2 20 14.3L21.5 7H6"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="19"
        r="1.4"
        className={`
          transition-all
          duration-300
          ${
            filled
              ? "fill-white"
              : "fill-transparent"
          }
        `}
        stroke="white"
        strokeWidth="1.5"
      />
      <circle
        cx="18"
        cy="19"
        r="1.4"
        className={`
          transition-all
          duration-300
          ${
            filled
              ? "fill-white"
              : "fill-transparent"
          }
        `}
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}
