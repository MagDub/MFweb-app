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

    /* fill in random colors .*/
    var BlockNb = 4;
    var random_col=[];
    for (var j=0; j<BlockNb; j++){
      random_col[j]=[];
      for (var i=0; i<trial_per_block; i++){
        random_col[j][i] = Math.round(Math.random() * 7)+1
      };
    };

    /* data to be saved .*/
    var chosen_tree = Array(trial_per_block).fill().map(() => Array(6).fill(0));
    var chosen_apple_size = Array(trial_per_block).fill().map(() => Array(6).fill(0));
    var all_key_pressed = Array(trial_per_block).fill().map(() => Array(6).fill(0));

    this.state = {
      BlockNb: BlockNb,
      start_block: 1,
      disp_new_block: 0,
      disp_juice: 0,
      TrialNo: 1,
      TrialInBlockNo:1,
      SampleNo: 0,
      BlockNo: 1,
      block_info: {},
      tree_col:random_col,
      chosen_tree:chosen_tree,
      chosen_apple_size:chosen_apple_size,
      all_key_pressed: all_key_pressed,
      trial_per_block: trial_per_block,
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
        }

        this.setState({
          start_block:0,
          disp_new_block:1,
          block_info: block_info,
          TrialNo: block_info.TrialNo[0],
        });
      })
  }

  sendBlock(user_no_,block_no_){

    let block_id   = this.state.block_info.block_number
    let trial_per_block = this.state.trial_per_block
    let ind_block = block_no_-1

    let block_first_trial = trial_per_block*ind_block;
    let block_last_trial = trial_per_block*ind_block+trial_per_block;

    let chosen_tree = this.state.chosen_tree
    let chosen_apple_size = this.state.chosen_apple_size
    let all_key_pressed = this.state.all_key_pressed
    var subset_InitialSampleNb = this.state.block_info.InitialSampleNb.slice(block_first_trial,block_last_trial);
    var subset_InitialSamples_Tree = this.state.block_info.InitialSamples_Tree.slice(block_first_trial,block_last_trial);
    var subset_InitialSamples_Size = this.state.block_info.InitialSamples_Size.slice(block_first_trial,block_last_trial);
    var subset_ItemNo = this.state.block_info.ItemNo.slice(block_first_trial,block_last_trial);
    var subset_TrialNo = this.state.block_info.TrialNo.slice(block_first_trial,block_last_trial);
    var subset_UnusedTree = this.state.block_info.UnusedTree.slice(block_first_trial,block_last_trial);
    var subset_TreePositions = this.state.block_info.TreePositions.slice(block_first_trial,block_last_trial);
    var subset_Horizon = this.state.block_info.Horizon.slice(block_first_trial,block_last_trial);

    let behaviour = {       'BlockNo'             : block_no_,
                            'TreeColours'         : this.state.tree_col[ind_block],
                            'ChosenTree'          : chosen_tree,
                            'ChosenAppleSize'     : chosen_apple_size,
                            'AllKeyPressed'       : all_key_pressed,
                            'Horizon'             : subset_Horizon,
                            'ItemNo'              : subset_ItemNo,
                            'TrialNo'             : subset_TrialNo,
                            'UnusedTree'          : subset_UnusedTree,
                            'InitialSamplesNb'    : subset_InitialSampleNb,
                            'InitialSamplesTree'  : subset_InitialSamples_Tree,
                            'InitialSamplesSize'  : subset_InitialSamples_Size,
                            'TreePositions'       : subset_TreePositions}

    console.log("sendBlock", "behaviour", behaviour)

    fetch(`${API_URL}/behaviour/` + user_no_ + `/` + block_no_, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(behaviour)
     })
  }

  render() {

    var trial_index = this.state.TrialNo-1;
    var trialinblock_index = this.state.TrialInBlockNo-1;

    if (this.state.BlockNo>this.state.BlockNb) {
      console.log("Finished","this.state.chosen_tree",this.state.chosen_tree, "this.state.all_key_pressed",this.state.all_key_pressed)
      document.addEventListener("keydown", this._handleKeyDownSpace);
      return <Block block_i={this.state.BlockNo} BlockNb={this.state.BlockNb}/>
      }

    else if (this.state.start_block===1) {
      console.log("1.fetch data")
      var BlockNo = this.state.BlockNo;
      this.fetchBlock(this.props.UserNo, BlockNo);
      return 0
      }

    else if (this.state.disp_new_block===1) {
      console.log("2.display")
      document.removeEventListener("keydown", this._handleKeyDownTree);
      document.removeEventListener("keydown", this._handleKeyDownEnter);
      document.addEventListener("keydown", this._handleKeyDownSpace);
      return <Block block_i={this.state.block_info.BlockNo[trialinblock_index]} BlockNb={this.state.BlockNb}/>
    }

    else {
      switch(this.state.disp_juice) {
          case 0:

              var current_block = this.state.block_info.BlockNo[trialinblock_index];
              console.log("3.start")

              return (
                  <div className="shift">

                      {this.listenner(trialinblock_index)}

                      {/* background.*/}
                      <Farm apples_picked={this.state.SampleNo} hor={this.state.block_info.Horizon[trialinblock_index]} col={this.state.tree_col[current_block-1][trialinblock_index]}/>

                      {/* display all boxes. Depends on trial and condition. */}
                      {this.disp_current_apples(trialinblock_index)}

                  </div>
                );
          case 1:
            console.log("4.juice", "for trial", trial_index+1)
            return (
                <div className="shift">

                  {this.listenner(trialinblock_index)}

                  {this.disp_juice(trialinblock_index)}

                </div>
            );
          default:
          }
      }
  }

  disp_juice(trialinblock_index) {

    var mean_score=this.compute_score(trialinblock_index);
    var TrialNo = this.state.TrialNo;
    var trial_per_block = this.state.trial_per_block;
    var BlockNo = this.state.BlockNo;

    if(TrialNo%trial_per_block===0){
      this.sendBlock(this.props.UserNo, BlockNo);
    }

    return <Juice mean_score={mean_score} hor={this.state.block_info.Horizon[trialinblock_index]}/>
   }

  pick_apple(tree, key_pressed) {

    var trial_index = this.state.TrialNo-1;
    var trialinblock_index = this.state.TrialInBlockNo-1;

    var Tree1FutureSize = this.state.block_info.Tree1FutureSize[trialinblock_index];
    var Tree2FutureSize = this.state.block_info.Tree2FutureSize[trialinblock_index];
    var Tree3FutureSize = this.state.block_info.Tree3FutureSize[trialinblock_index];
    var Tree4FutureSize = this.state.block_info.Tree4FutureSize[trialinblock_index];

    var all_key_pressed = this.state.all_key_pressed;
    var chosen_tree = this.state.chosen_tree;
    var chosen_apple_size = this.state.chosen_apple_size;

    var SampleNo = this.state.SampleNo;

    SampleNo++;

    chosen_tree[trialinblock_index][SampleNo-1] = tree;
    all_key_pressed[trialinblock_index][SampleNo-1] = key_pressed;

    switch(tree) {
        case 1:
            chosen_apple_size[trialinblock_index][SampleNo-1]=Tree1FutureSize[SampleNo-1];
            break;
        case 2:
            chosen_apple_size[trialinblock_index][SampleNo-1]=Tree2FutureSize[SampleNo-1];
            break;
        case 3:
            chosen_apple_size[trialinblock_index][SampleNo-1]=Tree3FutureSize[SampleNo-1];
            break;
        case 4:
            chosen_apple_size[trialinblock_index][SampleNo-1]=Tree4FutureSize[SampleNo-1];
            break;
        default:
        }

      this.setState({
        all_key_pressed: all_key_pressed,
        chosen_tree: chosen_tree,
        chosen_apple_size: chosen_apple_size,
        SampleNo: SampleNo,
      });
    }

  disp_current_apples(trialinblock_index) {

      var InitialSampleNb = this.state.block_info.InitialSampleNb[trialinblock_index];
      var InitialSamples_Tree = this.state.block_info.InitialSamples_Tree[trialinblock_index];
      var InitialSamples_Size = this.state.block_info.InitialSamples_Size[trialinblock_index];
      var TreePositions = this.state.block_info.TreePositions[trialinblock_index];
      var Horizon = this.state.block_info.Horizon[trialinblock_index];
      var SampleNo = this.state.SampleNo;
      var chosen_tree = this.state.chosen_tree;
      var chosen_apple_size = this.state.chosen_apple_size;

      let all_boxes=[];

      for (var i=0; i<InitialSampleNb; i++) {
        all_boxes.push(this.renderApple(InitialSamples_Size[i],TreePositions[InitialSamples_Tree[i]-1]))
      }

      for (i=0; i<SampleNo; i++) {
        all_boxes.push(this.renderApple(chosen_apple_size[trialinblock_index][i],TreePositions[chosen_tree[trialinblock_index][i]-1]))
      }

      for (i=InitialSampleNb+SampleNo; i<InitialSampleNb+Horizon; i++) {
        all_boxes.push(this.renderApple('',''))
      }

    return all_boxes;
  }

  compute_score(trialinblock_index) {

      var chosen_apple_size = this.state.chosen_apple_size[trialinblock_index];
      var Horizon = this.state.block_info.Horizon[trialinblock_index];

      var sum = 0;

      for (var i=0; i<chosen_apple_size.length; i++){
        sum += parseInt(chosen_apple_size[i], 10);
      }

      var mean_score = Math.round(sum/Horizon);

      console.log("compute_score", "mean_score", mean_score)

      return mean_score;
    }

  renderApple(val, tree_i){

          var trial_index = this.state.TrialNo-1;
          var trialinblock_index = this.state.TrialInBlockNo-1;
          var current_block_index = this.state.block_info.BlockNo[trialinblock_index]-1;

          return <Apple value={val} tree={tree_i} col={this.state.tree_col[current_block_index][trialinblock_index]}/>;
        }

  listenner(trialinblock_index) {

    document.removeEventListener("keydown", this._handleKeyDownSpace)
    document.removeEventListener("keydown", this._handleKeyDownTree)
    document.removeEventListener("keydown", this._handleKeyDownEnter)

    let tmp_apples_picked = this.state.SampleNo;
    var tmp_apples_to_pick = this.state.block_info.Horizon[trialinblock_index];

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

    var trialinblock_index = this.state.TrialInBlockNo-1;
    var DisplayOrder = this.state.block_info.DisplayOrder[trialinblock_index];
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
                var TrialInBlockNo = this.state.TrialInBlockNo;
                var trial_per_block = this.state.trial_per_block;
                var start_block = this.state.start_block;
                var BlockNo = this.state.BlockNo;
                var chosen_tree = this.state.chosen_tree;
                var chosen_apple_size = this.state.chosen_apple_size;
                var all_key_pressed = this.state.all_key_pressed;

                if(TrialNo%trial_per_block===0){
                  start_block = 1;
                  TrialInBlockNo = 0;
                  chosen_tree = Array(trial_per_block).fill().map(() => Array(6).fill(0));
                  chosen_apple_size = Array(trial_per_block).fill().map(() => Array(6).fill(0));
                  all_key_pressed = Array(trial_per_block).fill().map(() => Array(6).fill(0));
                  BlockNo++;
                }

                TrialNo++;
                TrialInBlockNo++;

                this.setState({
                  disp_juice:0,
                  TrialNo: TrialNo,
                  TrialInBlockNo: TrialInBlockNo,
                  SampleNo: 0,
                  start_block: start_block,
                  chosen_tree: chosen_tree,
                  chosen_apple_size: chosen_apple_size,
                  all_key_pressed: all_key_pressed,
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
          if (this.state.BlockNo>this.state.BlockNb) {
            this.props.nextTransition(1);
            document.removeEventListener("keydown", this._handleKeyDownSpace)
            document.removeEventListener("keydown", this._handleKeyDownSpace)
          }
          else {
            this.setState({disp_new_block: 0});
          }
            break;
        default:
      }
  }

};

export default Game;
