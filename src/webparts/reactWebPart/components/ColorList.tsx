import { fromPairs } from '@microsoft/sp-lodash-subset';
import * as React  from 'react';
import {useRef} from 'react';

import {IColor} from '../IColor';

import {List, IPage, IPageProps} from 'office-ui-fabric-react/lib/List'
import { IRenderFunction, IRectangle  } from 'office-ui-fabric-react/lib/Utilities';

import styles from './ReactWebPart.module.scss';

export interface IColorListProps {
    colors: IColor[];
}

const ROWS_PER_PAGE = 2;

//Although named MAX_ROW_HEIGHT, this should be MAX_COL_WIDTH
const MAX_ROW_HEIGHT = 150;

export class ColorList extends React.Component<IColorListProps,{}> {

        //These essentially act like instance fields in a class 
       // private _columnCount = useRef(0);
       // private _columnWidth = useRef(0);
       // private _rowHeight = useRef(0);

       private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;

  private _cellBorder = 0;


    
    public render(): React.ReactElement<IColorListProps> {
        return(

            <div>
           
         {/*  <List items={this.props.colors} startIndex={2}  onRenderPage={this._onRenderPage} onPagesUpdated={this._onPagesUpdated}/> */ }
        {/* <List getItemCountForPage={this._getItemCountForPage}  getPageHeight={this._getPageHeight}   items={this.props.colors} startIndex={0}  onRenderPage={this._onRenderPage} onPagesUpdated={this._onPagesUpdated}/> */}
        <List items={this.props.colors} startIndex={0}  getPageHeight={this._getPageHeight} getItemCountForPage={this._getItemCountForPage} onRenderCell={this._onRenderListCell}/>
            </div>

          /*  <ul>

                {
                 this.props.colors.map(colorItem => 
                     <li>{colorItem.color}</li> 
                        )
                }

            </ul> */


        );
    }

    private _onRenderListCell = (item:IColor, index:number | undefined) : JSX.Element => {

        console.log(" _onRenderListCell: rendering item with index", index, "using column count of", this._columnCount);
        
        return (

            <div className={styles.listGridExampleTile} style={{ width: this._columnWidth - this._cellBorder }} >
                <div className={styles.listGridExampleSizer}>
                    <div className={styles.listGridExamplePadder} style={{ backgroundColor: item.rgb}} >
                        
                            <div className={styles.listGridExampleLabel}> 
                                {item.label}
                            </div>
                        
                    </div>
                </div>
            </div>

        )}

    private _onPagesUpdated = (pages:IPage<IColor>[]): void => {
        console.log('fired off  _onPagesUpdated with pages', pages);
    }

    private _onRenderPage = (pageProps: IPageProps, defaultRender?: IRenderFunction<IPageProps>) :JSX.Element=> {
        console.log("page is rendering");

        const STANDARD_TILE_MARGIN: number = 4;
        const BOTTOM_MARGIN: number = 36;

        const test = ['billy', 'bob'];


        const {
            page,
            className: pageClassName,
            ...divProps
          } = pageProps;

          console.log('pageProps are',pageProps);
          console.log('page is ',page);
      
          const { items } = page;


      
          return  ( <div>

            <div 
              style={{
                width: 300, //this._pageWidth,
                marginTop: STANDARD_TILE_MARGIN,
                marginBottom: BOTTOM_MARGIN,
                marginLeft: STANDARD_TILE_MARGIN,
                marginRight: STANDARD_TILE_MARGIN
              }}
            >

              
{
    

items.map( (item: IColor,index:number): JSX.Element => {
    console.log("_onRenderPage: item being rendered is:",item)
                return this._onRenderListCell(item, index);
                })
            }

           

            

            </div>
          </div>);
         
    }



   
    // Did not compile - private _getItemCountForPage(itemIndex: number, surfaceRect: IRectangle) {}
    private _getItemCountForPage =(itemIndex: number, surfaceRect: IRectangle) => {

        
        console.log('_getItemCountForPage: surfaceRect is:',surfaceRect);

        if (itemIndex === 0) {

          //You know the height of each cell in the row.
          this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);

          //Create column width smaller than MAX_ROW_HEIGHT
          this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);

          //Make each cell square
          this._rowHeight = this._columnWidth;
        }

        console.log('_getItemCountForPage: _columnCount is:', this._columnCount, "column width",this._columnWidth);
    
        return this._columnCount * ROWS_PER_PAGE;
      }
    
      private _getPageHeight = (itemIndex: number, surfaceRect: IRectangle) => {
          console.log("_getPageHeight page height is", this._rowHeight * ROWS_PER_PAGE)
        return this._rowHeight * ROWS_PER_PAGE;
      }

}