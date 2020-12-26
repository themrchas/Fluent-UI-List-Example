import * as React  from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react';

export interface IListButtonProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
    onClick: any;
    text: string;

  }


export const ListButton: React.FunctionComponent<IListButtonProps> = (props) => {
    const { text, disabled, checked, onClick } = props;
  
    return (

        <DefaultButton text={text} onClick={onClick} allowDisabledFocus disabled={disabled} checked={checked} />
      );
  };

  
  
 