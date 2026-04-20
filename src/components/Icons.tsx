import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const PauseIcon = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M8.78479 4.79169V19.1667M15.1737 4.79169V19.1667"
      stroke={props.color || "#091127"}
      strokeWidth="2.08334"
    />
  </Svg>
);

export const NextIcon = (props: SvgProps) => (
  <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" {...props}>
    <Path
      d="M18.75 2.77777V18.0556M2.08325 3.47222V17.3612L11.8055 10.4167L2.08325 3.47222Z"
      stroke={props.color || "#091127"}
      strokeWidth="2.08334"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BackIcon = (props: SvgProps) => (
  <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" {...props}>
    <Path
      d="M2.08331 18.0556V2.77777M18.75 17.3612V3.47222L9.02778 10.4167L18.75 17.3612Z"
      stroke={props.color || "#091127"}
      strokeWidth="2.08334"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SearchIcon = (props: SvgProps) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M19 19L13.8571 13.8571M8.71429 16.4286C4.4538 16.4286 1 12.9748 1 8.71429C1 4.4538 4.4538 1 8.71429 1C12.9748 1 16.4286 4.4538 16.4286 8.71429C16.4286 12.9748 12.9748 16.4286 8.71429 16.4286Z"
      stroke={props.color || "#091127"}
      strokeWidth="2"
    />
  </Svg>
);

export const ListIcon = (props: SvgProps) => (
  <Svg width="25" height="11" viewBox="0 0 25 11" fill="none" {...props}>
    <Path d="M0 1H24.0199" stroke={props.color || "#091127"} strokeWidth="2" />
    <Path
      d="M0 9.49234L24.0198 9.49234"
      stroke={props.color || "#091127"}
      strokeWidth="2"
    />
  </Svg>
);
