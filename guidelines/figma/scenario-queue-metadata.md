# Figma Metadata — Queue Container
**Node ID:** `38:4048`
**Figma URL:** https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4048&m=dev
**Exported:** 2026-02-19

---

## Raw XML Tree

```xml
<frame id="38:4048" name="Queue Container" x="0" y="0" width="269" height="1117">

  <!-- ── HEADER ─────────────────────────────────────────────────── -->
  <frame id="38:4049" name="Container" x="10" y="0" width="249" height="138">

    <!-- Title + count block -->
    <frame id="388:3148" name="Frame 13" x="24" y="20" width="201" height="74">
      <frame id="38:4050" name="Heading 2" x="0" y="0" width="201" height="24">
        <text id="38:4051" name="Scenario Queue" x="0" y="0" width="143" height="22" />
      </frame>
      <frame id="38:4052" name="Paragraph" x="0" y="28" width="201" height="21">
        <text id="38:4053" name="3 scenarios" x="0" y="0" width="77" height="17" />
      </frame>
    </frame>

    <!-- Tabs component instance -->
    <instance id="388:3099" name="tabs" x="24" y="98" width="201" height="40" />

  </frame>

  <!-- ── CARDS CONTAINER ───────────────────────────────────────── -->
  <frame id="38:4054" name="Container" x="10" y="148" width="249" height="858">

    <!-- Card 1 — ACTIVE (primary left border, filled position badge) -->
    <frame id="38:4055" name="QueueCard" x="16" y="16" width="217" height="242">

      <!-- Top row: drag handle + position badge -->
      <frame id="38:4056" name="Container" x="20" y="10" width="185" height="68">
        <frame id="383:4751" name="Icon" x="0" y="9" width="37" height="41" />         <!-- drag handle icon -->
        <frame id="38:4064" name="Container" x="125" y="9" width="50" height="50">      <!-- ACTIVE badge: 50×50 -->
          <frame id="38:4065" name="Text" x="21.1875" y="13" width="7.625" height="24">
            <text id="38:4066" name="1" x="0" y="0" width="8" height="24" />
          </frame>
        </frame>
      </frame>

      <!-- Title -->
      <frame id="38:4067" name="Heading 3" x="20" y="88" width="179" height="52">
        <text id="38:4068" name="UX Research &amp; Design Interview"
              x="2.67" y="7" width="173.66" height="38" />
      </frame>

      <!-- Footer: difficulty badge + duration badge (vertical stack) -->
      <frame id="38:4069" name="Footer" x="20" y="150" width="175" height="82">
        <frame id="38:4070" name="Container" x="0" y="0" width="113" height="82">
          <frame id="38:4071" name="Text" x="0" y="10" width="91" height="25">  <!-- Beginner pill -->
            <text id="38:4072" name="Beginner" x="16" y="4" width="59" height="17" />
          </frame>
          <frame id="38:4073" name="Text" x="0" y="47" width="113" height="25"> <!-- Duration pill -->
            <frame id="38:4074" name="Icon" x="16" y="6.5" width="12" height="12" />
            <text id="38:4077" name="10-15 min" x="32" y="4" width="65" height="17" />
          </frame>
        </frame>
      </frame>

    </frame>

    <!-- Card 2 — INACTIVE -->
    <frame id="38:4078" name="QueueCard" x="16" y="284" width="217" height="237">
      <!-- Gap from card 1: y=284 - (16+242) = 26px -->

      <frame id="38:4079" name="Container" x="20" y="10" width="185" height="63">
        <frame id="38:4080" name="Icon" x="0" y="9" width="37" height="41" />
        <frame id="38:4087" name="Container" x="130" y="9" width="45" height="45">   <!-- INACTIVE badge: 45×45 -->
          <frame id="38:4088" name="Text" x="18.69" y="10.5" width="7.625" height="24">
            <text id="38:4089" name="2" x="-1.19" y="0" width="10" height="24" />
          </frame>
        </frame>
      </frame>

      <frame id="38:4090" name="Heading 3" x="20" y="83" width="179" height="52">
        <text id="38:4091" name="Business Analysis ROI Design Presentation"
              x="2.67" y="7" width="173.66" height="38" />
      </frame>

      <frame id="38:4092" name="Footer" x="20" y="145" width="175" height="82">
        <frame id="38:4093" name="Container" x="0" y="0" width="116" height="82">
          <frame id="38:4094" name="Text" x="0" y="10" width="116" height="25"> <!-- Intermediate pill -->
            <text id="38:4095" name="Intermediate" x="16" y="4" width="84" height="17" />
          </frame>
          <frame id="38:4096" name="Text" x="0" y="47" width="114" height="25"> <!-- Duration pill -->
            <frame id="38:4097" name="Icon" x="16" y="6.5" width="12" height="12" />
            <text id="38:4100" name="15-25 min" x="32" y="4" width="66" height="17" />
          </frame>
        </frame>
      </frame>

    </frame>

    <!-- Card 3 — INACTIVE -->
    <frame id="38:4101" name="QueueCard" x="16" y="547" width="217" height="237">
      <!-- Gap from card 2: y=547 - (284+237) = 26px -->

      <frame id="38:4102" name="Container" x="20" y="10" width="185" height="63">
        <frame id="383:4743" name="Icon" x="0" y="9" width="37" height="41" />
        <frame id="38:4110" name="Container" x="130" y="9" width="45" height="45">   <!-- INACTIVE badge: 45×45 -->
          <frame id="38:4111" name="Text" x="18.69" y="10.5" width="7.625" height="24">
            <text id="38:4112" name="3" x="-1.19" y="0" width="11" height="24" />
          </frame>
        </frame>
      </frame>

      <frame id="38:4113" name="Heading 3" x="20" y="83" width="179" height="52">
        <text id="38:4114" name="Product Redesign Challenge"
              x="2.67" y="7" width="173.66" height="38" />
      </frame>

      <frame id="38:4115" name="Footer" x="20" y="145" width="175" height="82">
        <frame id="38:4116" name="Container" x="0" y="0" width="117" height="82">
          <frame id="38:4117" name="Text" x="0" y="10" width="91" height="25">  <!-- Advanced pill -->
            <text id="38:4118" name="Advanced" x="12" y="4" width="67" height="17" />
          </frame>
          <frame id="38:4119" name="Text" x="0" y="47" width="117" height="25"> <!-- Duration pill -->
            <frame id="38:4120" name="Icon" x="16" y="6.5" width="12" height="12" />
            <text id="38:4123" name="25-35 min" x="32" y="4" width="69" height="17" />
          </frame>
        </frame>
      </frame>

    </frame>

  </frame>

  <!-- ── ADD SCENARIO BUTTON ───────────────────────────────────── -->
  <frame id="38:4124" name="Button" x="10" y="1016" width="249" height="48">
    <frame id="38:4125" name="Icon"  x="57"  y="13.5" width="24"  height="21" />
    <frame id="38:4128" name="Text"  x="89"  y="13.5" width="103" height="21">
      <text id="38:4129" name="Add Scenario" x="0" y="0" width="103" height="21" />
    </frame>
  </frame>

</frame>
```

---

## Derived Measurements

### Queue Container (root)
| Property | Value |
|---|---|
| Width | 269px |
| Height | 1117px (full) |

### Header (38:4049)
| Property | Value |
|---|---|
| Padding top | 20px (Frame 13 y=20) |
| Padding left/right | 24px (Frame 13 x=24) |
| Tabs y-offset from top | 98px |
| Total height | 138px |

### Cards Container (38:4054)
| Property | Value |
|---|---|
| Padding top | 16px (Card 1 y=16) |
| Padding left/right | 16px (Card 1 x=16) |
| Gap between cards | **26px** (Card 2 y=284; Card 1 bottom=16+242=258; 284−258=26) |

### Active Card — QueueCard 1 (38:4055)
| Property | Value |
|---|---|
| Width | 217px |
| Height | 242px |
| Padding left | 20px (content x=20) |
| Padding right | 12px (185px content in 217px wide = 217−20−12=185 ✓) |
| Padding top/bottom | 10px |
| Position badge size | **50×50px** (filled, primary) |
| Badge x-offset | 125px from content left |

### Inactive Cards — QueueCard 2 & 3 (38:4078, 38:4101)
| Property | Value |
|---|---|
| Width | 217px |
| Height | 237px (5px shorter — no active border height diff) |
| Padding | Same as active |
| Position badge size | **45×45px** (outlined, neutral) |
| Badge x-offset | 130px from content left |

### Card — Title (Heading 3)
| Property | Value |
|---|---|
| x-offset | 20px |
| y-offset from card top | 88px (active), 83px (inactive) |
| Width | 179px |
| Height | 52px (2 lines at ~19px each) |

### Card — Footer / Badge pills
| Property | Value |
|---|---|
| Layout | **Vertical** flex-col |
| Gap between pills | 37px (pill 1 y=10, h=25; pill 2 y=47; 47−35=12px gap) |
| Pill height | 25px |
| Difficulty pill width (active) | 91px |
| Duration pill width (active) | 113px |
| Clock icon size | 12×12px |
| Clock icon x-offset in pill | 16px |

### Add Scenario Button (38:4124)
| Property | Value |
|---|---|
| Width | 249px (full) |
| Height | 48px |
| Icon width | 24px |
| Icon x-offset | 57px |
| Text x-offset | 89px (icon 57+24=81, gap=8, text=89 ✓) |
| Text width | 103px |
