import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconCellButtonRendererProps {
  clicked: (mac: string) => void;
  icon: IconDefinition;
  value: string;
}


export const IconCellButtonRenderer: React.FunctionComponent<IconCellButtonRendererProps> = (
  props: IconCellButtonRendererProps
): JSX.Element => {
  const btnClickedHandler = (): void => {
    if (props.clicked) {
      props.clicked(props.value);
    }
  };
  return <FontAwesomeIcon icon={props.icon} onClick={btnClickedHandler} />;
};
