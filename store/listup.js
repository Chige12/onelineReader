
export const state = () => ({
  file_data : []
})

export const getters = { //computed
  sorted_filename (state) {
    let file = [...state.file_data]
    function compare(a, b) {
      const A = a.fileName
      const B = b.fileName
      let comparison = 0;
      if (A > B) { comparison = 1; }
      else if ( A < B ) { comparison = -1; }
      return comparison;
    }
    return file.sort(compare)
  }
}

export const mutations = {
  file_update (state,data) {
    state.file_data = data
    console.log("mutate", state.file_data)
  }
}

export const actions = {
  KeyDown({ commit,state },event){}
}