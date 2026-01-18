// import { redirect } from 'next/navigation'

// export default function Home() {
//   redirect("/app/overview");
// }

import { HeroWithSimulator } from '@/components/landing/hero-with-simulator';
import { BentoFeatures } from '@/components/landing/bento-features';
import { MethodologySection } from '@/components/landing/methodology-section';
import { FinalCTA } from '@/components/landing/final-cta';
import { LandingFooter } from '@/components/landing/landing-footer';

import { MissionArchitecture } from '@/components/landing/mission-architecture';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <HeroWithSimulator />
      <BentoFeatures />
      <MissionArchitecture />
      <MethodologySection />
      <FinalCTA />
      <LandingFooter />
    </main>
  );
}