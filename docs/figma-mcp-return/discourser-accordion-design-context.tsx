// Figma Design Context — Discourser Accordion (node-id: 38:8232)
// File: GaHmFfmvO4loUzuZS4TgEz / Discourser.AI--V1
// Fetched: 2026-03-27
//
// Design tokens referenced:
//   Primary/700: #6B7A1F
//   Primary/500: #C5D24D
//   Primary/400/60%: #C0D15C
//   Primary/Beginner/40%: #C0D15C
//   Black/Neutral/30%/600: #363636
//   Black/Neutral/30%/700: #2E2E2E
//   Stone/60%/500: #F5F1EB
//   Gray/Neutral/30%/500: #E0DCD5
//   Accent/300: #E5DFEC
//   Accent/400: #CFC4DB
//   Accent/500: #B8A9C9
//   Accent/600: #8D7EA3
//   Accent/700: #6B5A7D
//
// Typography:
//   Dsktp/Inter/BodyP/Medium/20: Inter Medium 500 20px lh:100%
//   Dsktp/Inter/Button/Regular/18: Inter Regular 400 18px lh:30
//   Dsktp/Inter/Button/Medium/18px: Inter Medium 500 18px lh:100%
//   Dsktp/Inter/Link/Medium/16: Inter Medium 500 16px lh:100%
//   Dsktp/Mobile/Inter/Button/Regular/14: Inter Regular 400 14px lh:100%
//
// Sections:
//   1. Scenario Settings (info panel)
//   2. Audio Output (volume slider)
//   3. Microphone Output (EQ + gain slider)
//   4. A/V Recording (radio group: audio only | video+audio)
//   5. Display timer (toggle)
//   6. Hide Interviewers (toggle)
//
// Component docs:
//   Accordion: https://ui.shadcn.com/docs/components/accordion
//   Badge: https://ui.shadcn.com/docs/components/badge
//   Radio Group: https://ui.shadcn.com/docs/components/radio-group

const imgSwitch = "https://www.figma.com/api/mcp/asset/6af50d67-6c4e-4ee1-85de-66baf8535487";
const imgSwitch1 = "https://www.figma.com/api/mcp/asset/46a551ce-7a48-4a03-a0d4-f50f4f554e9b";
const imgVector = "https://www.figma.com/api/mcp/asset/50458ebc-f32a-49e0-b0e5-03b5393f077b";
const imgVector1 = "https://www.figma.com/api/mcp/asset/7860a7d6-3665-40f1-b70e-fa293a24026d";
const imgVector2 = "https://www.figma.com/api/mcp/asset/7507174d-be1a-495b-a903-f958dee54c6c";
const imgVector3 = "https://www.figma.com/api/mcp/asset/ad2a2392-acc7-4a68-9907-0040ff4cd8e2";
const imgVector4 = "https://www.figma.com/api/mcp/asset/303639f5-6952-4f6e-b8a0-3177b95521ce";
const imgVector5 = "https://www.figma.com/api/mcp/asset/318eb54a-c998-4829-a27a-402d6d14bf30";
const imgIcon = "https://www.figma.com/api/mcp/asset/bde5d849-f0ec-4724-b933-f021166312ce";
const imgVector6 = "https://www.figma.com/api/mcp/asset/acd8d2f6-fdc0-4787-add4-3813f3c103cf";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/90a59a80-c14a-4e37-947c-39eaa07704c5";
const imgOutPutEq = "https://www.figma.com/api/mcp/asset/c36c3468-c437-4a01-b736-5b51a7cbd53e";
const imgSvgRepoIconCarrier = "https://www.figma.com/api/mcp/asset/93a52f90-1a70-4807-a4e3-330e0762a41a";
const imgSvgRepoIconCarrier1 = "https://www.figma.com/api/mcp/asset/6933376f-762e-4f71-82dd-d2b0c77050ca";
const imgSwitch2 = "https://www.figma.com/api/mcp/asset/892c4606-49a2-4682-b3f8-7581c129d2e8";
const imgSvgRepoIconCarrier2 = "https://www.figma.com/api/mcp/asset/d4547c2b-03e6-41d0-b72b-21d1494b878c";
type DiscourserAiSwitchToggleProps = {
  className?: string;
  state?: "Default";
  toggled?: boolean;
};

function DiscourserAiSwitchToggle({ className, state = "Default", toggled = false }: DiscourserAiSwitchToggleProps) {
  const isToggledAndDefault = toggled && state === "Default";
  return (
    <div className={className || `content-stretch flex h-[var(--height/h-5,20px)] items-center p-[var(--p-0\\,5,2px)] relative rounded-[var(--radius/rounded-full,9999px)] shadow-[var(--shadow/2xs/layer-1/x,0px)_var(--shadow/2xs/layer-1/y,1px)_var(--shadow/2xs/layer-1/blur,2px)_0px_var(--shadow/2xs,rgba(26,26,26,0.05))] w-[var(--width/w-9,36px)] `}${isToggledAndDefault ? "bg-[#c5d24d] justify-end" : "bg-[rgba(192,209,92,0.4)]"}`} id={isToggledAndDefault ? "node-38_8126" : "node-38_8122"}>
      <div className="relative shrink-0 size-[16px]" data-name="Switch" id={isToggledAndDefault ? "node-38_8127" : "node-38_8123"}>
        <div className="absolute inset-[-6.25%_-12.5%_-18.75%_-12.5%]">
          <img alt="" className="block max-w-none size-full" src={isToggledAndDefault ? imgSwitch1 : imgSwitch} />
        </div>
      </div>
    </div>
  );
}

export default function DiscourserAccordion({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch cursor-pointer flex flex-col h-[1695px] items-start relative w-[350px]"} data-name="Discourser Accordion" data-node-id="38:8232">
      <button className="border-[#f5f1eb] border-b border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center relative shrink-0 w-full" data-name="Discourse Accordion Item (Info Panel)" data-node-id="38:8233">
        <div className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative shrink-0 w-full" data-name="AccordionTrigger" data-node-id="I38:8233;38:8141">
          <div className="overflow-clip relative shrink-0 size-[40px]" data-name="icon- Configure Settings" data-node-id="I38:8233;38:8142">
            <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector" data-node-id="I38:8233;38:8142;38:9805">
              <div className="absolute inset-[-18.75%_-9.38%]">
                <img alt="" className="block max-w-none size-full" src={imgVector} />
              </div>
            </div>
            <div className="absolute inset-[16.67%_16.67%_8.33%_16.67%]" data-name="Vector" data-node-id="I38:8233;38:8142;38:9806">
              <div className="absolute inset-[-3.33%_-3.75%]">
                <img alt="" className="block max-w-none size-full" src={imgVector1} />
              </div>
            </div>
            <div className="absolute bottom-[54.17%] left-1/2 right-[33.33%] top-[45.83%]" data-name="Vector" data-node-id="I38:8233;38:8142;38:9807">
              <div className="absolute inset-[-1px_-15%]">
                <img alt="" className="block max-w-none size-full" src={imgVector2} />
              </div>
            </div>
            <div className="absolute bottom-[33.33%] left-1/2 right-[33.33%] top-[66.67%]" data-name="Vector" data-node-id="I38:8233;38:8142;38:9808">
              <div className="absolute inset-[-1px_-15%]">
                <img alt="" className="block max-w-none size-full" src={imgVector2} />
              </div>
            </div>
            <div className="absolute inset-[45.83%_66.62%_54.17%_33.33%]" data-name="Vector" data-node-id="I38:8233;38:8142;38:9809">
              <div className="absolute inset-[-1px_-5999.86%]">
                <img alt="" className="block max-w-none size-full" src={imgVector3} />
              </div>
            </div>
            <div className="absolute inset-[66.67%_66.62%_33.33%_33.33%]" data-name="Vector" data-node-id="I38:8233;38:8142;38:9810">
              <div className="absolute inset-[-1px_-5999.86%]">
                <img alt="" className="block max-w-none size-full" src={imgVector3} />
              </div>
            </div>
          </div>
          <p className="flex-[1_0_0] font-[family-name:var(--font/family/font-sans,'Inter:Medium',sans-serif)] font-[var(--font/weight/font-medium,500)] leading-[normal] min-h-px min-w-px not-italic overflow-hidden relative text-[#363636] text-[20px] text-ellipsis text-left whitespace-nowrap" data-node-id="I38:8233;38:8143">
            Scenario Settings
          </p>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / chevron-down" data-node-id="I38:8233;38:8144">
            <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I38:8233;38:8144;2706:13883">
              <div className="absolute inset-[-20.83%_-10.42%]">
                <img alt="" className="block max-w-none size-full" src={imgVector4} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fffdfa] border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[26px] items-start p-[20px] relative rounded-[6px] shrink-0" data-name="panel- Information Slot Contents" data-node-id="I38:8233;38:8145">
          {/* ... panel contents ... */}
        </div>
      </button>
      {/* ... remaining accordion items ... */}
    </div>
  );
}
