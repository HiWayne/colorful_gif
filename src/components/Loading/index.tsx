import React, { FunctionComponent, CSSProperties } from "react";
import classnames from "classnames";
import "./index.less";

type RingPropsType = {
  text?: string;
  textStyle?: CSSProperties;
  size: string | number;
  animated?: boolean;
};

const Ring: FunctionComponent<RingPropsType> = ({
  text,
  size,
  animated,
  textStyle = {},
}: RingPropsType) => {
  size = typeof size === "number" ? size + "px" : size;
  const sizeStyle = {
    width: size,
    height: size,
  };
  return (
    <div className={classnames("dt-loading", "ring")}>
      {animated ? <div className="circle" style={sizeStyle} /> : null}
      {text !== "" && <span style={{ ...textStyle }}>{text}</span>}
    </div>
  );
};

type SpinnerPropsType = {
  text?: string;
  textStyle?: CSSProperties;
  animated?: boolean;
};

const Spinner: FunctionComponent<SpinnerPropsType> = ({
  text,
  textStyle = {},
  animated,
}) => {
  return (
    <div className="dt-loading-wrapper">
      {animated ? (
        <div className={classnames("dt-loading", "spinner")}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : null}
      <span style={{ ...textStyle }}>{text}</span>
    </div>
  );
};

type LoadingPropsType = {
  type?: string;
  size?: number | string;
  text?: string;
  textStyle?: CSSProperties;
  animated?: boolean;
};

/**
 * 常用 Loading 样式
 * @params type
 */
const Loading: FunctionComponent<LoadingPropsType> = ({
  type = "spinner",
  size = 60,
  text,
  textStyle,
  animated = true,
}) => {
  switch (type) {
    case "spinner":
      return <Spinner text={text} textStyle={textStyle} animated={animated} />;
    case "ring":
      return (
        <Ring
          text={text}
          textStyle={textStyle}
          animated={animated}
          size={size}
        />
      );
    default:
      console.error("Type prop is valid when use Loading component!");
      return null;
  }
};

export default Loading;
