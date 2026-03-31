/**
 * Figma MCP — get_design_context result
 * Node:     38:8232  "Discourser Accordion"
 * File:     GaHmFfmvO4loUzuZS4TgEz  (Discourser.AI--V1)
 * Fetched:  2026-03-27
 *
 * Raw reference output from figma-remote MCP.
 * Do NOT ship this file — it is a design-to-token mapping artifact.
 * Asset URLs expire after 7 days.
 *
 * ── Design tokens observed ──────────────────────────────────────────────────
 * Primary/700         #6B7A1F   → primary.7 / slider range fill
 * Primary/500         #C5D24D   → switch (toggled-on bg)
 * Primary/Beginner/40% #C0D15C  → badge bg (rgba 40%)  → inversePrimary
 * Black/Neutral/600   #363636   → onSurface
 * Black/Neutral/700   #2E2E2E   → onSurface.strong
 * Stone/60%/500       #F5F1EB   → surface.container / divider
 * Accent/500          #B8A9C9   → slider thumb bg      → tertiary.7-ish
 * Accent/400          #CFC4DB   → slider thumb border  → tertiary.6
 * Gray/Neutral/500    #E0DCD5   → slider track bg      → surface.container.high
 * Neutral/99          #FDFCF5   → root bg              → neutral.1
 * Secondary/50        #6C7D56   → "Beginner" button bg → secondary.7
 * ────────────────────────────────────────────────────────────────────────────
 *
 * ── Sections in this frame ───────────────────────────────────────────────────
 * 1. Scenario Settings  (38:8233) — info panel, scenario metadata, 4 setting badges, Beginner button
 * 2. Audio Output       (38:8234) — header + horizontal slider (volume)
 * 3. Microphone Output  (38:8235) — header + EQ waveform image + horizontal slider (mic gain)
 * 4. A/V Recording      (855:5501 + 38:8236) — radio group: "Record just audio" | "Record video & audio"
 * 5. Display timer      (38:8237) — label text + switch toggle (off state)
 * 6. Hide Interviewers  (38:8238) — label text + switch toggle (on state / #C5D24D)
 * ────────────────────────────────────────────────────────────────────────────
 */

// ── Asset URLs (expire 7 days from fetch) ────────────────────────────────────
const imgSwitch        = "https://www.figma.com/api/mcp/asset/0ad2e446-bd71-4fa0-a52b-728a7b7c7702"; // switch thumb off
const imgSwitch1       = "https://www.figma.com/api/mcp/asset/926a02cc-5061-4a9f-8244-a9c2e9da45ae"; // switch thumb on
const imgVector        = "https://www.figma.com/api/mcp/asset/6f36a7cc-ee48-428b-a5aa-ba978ee56447"; // settings icon path 1
const imgVector1       = "https://www.figma.com/api/mcp/asset/7e70f9ac-f7ec-418c-8f7c-aaf946b63a5e"; // settings icon path 2
const imgVector2       = "https://www.figma.com/api/mcp/asset/169703cd-faa9-4938-a391-8978c3c3a979"; // settings icon path 3
const imgVector3       = "https://www.figma.com/api/mcp/asset/685d0bb2-782e-4db2-9aba-cb1f45729a70"; // settings icon path 4
const imgVector4       = "https://www.figma.com/api/mcp/asset/41f6f9f5-8cea-4dd0-a457-8a9de226ca74"; // chevron-down
const imgVector5       = "https://www.figma.com/api/mcp/asset/ee0ad121-06c4-4cc5-9e8a-2165e35ba545"; // expand icon
const imgIcon          = "https://www.figma.com/api/mcp/asset/cea740af-b24e-479b-be68-7f710c43a752"; // audio output icon
const imgVector6       = "https://www.figma.com/api/mcp/asset/18b02bed-7a3e-46f0-a8bf-cece9cc7ddfb"; // stretch-horizontal (slider handle)
const imgIcon1         = "https://www.figma.com/api/mcp/asset/0ded2560-8390-4614-8c6c-317acf0624a7"; // microphone icon
const imgOutPutEq      = "https://www.figma.com/api/mcp/asset/1ad57072-a794-4e83-91e8-64b75aa5e01d"; // EQ waveform
const imgSvgRepoIconCarrier  = "https://www.figma.com/api/mcp/asset/115171e8-478c-4fd4-b430-b0d7d4a30e8b"; // record icon
const imgSvgRepoIconCarrier1 = "https://www.figma.com/api/mcp/asset/82ce3d19-76f5-4167-a246-93578a7fe913"; // timer icon
const imgSwitch2       = "https://www.figma.com/api/mcp/asset/34a69f9a-b025-4d5c-9c8b-4d7c71a639e7"; // switch thumb (display timer, off)
const imgSvgRepoIconCarrier2 = "https://www.figma.com/api/mcp/asset/6f9e3426-69be-48b5-bec5-c7a98d37f351"; // screen-view icon

// ── Raw generated code (Tailwind/React — reference only, adapt to DDS) ───────

type DiscourserAiSwitchToggleProps = {
  className?: string;
  state?: "Default";
  toggled?: boolean;
};

function DiscourserAiSwitchToggle({ className, state = "Default", toggled = false }: DiscourserAiSwitchToggleProps) {
  const isToggledAndDefault = toggled && state === "Default";
  return (
    <div
      className={
        className ||
        `content-stretch flex h-[var(--height/h-5,20px)] items-center p-[var(--p-0\\,5,2px)] relative rounded-[var(--radius/rounded-full,9999px)] shadow-[...] w-[var(--width/w-9,36px)] ${
          isToggledAndDefault ? "bg-[#c5d24d] justify-end" : "bg-[rgba(192,209,92,0.4)]"
        }`
      }
      id={isToggledAndDefault ? "node-38_8126" : "node-38_8122"}
    >
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
    <div
      className={className || "bg-[var(--neutral\\/99,#fdfcf5)] content-stretch cursor-pointer flex flex-col h-[1695px] items-start relative w-[350px]"}
      data-name="Discourser Accordion"
      data-node-id="38:8232"
    >
      {/* ── Section 1: Scenario Settings ──────────────────────────────────── */}
      <button
        className="border-[#f5f1eb] border-b border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center relative shrink-0 w-full"
        data-name="Discourse Accordion Item (Info Panel)"
        data-node-id="38:8233"
      >
        {/* AccordionTrigger */}
        <div className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative shrink-0 w-full" data-node-id="I38:8233;38:8141">
          {/* icon- Configure Settings (40×40 multi-vector) */}
          <div className="overflow-clip relative shrink-0 size-[40px]" data-node-id="I38:8233;38:8142">
            <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]"><div className="absolute inset-[-18.75%_-9.38%]"><img alt="" className="block max-w-none size-full" src={imgVector} /></div></div>
            <div className="absolute inset-[16.67%_16.67%_8.33%_16.67%]"><div className="absolute inset-[-3.33%_-3.75%]"><img alt="" className="block max-w-none size-full" src={imgVector1} /></div></div>
            <div className="absolute bottom-[54.17%] left-1/2 right-[33.33%] top-[45.83%]"><div className="absolute inset-[-1px_-15%]"><img alt="" className="block max-w-none size-full" src={imgVector2} /></div></div>
            <div className="absolute bottom-[33.33%] left-1/2 right-[33.33%] top-[66.67%]"><div className="absolute inset-[-1px_-15%]"><img alt="" className="block max-w-none size-full" src={imgVector2} /></div></div>
            <div className="absolute inset-[45.83%_66.62%_54.17%_33.33%]"><div className="absolute inset-[-1px_-5999.86%]"><img alt="" className="block max-w-none size-full" src={imgVector3} /></div></div>
            <div className="absolute inset-[66.67%_66.62%_33.33%_33.33%]"><div className="absolute inset-[-1px_-5999.86%]"><img alt="" className="block max-w-none size-full" src={imgVector3} /></div></div>
          </div>
          <p className="flex-[1_0_0] font-medium leading-normal not-italic overflow-hidden relative text-[#363636] text-[20px] text-ellipsis text-left whitespace-nowrap">Scenario Settings</p>
          <div className="overflow-clip relative shrink-0 size-[24px]"><div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]"><div className="absolute inset-[-20.83%_-10.42%]"><img alt="" className="block max-w-none size-full" src={imgVector4} /></div></div></div>
        </div>

        {/* panel- Information Slot Contents */}
        <div className="bg-[#fffdfa] border border-[#e5e7eb] border-solid flex flex-col gap-[26px] items-start p-[20px] rounded-[6px]" data-node-id="I38:8233;38:8145">
          {/* Scenario type: name + focus */}
          <div className="flex flex-col gap-[8px] items-start" data-node-id="I38:8233;38:8145;38:8208">
            <p className="font-medium text-[#363636] text-[20px]">UX Interview Practice</p>
            <p className="font-normal text-[#4a5565] text-[0px]">
              <span className="font-medium text-[#2e2e2e] text-[18px]">Focus</span>
              <span className="text-[#363636] text-[18px]">: Technical Communication</span>
            </p>
          </div>

          {/* Scenario Settings heading + badge grid */}
          <div className="flex flex-col gap-[16px]" data-node-id="I38:8233;38:8145;38:8213">
            <p className="font-medium text-[#363636] text-[20px]">Scenario  Settings</p>
            {/* Interviewer Settings — stone bg, 4 rows of label + badge */}
            <div className="bg-[#f5f1eb] flex flex-col items-center justify-center px-[20px] py-[10px] rounded-[8px]" data-node-id="I38:8233;38:8145;38:8216">
              <div className="flex flex-col gap-[10px] items-start" data-node-id="I38:8233;38:8145;38:8217">
                {[
                  { label: "Conversation Flow:", nodeId: "I38:8233;38:8145;38:8218" },
                  { label: "Question Complexity:", nodeId: "I38:8233;38:8145;38:8221" },
                  { label: "Response Pacing:", nodeId: "I38:8233;38:8145;38:8224" },
                  { label: "Interview Tone:", nodeId: "I38:8233;38:8145;38:8227" },
                ].map(({ label, nodeId }) => (
                  <div key={nodeId} className="flex gap-[2px] items-center w-full" data-node-id={nodeId}>
                    <p className="flex-1 font-medium text-[#363636] text-[16px]">{label}  </p>
                    {/* Badge: bg rgba(192,209,92,0.4) ≈ inversePrimary @40% */}
                    <div className="bg-[rgba(192,209,92,0.4)] flex gap-[4px] items-center justify-center overflow-clip px-[10px] py-[4px] rounded-[8px]">
                      <p className="font-normal text-[#2e2e2e] text-[14px]">Beginner</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Control bar — "Beginner" button */}
          <div className="flex items-center justify-end w-full" data-node-id="I38:8233;38:8145;38:8230">
            {/* bg secondary/50 ≈ secondary.7 */}
            <div className="bg-[#6c7d56] flex gap-[8px] items-end justify-end px-[16px] py-[8px] rounded-[8px] shadow-sm" data-node-id="I38:8233;38:8145;38:8231">
              <div className="overflow-clip shrink-0 size-[20px]">
                <div className="absolute inset-[12.5%]"><div className="absolute inset-[-4.43%]"><img alt="" className="block max-w-none size-full" src={imgVector5} /></div></div>
              </div>
              <p className="font-medium text-[18px] text-white">Beginner</p>
            </div>
          </div>
        </div>
      </button>

      {/* ── Section 2: Audio Output ────────────────────────────────────────── */}
      <button
        className="border-[#f5f1eb] border-b border-solid flex flex-col gap-0 items-start shrink-0 w-full"
        data-name="Discourse Accordion Item ( Audio Output Panel)"
        data-node-id="38:8234"
      >
        <div className="flex gap-[16px] items-center justify-center px-[20px] py-[16px] w-full" data-node-id="I38:8234;38:8153">
          {/* icon- Audio Output — flipped speaker */}
          <div className="-scale-y-100 rotate-180 flex items-center justify-center shrink-0">
            <img alt="" className="size-[35px]" src={imgIcon} />
          </div>
          <p className="flex-1 font-medium text-[#363636] text-[20px]">Audio Output</p>
          <div className="overflow-clip shrink-0 size-[24px]"><div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]"><div className="absolute inset-[-20.83%_-10.42%]"><img alt="" className="block max-w-none size-full" src={imgVector4} /></div></div></div>
        </div>
        {/* panel- Audio Output controls — horizontal slider */}
        <div className="flex flex-col items-center py-[20px] w-[350px]" data-node-id="I38:8234;38:8157">
          <div className="flex flex-col h-[66px] items-center justify-between px-[20px] py-[40px] w-[334px]" data-node-id="I38:8234;38:8157;38:8308">
            <div className="flex flex-col items-start w-full" data-node-id="I38:8234;38:8157;38:8309">
              <div className="h-[6px] relative w-[314px]" data-node-id="I38:8234;38:8157;38:8310">
                {/* track: bg #E0DCD5 (surface.container.high) */}
                <div className="absolute bg-[#e0dcd5] flex h-6px items-center left-[5px] rounded-full top-0 w-[290px]" data-node-id="I38:8234;38:8157;38:8311">
                  {/* range fill: bg #6B7A1F (primary.7) at ~69% */}
                  <div className="bg-[#6b7a1f] h-[6px] rounded-full w-[201px]" />
                  {/* thumb: bg #B8A9C9 (accent/500 ≈ tertiary), border #CFC4DB */}
                  <div className="absolute h-[35px] left-[183px] top-[-14.5px] w-[34px]">
                    <div className="-translate-x-1/2 absolute bg-[#b8a9c9] border-2 border-[#cfc4db] h-[35px] left-1/2 rounded-full shadow-md top-0 w-[34px]" />
                    <div className="absolute h-[19px] left-[8px] overflow-clip top-[8px] w-[18px]">
                      <div className="absolute inset-[16.67%_8.33%]"><div className="absolute inset-[-3.95%_-3.33%]"><img alt="" className="block max-w-none size-full" src={imgVector6} /></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* ── Section 3: Microphone Output ──────────────────────────────────── */}
      <button
        className="border-[#f5f1eb] border-b border-solid flex flex-col gap-0 h-[245px] items-start shrink-0 w-full"
        data-name="Discourse Accordion Item ( EQ & Slider container"
        data-node-id="38:8235"
      >
        <div className="flex gap-[16px] items-center justify-center px-[20px] py-[16px] w-full" data-node-id="I38:8235;38:8165">
          <div className="flex flex-col items-start pt-[4px] shrink-0 size-[40px]">
            <img alt="" className="absolute size-full" src={imgIcon1} />
          </div>
          <p className="flex-1 font-medium text-[#363636] text-[20px]">Microphone Output</p>
          <div className="overflow-clip shrink-0 size-[24px]"><div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]"><div className="absolute inset-[-20.83%_-10.42%]"><img alt="" className="block max-w-none size-full" src={imgVector4} /></div></div></div>
        </div>
        {/* panel- Eq & Slide container */}
        <div className="flex flex-col gap-[37px] items-center py-[20px] w-full" data-node-id="I38:8235;38:8169">
          {/* EQ waveform image */}
          <div className="h-[24px] relative w-[289px]" data-node-id="I38:8235;38:8169;38:8315">
            <div className="absolute inset-[-7.73%_-0.8%_-7.71%_-0.64%]"><img alt="" className="block max-w-none size-full" src={imgOutPutEq} /></div>
          </div>
          {/* Mic gain slider — identical structure to Audio Output slider */}
          <div className="flex flex-col h-[48px] items-center justify-center w-[305px]" data-node-id="I38:8235;38:8169;38:8317">
            <div className="flex flex-col items-start w-full">
              <div className="h-[6px] relative w-[314px]">
                <div className="absolute bg-[#e0dcd5] flex h-[6px] items-center left-[5px] rounded-full top-0 w-[290px]">
                  <div className="bg-[#6b7a1f] h-[6px] rounded-full w-[201px]" />
                  <div className="absolute h-[35px] left-[183px] top-[-14.5px] w-[34px]">
                    <div className="-translate-x-1/2 absolute bg-[#b8a9c9] border-2 border-[#cfc4db] h-[35px] left-1/2 rounded-full shadow-md top-0 w-[34px]" />
                    <div className="absolute h-[19px] left-[8px] overflow-clip top-[8px] w-[18px]">
                      <div className="absolute inset-[16.67%_8.33%]"><div className="absolute inset-[-3.95%_-3.33%]"><img alt="" className="block max-w-none size-full" src={imgVector6} /></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* ── Section 4a: A/V Recording (855:5501 — radio unselected) ──────── */}
      <button
        className="border-[#f5f1eb] border-b border-solid flex flex-col gap-0 items-center justify-center shrink-0 w-full"
        data-name="Discourse Accordion Item ( A/V Record )"
        data-node-id="855:5501"
      >
        <div className="flex gap-[16px] items-center justify-center px-[20px] py-[16px] w-full" data-node-id="I855:5501;38:8177">
          <div className="flex flex-col h-[40px] items-center justify-center p-[3px] shrink-0">
            <div className="relative shrink-0 size-[29.167px]"><div className="absolute inset-[-3.43%]"><img alt="" className="block max-w-none size-full" src={imgSvgRepoIconCarrier} /></div></div>
          </div>
          <p className="flex-1 font-medium text-[#363636] text-[20px]">A/V Recording</p>
          <div className="overflow-clip shrink-0 size-[24px]"><div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]"><div className="absolute inset-[-20.83%_-10.42%]"><img alt="" className="block max-w-none size-full" src={imgVector4} /></div></div></div>
        </div>
        <div className="flex flex-col items-center p-[20px] w-full" data-node-id="I855:5501;38:8181">
          <div className="cursor-pointer flex flex-col gap-[12px] items-start w-[280px]" data-node-id="I855:5501;38:8181;38:8324">
            {/* Radio item 1 — unselected: border #64A104 (primary.7) */}
            <div className="flex gap-[8px] items-start w-full" role="button" tabIndex={0}>
              <div className="flex flex-1 flex-col gap-[6px] items-start pt-px">
                <p className="font-normal leading-[30px] text-[#363636] text-[18px] w-full">Record just  audio</p>
              </div>
              <div className="relative shadow-xs shrink-0 size-[16px]">
                {/* unselected: outline only, border primary.7 */}
                <div className="absolute border-[3px] border-[#64a104] left-0 rounded-full size-[16px] top-0" />
              </div>
            </div>
            {/* Radio item 2 — selected: bg #C5D24D, border #B8A9C9 (accent) */}
            <div className="flex gap-[8px] items-start w-full" role="button" tabIndex={0}>
              <div className="flex flex-1 flex-col gap-[6px] items-start pt-px">
                <p className="font-normal leading-[30px] text-[#363636] text-[18px] w-full">Record video &  audio</p>
              </div>
              <div className="relative shadow-xs shrink-0 size-[16px]">
                {/* selected: filled primary green */}
                <div className="absolute bg-[#c5d24d] border border-[#b8a9c9] left-0 rounded-full size-[16px] top-0" />
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* ── Section 5: Display Timer ──────────────────────────────────────── */}
      <button
        className="border-[#f5f1eb] border-b border-solid flex flex-col gap-0 items-start shrink-0 w-full"
        data-name="Discourse Accordion Item ( Show Timer )"
        data-node-id="38:8237"
      >
        <div className="flex gap-[16px] items-center justify-center px-[20px] py-[16px] w-full" data-node-id="I38:8237;38:8190">
          <div className="flex flex-col items-center justify-center overflow-clip p-[5px] shrink-0 size-[40px]">
            <div className="relative shrink-0 size-[27px]"><div className="absolute inset-[-4.63%]"><img alt="" className="block max-w-none size-full" src={imgSvgRepoIconCarrier1} /></div></div>
          </div>
          <p className="flex-1 font-medium text-[#363636] text-[20px]">Display timer</p>
          <div className="overflow-clip shrink-0 size-[24px]"><div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]"><div className="absolute inset-[-20.83%_-10.42%]"><img alt="" className="block max-w-none size-full" src={imgVector4} /></div></div></div>
        </div>
        {/* panel — description text + switch (OFF = rgba(192,209,92,0.4)) */}
        <div className="flex gap-[10px] h-[128px] items-center justify-center p-[20px] w-full" data-node-id="I38:8237;38:8194">
          <p className="font-normal leading-[30px] text-[#363636] text-[18px] whitespace-pre-wrap w-[260.713px]">
            {`Hide timer to create more \nrealistic interview`}
          </p>
          {/* switch off: bg rgba(192,209,92,0.4) */}
          <div className="bg-[rgba(192,209,92,0.4)] flex h-[20px] items-center p-[2px] rounded-full shadow-2xs w-[36px]">
            <div className="relative shrink-0 size-[16px]">
              <div className="absolute inset-[-6.25%_-12.5%_-18.75%_-12.5%]"><img alt="" className="block max-w-none size-full" src={imgSwitch2} /></div>
            </div>
          </div>
        </div>
      </button>

      {/* ── Section 6: Hide Interviewers ──────────────────────────────────── */}
      <button
        className="border-[#f5f1eb] border-b border-solid flex flex-col gap-0 items-center justify-center shrink-0 w-full"
        data-name="Discourse Accordion Item ( Hide Interview )"
        data-node-id="38:8238"
      >
        <div className="flex gap-[16px] items-center justify-center px-[20px] py-[16px] w-full" data-node-id="I38:8238;38:8202">
          <div className="flex flex-col items-center justify-center overflow-clip p-px shrink-0 size-[40px]">
            <div className="relative shrink-0 size-[24.891px]"><img alt="" className="absolute size-full" src={imgSvgRepoIconCarrier2} /></div>
          </div>
          <p className="flex-1 font-medium text-[#363636] text-[20px]">Hide Interviewers</p>
          <div className="overflow-clip shrink-0 size-[24px]"><div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]"><div className="absolute inset-[-20.83%_-10.42%]"><img alt="" className="block max-w-none size-full" src={imgVector4} /></div></div></div>
        </div>
        {/* panel — description text + switch (ON = #C5D24D) */}
        <div className="flex gap-[10px] items-center justify-center py-[20px]" data-node-id="I38:8238;38:8206">
          <p className="font-normal leading-[30px] text-[#363636] text-[18px] whitespace-pre-wrap w-[244.007px]">
            {`Switch to off  to  hide video of interviewers if it is too \ndistracting`}
          </p>
          {/* switch on: bg #C5D24D, thumb right-aligned */}
          <DiscourserAiSwitchToggle
            className="bg-[#c5d24d] flex h-[20px] items-center justify-end p-[2px] rounded-full shadow-2xs w-[36px]"
            toggled
          />
        </div>
      </button>
    </div>
  );
}

/**
 * ── DDS Token Mapping Notes ───────────────────────────────────────────────────
 *
 * For the v2 implementation, map Figma values → DDS semantic tokens:
 *
 * Figma hex / var            DDS token                  Where used
 * ─────────────────────────────────────────────────────────────────────────────
 * #FDFCF5 (neutral/99)       neutral.1                  root bg
 * #F5F1EB (stone/60%/500)    surface.container           section divider, info bg
 * #FFFDFA                    neutral.1 / surface         info card bg
 * #E5E7EB                    outline.variant             info card border
 * #363636 (black/600)        onSurface                  body text
 * #2E2E2E (black/700)        onSurface (strong)          bold labels
 * #4A5565                    onSurface.variant           subtitle text
 * rgba(192,209,92,0.4)       inversePrimary (40%)        badge bg, switch-off bg
 * #C5D24D (primary/500)      primary.5                  switch-on bg
 * #6B7A1F (primary/700)      primary.7                  slider range fill
 * #6C7D56 (secondary/50)     secondary.7                "Beginner" button bg
 * #E0DCD5 (gray/neutral/500) surface.container.high      slider track bg
 * #B8A9C9 (accent/500)       tertiary.5 / accent         slider thumb bg
 * #CFC4DB (accent/400)       tertiary.4                 slider thumb border
 * #64A104 (primary/60%)      primary.7 (@ 60%)          radio unselected border
 */
