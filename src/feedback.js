import React from 'react';
import Image from 'react-image-resizer';

class Feedback extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      images:["images/images_training/thumbs_up.png", "images/images_training/thumbs_down.png"],
      };
  }

  componentDidMount() {
    this.state.images.forEach(image => { new Image().src = image })
  }

  render(){

    if (this.props.chosen===this.props.correct_ans) {
      return (
        <div className="feedback">
          <Image
            src={this.state.images[0]}
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
            src={this.state.images[1]}
            height={200}
            width={200}
          />
        </div>
      );
    }
  }
};

export default Feedback;
