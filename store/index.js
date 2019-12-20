export const state = () => ({
  whiteout: true,
  menuDisplay: false,
  timerDisplay: false,
  crack_px: 16,
  fontSize: 16,
  white_blur: 10,
  lessdata:null,
  questionData:null,
  storyData:null,
  storylist:null
})

export const mutations = {
  toggleWhiteOut (state) {
    state.whiteout = !state.whiteout
  },
  ChangeWhiteOut (state, whiteout) {
    state.whiteout = whiteout
  },
  toggleMenuDisplay (state) {
    state.menuDisplay = !state.menuDisplay
  },
  CloseMenuDisplay (state) {
    state.menuDisplay = false
  },
  toggleTimerDisplay(state){
    state.timerDisplay = !state.timerDisplay
  },
  ChangeCrack(state,px) {
    state.crack_px = px
  },
  SetFontSize(state, size) {
    state.fontSize = size
  },
  ChangeBlur(state, blur) {
    state.white_blur = blur
  },
  updateData(state,lessdata){
    state.lessdata = lessdata
  },
  questionData(state,data){
    state.questionData = data
  },
  storyData(state,data){
    state.storyData = data
  },
  storislist(state,list){
    state.storylist = list
  }
}

export const actions = {
  KeyDown({ commit,state },event){
    if (event.key === 'm'){
      commit('toggleMenuDisplay') 
    }
    if (event.key === 'w'){
      commit('toggleWhiteOut')
    }
    if (event.key === 't'){
      commit('toggleTimerDisplay') 
    }
    if (event.key === '['){
        commit('ChangeCrack', state.crack_px + 2)
    }
    if (event.key === ']'){
      if(state.crack_px > 0){
        commit('ChangeCrack', state.crack_px - 2)
      }
    }
  }
}