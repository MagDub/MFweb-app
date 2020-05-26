import React from 'react';
import PropTypes from 'prop-types';
import '../style/progressbar.css';


function ProgressBar(props) {

  // Translate total question and current question into percentage
  const percent = (props.counter/props.total)*100

  // console.log('Percent',percent)

  const Filler = (props) => {
  return <div className="filler" style={{ width: `${percent}%` }} />
}

  return (
    <center>
    <br></br>
    <div className="progress-bar">
        <Filler percentage={percent} />
    </div>
    </center>
  );

}

ProgressBar.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default ProgressBar;
