import React from 'react';
import './style/slides.css';
import Image from 'react-image-resizer';


class Instructions extends React.Component{

  constructor(props) {
    super(props);

    this.switchImage = this.switchImage.bind(this);
    this.preload = this.preload.bind(this);

    this.state = {
      currentImage: 0,
      images: ["images/loading.jpg"],
      instruc_:["images/instructions/slide_empty_1arrow.png", "images/instructions/slide_empty_2arrows.png", "images/instructions/slide6.png", "images/instructions/slide7.png", "images/instructions/slide8.png", "images/instructions/slide9.png", "images/instructions/slide10.png", "images/instructions/slide11.png", "images/instructions/slide12.png", "images/instructions/slide13.png", "images/instructions/slide14.png", "images/instructions/slide15.png", "images/instructions/slide16.png", "images/instructions/slide17.png", "images/instructions/slide18.png"],
      images_slide: [],
      };
  }

  switchImage() {
    this.setState({
      currentImage: 1
    });
  }

  preload() {

    var images_slide = [];

    for (var i = 0; i < 4; i++) {
      images_slide[i] = new Image()
      images_slide[i].src = this.state.instruc_[i]
    }
  }

  componentDidMount() {

    var images = new Array()


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
              here to help. Press the right arrow on your keyboard to continue. <br />
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
              Apples come in different shades and sizes. You needs to help us <br />
              collect the BIGGEST ones before sunset.
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
              On each day you will collect apples from new trees. Some of the  <br />
              trees are better than others. To help you, some apples were <br />
              already picked up before you arrived.
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
              from the apples you collected. At the end of the game this juice <br />
              will be converted to a money bonus.
            </p>
          </div>);

      case 20:
        return (
          <div className="slide_text">
            <p>
              You will have to fill a small glass when you can collect 1 apple  <br />
              and a large glass when you can collect 6 apples. <br />
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
          <div className="slide_text_after_training">
            <p>
              Congratulations, you&#39;ve done well. <br />
              Let&#39;s start picking apples now ! <br />
              Remember: the bigger the apples, the more juice...
            </p>
          </div>);

      case 24:
        return (
          <div className="slide_text_after_training">
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
          <div className="slide_im">
              <Image src={this.state.images[this.state.currentImage]} height={800}/>
          </div>
        );
      }
      else {
        return (
          <div className="slide_im">
            <Image src={this.state.instruc_[0]} height={800}/>
            {this.bubble_text(this.props.slide)}
          </div>
        );
      }
    }

    if(this.props.slide===0 || (this.props.slide>21 && this.props.slide<25)) {
      return (
        <div className="slide_im">
          <Image src={this.state.instruc_[0]} height={800}/>
          {this.bubble_text(this.props.slide)}
        </div>
      );
    }

    if((this.props.slide>1 && this.props.slide<6) || (this.props.slide>18 && this.props.slide<22)) {
      return (
        <div className="slide_im">
          <Image src={this.state.instruc_[1]} height={800}/>
            {this.bubble_text(this.props.slide)}
        </div>
      );
    }

    else {
      return (
        <div className="slide_im">
          <Image src={this.state.instruc_[this.props.slide-4]} height={800}/>
            {this.bubble_text(this.props.slide)}
        </div>
      );
    }
  }
};



export default Instructions;
