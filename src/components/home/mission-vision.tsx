"use client";

import Container from "@/components/ui/container";
import { Target, Eye } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";

export default function MissionVision() {
  const { t } = useLanguage();

  return (
    <section id="mission" className="py-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <Target className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-brand-950">
              {t.missionVision.missionTitle}
            </h3>
            <p className="mt-2 text-brand-700">{t.missionVision.missionText}</p>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Eye className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-brand-950">
              {t.missionVision.visionTitle}
            </h3>
            <p className="mt-2 text-brand-700">{t.missionVision.visionText}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
