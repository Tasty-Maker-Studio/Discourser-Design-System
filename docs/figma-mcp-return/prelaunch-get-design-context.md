```
const imgSwitch = "http://localhost:3845/assets/2bf09bb7bf0e4e849e6f86f522d18d513a02fe68.svg";
const imgSwitch1 = "http://localhost:3845/assets/560572849c2a0f20210024a4b41616c0701a0bfa.svg";
const imgSvgRepoIconCarrier = "http://localhost:3845/assets/8f55b50d4007f06fb8b473bd2c31acc9d77567bc.svg";
const imgSvgRepoIconCarrier1 = "http://localhost:3845/assets/514cb4d3c2e2465be034d94a155fef635c4956c7.svg";
const imgSvgRepoIconCarrier2 = "http://localhost:3845/assets/8e39eda5d23c66ceff6a214c7a7b03824fe1922e.svg";
const imgImage1 = "http://localhost:3845/assets/3f19e9b7eb19fa1dff976acb2d623ee0a4b5c759.png";
const imgIon = "http://localhost:3845/assets/b69a13592cc4c7fb5353b6ce3e6bb86d118ccb58.svg";
const imgDiscourser = "http://localhost:3845/assets/216aa1550a9c113b53a313b84105f45a7f163c97.svg";
const imgVector = "http://localhost:3845/assets/ff82f93fd0c5d7e4ad7133f0cf4199daa138ecc5.svg";
const imgVector1 = "http://localhost:3845/assets/9aaea68f3499852103a7e9a96d7203347c9c9f5a.svg";
const imgVector2 = "http://localhost:3845/assets/12eed93f145fe9872c072b428f31d292ea6afff7.svg";
const imgVector3 = "http://localhost:3845/assets/175015f1ba1f3df60d92581208e93029e9c35dc8.svg";
const imgVector4 = "http://localhost:3845/assets/c92aee36dab6888dec9b39d7ff72047f9dc316a0.svg";
const imgVector5 = "http://localhost:3845/assets/42f0ea724312075df04838d07ed64b5e66627bd0.svg";
const imgGroup4890 = "http://localhost:3845/assets/9e4dd26f84edbcf7b07c1cb65e02a068a39b4854.svg";
const imgVector6 = "http://localhost:3845/assets/95593af832757f0483f9ca57bd29e82b87b4a8ff.svg";
const imgGroup4891 = "http://localhost:3845/assets/605b7c44a31cf8376e5a7ba4a87c5a5165ea02e6.svg";
const imgLucideIconsIterationCcw = "http://localhost:3845/assets/15afcc9ae52c1c2be2cdae92383466e8863afe62.svg";
const imgVector7 = "http://localhost:3845/assets/f4afc960494b9475ff04cbcab685cd2af44ba5bd.svg";
const imgSlash = "http://localhost:3845/assets/cfcc8c64dec7bb6fcb5561cb34002392eaf28142.svg";
const imgSlash1 = "http://localhost:3845/assets/2ca223371f25816ca5125b70317bf8ef789a360f.svg";
const imgVector8 = "http://localhost:3845/assets/0b50a3025c72d8d96371f34f982273740970dd2c.svg";
const imgVector9 = "http://localhost:3845/assets/be81a7d3d7f5a09aea1b181d2b714266fc665949.svg";
const imgVector10 = "http://localhost:3845/assets/61a7660e1e26b59e5b39af5820793e05adb9c53b.svg";
const imgVector11 = "http://localhost:3845/assets/1115c0c7c35b879801617726315fdd9ff69dfb85.svg";
const imgVector12 = "http://localhost:3845/assets/be2b8261cdbe90b0eb4c0a05863dcdf5e757920b.svg";
const imgVector13 = "http://localhost:3845/assets/6383fe4b6816a99190d1897bff33a6447dd3e802.svg";
const imgIcon = "http://localhost:3845/assets/e329d789948c194b2483b32444a4a382bab980aa.svg";
const imgVector14 = "http://localhost:3845/assets/39e27a964578538d8ac3f2b6ce6c817a3bf9b100.svg";
const imgIcon1 = "http://localhost:3845/assets/ed5963e349c62d1408f8094949372428de19ef39.svg";
const imgOutPutEq = "http://localhost:3845/assets/e007537a67d01769382c970361df0398047286fb.svg";
const imgSvgRepoIconCarrier3 = "http://localhost:3845/assets/51e4a7d0418e0271ba866d573aa41cb6e4e995ec.svg";
const imgSvgRepoIconCarrier4 = "http://localhost:3845/assets/d62390fbb480a6b760f4f6cfb540662458893e11.svg";
const imgSwitch2 = "http://localhost:3845/assets/bb18d16bb0717c9158783e9fc9c35b70ff5d5bcd.svg";
const imgSvgRepoIconCarrier5 = "http://localhost:3845/assets/723d9e6bca7c521604876844d654739ab8198a38.svg";
type DiscourserAiSwitchToggleProps = {
  className?: string;
  state?: "Default" | "Disabled" | "Focus";
  toggled?: boolean;
};

function DiscourserAiSwitchToggle({ className, state = "Default", toggled = false }: DiscourserAiSwitchToggleProps) {
  const isToggledAndDefault = toggled && state === "Default";
  return (
    <div className={className || `${String.raw`content-stretch flex h-[var(--height\/h-5,20px)] items-center p-[var(--p-0\,5,2px)] relative rounded-[var(--radius\/rounded-full,9999px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,1px)_var(--shadow\/2xs\/layer-1\/blur,2px)_0px_var(--shadow\/2xs,rgba(26,26,26,0.05))] w-[var(--width\/w-9,36px)] `}${isToggledAndDefault ? "bg-[#c5d24d] justify-end" : "bg-[rgba(192,209,92,0.4)]"}`} id={isToggledAndDefault ? "node-38_8126" : "node-38_8122"}>
      <div className="relative shrink-0 size-[16px]" data-name="Switch" id={isToggledAndDefault ? "node-38_8127" : "node-38_8123"}>
        <div className="absolute inset-[-6.25%_-12.5%_-18.75%_-12.5%]">
          <img alt="" className="block max-w-none size-full" src={isToggledAndDefault ? imgSwitch1 : imgSwitch} />
        </div>
      </div>
    </div>
  );
}

function Logout({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[40px]"} data-name="Logout" data-node-id="810:5366">
      <div className="absolute inset-[16.67%_16.67%_16.67%_15.67%]" data-name="SVGRepo_iconCarrier" data-node-id="810:5361">
        <div className="absolute inset-[-3.75%_-3.69%]">
          <img alt="" className="block max-w-none size-full" src={imgSvgRepoIconCarrier} />
        </div>
      </div>
    </div>
  );
}

function PopOver({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[40px]"} data-name="PopOver" data-node-id="810:5392">
      <div className="absolute inset-[12.96%_17.82%]" data-name="SVGRepo_iconCarrier" data-node-id="810:5389">
        <img alt="" className="absolute block max-w-none size-full" src={imgSvgRepoIconCarrier1} />
      </div>
    </div>
  );
}
type SettingsPopoverProps = {
  className?: string;
  property1?: "Default" | "Open-Popover";
};

function SettingsPopover({ className, property1 = "Open-Popover" }: SettingsPopoverProps) {
  const isOpenPopover = property1 === "Open-Popover";
  return (
    <div className={className || `border-solid content-stretch flex flex-col items-start justify-center overflow-clip py-[6px] relative ${isOpenPopover ? String.raw`bg-[var(--neutral\/95,#f2f1e9)] border-[length:var(--border\/thin,1px)] border-[var(--neutralvariant\/80,#c5c8ba)] h-[69px] rounded-[var(--radii\/small,8px)] shadow-[2px_3px_5px_0px_rgba(0,0,0,0.25)] w-[287px]` : String.raw`bg-[var(--neutralvariant\/95,#eff2e3)] border-[var(--neutral\/90,#e3e3db)] border-t-[length:var(--border\/thin,1px)] w-[285px]`}`} id={isOpenPopover ? "node-810_5421" : "node-810_5397"}>
      {property1 === "Default" && (
        <div className="content-stretch flex gap-[12px] h-[55px] items-center px-[10px] relative shrink-0 w-[283px]" data-node-id="810:5385">
          <div className="bg-[var(--neutral\/90,#e3e3db)] overflow-clip relative rounded-[9999px] shrink-0 size-[44.154px]" data-name="LoggedInAvatar" data-node-id="810:5369">
            <div className="absolute flex h-[43.349px] items-center justify-center left-[5.89px] top-[3.13px] w-[41.785px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
              <div className="flex-none rotate-[-13.92deg]">
                <div className="h-[36.215px] overflow-clip relative w-[34.072px]" data-name="Layer_1" data-node-id="I810:5369;810:5345">
                  <div className="absolute inset-[0_14.63%]" data-name="SVGRepo_iconCarrier" data-node-id="I810:5369;810:5346">
                    <img alt="" className="absolute block max-w-none size-full" src={imgSvgRepoIconCarrier2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 w-[161px]" data-node-id="810:5387">
            <div className="flex flex-col font-['Poppins:Medium',sans-serif] justify-center relative shrink-0 text-[18px] text-[color:var(--neutral\/20,#30312c)] w-full" data-node-id="810:5384">
              <p className="leading-[normal]">Will Streeter</p>
            </div>
            <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center relative shrink-0 text-[14px] text-[color:var(--neutral\/40,#5e5f59)] w-full" data-node-id="810:5386">
              <p className="leading-[normal]">Free Trial</p>
            </div>
          </div>
          <PopOver className="overflow-clip relative shrink-0 size-[40px]" />
        </div>
      )}
      {isOpenPopover && (
        <div className="content-stretch flex h-[60px] items-center px-[10px] relative shrink-0 w-[283px]" data-name="Carde" data-node-id="810:5422">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[263px]" data-name="Card Content" data-node-id="810:5424">
            <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--neutral\/60,#91918b)] w-full" data-node-id="810:5426">
              <p className="leading-[normal]">w.streeter+002@tastymakers.io</p>
            </div>
            <div className="content-stretch flex gap-[10px] h-[28px] items-center justify-center relative shrink-0 w-full" data-name="CommandAcionContainer" data-node-id="810:5444">
              <Logout className="h-[21px] overflow-clip relative shrink-0 w-[20px]" />
              <div className="flex flex-[1_0_0] flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[14px] text-[color:var(--neutral\/40,#5e5f59)]" data-node-id="810:5425">
                <p className="leading-[normal]">Logout</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ScenarioStudioConversationPrelaunch({ className }: { className?: string }) {
  return (
    <div className={className || "bg-white h-[1095px] overflow-clip relative w-[1728px]"} data-name="Scenario/Studio Conversation/ Prelaunch" data-node-id="66:2739">
      <div className="absolute content-stretch flex h-[1095px] items-start left-0 overflow-clip top-0 w-[1728px]" data-name="Grid" data-node-id="38:3427">
        <div className="bg-[var(--surfacecontainerhigh,#e8e9de)] border-[var(--neutral\/90,#e3e3db)] border-r border-solid content-stretch flex flex-col h-[1116px] items-start overflow-clip relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[285px]" data-name="Left Side Nav" data-node-id="573:7508">
          <div className="content-stretch flex h-[92px] items-center justify-center py-[15px] relative shrink-0 w-full" data-name="Logo Holder" data-node-id="573:7509">
            <div className="content-stretch flex h-[45.252px] items-center py-[3.771px] relative shrink-0 w-[262.46px]" data-name="DiscourserLogo" data-node-id="573:7510">
              <div className="h-[33.939px] relative shrink-0 w-[18.855px]" data-name="ion" data-node-id="I573:7510;489:4928">
                <div className="absolute inset-[0_-1.26%_0_0]">
                  <img alt="" className="block max-w-none size-full" src={imgIon} />
                </div>
              </div>
              <div className="h-[34.367px] relative shrink-0 w-[235.252px]" data-name="Discourser" data-node-id="I573:7510;489:4932">
                <img alt="" className="absolute block max-w-none size-full" src={imgDiscourser} />
              </div>
            </div>
          </div>
          <div className="content-stretch cursor-pointer flex flex-col gap-px h-[1091px] items-start overflow-clip relative shrink-0 w-[283px]" data-name="Navigation Menu" data-node-id="573:7511">
            <button className="content-stretch flex flex-col items-start overflow-clip p-[10px] relative shrink-0 w-full" data-name="ListItem" data-node-id="I573:7511;810:4220">
              <div className="content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full" data-name="Expandable List Item" data-node-id="I573:7511;810:4220;340:4002">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4220;340:4003">
                  <div className="grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] overflow-clip p-[2px] relative shrink-0 size-[24px]" data-name="icon-Front" data-node-id="I573:7511;810:4220;340:4004">
                    <div className="col-1 overflow-clip relative row-1 shrink-0 size-[20px]" data-name="Icon" data-node-id="I573:7511;810:4220;340:4005">
                      <div className="absolute inset-[12.5%]" data-name="Vector" data-node-id="I573:7511;810:4220;340:4005;2706:15477">
                        <div className="absolute inset-[-4.43%]">
                          <img alt="" className="block max-w-none size-full" src={imgVector} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[18px] text-left w-[165.952px]" data-node-id="I573:7511;810:4220;340:4006">
                    <p className="leading-[30px]">Dashboard</p>
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]" data-name="icon-Back" data-node-id="I573:7511;810:4220;340:4007">
                  <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="Chevron Icon" data-node-id="I573:7511;810:4220;340:4008">
                    <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector" data-node-id="I573:7511;810:4220;340:4008;330:4497">
                      <div className="absolute inset-[-9.17%_-18.33%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <button className="content-stretch flex flex-col items-start overflow-clip p-[10px] relative shrink-0 w-full" data-name="ListItem" data-node-id="I573:7511;810:4221">
              <div className="content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full" data-name="Expandable List Item" data-node-id="I573:7511;810:4221;340:4002">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4221;340:4003">
                  <div className="grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] overflow-clip p-[2px] relative shrink-0 size-[24px]" data-name="icon-Front" data-node-id="I573:7511;810:4221;340:4004">
                    <div className="col-1 overflow-clip relative row-1 shrink-0 size-[20px]" data-name="Icon" data-node-id="I573:7511;810:4221;340:4005">
                      <div className="absolute inset-[12.5%_8.33%]" data-name="Vector" data-node-id="I573:7511;810:4221;340:4005;2706:14271">
                        <div className="absolute inset-[-4.43%_-3.99%]">
                          <img alt="" className="block max-w-none size-full" src={imgVector2} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[18px] text-left w-[165.952px]" data-node-id="I573:7511;810:4221;340:4006">
                    <p className="leading-[30px]">MyNotebook</p>
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]" data-name="icon-Back" data-node-id="I573:7511;810:4221;340:4007">
                  <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="Chevron Icon" data-node-id="I573:7511;810:4221;340:4008">
                    <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector" data-node-id="I573:7511;810:4221;340:4008;330:4497">
                      <div className="absolute inset-[-9.17%_-18.33%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <button className="content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[10px] relative shrink-0 w-full" data-name="ListItem" data-node-id="I573:7511;810:4222">
              <div className="bg-[var(--surfacecontainer,#eeefe3)] content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full" data-name="Expandable List Item" data-node-id="I573:7511;810:4222;340:4053">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4222;340:4054">
                  <div className="grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] overflow-clip p-[2px] relative shrink-0 size-[24px]" data-name="icon-Front" data-node-id="I573:7511;810:4222;340:4055">
                    <div className="col-1 overflow-clip relative row-1 shrink-0 size-[20px]" data-name="Icon" data-node-id="I573:7511;810:4222;340:4056">
                      <div className="absolute inset-[12.5%]" data-name="Vector" data-node-id="I573:7511;810:4222;340:4056;2706:15657">
                        <div className="absolute inset-[-4.43%]">
                          <img alt="" className="block max-w-none size-full" src={imgVector3} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[18px] text-left w-[165.952px]" data-node-id="I573:7511;810:4222;340:4057">
                    <p className="leading-[normal]">Scenarios</p>
                  </div>
                </div>
                <div className="flex items-center justify-center relative shrink-0 size-[24.056px]" style={{ "--transform-inner-width": "120", "--transform-inner-height": "15" } as React.CSSProperties}>
                  <div className="flex-none rotate-[90.13deg]">
                    <div className="relative size-[24px]" data-name="icon-Back" data-node-id="I573:7511;810:4222;340:4058">
                      <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="Chevron Icon" data-node-id="I573:7511;810:4222;340:4059">
                        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector" data-node-id="I573:7511;810:4222;340:4059;330:4497">
                          <div className="absolute inset-[-9.17%_-18.33%]">
                            <img alt="" className="block max-w-none size-full" src={imgVector1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-end pl-[30px] pr-[5px] py-[5px] relative rounded-[8px] shrink-0 w-[241px]" data-name="Expandable List Item" data-node-id="I573:7511;810:4222;354:3122">
                <div className="content-stretch flex items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4222;354:3122;782:3202">
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[16px] text-left w-[191.565px]" data-node-id="I573:7511;810:4222;354:3122;782:3203">
                    <p className="leading-[normal]">MyQueue</p>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--secondary\/80,#bbcda1)] content-stretch flex items-center justify-end pl-[30px] pr-[5px] py-[5px] relative rounded-[8px] shrink-0 w-[241px]" data-name="Expandable List Item" data-node-id="I573:7511;810:4222;354:3127" role="button" tabIndex="0">
                <div className="content-stretch flex items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4222;354:3127;782:3181">
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[0px] text-left w-[162.403px]" data-node-id="I573:7511;810:4222;354:3127;782:3182">
                    <p className="leading-[normal] text-[16px]">Conversation Studio</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-end pl-[30px] pr-[5px] py-[5px] relative rounded-[8px] shrink-0 w-[241px]" data-name="Expandable List Item" data-node-id="I573:7511;810:4222;354:3162" role="button" tabIndex="0">
                <div className="content-stretch flex items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4222;354:3162;782:3184">
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[16px] text-left w-[162.403px]" data-node-id="I573:7511;810:4222;354:3162;782:3185">
                    <p className="leading-[normal]">Studio Setup</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-end pl-[30px] pr-[5px] py-[5px] relative rounded-[8px] shrink-0 w-[241px]" data-name="Expandable List Item" data-node-id="I573:7511;810:4222;354:3186" role="button" tabIndex="0">
                <div className="content-stretch flex items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4222;354:3186;782:3187">
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[16px] text-left w-[162.403px]" data-node-id="I573:7511;810:4222;354:3186;782:3188">
                    <p className="leading-[normal]">By Level</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-end pl-[30px] pr-[5px] py-[5px] relative rounded-[8px] shrink-0 w-[241px]" data-name="Expandable List Item" data-node-id="I573:7511;810:4222;758:2293" role="button" tabIndex="0">
                <div className="content-stretch flex items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4222;758:2293;354:3093">
                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[16px] text-left w-[162.403px]" data-node-id="I573:7511;810:4222;758:2293;354:3096">
                    <p className="leading-[normal] whitespace-pre-wrap">{`By  Skill`}</p>
                  </div>
                </div>
              </div>
            </button>
            <button className="content-stretch flex flex-col items-start overflow-clip p-[10px] relative shrink-0 w-full" data-name="ListItem" data-node-id="I573:7511;810:4223">
              <div className="content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full" data-name="Expandable List Item" data-node-id="I573:7511;810:4223;340:4002">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4223;340:4003">
                  <div className="grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] overflow-clip p-[2px] relative shrink-0 size-[24px]" data-name="icon-Front" data-node-id="I573:7511;810:4223;340:4004">
                    <div className="col-1 overflow-clip relative row-1 shrink-0 size-[20px]" data-name="Icon" data-node-id="I573:7511;810:4223;340:4005">
                      <div className="absolute inset-[28.93%_8.22%_20.83%_8.33%]" data-name="Vector" data-node-id="I573:7511;810:4223;340:4005;2706:15321">
                        <div className="absolute inset-[-6.62%_-3.98%]">
                          <img alt="" className="block max-w-none size-full" src={imgVector4} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[18px] text-left w-[165.952px]" data-node-id="I573:7511;810:4223;340:4006">
                    <p className="leading-[30px]">Help</p>
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]" data-name="icon-Back" data-node-id="I573:7511;810:4223;340:4007">
                  <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="Chevron Icon" data-node-id="I573:7511;810:4223;340:4008">
                    <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector" data-node-id="I573:7511;810:4223;340:4008;330:4497">
                      <div className="absolute inset-[-9.17%_-18.33%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <button className="content-stretch flex flex-col items-start overflow-clip p-[10px] relative shrink-0 w-full" data-name="ListItem" data-node-id="I573:7511;810:4224">
              <div className="content-stretch flex items-center justify-between p-[5px] relative rounded-[8px] shrink-0 w-full" data-name="Expandable List Item" data-node-id="I573:7511;810:4224;340:4002">
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[217px]" data-name="Icon Link Name" data-node-id="I573:7511;810:4224;340:4003">
                  <div className="grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] overflow-clip p-[2px] relative shrink-0 size-[24px]" data-name="icon-Front" data-node-id="I573:7511;810:4224;340:4004">
                    <div className="col-1 overflow-clip relative row-1 shrink-0 size-[20px]" data-name="Icon" data-node-id="I573:7511;810:4224;340:4005">
                      <div className="absolute inset-[12.5%_16.67%]" data-name="Vector" data-node-id="I573:7511;810:4224;340:4005;2706:16360">
                        <div className="absolute inset-[-4.43%_-4.99%]">
                          <img alt="" className="block max-w-none size-full" src={imgVector5} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[18.049px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[18px] text-left w-[165.952px]" data-node-id="I573:7511;810:4224;340:4006">
                    <p className="leading-[30px]">Account</p>
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]" data-name="icon-Back" data-node-id="I573:7511;810:4224;340:4007">
                  <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="Chevron Icon" data-node-id="I573:7511;810:4224;340:4008">
                    <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector" data-node-id="I573:7511;810:4224;340:4008;330:4497">
                      <div className="absolute inset-[-9.17%_-18.33%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <SettingsPopover className="absolute bg-[var(--neutralvariant\/95,#eff2e3)] border-[var(--neutral\/90,#e3e3db)] border-solid border-t-[length:var(--border\/thin,1px)] content-stretch flex flex-col h-[67px] items-start justify-center left-0 overflow-clip py-[6px] top-[1025px] w-[285px]" property1="Default" />
        </div>
        <div className="bg-[#faf8f5] content-stretch flex flex-col gap-[10px] h-[1095px] items-start overflow-clip pb-[10px] pt-[100px] px-[100px] relative shrink-0 w-[1089px]" data-name="Stage" data-node-id="38:3432">
          <div className="absolute bg-[var(--neutral\/0,black)] h-[1095px] left-[-284px] top-0 w-[1723px]" data-name="image backgournd" data-node-id="38:3433">
            <div className="absolute h-[1161.99px] left-0 opacity-0 top-[-21.44px] w-[1728px]" data-name="image 1" data-node-id="38:3434">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--neutral\/99,#fdfcf5)] border-[length:var(--border\/thin,1px)] border-[var(--neutral\/70,#abaca5)] border-solid content-stretch flex flex-col gap-[52px] h-[832px] items-center justify-center left-[calc(50%-28.72px)] overflow-clip px-[var(--spacing\/xl,32px)] py-[var(--spacing\/xxl,48px)] rounded-[var(--radii\/large,16px)] top-[calc(50%+21.5px)] w-[892px]" data-name="Instructions Container" data-node-id="38:3435">
              <div className="content-stretch flex flex-col gap-[40px] h-[279px] items-start relative shrink-0 w-full" data-name="List" data-node-id="38:3436">
                <div className="content-stretch flex items-start overflow-clip p-[5px] relative shrink-0" data-name="List Topic" data-node-id="38:3437">
                  <p className="font-['Fraunces:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[0px] text-black whitespace-nowrap" data-node-id="38:3438" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                    <span className="leading-[normal] text-[#1b1c18] text-[28px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                      Before You Start:
                    </span>
                    <span className="leading-[normal] text-[28px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>{` `}</span>
                  </p>
                </div>
                <div className="content-stretch flex flex-col h-[177px] items-start justify-between px-[10px] relative shrink-0" data-name="List Items" data-node-id="38:3439">
                  <div className="h-[24px] relative shrink-0 w-[564px]" data-name="List Item" data-node-id="38:3440">
                    <ul className="absolute block font-['Poppins:Regular',sans-serif] leading-[0] left-0 not-italic text-[#2e2e2e] text-[18px] top-0 w-[394.447px]" data-node-id="38:3441">
                      <li className="list-disc ms-[27px] whitespace-pre-wrap">
                        <span className="leading-[normal]">{`Find a quiet space  `}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="h-[24px] relative shrink-0 w-[732px]" data-name="List Item" data-node-id="38:3442">
                    <ul className="absolute block font-['Poppins:Regular',sans-serif] leading-[0] left-0 not-italic text-[#2e2e2e] text-[18px] top-0 w-[711.254px]" data-node-id="38:3443">
                      <li className="list-disc ms-[27px]">
                        <span className="leading-[normal]">{`Speak at normal volume and use headphones for best quality. `}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="h-[43px] relative shrink-0 w-[778px]" data-name="List Item" data-node-id="38:3444">
                    <ul className="absolute block font-['Poppins:Regular',sans-serif] leading-[0] left-0 not-italic text-[#2e2e2e] text-[18px] top-0 w-[791px]" data-node-id="38:3445">
                      <li className="list-disc ms-[27px] whitespace-pre-wrap">
                        <span className="leading-[normal]">{`If you have not set up  the audio output and microphone input, use the right panel to do so before you start`}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[40px] h-[309px] items-start relative shrink-0 w-full" data-name="List" data-node-id="38:3446">
                <div className="content-stretch flex items-start overflow-clip p-[5px] relative shrink-0" data-name="List Topic" data-node-id="38:3447">
                  <p className="font-['Fraunces:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[28px] text-[color:var(--neutralvariant\/10,#191d14)] whitespace-nowrap" data-node-id="38:3448" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
                    Once the Conversation Starts:
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[30px] items-start px-[10px] relative shrink-0" data-name="List Items" data-node-id="38:3449">
                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[856px]" data-name="List Item" data-node-id="38:3450">
                    <div className="bg-[var(--secondary\/50,#6c7d56)] content-stretch flex items-center justify-center p-[9.404px] relative rounded-[50px] shrink-0 size-[47.02px]" data-name="audio- Pause Button Small" data-node-id="875:6109">
                      <div className="relative shrink-0 size-[28.212px]" data-name="icon pause frame" data-node-id="I875:6109;38:8371">
                        <div className="absolute left-0 size-[28.58px] top-0" data-node-id="I875:6109;38:8371;38:9850">
                          <img alt="" className="absolute block max-w-none size-full" src={imgGroup4890} />
                        </div>
                        <div className="absolute left-[8.89px] overflow-clip size-[10.804px] top-[8.89px]" data-name="Lucide Icons / stretch-vertical" data-node-id="I875:6109;38:8371;38:9852">
                          <div className="absolute inset-[8.33%_16.67%]" data-name="Vector" data-node-id="I875:6109;38:8371;38:9852;2706:14933">
                            <div className="absolute inset-[-5.25%_-6.56%]">
                              <img alt="" className="block max-w-none size-full" src={imgVector6} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[18px] text-[color:var(--neutral\/20,#30312c)] whitespace-nowrap" data-node-id="38:3452">
                      <p className="leading-[normal]">{` Tap pause on the bottom right panel if you feel compelled to stop for a moment `}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center relative shrink-0" data-name="List Item" data-node-id="38:3453">
                    <div className="bg-[var(--secondary\/50,#6c7d56)] content-stretch flex flex-col items-center justify-center relative rounded-[50px] shrink-0 size-[47.018px]" data-name="audio- ExitButtonMajor small" data-node-id="573:7610">
                      <div className="relative shrink-0 size-[27.994px]" data-name="icon- exist" data-node-id="I573:7610;881:7413">
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.11px)] size-[28.211px] top-[calc(50%+0.11px)]" data-node-id="I573:7610;881:7413;880:7299">
                          <img alt="" className="absolute block max-w-none size-full" src={imgGroup4891} />
                        </div>
                      </div>
                    </div>
                    <p className="font-['Poppins:Regular',sans-serif] h-[19.621px] leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--neutral\/20,#30312c)] w-[586.352px] whitespace-pre-wrap" data-node-id="38:3455">{`   Use the exit button to leave the conversation abruptly`}</p>
                  </div>
                  <div className="content-stretch flex items-center relative shrink-0" data-name="List Item" data-node-id="38:3456">
                    <button className="bg-[var(--secondary\/50,#6c7d56)] block cursor-pointer relative rounded-[50px] shrink-0 size-[47.018px]" data-name="audio- Rewind small" data-node-id="573:7606">
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[37.614px] items-center justify-center left-[calc(50%-0.47px)] top-[calc(50%-0.47px)] w-[43.257px]">
                        <div className="flex-none rotate-180">
                          <div className="h-[37.614px] relative w-[43.257px]" data-name="Lucide Icons / iteration-ccw" data-node-id="I573:7606;709:12364">
                            <img alt="" className="absolute block max-w-none size-full" src={imgLucideIconsIterationCcw} />
                          </div>
                        </div>
                      </div>
                    </button>
                    <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--neutral\/20,#30312c)] w-[781px] whitespace-pre-wrap" data-node-id="38:3458">
                      {`   Use replay on the bottom  right  to hear the previous statement from your      `}
                      <br aria-hidden="true" />
                      {`   conversation partner`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--secondary\/50,#6c7d56)] content-stretch flex gap-[var(--p-2,8px)] h-[52px] items-center justify-center px-[var(--p-4,16px)] py-[var(--p-2,8px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,1px)_var(--shadow\/2xs\/layer-1\/blur,2px)_0px_var(--shadow\/2xs,rgba(26,26,26,0.05))] shrink-0 w-[352px]" data-name="Discourser Button" data-node-id="875:6042">
                <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--surface,#f9faef)] whitespace-pre" data-node-id="I875:6042;534:3729">{`Start  Scenario Conversation `}</p>
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Lucide Icons / arrow-right" data-node-id="I875:6042;534:3731">
                  <div className="absolute inset-[20.83%]" data-name="Vector" data-node-id="I875:6042;534:3731;2706:13911">
                    <div className="absolute inset-[-8.57%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector7} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-[var(--neutral\/30,#464742)] border border-[var(--neutral\/80,#c7c7c0)] border-solid content-stretch flex flex-col items-start left-[28.5px] p-[20px] rounded-[var(--radii\/medium,12px)] top-[20px]" data-name="masthead container" data-node-id="38:3459">
            <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-[417px]" data-name="Breadcrumb" data-node-id="697:5275">
              <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-[466px]" data-name="Static Section" data-node-id="I697:5275;697:5215">
                <div className="content-stretch flex gap-[6px] items-center pl-[6px] relative shrink-0" data-name="Static Crumb" data-node-id="I697:5275;697:5232">
                  <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[color:var(--neutral\/95,#f2f1e9)] whitespace-nowrap" data-node-id="I697:5275;697:5219">
                    <p className="leading-[normal]">Scenarios</p>
                  </div>
                  <div className="h-[11.591px] relative shrink-0 w-[3.908px]" data-name="slash" data-node-id="I697:5275;697:5227">
                    <div className="absolute inset-[-8.63%_-5.07%_-8.63%_-25.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgSlash} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[6px] items-center px-[6px] relative shrink-0" data-name="Static Crumb" data-node-id="I697:5275;697:5237">
                  <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[color:var(--neutral\/99,#fdfcf5)] whitespace-nowrap" data-node-id="I697:5275;697:5238">
                    <p className="leading-[normal]">{`Conversation Studio `}</p>
                  </div>
                  <div className="h-[11.591px] relative shrink-0 w-[3.908px]" data-name="slash" data-node-id="I697:5275;697:5239">
                    <div className="absolute inset-[-8.63%_-5.07%_-8.63%_-25.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgSlash1} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="DynmicSection" data-node-id="I697:5275;697:5198">
                <div className="content-stretch flex gap-[2px] h-[36px] items-center pl-[6px] py-[6px] relative rounded-[4px] shrink-0" data-name="button / android / small / outline / default / with-icon / Roboto" data-node-id="I697:5275;38:7979">
                  <div className="flex flex-col font-[family-name:var(--typography\/family\/body,'Poppins:SemiBold',sans-serif)] justify-center leading-[0] not-italic relative shrink-0 text-[color:var(--primary\/80,#97d945)] text-[length:var(--typography\/size\/xl,18px)] whitespace-nowrap" data-node-id="I697:5275;38:7980">
                    <p className="leading-[normal]">Level Setting</p>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="-scale-y-100 flex-none">
                      <div className="overflow-clip relative size-[18px]" data-name="icon-cheveron-left" data-node-id="I697:5275;38:7982">
                        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector" data-node-id="I697:5275;38:7982;685:5159">
                          <div className="absolute inset-[-12.22%_-24.44%]">
                            <img alt="" className="block max-w-none size-full" src={imgVector8} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[2px] h-[36px] items-center p-[6px] relative rounded-[4px] shrink-0" data-name="button / android / small / outline / default / with-icon / Roboto" data-node-id="I697:5275;38:7984">
                  <div className="flex flex-col font-[family-name:var(--typography\/family\/body,'Poppins:SemiBold',sans-serif)] justify-center leading-[0] not-italic relative shrink-0 text-[color:var(--primary\/80,#97d945)] text-[length:var(--typography\/size\/xl,18px)] whitespace-nowrap" data-node-id="I697:5275;38:7985">
                    <p className="leading-[normal]">Lobby</p>
                  </div>
                  <div className="h-[11px] shrink-0 w-[4px]" data-name="spacer" data-node-id="I697:5275;38:7986" />
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="-scale-y-100 flex-none">
                      <div className="overflow-clip relative size-[18px]" data-name="icon-cheveron-left" data-node-id="I697:5275;38:7987">
                        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector" data-node-id="I697:5275;38:7987;685:5159">
                          <div className="absolute inset-[-12.22%_-24.44%]">
                            <img alt="" className="block max-w-none size-full" src={imgVector8} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[2px] h-[36px] items-center pl-[6px] py-[6px] relative rounded-[4px] shrink-0" data-name="button / android / small / outline / default / with-icon / Roboto" data-node-id="I697:5275;685:5135">
                  <div className="flex flex-col font-[family-name:var(--typography\/family\/body,'Poppins:SemiBold',sans-serif)] justify-center leading-[0] not-italic relative shrink-0 text-[color:var(--primary\/99,#f9ffe9)] text-[length:var(--typography\/size\/xl,18px)] whitespace-nowrap" data-node-id="I697:5275;685:5136">
                    <p className="leading-[normal]">Pre-conversation</p>
                  </div>
                  <div className="h-[11px] shrink-0 w-[4px]" data-name="spacer" data-node-id="I697:5275;685:5137" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-[var(--primary\/10,#102000)] border border-black border-solid content-stretch flex items-center justify-center left-[950.04px] overflow-clip p-[var(--spacing\/md,16px)] rounded-[12px] top-[1000px]" data-name="Clock" data-node-id="38:3464">
            <div className="flex flex-col font-['Poppins:SemiBold',sans-serif] h-[41.521px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[color:var(--primary\/80,#97d945)] text-center w-[89.476px]" data-node-id="38:3465">
              <p className="leading-[normal]">15:00</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--neutral\/99,#fdfcf5)] border-[#e5e7eb] border-l border-solid content-stretch flex flex-col h-[1319px] items-start overflow-clip pl-px relative rounded-[8px] shrink-0 w-[354px]" data-name="RightControlPanel" data-node-id="38:3466">
          <div className="border-[#e0dcd5] border-b border-solid h-[78px] shrink-0 sticky top-0 w-[353px]" data-name="Container" data-node-id="38:3467">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-px px-[24px] relative size-full">
              <div className="h-[27px] relative shrink-0 w-[187px]" data-name="Heading 2" data-node-id="38:3468">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                  <div className="-translate-x-1/2 -translate-y-full absolute flex flex-col font-['Georgia:Bold',sans-serif] justify-end leading-[0] left-[calc(50%+14px)] not-italic text-[#363636] text-[24px] text-center top-[29px] whitespace-nowrap" data-node-id="38:3469">
                    <p className="leading-[normal]">Studio Controls</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--neutral\/99,#fdfcf5)] h-[1695px] relative shrink-0 w-[350px]" data-name="StudioControlsMenu" data-node-id="875:5855">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch cursor-pointer flex flex-col items-start relative size-full">
              <button className="border-[#f5f1eb] border-b border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center relative shrink-0 w-full" data-name="Discourse Accordion Item (Info Panel)" data-node-id="I875:5855;38:8233">
                <div className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative shrink-0 w-full" data-name="AccordionTrigger" data-node-id="I875:5855;38:8233;38:8141">
                  <div className="overflow-clip relative shrink-0 size-[40px]" data-name="icon- Configure Settings" data-node-id="I875:5855;38:8233;38:8142">
                    <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector" data-node-id="I875:5855;38:8233;38:8142;38:9805">
                      <div className="absolute inset-[-18.75%_-9.38%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector9} />
                      </div>
                    </div>
                    <div className="absolute inset-[16.67%_16.67%_8.33%_16.67%]" data-name="Vector" data-node-id="I875:5855;38:8233;38:8142;38:9806">
                      <div className="absolute inset-[-3.33%_-3.75%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector10} />
                      </div>
                    </div>
                    <div className="absolute bottom-[54.17%] left-1/2 right-[33.33%] top-[45.83%]" data-name="Vector" data-node-id="I875:5855;38:8233;38:8142;38:9807">
                      <div className="absolute inset-[-1px_-15%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector11} />
                      </div>
                    </div>
                    <div className="absolute bottom-[33.33%] left-1/2 right-[33.33%] top-[66.67%]" data-name="Vector" data-node-id="I875:5855;38:8233;38:8142;38:9808">
                      <div className="absolute inset-[-1px_-15%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector11} />
                      </div>
                    </div>
                    <div className="absolute inset-[45.83%_66.62%_54.17%_33.33%]" data-name="Vector" data-node-id="I875:5855;38:8233;38:8142;38:9809">
                      <div className="absolute inset-[-1px_-5999.86%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector12} />
                      </div>
                    </div>
                    <div className="absolute inset-[66.67%_66.62%_33.33%_33.33%]" data-name="Vector" data-node-id="I875:5855;38:8233;38:8142;38:9810">
                      <div className="absolute inset-[-1px_-5999.86%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector12} />
                      </div>
                    </div>
                  </div>
                  <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[normal] min-h-px min-w-px not-italic overflow-hidden relative text-[#363636] text-[20px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8233;38:8143">
                    Scenario Settings
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / chevron-down" data-node-id="I875:5855;38:8233;38:8144">
                    <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I875:5855;38:8233;38:8144;2706:13883">
                      <div className="absolute inset-[-20.83%_-10.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector13} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#fffdfa] border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[26px] items-start p-[20px] relative rounded-[6px] shrink-0" data-name="panel- Information Slot Contents" data-node-id="I875:5855;38:8233;38:8145">
                  <div className="content-stretch flex flex-col gap-[8px] h-[76px] items-start relative shrink-0 w-[280px]" data-name="Scenarios type" data-node-id="I875:5855;38:8233;38:8145;38:8208">
                    <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[30px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[20px] text-left w-[207px]" data-node-id="I875:5855;38:8233;38:8145;38:8209">
                      <p className="leading-[normal]">UX Interview Practice</p>
                    </div>
                    <div className="content-stretch flex flex-col h-[33px] items-start relative shrink-0" data-name="List" data-node-id="I875:5855;38:8233;38:8145;38:8210">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[275px]" data-name="List Item" data-node-id="I875:5855;38:8233;38:8145;38:8211">
                        <p className="font-['Inter:Regular',sans-serif] font-normal h-[20.318px] leading-[0] not-italic relative shrink-0 text-[#4a5565] text-[0px] text-left w-[293px]" data-node-id="I875:5855;38:8233;38:8145;38:8212">
                          <span className="font-['Inter:Medium',sans-serif] font-medium leading-[30px] text-[#2e2e2e] text-[18px]">Focus</span>
                          <span className="leading-[30px] text-[#363636] text-[18px]">: Technical Communication</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Ai Settings" data-node-id="I875:5855;38:8233;38:8145;38:8213">
                    <div className="h-[23px] relative shrink-0 w-[284px]" data-name="Heading 5" data-node-id="I875:5855;38:8233;38:8145;38:8214">
                      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-0 not-italic text-[#363636] text-[20px] text-left top-[-1px] whitespace-pre" data-node-id="I875:5855;38:8233;38:8145;38:8215">{`Scenario  Settings`}</p>
                    </div>
                    <div className="bg-[#f5f1eb] content-stretch flex flex-col items-center justify-center px-[20px] py-[10px] relative rounded-[8px] shrink-0 w-full" data-name="Interviewer Settings" data-node-id="I875:5855;38:8233;38:8145;38:8216">
                      <div className="content-stretch flex flex-col gap-[10px] h-[122px] items-start relative shrink-0" data-name="List" data-node-id="I875:5855;38:8233;38:8145;38:8217">
                        <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full" data-name="List Item" data-node-id="I875:5855;38:8233;38:8145;38:8218">
                          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-h-px min-w-px not-italic relative text-[#363636] text-[16px] text-left whitespace-pre-wrap" data-node-id="I875:5855;38:8233;38:8145;38:8219">{`Conversation Flow:  `}</p>
                          <div className="bg-[rgba(192,209,92,0.4)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[10px] py-[4px] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0" data-name="Badge" data-node-id="I875:5855;38:8233;38:8145;38:8220">
                            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-medium,400)] leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#2e2e2e] text-[14px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8233;38:8145;38:8220;135:1174">
                              Beginner
                            </p>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="List Item" data-node-id="I875:5855;38:8233;38:8145;38:8221">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#363636] text-[16px] text-left whitespace-pre" data-node-id="I875:5855;38:8233;38:8145;38:8222">{`Question Complexity:  `}</p>
                          <div className="bg-[rgba(192,209,92,0.4)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2\,5,10px)] py-[4px] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0" data-name="Badge" data-node-id="I875:5855;38:8233;38:8145;38:8223">
                            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-medium,400)] leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#2e2e2e] text-[14px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8233;38:8145;38:8223;135:1174">
                              Beginner
                            </p>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="List Item" data-node-id="I875:5855;38:8233;38:8145;38:8224">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#363636] text-[16px] text-left w-[143.956px] whitespace-pre-wrap" data-node-id="I875:5855;38:8233;38:8145;38:8225">{`Response Pacing:  `}</p>
                          <div className="bg-[rgba(192,209,92,0.4)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0" data-name="Badge" data-node-id="I875:5855;38:8233;38:8145;38:8226">
                            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-medium,400)] leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#2e2e2e] text-[14px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8233;38:8145;38:8226;135:1174">
                              Beginner
                            </p>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="List Item" data-node-id="I875:5855;38:8233;38:8145;38:8227">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#363636] text-[16px] text-left whitespace-pre" data-node-id="I875:5855;38:8233;38:8145;38:8228">{`Interview Tone:  `}</p>
                          <div className="bg-[rgba(192,209,92,0.4)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[10px] py-[4px] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0" data-name="Badge" data-node-id="I875:5855;38:8233;38:8145;38:8229">
                            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-medium,400)] leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#2e2e2e] text-[14px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8233;38:8145;38:8229;135:1174">
                              Beginner
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button className="border-[#f5f1eb] border-b border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] items-start relative shrink-0 w-full" data-name="Discourse Accordion Item ( Audio Output Panel)" data-node-id="I875:5855;38:8234">
                <div className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative shrink-0 w-full" data-name="AccordionTrigger" data-node-id="I875:5855;38:8234;38:8153">
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="icon- Audio Output" data-node-id="I875:5855;38:8234;38:8154">
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="-scale-y-100 flex-none rotate-180">
                        <div className="relative size-[35px]" data-name="Icon" data-node-id="I875:5855;38:8234;38:8154;38:9813">
                          <img alt="" className="absolute block max-w-none size-full" src={imgIcon} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[normal] min-h-px min-w-px not-italic overflow-hidden relative text-[#363636] text-[20px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8234;38:8155">
                    Audio Output
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / chevron-down" data-node-id="I875:5855;38:8234;38:8156">
                    <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I875:5855;38:8234;38:8156;2706:13883">
                      <div className="absolute inset-[-20.83%_-10.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector13} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-center py-[20px] relative shrink-0 w-[350px]" data-name="panel- Audio Output controls" data-node-id="I875:5855;38:8234;38:8157">
                  <div className="content-stretch flex flex-col h-[66px] items-center justify-between px-[20px] py-[40px] relative shrink-0 w-[334px]" data-name="Audio Output Controls Container" data-node-id="I875:5855;38:8234;38:8157;38:8308">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="audio output slider" data-node-id="I875:5855;38:8234;38:8157;38:8309">
                      <div className="h-[6px] relative shrink-0 w-[314px]" data-name="slide container" data-node-id="I875:5855;38:8234;38:8157;38:8310">
                        <div className="absolute bg-[#e0dcd5] content-stretch flex gap-[var(--p-0,0px)] items-center left-[5px] p-[var(--p-0,0px)] rounded-[var(--radius\/rounded-full,9999px)] top-0 w-[290px]" data-name="Slider" data-node-id="I875:5855;38:8234;38:8157;38:8311">
                          <div className="bg-[#6b7a1f] h-[6px] rounded-[var(--radius\/rounded-full,9999px)] shrink-0 w-[201px]" data-name="Range" data-node-id="I875:5855;38:8234;38:8157;38:8311;38:7989" />
                          <div className="absolute h-[35px] left-[183px] top-[-14.5px] w-[34px]" data-name="Slider Button" data-node-id="I875:5855;38:8234;38:8157;38:8311;38:7990">
                            <div className="-translate-x-1/2 absolute bg-[#b8a9c9] border-2 border-[#cfc4db] border-solid h-[35px] left-1/2 rounded-[var(--rounded-full,9999px)] shadow-[var(--shadow\/md\/layer-1\/x,0px)_var(--shadow\/md\/layer-1\/y,2px)_var(--shadow\/md\/layer-1\/blur,4px)_var(--shadow\/md\/layer-1\/spread,-2px)_var(--shadow\/md,rgba(26,26,26,0.05)),var(--shadow\/md\/layer-2\/x,0px)_var(--shadow\/md\/layer-2\/y,4px)_var(--shadow\/md\/layer-2\/blur,6px)_var(--shadow\/md\/layer-2\/spread,-1px)_var(--shadow\/md,rgba(26,26,26,0.05))] top-0 w-[34px]" data-name=".Slider Item" data-node-id="I875:5855;38:8234;38:8157;38:8311;38:7991" />
                            <div className="absolute h-[19px] left-[8px] overflow-clip top-[8px] w-[18px]" data-name="Lucide Icons / stretch-horizontal" data-node-id="I875:5855;38:8234;38:8157;38:8311;38:7992">
                              <div className="absolute inset-[16.67%_8.33%]" data-name="Vector" data-node-id="I875:5855;38:8234;38:8157;38:8311;38:7992;2706:14963">
                                <div className="absolute inset-[-3.95%_-3.33%]">
                                  <img alt="" className="block max-w-none size-full" src={imgVector14} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button className="border-[#f5f1eb] border-b border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] h-[245px] items-start relative shrink-0 w-full" data-name="Discourse Accordion Item ( EQ & Slider container" data-node-id="I875:5855;38:8235">
                <div className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative shrink-0 w-full" data-name="AccordionTrigger" data-node-id="I875:5855;38:8235;38:8165">
                  <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 size-[40px]" data-name="icon- Microphone" data-node-id="I875:5855;38:8235;38:8166">
                    <div className="relative shrink-0 size-[40px]" data-name="Icon" data-node-id="I875:5855;38:8235;38:8166;38:9821">
                      <img alt="" className="absolute block max-w-none size-full" src={imgIcon1} />
                    </div>
                  </div>
                  <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[normal] min-h-px min-w-px not-italic overflow-hidden relative text-[#363636] text-[20px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8235;38:8167">
                    Microphone Output
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / chevron-down" data-node-id="I875:5855;38:8235;38:8168">
                    <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I875:5855;38:8235;38:8168;2706:13883">
                      <div className="absolute inset-[-20.83%_-10.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector13} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[37px] items-center py-[20px] relative shrink-0 w-full" data-name="panel- Eq & Slide container" data-node-id="I875:5855;38:8235;38:8169">
                  <div className="h-[24px] relative shrink-0 w-[289px]" data-name="Out.put Eq" data-node-id="I875:5855;38:8235;38:8169;38:8315">
                    <div className="absolute inset-[-7.73%_-0.8%_-7.71%_-0.64%]">
                      <img alt="" className="block max-w-none size-full" src={imgOutPutEq} />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative shrink-0 w-[305px]" data-name="Slide output container" data-node-id="I875:5855;38:8235;38:8169;38:8317">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="microphone output slide" data-node-id="I875:5855;38:8235;38:8169;38:8318">
                      <div className="h-[6px] relative shrink-0 w-[314px]" data-name="Mic Input Gain Control" data-node-id="I875:5855;38:8235;38:8169;38:8319">
                        <div className="absolute bg-[#e0dcd5] content-stretch flex gap-[var(--p-0,0px)] h-[6px] items-center left-[5px] p-[var(--p-0,0px)] rounded-[var(--radius\/rounded-full,9999px)] top-0 w-[290px]" data-name="Slider" data-node-id="I875:5855;38:8235;38:8169;38:8320">
                          <div className="bg-[#6b7a1f] h-[6px] rounded-[var(--radius\/rounded-full,9999px)] shrink-0 w-[201px]" data-name="Range" data-node-id="I875:5855;38:8235;38:8169;38:8320;38:7989" />
                          <div className="absolute h-[35px] left-[183px] top-[-14.5px] w-[34px]" data-name="Slider Button" data-node-id="I875:5855;38:8235;38:8169;38:8320;38:7990">
                            <div className="-translate-x-1/2 absolute bg-[#b8a9c9] border-2 border-[#cfc4db] border-solid h-[35px] left-1/2 rounded-[var(--rounded-full,9999px)] shadow-[var(--shadow\/md\/layer-1\/x,0px)_var(--shadow\/md\/layer-1\/y,2px)_var(--shadow\/md\/layer-1\/blur,4px)_var(--shadow\/md\/layer-1\/spread,-2px)_var(--shadow\/md,rgba(26,26,26,0.05)),var(--shadow\/md\/layer-2\/x,0px)_var(--shadow\/md\/layer-2\/y,4px)_var(--shadow\/md\/layer-2\/blur,6px)_var(--shadow\/md\/layer-2\/spread,-1px)_var(--shadow\/md,rgba(26,26,26,0.05))] top-0 w-[34px]" data-name=".Slider Item" data-node-id="I875:5855;38:8235;38:8169;38:8320;38:7991" />
                            <div className="absolute h-[19px] left-[8px] overflow-clip top-[8px] w-[18px]" data-name="Lucide Icons / stretch-horizontal" data-node-id="I875:5855;38:8235;38:8169;38:8320;38:7992">
                              <div className="absolute inset-[16.67%_8.33%]" data-name="Vector" data-node-id="I875:5855;38:8235;38:8169;38:8320;38:7992;2706:14963">
                                <div className="absolute inset-[-3.95%_-3.33%]">
                                  <img alt="" className="block max-w-none size-full" src={imgVector14} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button className="border-[#f5f1eb] border-b border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center relative shrink-0 w-full" data-name="Discourse Accordion Item ( A/V Record )" data-node-id="I875:5855;855:5501">
                <div className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative shrink-0 w-full" data-name="AccordionTrigger" data-node-id="I875:5855;855:5501;38:8177">
                  <div className="content-stretch flex flex-col h-[40px] items-center justify-center p-[3px] relative shrink-0" data-name="icon- Record" data-node-id="I875:5855;855:5501;38:8178">
                    <div className="relative shrink-0 size-[29.167px]" data-name="SVGRepo_iconCarrier" data-node-id="I875:5855;855:5501;38:8178;38:9844">
                      <div className="absolute inset-[-3.43%]">
                        <img alt="" className="block max-w-none size-full" src={imgSvgRepoIconCarrier3} />
                      </div>
                    </div>
                  </div>
                  <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[normal] min-h-px min-w-px not-italic overflow-hidden relative text-[#363636] text-[20px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;855:5501;38:8179">
                    A/V Recording
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / chevron-down" data-node-id="I875:5855;855:5501;38:8180">
                    <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I875:5855;855:5501;38:8180;2706:13883">
                      <div className="absolute inset-[-20.83%_-10.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector13} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-center justify-center p-[20px] relative shrink-0 w-full" data-name="panel- A/V radio selection" data-node-id="I875:5855;855:5501;38:8181">
                  <div className="content-stretch cursor-pointer flex flex-col gap-[var(--p-3,12px)] items-start max-w-[576px] min-w-[144px] p-[var(--p-0,0px)] relative shrink-0 w-[280px]" data-name="Radio Group" data-node-id="I875:5855;855:5501;38:8181;38:8324">
                    <div className="content-stretch flex gap-[var(--p-2,8px)] items-start p-[var(--p-0,0px)] relative shrink-0 w-full" data-name=".Radio Group Item" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51111" role="button" tabIndex="0">
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-1\,5,6px)] items-start min-h-px min-w-px pb-[var(--p-0,0px)] pt-px px-[var(--p-0,0px)] relative" data-name="Content" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51111;7095:70573">
                        <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-medium,400)] leading-[30px] not-italic relative shrink-0 text-[#363636] text-[length:var(--text-sm,18px)] text-left w-full whitespace-pre-wrap" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51111;7095:70574">{`Record just  audio         `}</p>
                      </div>
                      <div className="relative shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_0px_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[16px]" data-name=".Radio Group Radio Toggle" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51111;7095:70576">
                        <div className="absolute border-3 border-[var(--primary\/60,#64a104)] border-solid left-0 rounded-[var(--radius\/rounded-full,9999px)] size-[var(--width\/w-4,16px)] top-0" data-name="base" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51111;7095:70576;2780:51100" />
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[var(--p-2,8px)] items-start p-[var(--p-0,0px)] relative shrink-0 w-full" data-name=".Radio Group Item" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51112" role="button" tabIndex="0">
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-1\,5,6px)] items-start min-h-px min-w-px pb-[var(--p-0,0px)] pt-px px-[var(--p-0,0px)] relative" data-name="Content" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51112;7095:70573">
                        <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-medium,400)] leading-[30px] not-italic relative shrink-0 text-[#363636] text-[length:var(--text-sm,18px)] text-left w-full whitespace-pre-wrap" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51112;7095:70574">{`Record video &  audio  `}</p>
                      </div>
                      <div className="relative shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_0px_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[16px]" data-name=".Radio Group Radio Toggle" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51112;7095:70576">
                        <div className="absolute bg-[#c5d24d] border-[#b8a9c9] border-[length:var(--border-width\/w-100,1px)] border-solid left-0 rounded-[var(--radius\/rounded-full,9999px)] size-[var(--width\/w-4,16px)] top-0" data-name="base" data-node-id="I875:5855;855:5501;38:8181;38:8324;2780:51112;7095:70576;2780:51100" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button className="border-[#f5f1eb] border-b border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center relative shrink-0 w-full" data-name="Discourse Accordion Item ( A/V Record )" data-node-id="I875:5855;38:8236">
                <div className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative shrink-0 w-full" data-name="AccordionTrigger" data-node-id="I875:5855;38:8236;38:8177">
                  <div className="content-stretch flex flex-col h-[40px] items-center justify-center p-[3px] relative shrink-0" data-name="icon- Record" data-node-id="I875:5855;38:8236;38:8178">
                    <div className="relative shrink-0 size-[29.167px]" data-name="SVGRepo_iconCarrier" data-node-id="I875:5855;38:8236;38:8178;38:9844">
                      <div className="absolute inset-[-3.43%]">
                        <img alt="" className="block max-w-none size-full" src={imgSvgRepoIconCarrier3} />
                      </div>
                    </div>
                  </div>
                  <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[normal] min-h-px min-w-px not-italic overflow-hidden relative text-[#363636] text-[20px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8236;38:8179">
                    A/V Recording
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / chevron-down" data-node-id="I875:5855;38:8236;38:8180">
                    <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I875:5855;38:8236;38:8180;2706:13883">
                      <div className="absolute inset-[-20.83%_-10.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector13} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-center p-[20px] relative shrink-0 w-full" data-name="panel- A/V radio selection" data-node-id="I875:5855;38:8236;38:8181">
                  <div className="content-stretch cursor-pointer flex flex-col gap-[var(--p-3,12px)] items-start max-w-[576px] min-w-[144px] p-[var(--p-0,0px)] relative shrink-0 w-[280px]" data-name="Radio Group" data-node-id="I875:5855;38:8236;38:8181;38:8324">
                    <div className="content-stretch flex gap-[var(--p-2,8px)] items-start p-[var(--p-0,0px)] relative shrink-0 w-full" data-name=".Radio Group Item" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51111" role="button" tabIndex="0">
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-1\,5,6px)] items-start min-h-px min-w-px pb-[var(--p-0,0px)] pt-px px-[var(--p-0,0px)] relative" data-name="Content" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51111;7095:70573">
                        <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-medium,400)] leading-[30px] not-italic relative shrink-0 text-[#363636] text-[length:var(--text-sm,18px)] text-left w-full whitespace-pre-wrap" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51111;7095:70574">{`Record just  audio         `}</p>
                      </div>
                      <div className="relative shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_0px_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[16px]" data-name=".Radio Group Radio Toggle" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51111;7095:70576">
                        <div className="absolute border-3 border-[var(--primary\/60,#64a104)] border-solid left-0 rounded-[var(--radius\/rounded-full,9999px)] size-[var(--width\/w-4,16px)] top-0" data-name="base" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51111;7095:70576;2780:51100" />
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[var(--p-2,8px)] items-start p-[var(--p-0,0px)] relative shrink-0 w-full" data-name=".Radio Group Item" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51112" role="button" tabIndex="0">
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-1\,5,6px)] items-start min-h-px min-w-px pb-[var(--p-0,0px)] pt-px px-[var(--p-0,0px)] relative" data-name="Content" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51112;7095:70573">
                        <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-medium,400)] leading-[30px] not-italic relative shrink-0 text-[#363636] text-[length:var(--text-sm,18px)] text-left w-full whitespace-pre-wrap" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51112;7095:70574">{`Record video &  audio  `}</p>
                      </div>
                      <div className="relative shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_0px_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[16px]" data-name=".Radio Group Radio Toggle" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51112;7095:70576">
                        <div className="absolute bg-[#c5d24d] border-[#b8a9c9] border-[length:var(--border-width\/w-100,1px)] border-solid left-0 rounded-[var(--radius\/rounded-full,9999px)] size-[var(--width\/w-4,16px)] top-0" data-name="base" data-node-id="I875:5855;38:8236;38:8181;38:8324;2780:51112;7095:70576;2780:51100" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button className="border-[#f5f1eb] border-b border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] items-start relative shrink-0 w-full" data-name="Discourse Accordion Item ( Show Timer )" data-node-id="I875:5855;38:8237">
                <div className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative shrink-0 w-full" data-name="AccordionTrigger" data-node-id="I875:5855;38:8237;38:8190">
                  <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] relative shrink-0 size-[40px]" data-name="icon- Timer" data-node-id="I875:5855;38:8237;38:8191">
                    <div className="relative shrink-0 size-[27px]" data-name="SVGRepo_iconCarrier" data-node-id="I875:5855;38:8237;38:8191;38:9818">
                      <div className="absolute inset-[-4.63%]">
                        <img alt="" className="block max-w-none size-full" src={imgSvgRepoIconCarrier4} />
                      </div>
                    </div>
                  </div>
                  <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[normal] min-h-px min-w-px not-italic overflow-hidden relative text-[#363636] text-[20px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8237;38:8192">
                    Display timer
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / chevron-down" data-node-id="I875:5855;38:8237;38:8193">
                    <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I875:5855;38:8237;38:8193;2706:13883">
                      <div className="absolute inset-[-20.83%_-10.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector13} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[10px] h-[128px] items-center justify-center p-[20px] relative shrink-0 w-full" data-name="panel- clock display" data-node-id="I875:5855;38:8237;38:8194">
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[62.589px] justify-center leading-[0] not-italic relative shrink-0 text-[#363636] text-[18px] text-left w-[260.713px] whitespace-pre-wrap" data-node-id="I875:5855;38:8237;38:8194;38:8326">
                    <p className="leading-[30px] mb-0">{`Hide timer to create more `}</p>
                    <p className="leading-[30px]">realistic interview</p>
                  </div>
                  <div className="bg-[rgba(192,209,92,0.4)] content-stretch flex h-[20px] items-center p-[var(--p-0\,5,2px)] relative rounded-[var(--radius\/rounded-full,9999px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,1px)_var(--shadow\/2xs\/layer-1\/blur,2px)_0px_var(--shadow\/2xs,rgba(26,26,26,0.05))] shrink-0 w-[36px]" data-name="Discourser AI Switch Toggle" data-node-id="I875:5855;38:8237;38:8194;38:8327">
                    <div className="relative shrink-0 size-[16px]" data-name="Switch" data-node-id="I875:5855;38:8237;38:8194;38:8327;38:8123">
                      <div className="absolute inset-[-6.25%_-12.5%_-18.75%_-12.5%]">
                        <img alt="" className="block max-w-none size-full" src={imgSwitch2} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button className="border-[#f5f1eb] border-b border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center relative shrink-0 w-full" data-name="Discourse Accordion Item ( Hide Interview )" data-node-id="I875:5855;38:8238">
                <div className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative shrink-0 w-full" data-name="AccordionTrigger" data-node-id="I875:5855;38:8238;38:8202">
                  <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-px relative shrink-0 size-[40px]" data-name="icon-  ScreenView" data-node-id="I875:5855;38:8238;38:8203">
                    <div className="relative shrink-0 size-[24.891px]" data-name="SVGRepo_iconCarrier" data-node-id="I875:5855;38:8238;38:8203;38:9826">
                      <img alt="" className="absolute block max-w-none size-full" src={imgSvgRepoIconCarrier5} />
                    </div>
                  </div>
                  <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[normal] min-h-px min-w-px not-italic overflow-hidden relative text-[#363636] text-[20px] text-ellipsis text-left whitespace-nowrap" data-node-id="I875:5855;38:8238;38:8204">
                    Hide Interviewers
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / chevron-down" data-node-id="I875:5855;38:8238;38:8205">
                    <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I875:5855;38:8238;38:8205;2706:13883">
                      <div className="absolute inset-[-20.83%_-10.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector13} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[10px] items-center justify-center py-[20px] relative shrink-0" data-name="panel- hide interview video" data-node-id="I875:5855;38:8238;38:8206">
                  <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#363636] text-[18px] text-left w-[244.007px] whitespace-pre-wrap" data-node-id="I875:5855;38:8238;38:8206;38:8329">
                    <p className="leading-[30px] mb-0">{`Switch to off  to  hide video of interviewers if it is too `}</p>
                    <p className="leading-[30px]">distracting</p>
                  </div>
                  <DiscourserAiSwitchToggle className="bg-[#c5d24d] content-stretch flex h-[20px] items-center justify-end p-[var(--p-0\,5,2px)] relative rounded-[var(--radius\/rounded-full,9999px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,1px)_var(--shadow\/2xs\/layer-1\/blur,2px)_0px_var(--shadow\/2xs,rgba(26,26,26,0.05))] shrink-0 w-[36px]" toggled />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
SUPER CRITICAL: The generated React+Tailwind code MUST be converted to match the target project's technology stack and styling system.
1. Analyze the target codebase to identify: technology stack, styling approach, component patterns, and design tokens
2. Convert React syntax to the target framework/library
3. Transform all Tailwind classes to the target styling system while preserving exact visual design
4. Follow the project's existing patterns and conventions
DO NOT install any Tailwind as a dependency unless the user instructs you to do so.

Node ids have been added to the code as data attributes, e.g. `data-node-id="1:2"`.
These styles are contained in the design: Black/Neutral/30%/600: #363636, Dsktp/Inter/Button/Regular/18: Font(family: "Inter", style: Regular, size: 18, weight: 400, lineHeight: 30, letterSpacing: 0), Dsktp/Inter/Button/Medium/18px: Font(family: "Inter", style: Medium, size: 18, weight: 500, lineHeight: 100, letterSpacing: 0), Dsktp/Inter/Link/Medium/16: Font(family: "Inter", style: Medium, size: 16, weight: 500, lineHeight: 100, letterSpacing: 0), bodyLarge: Font(family: "Poppins", style: Medium, size: 18, weight: 500, lineHeight: 100, letterSpacing: 0), bodyMedium: Font(family: "Poppins", style: Regular, size: 14, weight: 400, lineHeight: 100, letterSpacing: 0), headlineMedium: Font(family: "Fraunces", style: Regular, size: 28, weight: 400, lineHeight: 100, letterSpacing: 0), Black/Neutral/30%/700: #2E2E2E, bodyLargeReg: Font(family: "Poppins", style: Regular, size: 18, weight: 400, lineHeight: 100, letterSpacing: 0), shadows/2xs: Effect(type: DROP_SHADOW, color: shadow/2xs, offset: (shadow/2xs/layer-1/x, shadow/2xs/layer-1/y), radius: shadow/2xs/layer-1/blur, spread: shadow/2xs/layer-1/spread), bodyLargeSemiBold: Font(family: "Poppins", style: SemiBold, size: 18, weight: 600, lineHeight: 100, letterSpacing: 0), Stone/60%/400: #FAF8F5, Dsktp/Georgia/H4/SemiB/24: Font(family: "Georgia", style: Bold, size: 24, weight: 700, lineHeight: 100, letterSpacing: 0), Gray/Neutral/30%/500: #E0DCD5, Primary/700: #6B7A1F, Dsktp/Inter/BodyP/Medium/20: Font(family: "Inter", style: Medium, size: 20, weight: 500, lineHeight: 100, letterSpacing: 0), Dsktp/Mobile/Inter/Button/Regular/14: Font(family: "Inter", style: Regular, size: 14, weight: 400, lineHeight: 100, letterSpacing: 0), Primary/Beginner/40%: #C0D15C, Primary/400/60%: #C0D15C, Stone/60%/500: #F5F1EB, Accent/500: #B8A9C9, Accent/400: #CFC4DB, shadows/md: Effect(type: DROP_SHADOW, color: shadow/md, offset: (shadow/md/layer-2/x, shadow/md/layer-2/y), radius: shadow/md/layer-2/blur, spread: shadow/md/layer-2/spread); Effect(type: DROP_SHADOW, color: shadow/md, offset: (shadow/md/layer-1/x, shadow/md/layer-1/y), radius: shadow/md/layer-1/blur, spread: shadow/md/layer-1/spread), Accent/600: #8D7EA3, Accent/300: #E5DFEC, shadows/xs: Effect(type: DROP_SHADOW, color: shadow/xs, offset: (shadow/xs/layer-1/x, shadow/xs/layer-1/y), radius: shadow/xs/layer-1/blur, spread: shadow/xs/layer-1/spread), Primary/500: #C5D24D, Accent/700: #6B5A7D.
Component descriptions: The following components have usage descriptions or documentation links defined in Figma. These descriptions provide important context about the intended usage, best practices, and any constraints for each component. Follow these guidelines when implementing or using these components.

## Lucide Icons / layout-dashboard
**Node ID:** 38:217

**Documentation:**
- [https://lucide.dev/icons/](https://lucide.dev/icons/)

## Lucide Icons / book-open-text
**Node ID:** 38:256

**Documentation:**
- [https://lucide.dev/icons/](https://lucide.dev/icons/)

## Lucide Icons / message-square
**Node ID:** 38:30

**Documentation:**
- [https://lucide.dev/icons/](https://lucide.dev/icons/)

## Lucide Icons / hand-helping
**Node ID:** 38:26

**Documentation:**
- [https://lucide.dev/icons/](https://lucide.dev/icons/)

## Lucide Icons / user-round
**Node ID:** 38:28

**Documentation:**
- [https://lucide.dev/icons/](https://lucide.dev/icons/)

## Lucide Icons / stretch-vertical
**Node ID:** 38:289

**Documentation:**
- [https://lucide.dev/icons/](https://lucide.dev/icons/)

## Lucide Icons / arrow-right
**Node ID:** 38:375

**Documentation:**
- [https://lucide.dev/icons/](https://lucide.dev/icons/)

## Discourse Accordion Item (Info Panel)
**Node ID:** 38:8134

**Documentation:**
- [https://ui.shadcn.com/docs/components/accordion](https://ui.shadcn.com/docs/components/accordion)

## Lucide Icons / chevron-down
**Node ID:** 38:610

**Documentation:**
- [https://lucide.dev/icons/](https://lucide.dev/icons/)

## Badge
**Node ID:** 38:668

**Documentation:**
- [https://ui.shadcn.com/docs/components/badge](https://ui.shadcn.com/docs/components/badge)

## Discourse Accordion Item ( Audio Output Panel) 
**Node ID:** 38:8146

**Documentation:**
- [https://ui.shadcn.com/docs/components/accordion](https://ui.shadcn.com/docs/components/accordion)

## Lucide Icons / stretch-horizontal
**Node ID:** 38:348

**Documentation:**
- [https://lucide.dev/icons/](https://lucide.dev/icons/)

## Discourse Accordion Item ( EQ & Slider container 
**Node ID:** 38:8158

**Documentation:**
- [https://ui.shadcn.com/docs/components/accordion](https://ui.shadcn.com/docs/components/accordion)

## Discourse Accordion Item ( A/V Record )
**Node ID:** 38:8170

**Documentation:**
- [https://ui.shadcn.com/docs/components/accordion](https://ui.shadcn.com/docs/components/accordion)

## Radio Group
**Node ID:** 38:929

**Documentation:**
- [https://ui.shadcn.com/docs/components/radio-group](https://ui.shadcn.com/docs/components/radio-group)

## .Radio Group Item
**Node ID:** 38:806

**Documentation:**
- [https://ui.shadcn.com/docs/components/radio-group](https://ui.shadcn.com/docs/components/radio-group)

## .Radio Group Radio Toggle
**Node ID:** 38:778

**Documentation:**
- [https://ui.shadcn.com/docs/components/radio-group](https://ui.shadcn.com/docs/components/radio-group)

## Discourse Accordion Item ( Show Timer )
**Node ID:** 38:8182

**Documentation:**
- [https://ui.shadcn.com/docs/components/accordion](https://ui.shadcn.com/docs/components/accordion)

## Discourse Accordion Item ( Hide Interview )
**Node ID:** 38:8195

**Documentation:**
- [https://ui.shadcn.com/docs/components/accordion](https://ui.shadcn.com/docs/components/accordion)
Image assets are stored on a localhost server. Clients can use these images directly in code as a way to view the image assets the same way they would other remote servers. Images and SVGs will be stored as constants, e.g. const image = 'http://localhost:3845/assets/10c13ac1a228a365cb98a0064b1d5afbc84887b2.png' These constants will be used in the code as the source for the image, e.g. <img src={image} /> This is true for both images and SVGs, so you can use the same approach for both types of assets.
IMPORTANT: After you call this tool, you MUST call get_screenshot to get a screenshot of the node for context.
```
