import React from 'react';
import './style/slides.css';

class Instructions extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      instruc:["slide_22", "slide_1", "slide_2", "slide_3", "slide_4", "slide_5", "slide_6", "slide_7", "slide_8", "slide_9", "slide_10", "slide_11", "slide_12", "slide_13", "slide_14", "slide_15", "slide_16", "slide_17", "slide_18", "slide_19", "slide_20", "slide_21" , "slide_22", "slide_22"],
      };
  }

  bubble_text(slide){
    switch(slide) {

      case 0:
        return (
          <div className="slide_text">
            <p>
              Mmmh... You can do better than that! <br /> <br />
              Let&#39;s start slowly from the beginning.
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
      return (
        <div className={this.state.instruc[this.props.slide-1]}>
          <div className={this.state.instruc[this.props.slide]}>
            {this.bubble_text(this.props.slide)}
          </div>
        </div>
      );
    }
};



export default Instructions;
