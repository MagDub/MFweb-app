import React from 'react';
import Image from 'react-image-resizer';


class Tree extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      col1:["images/images_set1/apple_1.png","images/images_set1/apple_2.png","images/images_set1/apple_3.png"],
      col2:["images/images_set2/apple_1.png","images/images_set2/apple_2.png","images/images_set2/apple_3.png"],
      col3:["images/images_set3/apple_1.png","images/images_set3/apple_2.png","images/images_set3/apple_3.png"],
      col4:["images/images_set4/apple_1.png","images/images_set4/apple_2.png","images/images_set4/apple_3.png"],
      col5:["images/images_set5/apple_1.png","images/images_set5/apple_2.png","images/images_set5/apple_3.png"],
      col6:["images/images_set6/apple_1.png","images/images_set6/apple_2.png","images/images_set6/apple_3.png"],
      col7:["images/images_set7/apple_1.png","images/images_set7/apple_2.png","images/images_set7/apple_3.png"],
      col8:["images/images_set8/apple_1.png","images/images_set8/apple_2.png","images/images_set8/apple_3.png"],
      };
  }

  render(){

    var disp_col;

    switch(this.props.col) {
        case 1:
          disp_col = this.state.col1;
          break;
        case 2:
          disp_col = this.state.col2;
          break;
        case 3:
          disp_col = this.state.col3;
          break;
        case 4:
          disp_col = this.state.col4;
          break;
        case 5:
          disp_col = this.state.col5;
          break;
        case 6:
          disp_col = this.state.col6;
          break;
        case 7:
          disp_col = this.state.col7;
          break;
        case 8:
          disp_col = this.state.col8;
          break;
        default:
      }

    return (
        <Image
          src={disp_col[this.props.tree-1]}
          height={this.props.value*5.5}
          width={this.props.value*5.5}
        />
    );
  }
};

export default Tree;
