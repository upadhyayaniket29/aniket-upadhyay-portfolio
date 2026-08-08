"use client";

import React from "react";
import { Timeline } from "../experience/Timeline";

export default function ExperienceModalContent() {
  return (
    <div className="space-y-4">
      <div className="border-b border-white/5 pb-4 mb-4">
        <h3 className="text-base font-bold text-white font-sans">Professional Work Timeline</h3>
        <p className="text-xs text-zinc-500 font-sans mt-1">
          A history of Aniket Upadhyay&apos;s product development positions, core milestones, and technical achievements.
        </p>
      </div>

      <Timeline />
    </div>
  );
}
