import React from 'react';
import './style/slides.css';
import Image from 'react-image-resizer';


class Instructions extends React.Component{

  constructor(props) {
    super(props);

    this.switchImage = this.switchImage.bind(this);

    this.state = {
      currentImage: 0,
      };
  }

  switchImage() {
    this.setState({
      currentImage: 1,
    });
  }

  componentDidMount() {

    setTimeout(this.switchImage, 2000);

  }

  bubble_text(slide){

    switch(slide) {

      case 1:
        return (
          <div className="slide_text">
            <p>
              Hi my name is Maggie, welcome to our farm ! <br />
              The apple picking season just started. We are really glad that you are <br />
              here to help. Press the right arrow on your KEYBOARD to continue. <br />
            </p>
          </div>);

      case 0:
        return (
          <div className="slide_text">
            <p>
              Mmmh... You can do better than that! <br /> <br />
              Let&#39;s start slowly from the beginning.
            </p>
          </div>);

      case 2:
        return (
          <div className="slide_text">
            <p>
              Apples come in different colours and sizes. The bigger the apple, the <br />
              more juice it will give. You need to help us make as much juice as <br />
              possible.
            </p>
          </div>);

      case 3:
        return (
          <div className="slide_text">
            <p>
              You can only pick apples until sunset. Sometimes you will start at <br />
              noon and will pick 6 apples, sometimes you will start in the <br />
              afternoon and will pick only 1 apple.
            </p>
          </div>);

      case 4:
        return (
          <div className="slide_text">
            <p>
              Some trees give bigger apples than others. However, the trees on each  <br />
              day are NEW, meaning that they are independent from other days. To  <br />
              help you, some apples were already picked before you arrived.
            </p>
          </div>);

      case 5:
        return (
          <div className="slide_text">
            <p>
              Let me explain this in more details, follow me to the plantation !
            </p>
          </div>);

      case 19:
        return (
          <div className="slide_text">
            <p>
              At the end of each day, you will see how much juice was made <br />
              from the apples you picked. At the end of the game this juice <br />
              will be converted to a monetary bonus.
            </p>
          </div>);

      case 20:
        return (
          <div className="slide_text">
            <p>
              The juice will be filled in a glass. There will be 2 types of glasses: <br />
              a small glass, when 1 apple could be picked, and a large glass, when <br />
              6 apples could be picked.
            </p>
          </div>);

      case 21:
        return (
          <div className="slide_text">
            <p>
              That&#39;s it! <br />
              If something was not clear, feel free to go back. <br />
              If you are ready, I will ask you a few questions.
            </p>
          </div>);

    case 22:
      return (
        <div className="slide_text">
          <p>
            Well done ! <br /> <br />
            Let&#39;s test your intuition about apple sizes now.
          </p>
        </div>);

      case 23:
        return (
          <div className="slide_text">
            <p>
              Congratulations, you&#39;ve done well. Let&#39;s start picking apples now ! <br />
              Keep in mind: The bigger the apples, the more juice they <br />
              will produce. Do the best you can !
            </p>
          </div>);

      case 24:
        return (
          <div className="slide_text">
            <p>
              Mmmh... You can do better than that! <br /> <br />
              Let&#39;s try again !
            </p>
          </div>);

      default:
  }
}

  render(){

    if(this.props.slide===1) {
      if (this.state.currentImage===0) {
        return (
          <div className="place-middle">
            <div className="slide_im">
                <Image src={this.props.loading_bg[this.state.currentImage]} height={800}/>
            </div>
          </div>
        );
      }
      else {
        return (
          <div className="place-middle">
            <div className="slide_im">
              <Image src={this.props.instruc_[0]} height={800}/>
              {this.bubble_text(this.props.slide)}
            </div>
          </div>
        );
      }
    }

    if(this.props.slide===0 || (this.props.slide>21 && this.props.slide<25)) {
      return (
        <div className="place-middle">
          <div className="slide_im">
            <Image src={this.props.instruc_[0]} height={800}/>
            {this.bubble_text(this.props.slide)}
          </div>
        </div>
      );
    }

    if((this.props.slide>1 && this.props.slide<6) || (this.props.slide>18 && this.props.slide<22)) {
      return (
        <div className="place-middle">
          <div className="slide_im">
            <Image src={this.props.instruc_[1]} height={800}/>
              {this.bubble_text(this.props.slide)}
          </div>
        </div>
      );
    }

    else {
      return (
        <div className="place-middle">
          <div className="slide_im">
            <Image src={this.props.instruc_[this.props.slide-4]} height={800}/>
              {this.bubble_text(this.props.slide)}
          </div>
        </div>
      );
    }
  }
};



export default Instructions;
