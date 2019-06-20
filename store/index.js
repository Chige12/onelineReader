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