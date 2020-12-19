import * as React from 'react';
import styles from './ReactWebPart.module.scss';
import { IReactWebPartProps } from './IReactWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {IColor} from '../IColor';

//import {ColorList, IColorListProps} from './ColorList';
import {ColorList} from './ColorList';

import { ITheme, getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';



export default class ReactWebPart extends React.Component<IReactWebPartProps, {}> {

  private _colors: IColor[] = [{index:1, label:'Item 1', rgb:"red"}, {index:2,label:'Item 2', rgb:"blue"}, 
                               {index:3, label:'Item 3', rgb:"orange"}, {index:4, label:'Item 4', rgb:"yellow"},
                               {index:5, label:'Item 5'}, {index:6, label:'Item 6'},
                               {index:7, label:'Item 7'}, {index:8, label:'Item 8'},
                               {index:9, label:'Item 9'}, {index:10, label:'Item 10'}
                              ]


  constructor(props) {
    super(props);

    const theme: ITheme = getTheme();

    //const test = { first: {'Beavis'} , second: {'Mr. Anderson' };

    const { effects } = theme;



    console.log('here is the constructor and theme is', theme);
    console.log('effects grabbed from theme is', effects);
  }


  public render(): React.ReactElement<IReactWebPartProps> {
    return (
      <div className={ styles.reactWebPart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using React and Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <p className={ styles.description }>{escape(this.props.author)}</p>
              <ColorList colors={this._colors}/>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
