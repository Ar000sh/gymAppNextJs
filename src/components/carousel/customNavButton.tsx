import { NavigationShape, SwiperNavigationOptions } from "@/shared/swipper";

// Import Swiper React components
function shapeClass(shape?: NavigationShape): string {
  switch (shape) {
    case "circle":
      return "50%";
    case "rounded":
      return "25%";
    case "Square":
      return "none";
    default:
      return "none";
  }
}
const extractBtnOptions = (opt: SwiperNavigationOptions): buttonOptions => {
  return {
    btnSize: opt?.size ?? "44px",
    btnBg: opt?.backgroundColor ?? "transparent",
    btnBgHover:
      opt?.backgroundHoverColor ?? opt?.backgroundColor ?? "transparent",
    btnShape: opt?.shape ? shapeClass(opt?.shape) : "none",
    iconColor: opt?.iconColor ?? "#007aff",
    iconSize: opt?.iconSize ?? "100%",
    iconOffsetX: opt?.iconOffsetX ?? "0px",
  } as buttonOptions;
};

type buttonOptions = {
  btnSize: string;
  btnBg: string;
  btnBgHover: string;
  btnShape: string;
  iconColor: string;
  iconSize: string;
  iconOffsetX: string;
};
type Props = {
  navigationOptions: SwiperNavigationOptions;
  kind: "prev" | "next";
  btnRef: React.RefObject<HTMLButtonElement | null>;
};
const NavButton = ({ navigationOptions, kind, btnRef }: Props) => {
  const buttonOptions = extractBtnOptions(navigationOptions);
  return (
    <button
      ref={btnRef}
      aria-label={kind === "prev" ? "Previous" : "Next"}
      className={["flex items-center justify-center select-none"].join(" ")}
      style={{
        width: buttonOptions.btnSize,
        height: buttonOptions.btnSize,
        background: buttonOptions.btnBg,
        color: buttonOptions.iconColor,
        borderRadius: buttonOptions.btnShape,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = buttonOptions.btnBgHover)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = buttonOptions.btnBg)
      }
      onFocus={(e) =>
        (e.currentTarget.style.background = buttonOptions.btnBgHover)
      }
      onBlur={(e) => (e.currentTarget.style.background = buttonOptions.btnBg)}
    >
      {kind === "prev" ? (
        <svg
          viewBox="0 0 24 24"
          width={buttonOptions.iconSize}
          height={buttonOptions.iconSize}
          aria-hidden="true"
          className="block"
          style={{ marginRight: buttonOptions.iconOffsetX }}
        >
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width={buttonOptions.iconSize}
          height={buttonOptions.iconSize}
          aria-hidden="true"
          className="block"
          style={{ marginLeft: buttonOptions.iconOffsetX }}
        >
          <path
            d="M9 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default NavButton;
