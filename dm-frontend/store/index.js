export const state = () => ({
  sidebarOpen: true,
})

export const getters = {
  sidebarOpen: (state) => state.sidebarOpen,
}

export const mutations = {
  toggleSidebar(state) {
    state.sidebarOpen = !state.sidebarOpen
  },
}

export const actions = {
  toggleSidebar(context) {
    context.commit('toggleSidebar')
  },
}
