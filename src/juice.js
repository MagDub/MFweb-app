import React from 'react';
import './style/juice.css';
import Image from 'react-image-resizer';


class Juice extends React.Component{

  disp_text(){

    if (this.props.hor === 1){

      switch(this.props.mean_score){

          case 1: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 10% </b> </big> of the small glass
            </p>
          </div>)

          case 2: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 20% </b> </big> of the small glass
            </p>
          </div>)

          case 3: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 30% </b> </big> of the small glass
            </p>
          </div>)

          case 4: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 40% </b> </big> of the small glass
            </p>
          </div>)

          case 5: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 50% </b> </big> of the small glass
            </p>
          </div>)

          case 6: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 60% </b> </big> of the small glass
            </p>
          </div>)

          case 7: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 70% </b> </big> of the small glass
            </p>
          </div>)

          case 8: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 80% </b> </big> of the small glass
            </p>
          </div>)

          case 9: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 90% </b> </big> of the small glass
            </p>
          </div>)

          case 10: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 100% </b> </big> of the small glass
            </p>
          </div>)
      }
    }

    else if (this.props.hor === 6){

      switch(this.props.mean_score){

          case 1: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 10% </b> </big> of the large glass
            </p>
          </div>)

          case 2: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 20% </b> </big> of the large glass
            </p>
          </div>)

          case 3: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 30% </b> </big> of the large glass
            </p>
          </div>)

          case 4: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 40% </b> </big> of the large glass
            </p>
          </div>)

          case 5: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 50% </b> </big> of the large glass
            </p>
          </div>)

          case 6: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 60% </b> </big> of the large glass
            </p>
          </div>)

          case 7: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 70% </b> </big> of the large glass
            </p>
          </div>)

          case 8: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 80% </b> </big> of the large glass
            </p>
          </div>)

          case 9: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 90% </b> </big> of the large glass
            </p>
          </div>)

          case 10: return (
          <div className="juice_text">
            <p>
              Juice from the apples YOU picked <br />
              filled: <big> <b> 100% </b> </big> of the large glass
            </p>
          </div>)
      }
    }




  }

  render(){

    return (
        <div className="juice_im">

          <Image src={this.props.image_juice} height={800}/>

          {this.disp_text()}

        </div>
    );
  }

};

export default Juice;
