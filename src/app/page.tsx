'use client';
import { LanguageSync }    from '@/components/ui/LanguageSync';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { Navigation }      from '@/components/layout/Navigation';
import { HeroSection }     from '@/components/sections/HeroSection';
import { StudioSection }   from '@/components/sections/StudioSection';
import { RegionSection }   from '@/components/sections/RegionSection';
import { WorkSection }     from '@/components/sections/WorkSection';
import { VoiceSection }    from '@/components/sections/VoiceSection';
import { ClientsSection }  from '@/components/sections/ClientsSection';
import { CTASection }      from '@/components/sections/CTASection';
import { FooterSection }   from '@/components/sections/FooterSection';

export default function Page() {
  return (
    <>
      <LanguageSync />
      <ScrollProgressBar />
      <Navigation />

      <main>
        <HeroSection />
        <StudioSection />
        <RegionSection />
        <WorkSection />
        <VoiceSection />
        <ClientsSection />
        <CTASection />
      </main>

      <FooterSection />
    </>
  );
}
