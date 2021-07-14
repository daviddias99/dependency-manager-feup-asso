<template>
  <div>
    <SideBar :labels="labels" @submitRepoUrl="analyzeRepo" />
    <div
      v-if="loading"
      :class="['spinner-container', { 'spinner-container-focus': loading }]"
    >
      <Spinner />
    </div>
    <client-only>
      <Network
        id="main-network"
        ref="mynetwork"
        :class="{ close: !sidebarOpen, open: sidebarOpen }"
        :nodes="nodes"
        :edges="edges"
        :options="options"
      />
    </client-only>
    <button class="button toggle-sidebar-button" @click="toggleSidebar">
      Toggle Sidebar
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import SideBar from '~/components/SideBar'
import Spinner from '~/components/helpers/Spinner'

export default {
  name: 'Vis',

  components: {
    SideBar,
    Spinner,
  },

  data() {
    return {
      loading: false,
      error: false,
      // create an array with nodes
      nodes: [],
      // create an array with edges
      edges: [],
      // sidebar color labels
      labels: [],
      // networks options
      options: {
        // group styles
        groups: {
          useDefaultGroups: true,
          /* groups styles here */
        },
        // edge stylings
        edges: {
          arrows: 'to',
        },
        // physics
        physics: {
          enabled: true,
          stabilization: true,
        },
        autoResize: true, // the Network will automatically detect when its container is resized, and redraw itself accordingly.
        width: '100%',
        height: '100%',
      },
      // color palette
      palette: ['#61a5c2', '#fdfcdc', '#f07167', '#00afb9', '#fed9b7'],
    }
  },

  computed: {
    ...mapGetters(['sidebarOpen']),
  },

  methods: {
    async analyzeRepo(repoUrl) {
      this.loading = true
      try {
        console.log(repoUrl)
        const { edges, nodes } = await this.$axios.$get(
          `/${encodeURIComponent(repoUrl)}`,
          {
            repoUrl,
          }
        )

        this.edges = edges
        this.nodes = nodes
      } catch (err) {
        this.error = true
        console.log(err)
      }

      this.generatePalette(this.getSingleGroups())

      const createHTMLTitle = (annotations) => {
        if (annotations.length === 0) return

        const element = document.createElement('div')
        annotations.forEach((annotation) => {
          const type = document.createElement('h4')
          type.innerHTML = annotation.type
          const info = document.createElement('p')
          info.innerHTML = annotation.info

          element.appendChild(type)
          element.appendChild(info)
        })
        return element
      }

      // test
      this.nodes.forEach(
        (node) => (node.title = createHTMLTitle(node.annotations))
      )

      this.loading = false

      // update options
      this.$refs.mynetwork.setOptions(this.options)
    },
    getSingleGroups() {
      const set = new Set()
      this.nodes.forEach((elem) => set.add(elem.group))
      return Array.from(set)
    },
    generatePalette(groups) {
      this.labels = []

      for (let index = 0; index < groups.length; index++) {
        this.labels.push({
          text: groups[index],
          color: this.palette[index],
        })
      }

      this.labels.forEach((elem) => {
        if (elem.text !== '')
          this.options.groups[elem.text] = {
            color: { background: elem.color },
          }
      })
    },
    ...mapActions({
      toggleSidebar: 'toggleSidebar',
    }),
  },
}
</script>

<style>
.toggle-sidebar-button {
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  z-index: 10;
}

.spinner-container {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  margin-left: 24rem;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner-container-focus {
  background-color: var(--main-grey-opaque);
}

.close {
  padding-left: 0rem;
}

.open {
  padding-left: 24rem;
}

#main-network {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  min-height: 100vh;
  /* background-color: aquamarine; */
}
</style>
