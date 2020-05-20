import React from 'react';

class Juice extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      image_juice_small:["juice_small_1", "juice_small_2", "juice_small_3", "juice_small_4", "juice_small_5", "juice_small_6", "juice_small_7", "juice_small_8", "juice_small_9", "juice_small_10"],
      image_juice_big:["juice_big_1", "juice_big_2", "juice_big_3", "juice_big_4", "juice_big_5", "juice_big_6", "juice_big_7", "juice_big_8", "juice_big_9", "juice_big_10"],
    };

  }

  render(){

    var mean_score = this.props.mean_score - 1; // shift size (2,10) to (1,9)
    var ind_mean_score = mean_score - 1;

    if (this.props.hor===1) {

      return (

          <div className={this.state.image_juice_small[ind_mean_score]}>

          </div>
      );
    }
    else if (this.props.hor===6) {

      return (

        <div className={this.state.image_juice_big[ind_mean_score]}>

        </div>
      );
    }
  }

};

export default Juice;
