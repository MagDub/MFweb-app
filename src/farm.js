import React from 'react';
import './style/farm.css';

class Farm extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      image_bg_SH_1:["farm1_6", "farm1_6", "farm1_7"],
      image_bg_LH_1:["farm1_1", "farm1_1", "farm1_2", "farm1_3", "farm1_4", "farm1_5", "farm1_6", "farm1_7"],
      image_bg_SH_2:["farm2_6", "farm2_6", "farm2_7"],
      image_bg_LH_2:["farm2_1", "farm2_1", "farm2_2", "farm2_3", "farm2_4", "farm2_5", "farm2_6", "farm2_7"],
      image_bg_SH_3:["farm3_6", "farm3_6", "farm3_7"],
      image_bg_LH_3:["farm3_1", "farm3_1", "farm3_2", "farm3_3", "farm3_4", "farm3_5", "farm3_6", "farm3_7"],
      image_bg_SH_4:["farm4_6", "farm4_6", "farm4_7"],
      image_bg_LH_4:["farm4_1", "farm4_1", "farm4_2", "farm4_3", "farm4_4", "farm4_5", "farm4_6", "farm4_7"],
      image_bg_SH_5:["farm5_6", "farm5_6", "farm5_7"],
      image_bg_LH_5:["farm5_1", "farm5_1", "farm5_2", "farm5_3", "farm5_4", "farm5_5", "farm5_6", "farm5_7"],
      image_bg_SH_6:["farm6_6", "farm6_6", "farm6_7"],
      image_bg_LH_6:["farm6_1", "farm6_1", "farm6_2", "farm6_3", "farm6_4", "farm6_5", "farm6_6", "farm6_7"],
      image_bg_SH_7:["farm7_6", "farm7_6", "farm7_7"],
      image_bg_LH_7:["farm7_1", "farm7_1", "farm7_2", "farm7_3", "farm7_4", "farm7_5", "farm7_6", "farm7_7"],
      image_bg_SH_8:["farm8_6", "farm8_6", "farm8_7"],
      image_bg_LH_8:["farm8_1", "farm8_1", "farm8_2", "farm8_3", "farm8_4", "farm8_5", "farm8_6", "farm8_7"],
      };
  }

  render(){

    var disp;

    if (this.props.hor===1){
      switch(this.props.col) {
          case 1:
            disp = this.state.image_bg_SH_1;
            break;
          case 2:
            disp = this.state.image_bg_SH_2;
            break;
          case 3:
            disp = this.state.image_bg_SH_3;
            break;
          case 4:
            disp = this.state.image_bg_SH_4;
            break;
          case 5:
            disp = this.state.image_bg_SH_5;
            break;
          case 6:
            disp = this.state.image_bg_SH_6;
            break;
          case 7:
            disp = this.state.image_bg_SH_7;
            break;
          case 8:
            disp = this.state.image_bg_SH_8;
            break;
          default:
        }
      }

      else if (this.props.hor===6){
        switch(this.props.col) {
            case 1:
              disp = this.state.image_bg_LH_1;
              break;
            case 2:
              disp = this.state.image_bg_LH_2;
              break;
            case 3:
              disp = this.state.image_bg_LH_3;
              break;
            case 4:
              disp = this.state.image_bg_LH_4;
              break;
            case 5:
              disp = this.state.image_bg_LH_5;
              break;
            case 6:
              disp = this.state.image_bg_LH_6;
              break;
            case 7:
              disp = this.state.image_bg_LH_7;
              break;
            case 8:
              disp = this.state.image_bg_LH_8;
              break;
            default:
          }
        }

      return (
          <div className={disp[this.props.apples_picked]}>
            <div className={disp[this.props.apples_picked+1]}>
            </div>
          </div>
          );
    }
};

export default Farm;
