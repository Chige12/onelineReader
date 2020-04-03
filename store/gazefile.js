export const state = () => ({
  file_data : [],
})

export const getters = {
  sorted_filename (state) {
    return state.file_data
  },
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
}