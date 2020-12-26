import * as React from 'react';
import styles from './ReactWebPart.module.scss';
import { IReactWebPartProps } from './IReactWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {IColor} from '../IColor';

//import {ColorList, IColorListProps} from './ColorList';
import {ColorList} from './ColorList';
import {ListButton} from './ListButton';

import { ITheme, getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

interface IState {
  buttonPressed: boolean;
  listItems: IColor[];
}



export default class ReactWebPart extends React.Component<IReactWebPartProps,IState, {}> {

 /* private _colors: IColor[] = [{index:1, label:'Item 1', rgb:"red"}, {index:2,label:'Item 2', rgb:"blue"}, 
                               {index:3, label:'Item 3', rgb:"orange"}, {index:4, label:'Item 4', rgb:"yellow"},
                               {index:5, label:'Item 5'}, {index:6, label:'Item 6'},
                               {index:7, label:'Item 7'}, {index:8, label:'Item 8'},
                               {index:9, label:'Item 9'}, {index:10, label:'Item 10'}
                              ] */

    state: IState;

  constructor(props:IReactWebPartProps) {
    super(props);
    this.state = {buttonPressed: false,
                  listItems : [ {index:1, label:'Item 1', rgb:"red"}, {index:2,label:'Item 2', rgb:"blue"}, 
                              {index:3, label:'Item 3', rgb:"orange"}, {index:4, label:'Item 4', rgb:"yellow"},
                              {index:5, label:'Item 5'}, {index:6, label:'Item 6'},
                              {index:7, label:'Item 7'}, {index:8, label:'Item 8'},
                              {index:9, label:'Item 9'}, {index:10, label:'Item 10'}
                            ]
                  }



    const theme: ITheme = getTheme();

    //const test = { first: {'Beavis'} , second: {'Mr. Anderson' };

    const { effects } = theme;



    console.log('here is the constructor and theme is', theme);
    console.log('effects grabbed from theme is', effects);
  }      
  
private addColor = (state:IState) => {
  alert('addColor: in addColor');
 // state['listItems'].push({index:11, label:'New Item', rgb:"pink"});
 //  console.log('addColor: state is', state);
  return {listItems: state.listItems};
   
}





  public addItem = (e) => {
    
    console.log("ReactWebPart:reRender - 'this' is",this)
    console.log("ReactWebPart:reRender - reRender called with value", e.target)
    console.log("ReactWebPart:reRender - reRender called with this.state.buttonPressed", this.state['buttonPressed'])
    //this.setState({buttonPressed:true}, function() { console.log("ReactWebPart:reRender callback was actuated 'this.state.listItems'", this.state.listItems) })
    this.setState((state:IState) => 
              { 
                
                state.listItems.push({index:11, label:'New Item', rgb:"pink"})
               // return ({listItems: state.listItems.push({index:11, label:'New Item', rgb:"pink"}) })
               return ({listItems: state.listItems})
              }, 
    
    
          function() { console.log("ReactWebPart:addItem callback was actuated 'this.state.listItems'", this.state.listItems) })
 
  }

  public deleteItem = () => {
    let newListItems = this.state.listItems.filter((item) => {
        console.log(item);
        return item.index !=1 && item;
    });
    console.log("deleteItem: newListItems:",newListItems );

    this.setState((state:IState) => 
              { 
                
                
               // return ({listItems: state.listItems.push({index:11, label:'New Item', rgb:"pink"}) })
               return ({listItems: newListItems})
              }, 
    
    
          function() { console.log("ReactWebPart:deleteItem callback was actuated 'this.state.listItems'", this.state.listItems) })

  }


  public render(): React.ReactElement<IReactWebPartProps> {

    console.log('value of state variable is', this.state)
    return (
      <div className={ styles.reactWebPart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using React and Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <p className={ styles.description }>{escape(this.props.author)}</p>
              <ListButton text="Add Item" checked={true} onClick={this.addItem}/>
              <ListButton text="Delete Item" checked={true} onClick={this.deleteItem}/>
              <ColorList colors={this.state.listItems}/>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
