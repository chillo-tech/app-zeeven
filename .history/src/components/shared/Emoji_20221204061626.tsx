import React from 'react';
interface Props {
  label?: string,
  symbol: string
}
const Emoji = (props) => (
    <span
        className="inline"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);
export default Emoji;