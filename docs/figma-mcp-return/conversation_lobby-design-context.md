# Conversation Lobby — Pre-launch Screen

**Figma node:** `66:2739`
**Frame name:** `Scenario/Studio Conversation/ Prelaunch`
**Dimensions:** 1728 × 1095px

## Screenshot

See Figma file: https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=66-2739

## Layout Overview

Three-column layout:
- **Left Side Nav** (285px) — logo, navigation menu (Dashboard, MyNotebook, Scenarios expanded, Help, Account), settings popover at bottom
- **Stage** (1089px) — dark background with centered Instructions Container (892×832px light card) + masthead breadcrumb (top-left) + clock (bottom-right)
- **Right Control Panel** (354px) — Studio Controls accordion (Scenario Settings, Audio Output, Microphone Output, A/V Recording, Display Timer, Hide Interviewers)

## Design Tokens Referenced

| Token | Value |
|---|---|
| `--surfacecontainerhigh` | `#e8e9de` |
| `--neutral/90` | `#e3e3db` |
| `--neutral/99` | `#fdfcf5` |
| `--neutral/30` | `#464742` |
| `--neutral/0` (black) | `#000000` |
| `--secondary/50` | `#6c7d56` |
| `--secondary/80` | `#bbcda1` |
| `--primary/80` | `#97d945` |
| `--primary/99` | `#f9ffe9` |
| `--primary/10` | `#102000` |
| `--neutralvariant/95` | `#eff2e3` |
| `--surfacecontainer` | `#eeefe3` |
| Primary/500 | `#c5d24d` |
| Primary/Beginner/40% | `#c0d15c` (rgba 192,209,92 @ 0.4) |
| Accent/500 | `#b8a9c9` |
| Stone/60%/500 | `#f5f1eb` |
| Stone/60%/400 | `#faf8f5` |

## Typography

| Style | Font | Size | Weight |
|---|---|---|---|
| `headlineMedium` | Fraunces Regular | 28px | 400 |
| `bodyLarge` | Poppins Medium | 18px | 500 |
| `bodyLargeReg` | Poppins Regular | 18px | 400 |
| `bodyLargeSemiBold` | Poppins SemiBold | 18px | 600 |
| `bodyMedium` | Poppins Regular | 14px | 400 |
| Nav labels | Inter Regular | 18px | 400 |
| Nav active | Inter Medium | 18px | 500 |
| Accordion triggers | Inter Medium | 20px | 500 |
| H4 / Studio Controls heading | Georgia Bold | 24px | 700 |

## Reference Code (React + Tailwind — adapt to DDS stack)

```tsx
const imgSwitch = "https://www.figma.com/api/mcp/asset/5ba7c547-f5a4-4f17-8f09-e04a275909ff";
const imgSwitch1 = "https://www.figma.com/api/mcp/asset/28ff3368-e259-43ac-a7ad-bbc059c90ba5";
const imgSvgRepoIconCarrier = "https://www.figma.com/api/mcp/asset/c069de08-e6c2-4996-b8be-5176345743a8";
const imgSvgRepoIconCarrier1 = "https://www.figma.com/api/mcp/asset/1de0753d-a69f-4d3f-a69b-6a6d8bcb8372";
const imgImage1 = "https://www.figma.com/api/mcp/asset/e170483c-7243-4701-99b4-8cf16ee9c681";
const imgIon = "https://www.figma.com/api/mcp/asset/8ab99acc-d215-48b8-9eb4-fd8fae010d51";
const imgDiscourser = "https://www.figma.com/api/mcp/asset/e9dfdce9-959f-4696-8151-64b8d246d279";
const imgVector = "https://www.figma.com/api/mcp/asset/7b8e41e2-39e6-4c64-99da-2a1bedaa74d4";
const imgVector1 = "https://www.figma.com/api/mcp/asset/85931475-fa2c-492d-9f40-782b0ea66b59";
const imgVector2 = "https://www.figma.com/api/mcp/asset/e2b3e34c-da79-4843-bf40-e27c6c383c4a";
const imgVector3 = "https://www.figma.com/api/mcp/asset/1ca19ae5-c371-4f13-96e5-87357a4e4bfa";
const imgVector4 = "https://www.figma.com/api/mcp/asset/8cf17490-bac2-47e8-91e1-5f13f2ad81d9";
const imgVector5 = "https://www.figma.com/api/mcp/asset/7652bd19-0771-4023-89cb-d922f3798001";
const imgGroup4890 = "https://www.figma.com/api/mcp/asset/cdd76732-2131-410c-8b07-869c0c3506f2";
const imgVector6 = "https://www.figma.com/api/mcp/asset/9f7fcde2-3767-4fdd-bfb4-cd8208f6a084";
const imgGroup4891 = "https://www.figma.com/api/mcp/asset/d83634da-5472-4cd8-823b-551dd00b299b";
const imgLucideIconsIterationCcw = "https://www.figma.com/api/mcp/asset/dff04cc2-e37a-4d16-bfee-b776ee8ad8e7";
const imgVector7 = "https://www.figma.com/api/mcp/asset/bc33d3a2-c3bf-47f6-b660-8c3be8c9739e";
const imgSlash = "https://www.figma.com/api/mcp/asset/7550709e-77c8-4cb1-99d2-4123a6aeec76";
const imgSlash1 = "https://www.figma.com/api/mcp/asset/4df9d906-bed0-40f0-8217-22b78869bb11";
const imgVector8 = "https://www.figma.com/api/mcp/asset/c8b8560d-f1a3-4aa1-9dc1-30e4d1552030";
const imgVector9 = "https://www.figma.com/api/mcp/asset/7607d809-5743-4a24-8f6e-3d36bf0e3798";
const imgVector10 = "https://www.figma.com/api/mcp/asset/bbbba732-154e-4eb7-b3ed-79a3f7c361ae";
const imgVector11 = "https://www.figma.com/api/mcp/asset/7284e075-60a7-4d59-a7e6-a4aa58a10536";
const imgVector12 = "https://www.figma.com/api/mcp/asset/27328160-56bd-4eb4-8124-556132f77e3b";
const imgVector13 = "https://www.figma.com/api/mcp/asset/73b441a5-4a96-44aa-9b3a-247bb6c0019d";
const imgIcon = "https://www.figma.com/api/mcp/asset/f2b6805c-8293-48ca-b6df-cd260a0b5689";
const imgVector14 = "https://www.figma.com/api/mcp/asset/3ef7f274-91a2-4b84-b90a-5bd2e8511b67";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/6ce2a5c5-cfc2-4c69-af46-72bd18599be3";
const imgOutPutEq = "https://www.figma.com/api/mcp/asset/a4de206e-c3cb-49fc-a498-a2e198e0c2fa";
const imgSvgRepoIconCarrier2 = "https://www.figma.com/api/mcp/asset/e4ccc26d-912c-4377-abc9-7aadd9d8a654";
const imgSvgRepoIconCarrier3 = "https://www.figma.com/api/mcp/asset/38743fd0-a883-4c50-98bb-3852377798e6";
const imgSwitch2 = "https://www.figma.com/api/mcp/asset/f9afe819-5304-4b78-bec1-c86dfb69aedf";
const imgSvgRepoIconCarrier4 = "https://www.figma.com/api/mcp/asset/020ea92c-4738-454a-a669-6c9f25675ea0";

// NOTE: Asset URLs expire after 7 days from capture date (2026-03-27).

type DiscourserAiSwitchToggleProps = {
  className?: string;
  state?: "Default";
  toggled?: boolean;
};

function DiscourserAiSwitchToggle({ className, state = "Default", toggled = false }: DiscourserAiSwitchToggleProps) {
  const isToggledAndDefault = toggled && state === "Default";
  return (
    <div className={className || `content-stretch flex h-[20px] items-center p-[2px] relative rounded-full shadow-sm w-[36px] ${isToggledAndDefault ? "bg-[#c5d24d] justify-end" : "bg-[rgba(192,209,92,0.4)]"}`}>
      <div className="relative shrink-0 size-[16px]">
        <div className="absolute inset-[-6.25%_-12.5%_-18.75%_-12.5%]">
          <img alt="" className="block max-w-none size-full" src={isToggledAndDefault ? imgSwitch1 : imgSwitch} />
        </div>
      </div>
    </div>
  );
}

function PopOver({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[40px]"}>
      <div className="absolute inset-[12.96%_17.82%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgSvgRepoIconCarrier} />
      </div>
    </div>
  );
}

function SettingsPopover({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#eff2e3] border-[#e3e3db] border-solid border-t content-stretch flex flex-col items-start justify-center overflow-clip py-[6px] relative w-[285px]"}>
      <div className="content-stretch flex gap-[12px] h-[55px] items-center px-[10px] relative shrink-0 w-[283px]">
        <div className="bg-[#e3e3db] overflow-clip relative rounded-full shrink-0 size-[44px]">
          {/* Avatar image */}
          <img alt="" className="absolute block max-w-none size-full" src={imgSvgRepoIconCarrier1} />
        </div>
        <div className="content-stretch flex flex-col items-start leading-none relative shrink-0 w-[161px]">
          <p className="font-medium text-[18px] text-[#30312c]">Will Streeter</p>
          <p className="text-[14px] text-[#5e5f59]">Free Trial</p>
        </div>
        <PopOver className="overflow-clip relative shrink-0 size-[40px]" />
      </div>
    </div>
  );
}

export default function ScenarioStudioConversationPrelaunch({ className }: { className?: string }) {
  return (
    <div className={className || "bg-white h-[1095px] overflow-clip relative w-[1728px]"}>
      <div className="absolute content-stretch flex h-[1095px] items-start left-0 overflow-clip top-0 w-[1728px]">

        {/* ── Left Side Nav (285px) ─────────────────────────────────────────── */}
        <div className="bg-[#e8e9de] border-[#e3e3db] border-r border-solid content-stretch flex flex-col h-full items-start overflow-clip relative shadow-md shrink-0 w-[285px]">
          {/* Logo */}
          <div className="content-stretch flex h-[92px] items-center justify-center py-[15px] relative shrink-0 w-full">
            <div className="content-stretch flex h-[45px] items-center relative shrink-0 w-[262px]">
              <img alt="ion" className="h-[34px] relative shrink-0 w-[19px]" src={imgIon} />
              <img alt="Discourser" className="h-[34px] relative shrink-0 w-[235px]" src={imgDiscourser} />
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="content-stretch cursor-pointer flex flex-col gap-px h-full items-start overflow-clip relative shrink-0 w-[283px]">
            {/* Dashboard */}
            <button className="content-stretch flex flex-col items-start overflow-clip p-[10px] relative shrink-0 w-full">
              <div className="content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                  <img alt="" className="size-[20px]" src={imgVector} />
                  <span className="text-[#363636] text-[18px]">Dashboard</span>
                </div>
                <img alt="" className="size-[24px]" src={imgVector1} />
              </div>
            </button>

            {/* MyNotebook */}
            <button className="content-stretch flex flex-col items-start overflow-clip p-[10px] relative shrink-0 w-full">
              <div className="content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                  <img alt="" className="size-[20px]" src={imgVector2} />
                  <span className="text-[#363636] text-[18px]">MyNotebook</span>
                </div>
                <img alt="" className="size-[24px]" src={imgVector1} />
              </div>
            </button>

            {/* Scenarios (expanded, active) */}
            <button className="content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[10px] relative shrink-0 w-full">
              <div className="bg-[#eeefe3] content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                  <img alt="" className="size-[20px]" src={imgVector3} />
                  <span className="font-medium text-[#363636] text-[18px]">Scenarios</span>
                </div>
                {/* Chevron rotated 90deg = expanded */}
                <div className="rotate-90"><img alt="" className="size-[24px]" src={imgVector1} /></div>
              </div>
              {/* Sub-items */}
              <div className="pl-[30px] pr-[5px] py-[5px] rounded-[8px] w-[241px]">
                <span className="font-medium text-[#363636] text-[16px]">MyQueue</span>
              </div>
              {/* Active sub-item */}
              <div className="bg-[#bbcda1] pl-[30px] pr-[5px] py-[5px] rounded-[8px] w-[241px]">
                <span className="font-medium text-[#363636] text-[16px]">Conversation Studio</span>
              </div>
              <div className="pl-[30px] pr-[5px] py-[5px] rounded-[8px] w-[241px]">
                <span className="font-medium text-[#363636] text-[16px]">Studio Setup</span>
              </div>
              <div className="pl-[30px] pr-[5px] py-[5px] rounded-[8px] w-[241px]">
                <span className="font-medium text-[#363636] text-[16px]">By Level</span>
              </div>
              <div className="pl-[30px] pr-[5px] py-[5px] rounded-[8px] w-[241px]">
                <span className="font-medium text-[#363636] text-[16px]">By Skill</span>
              </div>
            </button>

            {/* Help */}
            <button className="content-stretch flex flex-col items-start overflow-clip p-[10px] relative shrink-0 w-full">
              <div className="content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                  <img alt="" className="size-[20px]" src={imgVector4} />
                  <span className="text-[#363636] text-[18px]">Help</span>
                </div>
                <img alt="" className="size-[24px]" src={imgVector1} />
              </div>
            </button>

            {/* Account */}
            <button className="content-stretch flex flex-col items-start overflow-clip p-[10px] relative shrink-0 w-full">
              <div className="content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                  <img alt="" className="size-[20px]" src={imgVector5} />
                  <span className="text-[#363636] text-[18px]">Account</span>
                </div>
                <img alt="" className="size-[24px]" src={imgVector1} />
              </div>
            </button>
          </div>

          {/* Settings Popover — pinned to bottom */}
          <SettingsPopover className="absolute bg-[#eff2e3] border-[#e3e3db] border-solid border-t content-stretch flex flex-col h-[67px] items-start justify-center left-0 overflow-clip py-[6px] top-[1025px] w-[285px]" />
        </div>

        {/* ── Stage (1089px) ───────────────────────────────────────────────── */}
        <div className="bg-[#faf8f5] content-stretch flex flex-col gap-[10px] h-[1095px] items-start overflow-clip pb-[10px] pt-[100px] px-[100px] relative shrink-0 w-[1089px]">
          {/* Dark background overlay */}
          <div className="absolute bg-black h-[1095px] left-[-284px] top-0 w-[1723px]">
            <div className="absolute h-[1162px] left-0 opacity-0 top-[-21px] w-[1728px]">
              <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgImage1} />
            </div>

            {/* Instructions Container — centered light card */}
            <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#fdfcf5] border border-[#abaca5] border-solid content-stretch flex flex-col gap-[52px] h-[832px] items-center justify-center left-[calc(50%-28.72px)] overflow-clip px-[32px] py-[48px] rounded-[16px] top-[calc(50%+21.5px)] w-[892px]">

              {/* Before You Start */}
              <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
                <p className="font-['Fraunces'] font-normal text-[28px] text-[#1b1c18]">Before You Start:</p>
                <ul className="flex flex-col gap-[30px] px-[10px] text-[#2e2e2e] text-[18px] list-disc pl-[27px]">
                  <li>Find a quiet space</li>
                  <li>Speak at normal volume and use headphones for best quality.</li>
                  <li>If you have not set up the audio output and microphone input, use the right panel to do so before you start</li>
                </ul>
              </div>

              {/* Once the Conversation Starts */}
              <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
                <p className="font-['Fraunces'] font-normal text-[28px] text-[#191d14]">Once the Conversation Starts:</p>
                <div className="content-stretch flex flex-col gap-[30px] items-start px-[10px]">
                  <div className="content-stretch flex gap-[10px] items-center">
                    <div className="bg-[#6c7d56] flex items-center justify-center p-[9px] rounded-full shrink-0 size-[47px]">
                      <img alt="pause" className="size-[28px]" src={imgGroup4890} />
                    </div>
                    <p className="text-[18px] text-[#30312c]">Tap pause on the bottom right panel if you feel compelled to stop for a moment</p>
                  </div>
                  <div className="content-stretch flex items-center">
                    <div className="bg-[#6c7d56] flex flex-col items-center justify-center rounded-full shrink-0 size-[47px]">
                      <img alt="exit" className="size-[28px]" src={imgGroup4891} />
                    </div>
                    <p className="text-[18px] text-[#30312c] ml-[10px]">Use the exit button to leave the conversation abruptly</p>
                  </div>
                  <div className="content-stretch flex items-center">
                    <button className="bg-[#6c7d56] block cursor-pointer rounded-full shrink-0 size-[47px] flex items-center justify-center">
                      <img alt="rewind" className="size-[37px]" src={imgLucideIconsIterationCcw} />
                    </button>
                    <p className="text-[18px] text-[#30312c] ml-[10px]">Use replay on the bottom right to hear the previous statement from your conversation partner</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a className="bg-[#6c7d56] content-stretch cursor-pointer flex gap-[8px] h-[52px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shadow-sm shrink-0 w-[352px]">
                <span className="font-medium text-[18px] text-[#f9faef]">Start Scenario Conversation</span>
                <img alt="" className="size-[20px]" src={imgVector7} />
              </a>
            </div>
          </div>

          {/* Masthead / Breadcrumb — top-left */}
          <div className="absolute bg-[#464742] border border-[#c7c7c0] border-solid content-stretch flex flex-col items-start left-[28.5px] p-[20px] rounded-[12px] top-[20px]">
            <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-[417px]">
              {/* Static breadcrumb */}
              <div className="content-stretch flex items-start overflow-clip relative shrink-0">
                <div className="content-stretch flex gap-[6px] items-center pl-[6px]">
                  <span className="text-[14px] text-[#f2f1e9]">Scenarios</span>
                  <img alt="/" className="h-[11px] w-[4px]" src={imgSlash} />
                </div>
                <div className="content-stretch flex gap-[6px] items-center px-[6px]">
                  <span className="text-[14px] text-[#fdfcf5]">Conversation Studio</span>
                  <img alt="/" className="h-[11px] w-[4px]" src={imgSlash1} />
                </div>
              </div>
              {/* Dynamic breadcrumb — current page */}
              <div className="content-stretch flex items-center overflow-clip">
                <div className="flex gap-[2px] h-[36px] items-center pl-[6px] py-[6px] rounded-[4px]">
                  <span className="font-semibold text-[18px] text-[#97d945]">Level Setting</span>
                </div>
                <div className="flex gap-[2px] h-[36px] items-center p-[6px] rounded-[4px]">
                  <span className="font-semibold text-[18px] text-[#97d945]">Lobby</span>
                </div>
                <div className="flex gap-[2px] h-[36px] items-center pl-[6px] py-[6px] rounded-[4px]">
                  <span className="font-semibold text-[18px] text-[#f9ffe9]">Pre-conversation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clock — bottom right of stage */}
          <div className="absolute bg-[#102000] border border-black border-solid content-stretch flex items-center justify-center left-[950px] overflow-clip p-[16px] rounded-[12px] top-[1000px]">
            <span className="font-semibold text-[18px] text-[#97d945] text-center w-[89px]">15:00</span>
          </div>
        </div>

        {/* ── Right Control Panel (354px) ──────────────────────────────────── */}
        <a className="bg-[#fdfcf5] border-[#e5e7eb] border-l border-solid content-stretch cursor-pointer flex flex-col h-full items-start overflow-clip pl-px relative rounded-[8px] shrink-0 w-[354px]">
          {/* Header */}
          <div className="border-[#e0dcd5] border-b border-solid h-[78px] shrink-0 sticky top-0 w-[353px]">
            <div className="content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
              <h2 className="font-['Georgia'] font-bold text-[24px] text-[#363636] text-center">Studio Controls</h2>
            </div>
          </div>

          {/* Accordion — Studio Controls sections */}
          {/* NOTE: In the DDS implementation, use <StudioControls> component instead */}
          <div className="bg-[#fdfcf5] relative shrink-0 w-[350px]">
            {/* Scenario Settings accordion item */}
            {/* Audio Output accordion item */}
            {/* Microphone Output accordion item (note: DDS renames to "Microphone Input") */}
            {/* A/V Recording accordion item */}
            {/* Display Timer accordion item */}
            {/* Hide Interviewers accordion item */}
            {/* See StudioControls component for full implementation */}
          </div>
        </a>

      </div>
    </div>
  );
}
```

## Notes for DDS Implementation

- The right panel maps 1:1 to `<StudioControls>` component
- Badge style for scenario complexity = `variant="rating"` with colorPalette primary/secondary/tertiary
- Slider thumb color in Figma is `#b8a9c9` (Accent/500) — not yet implemented in DDS slider
- Stage background image (`imgImage1`) has `opacity: 0` in design — intentionally hidden
- "Microphone Output" label in Figma is renamed to "Microphone Input" in DDS code
