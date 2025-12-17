const sponsors = [
  { name: "42dot", logo: "/sponsors/42dot.png" },
  { name: "Hyundai", logo: "/sponsors/hyundai.png" },
  { name: "IITP", logo: "/sponsors/iitp.png" },
  { name: "LG Electronics", logo: "/sponsors/lg_electronics.png" },
  { name: "Ministry of Science and ICT", logo: "/sponsors/ministry_of_science_and_ICT.png" },
  { name: "Naver", logo: "/sponsors/naver.png" },
  { name: "NRF", logo: "/sponsors/nrf.png" },
  { name: "Theta Cloud", logo: "/sponsors/theta_cloud.png" },
];

function SponsorSet({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center gap-12 lg:gap-16 shrink-0" aria-hidden={ariaHidden}>
      {sponsors.map((sponsor) => {
        const isLGElectronics = sponsor.name === "LG Electronics";
        const isICT = sponsor.name === "Ministry of Science and ICT";
        const isThetaCloud = sponsor.name === "Theta Cloud";
        return (
          <div
            key={sponsor.name}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <div className={
              isLGElectronics ? "h-24 lg:h-32 w-auto" :
              isThetaCloud ? "h-20 lg:h-24 w-auto" :
              isICT ? "h-16 lg:h-20 w-auto" :
              "h-12 lg:h-16 w-auto"
            }>
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`h-full w-auto object-contain ${
                  isLGElectronics ? "max-w-[290px] lg:max-w-[360px]" :
                  isThetaCloud ? "max-w-[225px] lg:max-w-[270px]" :
                  isICT ? "max-w-[175px] lg:max-w-[225px]" :
                  "max-w-[145px] lg:max-w-[175px]"
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SponsorBelt() {
  return (
    <div className="w-full bg-transparent py-6 lg:py-8 overflow-hidden">
      <div className="relative">
        <div className="flex gap-12 lg:gap-16 animate-sponsor-scroll">
          {Array.from({ length: 10 }).map((_, i) => (
            <SponsorSet key={i} ariaHidden={i > 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
