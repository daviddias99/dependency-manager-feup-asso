<template>
  <div :class="['sidebar', { close: !sidebarOpen, open: sidebarOpen }]">
    <div class="title-section">
      <h1 class="title">Live Dependency Manager</h1>
      <h3 class="subtitle">Linda e Girão</h3>
    </div>
    <div class="form-container">
      <label for="fname">Github Repository URL:</label>
      <input v-model="repoUrl" class="input-text" type="text" name="fname" />
      <button class="button" @click="submitRepoUrl">Analyze</button>
    </div>
    <div v-if="labels.length !== 0" class="label-container">
      <h5 class="subtitle">Labels</h5>
      <Label
        v-for="label in labels"
        :key="label.text"
        :text="label.text"
        :color="label.color"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Label from '~/components/Label'

export default {
  name: 'SideBar',

  components: {
    Label,
  },

  props: {
    labels: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      repoUrl: '',
      isOpen: true,
    }
  },

  computed: {
    ...mapGetters(['sidebarOpen']),
  },

  methods: {
    submitRepoUrl() {
      this.$emit('submitRepoUrl', this.repoUrl)
    },
    ...mapActions({
      toggleSidebar: 'toggleSidebar',
    }),
  },
}
</script>

<style scoped>
.title-section {
  margin: 2rem 0rem;
}

.sidebar {
  position: absolute;
  z-index: 10;
  box-shadow: 1px 1px 8px #444;
  padding: 2rem 2rem;
  width: 24rem;
  min-height: 100vh;
  transition: all 300ms;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.label-container {
  margin: 2rem 0rem;
}

.close {
  left: -24rem;
  box-shadow: none;
}

.open {
  left: 0rem;
}
</style>
