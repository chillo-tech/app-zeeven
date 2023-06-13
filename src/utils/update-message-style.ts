type Props = {
  currentFieldValue: string;
  start: number;
  end: number;
  lastVariable: string;
  type: string;
  setShowInformation: any;
  setLastVariable: any;
};
function updateMessageStyle({
  currentFieldValue,
  end,
  start,
  lastVariable,
  type,
  setShowInformation,
  setLastVariable,
}: Props) {
  let fieldValue = currentFieldValue;
  const valueBeforeSelection = currentFieldValue.substring(0, start);
  const valueAfterSelection = currentFieldValue.substring(end, currentFieldValue.length + 1);
  const selection = currentFieldValue.substring(start, end);

  if (lastVariable !== 'BOLD' && type === 'BOLD' && selection.length) {
    fieldValue =
      lastVariable === 'ITALIC'
        ? `${valueBeforeSelection}**${selection}**${valueAfterSelection}`
        : `${valueBeforeSelection} **${selection}** ${valueAfterSelection}`;
  }

  if (lastVariable !== 'ITALIC' && type === 'ITALIC' && selection.length) {
    fieldValue =
      lastVariable === 'BOLD'
        ? `${valueBeforeSelection}*${selection}*${valueAfterSelection}`
        : `${valueBeforeSelection} *${selection}* ${valueAfterSelection}`;
  }

  if (type === 'VARIABLE') {
    fieldValue = `${valueBeforeSelection} {{${fieldValue}}}${
      selection.length ? selection + valueAfterSelection : valueAfterSelection
    }`;
    setShowInformation(false);
  }
  setLastVariable(type);
  return fieldValue;
}

export { updateMessageStyle };
