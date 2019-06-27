export const state = () => ({
  whiteout: true,
  menuDisplay: false,
  crack_px: 16
})

export const mutations = {
  toggleWhiteOut (state) {
    state.whiteout = !state.whiteout
  },
  toggleMenuDisplay (state) {
    state.menuDisplay = !state.menuDisplay
  },
  ChangeCrack(state,px) {
    state.crack_px = px
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