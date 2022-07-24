/* eslint-disable react/display-name */
import React from "react";
import { BaseTheme } from "types";
import { Div, Txt } from "./Elements";

interface Props {
  net: boolean;
  colors: BaseTheme;
}

const InternetMode: React.FC<{
  net: boolean;
  colors: BaseTheme;
}> = ({ colors, net }) => {
  return (
    <>
      <Div width="4rem" height="22px" padding="0px 8px" zIndex={101}>
        <Txt fs="14px" color={colors.fontPrimary}>
          {net ? "Online" : "Offline"}
        </Txt>
      </Div>
    </>
  );
};

export const Tabbar = React.forwardRef<HTMLDivElement, Props>(
  ({ colors, net }, ref) => {
    return (
      <Div
        ref={ref}
        width="100%"
        height="22px"
        bg={colors.navbar.background}
        zIndex={100}
        style={{
          position: "relative",
        }}
      >
        <InternetMode net={net} colors={colors} />
      </Div>
    );
  }
);
