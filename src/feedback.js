import React from 'react';
import Image from 'react-image-resizer';

class Feedback extends React.Component{

  render(){

    if (this.props.chosen===this.props.correct_ans) {
      return (
        <div className="feedback">
          <Image
            src="images/images_training/thumbs_up.png"
            height={200}
            width={200}
          />
        </div>
      );
    }

    else {
      return (
        <div className="feedback">
          <Image
            src="images/images_training/thumbs_down.png"
            height={200}
            width={200}
          />
        </div>
      );
    }
  }
};

export default Feedback;
