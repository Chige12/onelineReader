
export const state = () => ({
  file_data : [],
  subject_name : '',
  judge_style : 'four' // or two
})

export const getters = { //computed
  sorted_filename (state) {
    return state.file_data
  },
  scroll_files (state) {
    return state.file_data.filter(
      f => f.whiteout === false
    );
  },
  oneline_files (state) {
    return state.file_data.filter(
      f => f.whiteout === true
    );
  },
  unique_stories (state) {
    let story_list = state.file_data.map( f => f.story );
    var unique_stories = story_list.filter((v1, i1, a1) => { //重複削除
      return (
        a1.findIndex(v2 => {
          return v1.id === v2.id;
        }) === i1
      );
    });
    return unique_stories;
  },
  unique_users (state) {
    let user_list = state.file_data.map( f => f.name );
    var unique_users = user_list.filter((name1, i1, a1) => { //重複削除
      return (
        a1.findIndex(name2 => {
          return name1 === name2;
        }) === i1
      );
    });
    return unique_users;
  }
}

export const mutations = {
  file_update (state,data) {
    let file = [...data]
    function compare(a, b) {
      const A = a.fileName
      const B = b.fileName
      let comparison = 0;
      if (A > B) { comparison = 1; }
      else if ( A < B ) { comparison = -1; }
      return comparison;
    }
    state.file_data = file.sort(compare)
  },
  file_delete(state,key){
    let deleted_file_data = state.file_data.filter((v,i)=> i !== key)
    state.file_data = deleted_file_data
  },
  updateSubjectName (state,name) {
    state.subject_name = name
  },
  judgmentUpdate(state,data_ary){
    for (let i = 0; i < state.file_data.length; i++) {
      if(state.file_data[i].fileName === data_ary.file_name){
        if(state.file_data[i].judgment[data_ary.judgment_key].judge !== data_ary.judge){
          state.file_data[i].judgment[data_ary.judgment_key].judge = data_ary.judge
        }
      }
    }
  },
  changeJudgeStyle(state){
    state.judge_style = state.judge_style === 'four' ? 'two' : 'four'
  },
  addGazeData(state,gaze_arr){
    let newFile = [...state.file_data]
    for (let i = 0; i < gaze_arr.length; i++) {
      for (let j = 0; j < newFile.length; j++) {
        if((newFile[j].story.id === `story_${gaze_arr[i].story}`)){
          let userToUser = [
            ['近藤亘','kondou'],
            ['mandai yusuke','mandai yusuke'],
            ['chaen','tyaen'],
            ['西川　勇太','nisikawa yuuta'],
            ['hosomi','hosomi'],
            ['田渕 真輝','tabuti maki'],
            ['藤本　祥','fujimoto sho'],
            ['初田 玲音','hatuda leon'],
            ['森田悟大',],
            ['池山'],
            ['薮内'],
            ['西野修馬','nishinosyuma'],
            ['中尾　翔也'],
            ['藤原康太','fujiwara'],
            ['西谷','nishitani'],
            ['深瀬','fukase'],
            ['奥村　誠','okumura']
          ]
          for (let k = 0; k < userToUser.length; k++) {
            if(newFile[j].name === userToUser[k][0] && gaze_arr[i].author === userToUser[k][1]){
              state.file_data[j].maxFixation = gaze_arr[i].maxFixation
              break;
            }
          }
        }
      }
    }
  }
}

export const actions = {
  KeyDown({ commit,state },event){}
}