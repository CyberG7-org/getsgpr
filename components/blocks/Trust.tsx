import { SITE } from "@/content/site";
import { Ph } from "@/components/ui/Ph";

export function Trust({ google }: { google?: boolean }) {
  return (
    <div className="bg-paper-alt border-y border-line">
      <div className="container-x flex flex-wrap gap-x-6 gap-y-2 py-3.5 text-[13.5px] font-medium text-slate-500 items-center">
        <span>UEN {SITE.uen}</span><span>{SITE.address}</span><span>Fixed-price packages</span><span>No approval guarantees</span><span>Reply within 24 hours</span>
        {google && <span className="ml-auto text-navy-900 max-[980px]:ml-0">★ <Ph label={SITE.placeholders.googleRating} /> on Google · <Ph label={SITE.placeholders.reviewCount} /> reviews</span>}
      </div>
    </div>
  );
}
