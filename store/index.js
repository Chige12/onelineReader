export const state = () => ({
  whiteout: true,
  menuDisplay: false,
  timerDisplay: false,
  crack_px: 16,
  lessdata:null,
})

export const mutations = {
  toggleWhiteOut (state) {
    state.whiteout = !state.whiteout
  },
  toggleMenuDisplay (state) {
    state.menuDisplay = !state.menuDisplay
  },
  toggleTimerDisplay(state){
    state.timerDisplay = !state.timerDisplay
  },
  ChangeCrack(state,px) {
    state.crack_px = px
  },
  Timer(state,lessdata){
    state.lessdata = lessdata
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