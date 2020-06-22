import React from 'react';
import { Button } from 'react-bootstrap';
import { Component } from 'react';

class End extends Component {

  redirectToEnd(){

   alert("You will now be redirected to the validation page.")

   window.location = 'https://app.prolific.co/submissions/complete?cc=6668AF37'
  }

  render() {

    return (

      <div>
        <div className="place-middle">
          <div className="IntroConsentText">
            <p><span className="bold">Congratulations ! </span></p>
              Thank you for completing our study. <br/>
              If you are ready to return to Prolific, click the button below.
            <br/><br/>
            <div className="container">
                <div className="center">
                  <Button variant="outline-success" size="lg" onClick={this.redirectToEnd}> Complete </Button>
                </div>
            </div>
          </div>
        </div>
      </div>

    );

  }

};

export default End;
