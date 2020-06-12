import React from 'react';
import Farm from './farm';
import Apple from './apple';
import Juice from './juice';
import Block from './block';
import './style/game.css';
import './style/juice.css';
import { API_URL } from './config';
import { handleResponse } from './helpers'; // imports json

class Game extends React.Component{

  constructor(props) {
    super(props);

    var trial_per_block = 100;

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
    var reaction_times = Array(trial_per_block).fill().map(() => Array(7).fill(0));

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
      reaction_times: reaction_times,
      trial_per_block: trial_per_block,
      mounted: 0,
      image_bg_SH_1:["farm1_6", "farm1_6", "farm1_7"],
      image_bg_LH_1:["farm1_1", "farm1_1", "farm1_2", "farm1_3", "farm1_4", "farm1_5", "farm1_6", "farm1_7"],
      image_bg_SH_2:["farm2_6", "farm2_6", "farm2_7"],
      image_bg_LH_2:["farm2_1", "farm2_1", "farm2_2", "farm2_3", "farm2_4", "farm2_5", "farm2_6", "farm2_7"],
      image_bg_SH_3:["farm3_6", "farm3_6", "farm3_7"],
      image_bg_LH_3:["farm3_1", "farm3_1", "farm3_2", "farm3_3", "farm3_4", "farm3_5", "farm3_6", "farm3_7"],
      image_bg_SH_4:["farm4_6", "farm4_6", "farm4_7"],
      image_bg_LH_4:["farm4_1", "farm4_1", "farm4_2", "farm4_3", "farm4_4", "farm4_5", "farm4_6", "farm4_7"],
      image_bg_SH_5:["farm5_6", "farm5_6", "farm5_7"],
      image_bg_LH_5:["farm5_1", "farm5_1", "farm5_2", "farm5_3", "farm5_4", "farm5_5", "farm5_6", "farm5_7"],
      image_bg_SH_6:["farm6_6", "farm6_6", "farm6_7"],
      image_bg_LH_6:["farm6_1", "farm6_1", "farm6_2", "farm6_3", "farm6_4", "farm6_5", "farm6_6", "farm6_7"],
      image_bg_SH_7:["farm7_6", "farm7_6", "farm7_7"],
      image_bg_LH_7:["farm7_1", "farm7_1", "farm7_2", "farm7_3", "farm7_4", "farm7_5", "farm7_6", "farm7_7"],
      image_bg_SH_8:["farm8_6", "farm8_6", "farm8_7"],
      image_bg_LH_8:["farm8_1", "farm8_1", "farm8_2", "farm8_3", "farm8_4", "farm8_5", "farm8_6", "farm8_7"],
      image_juice_small:["juice_small_1", "juice_small_2", "juice_small_3", "juice_small_4", "juice_small_5", "juice_small_6", "juice_small_7", "juice_small_8", "juice_small_9", "juice_small_10"],
      image_juice_big:["juice_big_1", "juice_big_2", "juice_big_3", "juice_big_4", "juice_big_5", "juice_big_6", "juice_big_7", "juice_big_8", "juice_big_9", "juice_big_10"],
      }

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener('keydown', function(e) {
      if(e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });

    this.fetchBlock.bind(this);
  }

  componentDidMount() {

    this.setState({
        mounted:1,
      });
  }

  fetchBlock(user_no_,block_no_){

    var currentDate   = new Date();
    var BlockStartTime    = currentDate.toTimeString();

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
          timeout_duration    : 5000,
        }

        this.setState({
          start_block:0,
          disp_new_block:1,
          block_info: block_info,
          TrialNo: block_info.TrialNo[0],
          BlockStartTime: BlockStartTime,
        });
      })
  }

  sendBlock(user_no_,block_no_){

    var currentDate   = new Date();
    var BlockFinishTime    = currentDate.toTimeString();

    var StartTime= this.props.StartTime;

    let BlockStartTime = this.state.BlockStartTime;

    let trial_per_block = this.state.trial_per_block;
    let ind_block = block_no_-1;

    let chosen_tree = this.state.chosen_tree
    let chosen_apple_size = this.state.chosen_apple_size
    let all_key_pressed = this.state.all_key_pressed
    let reaction_times = this.state.reaction_times
    var prolific_id = this.props.prolific_id;

    var subset_Horizon = this.state.block_info.Horizon.slice(0,trial_per_block);
    var subset_InitialSampleNb = this.state.block_info.InitialSampleNb.slice(0,trial_per_block);
    var subset_InitialSamples_Tree = this.state.block_info.InitialSamples_Tree.slice(0,trial_per_block);
    var subset_InitialSamples_Size = this.state.block_info.InitialSamples_Size.slice(0,trial_per_block);
    var subset_ItemNo = this.state.block_info.ItemNo.slice(0,trial_per_block);
    var subset_TrialNo = this.state.block_info.TrialNo.slice(0,trial_per_block);
    var subset_UnusedTree = this.state.block_info.UnusedTree.slice(0,trial_per_block);
    var subset_TreePositions = this.state.block_info.TreePositions.slice(0,trial_per_block);

    let behaviour = {       'BlockNo'             : block_no_,
                            'UserStartTime'       : StartTime,
                            'ProlificID'          : prolific_id,
                            'BlockStartTime'      : BlockStartTime,
                            'BlockFinishTime'     : BlockFinishTime,
                            'TreeColours'         : this.state.tree_col[ind_block],
                            'ChosenTree'          : chosen_tree,
                            'ChosenAppleSize'     : chosen_apple_size,
                            'AllKeyPressed'       : all_key_pressed,
                            'ReactionTimes'       : reaction_times,
                            'Horizon'             : subset_Horizon,
                            'ItemNo'              : subset_ItemNo,
                            'TrialNo'             : subset_TrialNo,
                            'UnusedTree'          : subset_UnusedTree,
                            'InitialSamplesNb'    : subset_InitialSampleNb,
                            'InitialSamplesTree'  : subset_InitialSamples_Tree,
                            'InitialSamplesSize'  : subset_InitialSamples_Size,
                            'TreePositions'       : subset_TreePositions}

    //console.log("sendBlock", "behaviour", behaviour)

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

    if (this.state.mounted===1) {

      var trialinblock_index = this.state.TrialInBlockNo-1;

      if (this.state.BlockNo>this.state.BlockNb) {
        document.addEventListener("keyup", this._handleKeyDownSpace);
        return <Block block_i={this.state.BlockNo} BlockNb={this.state.BlockNb}/>
        }

      else if (this.state.start_block===1) {
        //console.log("fetch data")
        var BlockNo = this.state.BlockNo;
        this.fetchBlock(this.props.UserNo, BlockNo);
        return null
        }

      else if (this.state.disp_new_block===1) {
        document.removeEventListener("keyup", this._handleKeyDownTree);
        document.addEventListener("keyup", this._handleKeyDownSpace);
        return <Block block_i={this.state.block_info.BlockNo[trialinblock_index]} BlockNb={this.state.BlockNb}/>
      }

      else {
        switch(this.state.disp_juice) {
            case 0:

                var current_block = this.state.block_info.BlockNo[trialinblock_index];
                var col = this.state.tree_col[current_block-1][trialinblock_index];
                var hor = this.state.block_info.Horizon[trialinblock_index];
                var disp;

                if (hor===1){
                  switch(col) {
                      case 1:
                        disp = this.state.image_bg_SH_1; break;
                      case 2:
                        disp = this.state.image_bg_SH_2; break;
                      case 3:
                        disp = this.state.image_bg_SH_3; break;
                      case 4:
                        disp = this.state.image_bg_SH_4; break;
                      case 5:
                        disp = this.state.image_bg_SH_5; break;
                      case 6:
                        disp = this.state.image_bg_SH_6; break;
                      case 7:
                        disp = this.state.image_bg_SH_7; break;
                      case 8:
                        disp = this.state.image_bg_SH_8; break;
                      default:
                    }
                  }

                  else if (hor===6){
                    switch(col) {
                        case 1:
                          disp = this.state.image_bg_LH_1; break;
                        case 2:
                          disp = this.state.image_bg_LH_2; break;
                        case 3:
                          disp = this.state.image_bg_LH_3; break;
                        case 4:
                          disp = this.state.image_bg_LH_4; break;
                        case 5:
                          disp = this.state.image_bg_LH_5; break;
                        case 6:
                          disp = this.state.image_bg_LH_6; break;
                        case 7:
                          disp = this.state.image_bg_LH_7; break;
                        case 8:
                          disp = this.state.image_bg_LH_8; break;
                        default:
                      }
                    }

                return (
                    <div className="shift">

                        {this.listenner(trialinblock_index)}

                        {/* background.*/}
                        <Farm apples_picked={this.state.SampleNo} disp={disp}/>

                        {/* display all boxes. Depends on trial and condition. */}
                        {this.disp_current_apples(trialinblock_index)}

                    </div>
                  );
            case 1:
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

      else {
        console.log("not ready")
        return null
      }
  }

  disp_juice(trialinblock_index) {

    var mean_score=this.compute_score(trialinblock_index);
    var TrialNo = this.state.TrialNo;
    var trial_per_block = this.state.trial_per_block;
    var BlockNo = this.state.BlockNo;
    var TrialInBlockNo = this.state.TrialInBlockNo;
    var start_block = this.state.start_block;
    var chosen_tree;
    var chosen_apple_size;
    var all_key_pressed;
    var reaction_times;


    if(TrialNo%trial_per_block===0){
      this.sendBlock(this.props.UserNo, BlockNo);
    }

    if(TrialNo%trial_per_block===0){
      start_block = 1;
      TrialInBlockNo = 0;
      chosen_tree = Array(trial_per_block).fill().map(() => Array(6).fill(0));
      chosen_apple_size = Array(trial_per_block).fill().map(() => Array(6).fill(0));
      all_key_pressed = Array(trial_per_block).fill().map(() => Array(6).fill(0));
      reaction_times = Array(trial_per_block).fill().map(() => Array(7).fill(0));
      reaction_times[0][0] = Math.round(performance.now())+500;
      BlockNo++;
    }
    else{
      chosen_tree = this.state.chosen_tree;
      chosen_apple_size = this.state.chosen_apple_size;
      all_key_pressed = this.state.all_key_pressed;
      reaction_times = this.state.reaction_times;
      reaction_times[trialinblock_index+1][0] = Math.round(performance.now())+500;
    }

    TrialNo++;
    TrialInBlockNo++;

    setTimeout(
      function() {
        this.setState({
          reaction_times: reaction_times,
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
      .bind(this),
      500
    );

    var image_juice;
    var shift_mean_score = mean_score - 1; // shift size (2,10) to (1,9)
    var ind_mean_score = shift_mean_score - 1;
    var hor = this.state.block_info.Horizon[trialinblock_index];


    if (hor===1) {
      image_juice = this.state.image_juice_small[ind_mean_score];
    }
    else if (hor===6) {
      image_juice = this.state.image_juice_big[ind_mean_score];
    }

    return <Juice image_juice={image_juice}/>;

   }

  pick_apple(tree, key_pressed, time_pressed) {

    var trialinblock_index = this.state.TrialInBlockNo-1;

    var Tree1FutureSize = this.state.block_info.Tree1FutureSize[trialinblock_index];
    var Tree2FutureSize = this.state.block_info.Tree2FutureSize[trialinblock_index];
    var Tree3FutureSize = this.state.block_info.Tree3FutureSize[trialinblock_index];
    var Tree4FutureSize = this.state.block_info.Tree4FutureSize[trialinblock_index];

    var all_key_pressed = this.state.all_key_pressed;
    var reaction_times = this.state.reaction_times;
    var chosen_tree = this.state.chosen_tree;
    var chosen_apple_size = this.state.chosen_apple_size;

    var SampleNo = this.state.SampleNo;

    SampleNo++;

    reaction_times[trialinblock_index][SampleNo] = time_pressed;
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

      return mean_score;
    }

  renderApple(val, tree_i){

          var trialinblock_index = this.state.TrialInBlockNo-1;
          var current_block_index = this.state.block_info.BlockNo[trialinblock_index]-1;

          return <Apple value={val} tree={tree_i} col={this.state.tree_col[current_block_index][trialinblock_index]}/>;
        }

  listenner(trialinblock_index) {

    document.removeEventListener("keyup", this._handleKeyDownSpace)
    document.removeEventListener("keyup", this._handleKeyDownTree)

    let tmp_apples_picked = this.state.SampleNo;
    var tmp_apples_to_pick = this.state.block_info.Horizon[trialinblock_index];

    if (tmp_apples_picked < tmp_apples_to_pick){
      return document.addEventListener("keyup", this._handleKeyDownTree);
      }

    else {

      var disp_juice = this.state.disp_juice;

      if (disp_juice === 0){
        setTimeout(
          function() {
            this.setState({
              disp_juice:1,
              });
            }
            .bind(this),
            500
          );
        }
      }
    }

  _handleKeyDownTree = (event) => {

    var trialinblock_index = this.state.TrialInBlockNo-1;
    var DisplayOrder = this.state.block_info.DisplayOrder[trialinblock_index];
    var key_pressed;
    var time_pressed;

    switch( event.keyCode ) {
        case 97:
          key_pressed = 1;
          time_pressed = Math.round(performance.now());
          this.pick_apple(DisplayOrder[0], key_pressed, time_pressed);
          break;
        case 98:
          key_pressed = 2;
          time_pressed = Math.round(performance.now());
          this.pick_apple(DisplayOrder[1], key_pressed, time_pressed);
          break;
        case 99:
          key_pressed = 3;
          time_pressed = Math.round(performance.now());
          this.pick_apple(DisplayOrder[2], key_pressed, time_pressed);
          break;
        case 49:
          key_pressed = 1;
          time_pressed = Math.round(performance.now());
          this.pick_apple(DisplayOrder[0], key_pressed, time_pressed);
          break;
        case 50:
          key_pressed = 2;
          time_pressed = Math.round(performance.now());
          this.pick_apple(DisplayOrder[1], key_pressed, time_pressed);
          break;
        case 51:
          key_pressed = 3;
          time_pressed = Math.round(performance.now());
          this.pick_apple(DisplayOrder[2], key_pressed, time_pressed);
          break;
        default:
      }
  }

  _handleKeyDownSpace = (event) => {
    switch( event.keyCode ) {
        case 32:

        var trialinblock_index = this.state.TrialInBlockNo-1; // should be zero
        var reaction_times = this.state.reaction_times;
        var SampleNo = this.state.SampleNo;

        reaction_times[trialinblock_index][SampleNo] = Math.round(performance.now());

          if (this.state.BlockNo>this.state.BlockNb) {
            this.props.nextTransition(1);
            document.removeEventListener("keyup", this._handleKeyDownSpace)
            document.removeEventListener("keyup", this._handleKeyDownSpace)
          }
          else {
            this.setState({
              disp_new_block: 0,
              reaction_times: reaction_times
            });
          }
            break;
        default:
      }
  }

};

export default Game;
