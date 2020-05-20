import React from 'react';
import Farm from './farm';
import Apple from './apple';
import Juice from './juice';
import Block from './block';
import { API_URL } from './config';
import { handleResponse } from './helpers'; // methode qui importe le json

class Game extends React.Component{

  constructor(props) {
    super(props);

    var trial_per_block = 2;
    var BlockNb = 4;

    /* fill in random colors .*/
    var random_col=[];
    for (var j=0; j<trial_per_block*BlockNb; j++){
        random_col[j] = Math.round(Math.random() * 7)+1
      };

    /* data to be saved .*/
    var chosen_tree = Array(trial_per_block*BlockNb).fill().map(() => Array(6).fill(0));
    var chosen_apple_size = Array(trial_per_block*BlockNb).fill().map(() => Array(6).fill(0));
    var all_key_pressed = Array(trial_per_block*BlockNb).fill().map(() => Array(6).fill(0));

    this.state = {
      UserNo: 1,
      BlockNb: 4,
      start_block: 1,
      disp_new_block: 0,
      disp_juice: 0,
      TrialNo: 1,
      SampleNo: 0,
      BlockNo: 1,
      block_info: {},
      tree_col:random_col,
      chosen_tree:chosen_tree,
      chosen_apple_size:chosen_apple_size,
      all_key_pressed: all_key_pressed,
      trial_per_block: trial_per_block,
      block_start_trials: [1,101,201,301],
      }

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener('keydown', function(e) {
    if(e.keyCode === 32 && e.target === document.body) {
      e.preventDefault();
    }
    });

    this.fetchBlock.bind(this);
  }

  fetchBlock(user_no_,block_no_){

    fetch(`${API_URL}/task/`+user_no_+'/'+block_no_)
    .then(handleResponse)
    .then((data) => {

        const block_info = {
          BlockNo             : data.BlockNo,
          Horizon             : data.Horizon,
          InitialSampleNb     : data.InitialSampleNb,
          InitialSamples_Size : data.InitialSamplesSize,
          InitialSamples_Tree : data.InitialSamplesTree,
          ItemNo              : data.ItemNo,
          TreePositions       : data.TreePositions,
          DisplayOrder        : data.DisplayOrder,
          Tree1FutureSize     : data.Tree1FutureSize,
          Tree2FutureSize     : data.Tree2FutureSize,
          Tree3FutureSize     : data.Tree3FutureSize,
          Tree4FutureSize     : data.Tree4FutureSize,
          TrialNo             : data.TrialNo,
          UnusedTree          : data.UnusedTree,
          UserNo              : data.UserNo,
        }

        this.setState({
          start_block:0,
          disp_new_block:1,
          block_info: block_info,
        });
      })
  }

  sendBlock(user_no_,block_no_){

    let block_id   = this.state.block_info.block_number
    let trial_per_block = this.state.trial_per_block
    let past_block_no = block_no_-1
    let block_first_trial_no = this.state.block_start_trials[past_block_no-1]
    let tmp_chosen_tree = this.state.chosen_tree
    let tmp_chosen_apple_size = this.state.chosen_apple_size

    let trials = [];
    let block_chosen_tree = [];

    trials[0] = block_first_trial_no
    block_chosen_tree[0] = tmp_chosen_tree[trials[0]-1];
    block_chosen_tree[0] = tmp_chosen_tree[trials[0]-1];

    for (var i = 1; i < trial_per_block; i++){
      trials[i] = trials[i-1] + 1;
      block_chosen_tree[i] = tmp_chosen_tree[trials[i]-1];
    }

    console.log("sendBlock", "trials", trials, "block_chosen_tree", block_chosen_tree)

    let behaviour = {       'blockNo'          : past_block_no,
                            'tree_colours'     : this.state.tree_col,
                            'chosen_tree'      : this.state.chosen_tree,
                            'chosen_apple_size': this.state.chosen_apple_size,
                            'all_key_pressed'  : this.state.all_key_pressed}

  console.log("sendBlock", "behaviour", behaviour)

    fetch(`${API_URL}/participants_data/create/` + this.state.participant_info.participant_id + `/` + block_id + `/` + this.state.participant_info.prolific_id, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(behaviour)
     })

    this.props.history.push({
      pathname: `/Block`,
      state: {participant_info:this.state.participant_info, newblock_frame : false}
    })
  }

  render() {

    var trial_index = this.state.TrialNo-1;

    if (this.state.BlockNo>this.state.BlockNb) {
      console.log("Finished","this.state.chosen_tree",this.state.chosen_tree, "this.state.all_key_pressed",this.state.all_key_pressed)
      return <Block block_i={this.state.BlockNo} BlockNb={this.state.BlockNb}/>
      }

    else if (this.state.start_block===1) {
      console.log("1.fetch data")
      var BlockNo = this.state.BlockNo;
      this.fetchBlock(this.state.UserNo, BlockNo);
      return 0
      }

    else if (this.state.disp_new_block===1) {
      console.log("2.display")
      document.addEventListener("keydown", this._handleKeyDownSpace);
      return <Block block_i={this.state.block_info.BlockNo[trial_index]} BlockNb={this.state.BlockNb}/>
    }

    else {
      switch(this.state.disp_juice) {
          case 0:
              console.log("3.start")
              return (
                  <div className="shift">

                      {this.listenner(trial_index)}

                      {/* background.*/}
                      <Farm apples_picked={this.state.SampleNo} hor={this.state.block_info.Horizon[trial_index]} col={this.state.tree_col[trial_index]}/>

                      {/* display all boxes. Depends on trial and condition. */}
                      {this.disp_current_apples(trial_index)}

                  </div>
                );
          case 1:
            console.log("4.juice")
            return (
                <div className="shift">

                  {this.listenner(trial_index)}

                  {this.disp_juice(trial_index)}

                </div>
            );
          default:
          }
      }
  }

  disp_juice(trial_index) {

    var mean_score=this.compute_score();

    return <Juice mean_score={mean_score} hor={this.state.block_info.Horizon[trial_index]}/>

   }

  pick_apple(tree, key_pressed) {

    var trial_index = this.state.TrialNo-1;

    var Tree1FutureSize = this.state.block_info.Tree1FutureSize[trial_index];
    var Tree2FutureSize = this.state.block_info.Tree2FutureSize[trial_index];
    var Tree3FutureSize = this.state.block_info.Tree3FutureSize[trial_index];
    var Tree4FutureSize = this.state.block_info.Tree4FutureSize[trial_index];

    var all_key_pressed = this.state.all_key_pressed;
    var chosen_tree = this.state.chosen_tree;
    var chosen_apple_size = this.state.chosen_apple_size;

    var SampleNo = this.state.SampleNo;

    SampleNo++;

    chosen_tree[trial_index][SampleNo-1] = tree;
    all_key_pressed[trial_index][SampleNo-1] = key_pressed;

    switch(tree) {
        case 1:
            chosen_apple_size[trial_index][SampleNo-1]=Tree1FutureSize[SampleNo-1];
            break;
        case 2:
            chosen_apple_size[trial_index][SampleNo-1]=Tree2FutureSize[SampleNo-1];
            break;
        case 3:
            chosen_apple_size[trial_index][SampleNo-1]=Tree3FutureSize[SampleNo-1];
            break;
        case 4:
            chosen_apple_size[trial_index][SampleNo-1]=Tree4FutureSize[SampleNo-1];
            break;
        default:
        }

        console.log("chosen_tree", chosen_tree)

      this.setState({
        all_key_pressed: all_key_pressed,
        chosen_tree: chosen_tree,
        chosen_apple_size: chosen_apple_size,
        SampleNo: SampleNo,
      });
    }

  disp_current_apples(trial_index) {

      var InitialSampleNb = this.state.block_info.InitialSampleNb[trial_index];
      var InitialSamples_Tree = this.state.block_info.InitialSamples_Tree[trial_index];
      var InitialSamples_Size = this.state.block_info.InitialSamples_Size[trial_index];
      var TreePositions = this.state.block_info.TreePositions[trial_index];
      var Horizon = this.state.block_info.Horizon[trial_index];
      var SampleNo = this.state.SampleNo;
      var chosen_tree = this.state.chosen_tree;
      var chosen_apple_size = this.state.chosen_apple_size;

      let all_boxes=[];

      for (var i=0; i<InitialSampleNb; i++) {
        all_boxes.push(this.renderApple(InitialSamples_Size[i],TreePositions[InitialSamples_Tree[i]-1]))
      }

      for (i=0; i<SampleNo; i++) {
        all_boxes.push(this.renderApple(chosen_apple_size[trial_index][i],TreePositions[chosen_tree[trial_index][i]-1]))
      }

      for (i=InitialSampleNb+SampleNo; i<InitialSampleNb+Horizon; i++) {
        all_boxes.push(this.renderApple('',''))
      }

    return all_boxes;
  }

  compute_score() {

      var chosen_apple_size = this.state.chosen_apple_size;

      var sum = 0;

      for (var i=0; i<chosen_apple_size.length; i++){
        sum += parseInt(chosen_apple_size[i], 10);
      }

      var mean_score = Math.round(sum/chosen_apple_size.length);

      return mean_score;
    }

  renderApple(val, tree_i){
          var trial_index = this.state.TrialNo-1;
          return <Apple value={val} tree={tree_i} col={this.state.tree_col[trial_index]}/>;
        }

  listenner(trial_index) {

    document.removeEventListener("keydown", this._handleKeyDownSpace)
    document.removeEventListener("keydown", this._handleKeyDownTree)
    document.removeEventListener("keydown", this._handleKeyDownEnter)

    let tmp_apples_picked = this.state.SampleNo;
    var tmp_apples_to_pick = this.state.block_info.Horizon[trial_index];

    if (tmp_apples_picked < tmp_apples_to_pick){
      console.log("listenning to numbers")
      return document.addEventListener("keydown", this._handleKeyDownTree);
      }

    else {
      console.log("listenning to enter")
      return document.addEventListener("keydown", this._handleKeyDownEnter);
      }
    }

  _handleKeyDownTree = (event) => {

    var trial_index = this.state.TrialNo-1;
    var DisplayOrder = this.state.block_info.DisplayOrder[trial_index];
    var key_pressed;

    switch( event.keyCode ) {
        case 97:
          key_pressed = 1;
          this.pick_apple(DisplayOrder[0], key_pressed);
          break;
        case 98:
          key_pressed = 2;
          this.pick_apple(DisplayOrder[1], key_pressed);
          break;
        case 99:
          key_pressed = 3;
          this.pick_apple(DisplayOrder[2], key_pressed);
          break;
        case 49:
          key_pressed = 1;
          this.pick_apple(DisplayOrder[0], key_pressed);
          break;
        case 50:
          key_pressed = 2;
          this.pick_apple(DisplayOrder[1], key_pressed);
          break;
        case 51:
          key_pressed = 3;
          this.pick_apple(DisplayOrder[2], key_pressed);
          break;
        default:
      }
  }

  _handleKeyDownEnter = (event) => {

    var disp_juice = this.state.disp_juice;

    switch( event.keyCode ) {
        case 13:
            if (disp_juice === 0){
              this.setState({
                disp_juice:1,
              });
            }
            else if (disp_juice === 1){

              var TrialNo = this.state.TrialNo;
              var trial_per_block = this.state.trial_per_block;
              var start_block = this.state.start_block;
              var BlockNo = this.state.BlockNo;

              if(TrialNo%trial_per_block===0){
                start_block = 1;
                BlockNo++;
                this.sendBlock(this.state.UserNo, BlockNo);
              }

              TrialNo++;

              this.setState({
                disp_juice:0,
                TrialNo: TrialNo,
                SampleNo: 0,
                start_block: start_block,
                BlockNo: BlockNo,
              });
            }
            break;
        default:
      }
  }

  _handleKeyDownSpace = (event) => {
    switch( event.keyCode ) {
        case 32:
          if(this.state.disp_new_block === 1){
            this.setState({disp_new_block: 0});
          }
            break;
        default:
      }
  }

};

export default Game;
