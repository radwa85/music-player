import React from 'react';
import Svg, { Path, Circle, SvgProps } from 'react-native-svg';

export const PauseIcon = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M8.78479 4.79169V19.1667M15.1737 4.79169V19.1667" stroke={props.color || "#091127"} strokeWidth="2.08334"/>
  </Svg>
);

export const NextIcon = (props: SvgProps) => (
  <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" {...props}>
    <Path d="M18.75 2.77777V18.0556M2.08325 3.47222V17.3612L11.8055 10.4167L2.08325 3.47222Z" stroke={props.color || "#091127"} strokeWidth="2.08334" strokeLinejoin="round"/>
  </Svg>
);

export const BackIcon = (props: SvgProps) => (
  <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" {...props}>
    <Path d="M2.08331 18.0556V2.77777M18.75 17.3612V3.47222L9.02778 10.4167L18.75 17.3612Z" stroke={props.color || "#091127"} strokeWidth="2.08334" strokeLinejoin="round"/>
  </Svg>
);

export const SearchIcon = (props: SvgProps) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <Path d="M19 19L13.8571 13.8571M8.71429 16.4286C4.4538 16.4286 1 12.9748 1 8.71429C1 4.4538 4.4538 1 8.71429 1C12.9748 1 16.4286 4.4538 16.4286 8.71429C16.4286 12.9748 12.9748 16.4286 8.71429 16.4286Z" stroke={props.color || "#091127"} strokeWidth="2"/>
  </Svg>
);
export const MusicSearchIcon = (props: SvgProps) => (
  <Svg width={props.width || 48} height={props.height || 48} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M9 17C9 17.7956 8.68393 18.5587 8.12132 19.1213C7.55871 19.6839 6.79565 20 6 20C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17C3 16.2044 3.31607 15.4413 3.87868 14.8787C4.44129 14.3161 5.20435 14 6 14C6.79565 14 7.55871 14.3161 8.12132 14.8787C8.68393 15.4413 9 16.2044 9 17ZM9 17V4H19V11M9 8H19M20.2 20.2L22 22M15 18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2044 15 18Z" stroke={props.color || "#091127"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const ListIcon = (props: SvgProps) => (
  <Svg width="25" height="11" viewBox="0 0 25 11" fill="none" {...props}>
    <Path d="M0 1H24.0199" stroke={props.color || "#091127"} strokeWidth="2"/>
    <Path d="M0 9.49234L24.0198 9.49234" stroke={props.color || "#091127"} strokeWidth="2"/>
  </Svg>
);
