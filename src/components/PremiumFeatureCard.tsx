"use client";

import React from "react";
import { PenTool } from "lucide-react";

export interface PremiumFeatureCardProps {
  number?: string;
  icon?: React.ReactNode;
  category?: string;
  title?: React.ReactNode;
  description?: string;
  className?: string;
}

export default function PremiumFeatureCard({
  number = "01",
  icon = <PenTool size={25} strokeWidth={1.7} />,
  category = "UI / UX",
  title = (
    <>
      Creative
      <br />
      Design
    </>
  ),
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse fuga adipisicing elit.",
  className = "",
}: PremiumFeatureCardProps) {
  return (
    <div className={`premium-card ${className}`}>
      {/* Decorative purple liquid */}
      <div className="liquid">
        <div className="liquid-main" />
        <div className="liquid-light" />
        <div className="liquid-dark" />
      </div>

      {/* 01 circle */}
      <div className="number-circle">{number}</div>

      <div className="card-content">
        {/* Purple icon */}
        <div className="icon-box">
          {icon}
        </div>

        <span className="category">
          {category}
        </span>

        <h2 className="title">
          {title}
        </h2>

        <div className="underline" />

        <p className="description">
          {description}
        </p>

        <div className="dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
