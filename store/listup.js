
export const state = () => ({
  file_data : [],
  subject_name : ''
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
  }
}

export const actions = {
  KeyDown({ commit,state },event){}
}