# Figma Design Context — Queue Container
**Node ID:** `38:4048`
**Figma URL:** https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4048&m=dev
**Exported:** 2026-02-19

---

## Raw Design Context (React + Tailwind output from Figma MCP)

```tsx
const imgIcon  = "http://localhost:3845/assets/a0486c4e92dcca81fa419203a505056bede62c8f.svg";  // drag handle
const imgIcon1 = "http://localhost:3845/assets/e54a4229a41b87b3c76a1c495ccdde165903506f.svg";  // clock (active)
const imgIcon2 = "http://localhost:3845/assets/2f1838b84cd7253d00c9399edbe8e1fd36170c81.svg";  // clock (intermediate)
const imgIcon3 = "http://localhost:3845/assets/2155d3fdf68d2526ac190ea2d37b4b0ad4e0f845.svg";  // clock (advanced)
const imgIcon4 = "http://localhost:3845/assets/45a382812eb0ea54f042ad6e25c854f0ad16d5a7.svg";  // plus icon

export default function QueueContainer() {
  return (
    // ── ROOT ──────────────────────────────────────────────────────────────
    <div
      className="bg-[var(--surface,#f9faef)] content-stretch flex flex-col gap-[10px] items-start px-[10px] relative size-full"
      data-name="Queue Container"
      data-node-id="38:4048"
    >

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <div
        className="content-stretch flex flex-col gap-[4px] h-[138px] items-start pb-px pt-[20px] px-[24px] relative shrink-0 w-full"
        data-name="Container"
        data-node-id="38:4049"
      >
        {/* Title + count */}
        <div
          className="content-stretch flex flex-col gap-[4px] items-start pb-[25px] relative shrink-0 w-full"
          data-node-id="388:3148"
        >
          <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2" data-node-id="38:4050">
            <p
              className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-0 not-italic text-[18px] text-[color:var(--dark-surfacecontainerhighest,#33362e)] top-0"
              data-node-id="38:4051"
            >
              {`Scenario  Queue`}
            </p>
          </div>
          <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph" data-node-id="38:4052">
            <p
              className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[14px] text-[color:var(--onsurfacevariant,#44483d)] top-0"
              data-node-id="38:4053"
            >
              3 scenarios
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="border-[var(--primary\/99,#f9ffe9)] border-b border-solid content-stretch flex gap-[var(--spacings-\&-radii\/4,16px)] items-start relative shrink-0 w-full"
          data-name="tabs"
          data-node-id="388:3099"
        >
          {/* Active tab — "In Queue" */}
          <div
            className="border-[var(--dark-primary,#b1d18a)] border-b-2 border-solid content-stretch flex flex-[1_0_0] gap-[var(--spacings-\&-radii\/0,0px)] items-center justify-center min-h-px min-w-px pb-[var(--spacings-\&-radii\/2\,5,10px)] pt-[var(--spacings-\&-radii\/1\,5,6px)] px-[var(--spacings-\&-radii\/3,12px)] relative"
            data-name="tabs item"
            data-node-id="I388:3099;2033:63"
          >
            <div
              className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-[var(--typography\/weight\/semibold,600)] justify-center leading-[0] not-italic relative shrink-0 text-[color:var(--primary\/50,#518500)] text-[length:var(--typography\/size\/md,16px)] text-center whitespace-nowrap"
              data-node-id="I388:3099;2033:63;2016:278"
              style={{ fontFeatureSettings: "'liga' 0, 'calt' 0" }}
            >
              <p className="leading-[24px]">{`In Queue `}</p>
            </div>
          </div>

          {/* Inactive tab — "Completed" */}
          <div
            className="border-[var(--colors\/theme\/border\/neutral\/default,#cecece)] border-b border-solid content-stretch flex flex-[1_0_0] gap-[var(--spacings-\&-radii\/3,0px)] items-center justify-center min-h-px min-w-px pb-[var(--spacings-\&-radii\/2\,5,10px)] pt-[var(--spacings-\&-radii\/1\,5,6px)] px-[var(--spacings-\&-radii\/3,12px)] relative"
            data-name="tabs item"
            data-node-id="I388:3099;2033:64"
          >
            <div
              className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-[var(--typography\/weight\/semibold,600)] justify-center leading-[0] not-italic relative shrink-0 text-[color:var(--neutral\/50,#777771)] text-[length:var(--typography\/size\/md,16px)] text-center whitespace-nowrap"
              data-node-id="I388:3099;2033:64;2016:276"
              style={{ fontFeatureSettings: "'liga' 0, 'calt' 0" }}
            >
              <p className="leading-[24px]">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARDS CONTAINER ──────────────────────────────────────────── */}
      <div
        className="content-stretch flex flex-col gap-[26px] h-[858px] items-start overflow-clip pt-[16px] px-[16px] relative shrink-0 w-full"
        data-name="Container"
        data-node-id="38:4054"
      >

        {/* ── CARD 1 — ACTIVE ─────────────────────────────── */}
        <div
          className="bg-[var(--neutral\/99,#fdfcf5)] border-[var(--primary\/60,#64a104)] border-l-4 border-solid content-stretch flex flex-col gap-[10px] items-start pl-[20px] pr-[12px] py-[10px] relative rounded-[8px] shadow-[0px_2px_8px_0px_rgba(167,139,250,0.15)] shrink-0 w-full"
          data-name="QueueCard"
          data-node-id="38:4055"
        >
          {/* Top row */}
          <div
            className="content-stretch flex items-start justify-between pr-[10px] py-[9px] relative shrink-0 w-full"
            data-name="Container"
            data-node-id="38:4056"
          >
            {/* Drag handle */}
            <div className="h-[41px] relative shrink-0 w-[37px]" data-name="Icon" data-node-id="383:4751">
              <img alt="" className="absolute block inset-0 max-w-none" src={imgIcon} />
            </div>
            {/* Position badge — ACTIVE: 50×50, filled primary/60 */}
            <div
              className="bg-[var(--primary\/60,#64a104)] content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[50px]"
              data-name="Container"
              data-node-id="38:4064"
            >
              <div className="h-[24px] relative shrink-0 w-[7.625px]" data-name="Text" data-node-id="38:4065">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                  <p
                    className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[16px] text-[color:var(--onprimary,white)] top-0 tracking-[-0.3125px]"
                    data-node-id="38:4066"
                  >
                    1
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div
            className="content-stretch flex items-start justify-center px-[5px] py-[7px] relative shrink-0 w-[179px]"
            data-name="Heading 3"
            data-node-id="38:4067"
          >
            <p
              className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#363636] text-[16px] w-[173.662px] whitespace-pre-wrap"
              data-node-id="38:4068"
            >
              {`UX Research & Design Interview`}
            </p>
          </div>

          {/* Footer: badges stacked vertically */}
          <div
            className="content-stretch flex items-start relative shrink-0 w-[175px]"
            data-name="Footer"
            data-node-id="38:4069"
          >
            <div
              className="content-stretch flex flex-col gap-[12px] items-start py-[10px] relative shrink-0"
              data-name="Container"
              data-node-id="38:4070"
            >
              {/* Difficulty pill — primarycontainer bg */}
              <div
                className="bg-[var(--primarycontainer,#cdeda3)] content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[33554400px] shrink-0"
                data-name="Text"
                data-node-id="38:4071"
              >
                <p
                  className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#2c2a27] text-[14px]"
                  data-node-id="38:4072"
                >
                  Beginner
                </p>
              </div>

              {/* Duration pill — dark-primary bg */}
              <div
                className="bg-[var(--dark-primary,#b1d18a)] content-stretch flex gap-[4px] items-center px-[16px] py-[4px] relative rounded-[33554400px] shrink-0"
                data-name="Text"
                data-node-id="38:4073"
              >
                <div className="relative shrink-0 size-[12px]" data-name="Icon" data-node-id="38:4074">
                  <img alt="" className="absolute block inset-0 max-w-none" src={imgIcon1} />
                </div>
                <p
                  className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#2c2a27] text-[14px]"
                  data-node-id="38:4077"
                >
                  10-15 min
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 2 — INACTIVE ───────────────────────────── */}
        <div
          className="bg-[var(--neutral\/99,#fdfcf5)] border-0 border-[#cfc4db] border-solid content-stretch flex flex-col gap-[10px] items-start pl-[20px] pr-[12px] py-[10px] relative rounded-[8px] shadow-[0px_2px_8px_0px_rgba(167,139,250,0.15)] shrink-0 w-full"
          data-name="QueueCard"
          data-node-id="38:4078"
        >
          <div
            className="content-stretch flex items-start justify-between pr-[10px] py-[9px] relative shrink-0 w-full"
            data-name="Container"
            data-node-id="38:4079"
          >
            <div className="h-[41px] relative shrink-0 w-[37px]" data-name="Icon" data-node-id="38:4080">
              <img alt="" className="absolute block inset-0 max-w-none" src={imgIcon} />
            </div>
            {/* Position badge — INACTIVE: 45×45, outlined neutral/60 */}
            <div
              className="border border-[var(--neutral\/60,#91918b)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[33554400px] shrink-0 size-[45px]"
              data-name="Container"
              data-node-id="38:4087"
            >
              <div className="h-[24px] relative shrink-0 w-[7.625px]" data-name="Text" data-node-id="38:4088">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                  <p
                    className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[calc(50%-5px)] not-italic text-[16px] text-[color:var(--dark-surfacecontainerhighest,#33362e)] top-[calc(50%-12px)] tracking-[-0.3125px]"
                    data-node-id="38:4089"
                  >
                    2
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="content-stretch flex items-start justify-center px-[5px] py-[7px] relative shrink-0 w-[179px]"
            data-name="Heading 3"
            data-node-id="38:4090"
          >
            <p
              className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--dark-surfacecontainerhighest,#33362e)] w-[173.662px] whitespace-pre-wrap"
              data-node-id="38:4091"
            >
              {`Business  Analysis ROI Design Presentation`}
            </p>
          </div>

          <div
            className="content-stretch flex items-start relative shrink-0 w-[175px]"
            data-name="Footer"
            data-node-id="38:4092"
          >
            <div
              className="content-stretch flex flex-col gap-[12px] items-start py-[10px] relative shrink-0"
              data-name="Container"
              data-node-id="38:4093"
            >
              {/* Difficulty pill — secondarycontainer */}
              <div
                className="bg-[var(--secondarycontainer,#dce7c8)] content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[33554400px] shrink-0"
                data-name="Text"
                data-node-id="38:4094"
              >
                <p
                  className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--dark-surfacecontainerlow,#1a1c16)]"
                  data-node-id="38:4095"
                >
                  Intermediate
                </p>
              </div>

              {/* Duration pill — dark-secondary bg */}
              <div
                className="bg-[var(--dark-secondary,#bfcbad)] content-stretch flex gap-[4px] items-center px-[16px] py-[4px] relative rounded-[33554400px] shrink-0"
                data-name="Text"
                data-node-id="38:4096"
              >
                <div className="relative shrink-0 size-[12px]" data-name="Icon" data-node-id="38:4097">
                  <img alt="" className="absolute block inset-0 max-w-none" src={imgIcon2} />
                </div>
                <p
                  className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--dark-surfacecontainerlow,#1a1c16)]"
                  data-node-id="38:4100"
                >
                  15-25 min
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 3 — INACTIVE ───────────────────────────── */}
        <div
          className="bg-[var(--neutral\/99,#fdfcf5)] border-0 border-[#cfc4db] border-solid content-stretch flex flex-col gap-[10px] items-start pl-[20px] pr-[12px] py-[10px] relative rounded-[8px] shadow-[0px_2px_8px_0px_rgba(167,139,250,0.15)] shrink-0 w-full"
          data-name="QueueCard"
          data-node-id="38:4101"
        >
          <div
            className="content-stretch flex items-start justify-between pr-[10px] py-[9px] relative shrink-0 w-full"
            data-name="Container"
            data-node-id="38:4102"
          >
            <div className="h-[41px] relative shrink-0 w-[37px]" data-name="Icon" data-node-id="383:4743">
              <img alt="" className="absolute block inset-0 max-w-none" src={imgIcon} />
            </div>
            {/* Position badge — INACTIVE: 45×45, outlined neutral/60 */}
            <div
              className="border border-[var(--neutral\/60,#91918b)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[33554400px] shrink-0 size-[45px]"
              data-name="Container"
              data-node-id="38:4110"
            >
              <div className="h-[24px] relative shrink-0 w-[7.625px]" data-name="Text" data-node-id="38:4111">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                  <p
                    className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[calc(50%-5px)] not-italic text-[#2e2e2e] text-[16px] top-[calc(50%-12px)] tracking-[-0.3125px]"
                    data-node-id="38:4112"
                  >
                    3
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="content-stretch flex items-start justify-center px-[5px] py-[7px] relative shrink-0 w-[179px]"
            data-name="Heading 3"
            data-node-id="38:4113"
          >
            <p
              className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--dark-surfacecontainerhighest,#33362e)] w-[173.662px] whitespace-pre-wrap"
              data-node-id="38:4114"
            >
              Product Redesign Challenge
            </p>
          </div>

          <div
            className="content-stretch flex items-start relative shrink-0 w-[175px]"
            data-name="Footer"
            data-node-id="38:4115"
          >
            <div
              className="content-stretch flex flex-col gap-[12px] items-start py-[10px] relative shrink-0"
              data-name="Container"
              data-node-id="38:4116"
            >
              {/* Difficulty pill — tertiarycontainer */}
              <div
                className="bg-[var(--tertiarycontainer,#bcece7)] content-stretch flex items-center justify-between px-[16px] py-[4px] relative rounded-[33554400px] shrink-0 w-[91px]"
                data-name="Text"
                data-node-id="38:4117"
              >
                <p
                  className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--dark-surfacecontainerlow,#1a1c16)]"
                  data-node-id="38:4118"
                >
                  Advanced
                </p>
              </div>

              {/* Duration pill — dark-tertiary bg */}
              <div
                className="bg-[var(--dark-tertiary,#a0d0cb)] content-stretch flex gap-[4px] items-center px-[16px] py-[4px] relative rounded-[33554400px] shrink-0"
                data-name="Text"
                data-node-id="38:4119"
              >
                <div className="relative shrink-0 size-[12px]" data-name="Icon" data-node-id="38:4120">
                  <img alt="" className="absolute block inset-0 max-w-none" src={imgIcon3} />
                </div>
                <p
                  className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--dark-surfacecontainerlow,#1a1c16)]"
                  data-node-id="38:4123"
                >
                  25-35 min
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── ADD SCENARIO BUTTON ──────────────────────────────────────── */}
      <div
        className="border-[1.25px] border-[var(--primary,#4c662b)] border-solid content-stretch flex gap-[8px] h-[48px] items-center justify-center p-[1.25px] relative rounded-[8px] shrink-0 w-full"
        data-name="Button"
        data-node-id="38:4124"
      >
        <div className="h-[21px] relative shrink-0 w-[24px]" data-name="Icon" data-node-id="38:4125">
          <img alt="" className="absolute block inset-0 max-w-none" src={imgIcon4} />
        </div>
        <div className="h-[21px] relative shrink-0 w-[103px]" data-name="Text" data-node-id="38:4128">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <div
              className="-translate-y-full absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[21px] justify-end leading-[0] left-0 not-italic text-[16px] text-[color:var(--primary,#4c662b)] top-[21px] w-[103px]"
              data-node-id="38:4129"
            >
              <p className="leading-[normal] whitespace-pre-wrap">Add Scenario</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
```

---

## Design Tokens Referenced

| Figma Variable | Hex Value | Usage |
|---|---|---|
| `surface` | `#f9faef` | Root container background |
| `dark-surfacecontainerhighest` | `#33362e` | Title text, inactive card text |
| `onsurfacevariant` | `#44483d` | Count subtitle text |
| `primary/99` | `#f9ffe9` | Tabs bottom border (very light) |
| `dark-primary` | `#b1d18a` | Active tab indicator, duration badge bg (beginner) |
| `primary/50` | `#518500` | Active tab text color |
| `neutral/50` | `#777771` | Inactive tab text color |
| `colors/theme/border/neutral/default` | `#cecece` | Inactive tab bottom border |
| `neutral/99` | `#fdfcf5` | Card background (all cards) |
| `primary/60` | `#64a104` | Active card left border, active position badge fill |
| `onprimary` | `#ffffff` | Active position badge number text |
| `neutral/60` | `#91918b` | Inactive position badge border |
| `primarycontainer` | `#cdeda3` | Difficulty badge bg — Beginner |
| `secondarycontainer` | `#dce7c8` | Difficulty badge bg — Intermediate |
| `tertiarycontainer` | `#bcece7` | Difficulty badge bg — Advanced |
| `dark-secondary` | `#bfcbad` | Duration badge bg — Intermediate |
| `dark-tertiary` | `#a0d0cb` | Duration badge bg — Advanced |
| `dark-surfacecontainerlow` | `#1a1c16` | Badge text color (intermediate, advanced) |
| `primary` | `#4c662b` | Add Scenario button border + text |
| Shadow | `rgba(167,139,250,0.15)` | Card drop shadow (purple-tinted) |

## Typography

| Element | Font | Weight | Size | Color |
|---|---|---|---|---|
| Title "Scenario Queue" | Inter | SemiBold (600) | 18px | `#33362e` |
| Count "3 scenarios" | Inter | Regular (400) | 14px | `#44483d` |
| Active tab text | Inter | SemiBold (600) | 16px | `#518500` |
| Inactive tab text | Inter | SemiBold (600) | 16px | `#777771` |
| Card title | Inter | Medium (500) | 16px | `#363636` (active) / `#33362e` (inactive) |
| Active position badge number | Inter | SemiBold (600) | 16px | `#ffffff` |
| Inactive position badge number | Inter | SemiBold (600) | 16px | `#33362e` |
| Difficulty pill text | Inter | Regular (400) | 14px | `#2c2a27` |
| Duration pill text | Inter | Regular (400) | 14px | `#2c2a27` (active) / `#1a1c16` (inactive) |
| Add Scenario button text | Inter | Medium (500) | 16px | `#4c662b` |

## Spacing & Layout

| Property | Value |
|---|---|
| Root outer padding X | 10px |
| Root flex gap | 10px |
| Header padding top | 20px |
| Header padding left/right | 24px |
| Title/count gap | 4px |
| Tabs gap | 16px |
| Tab padding | pt:6px pb:10px px:12px |
| Cards container padding top | 16px |
| Cards container padding left/right | 16px |
| **Inter-card gap** | **26px** |
| Card padding left (active) | 20px + 4px border = 24px from edge |
| Card padding left (inactive) | 20px |
| Card padding right | 12px |
| Card padding top/bottom | 10px |
| Card inner flex gap | 10px |
| Card top-row padding right | 10px |
| Card top-row padding top/bottom | 9px |
| Card title padding | px:5px py:7px |
| Card footer padding top/bottom | 10px |
| Badge gap (vertical) | 12px |
| Badge pill padding | px:16px py:4px |
| Duration icon size | 12×12px |
| Duration icon gap to text | 4px |
| Add Scenario button height | 48px |
| Add Scenario button border | 1.25px solid |
| Add Scenario button border-radius | 8px |
| Add Scenario icon+text gap | 8px |

## Card Sizing

| Element | Active | Inactive |
|---|---|---|
| Card width | 217px | 217px |
| Card height | 242px | 237px |
| Card border-radius | 8px | 8px |
| Card left border | 4px solid `#64a104` | none |
| Card shadow | `0 2px 8px rgba(167,139,250,0.15)` | same |
| Position badge size | **50×50px** | **45×45px** |
| Position badge style | Filled `#64a104`, white text | Outlined `#91918b`, dark text |
