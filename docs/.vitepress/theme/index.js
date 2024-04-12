import DefaultTheme from 'vitepress/theme'
import Header from '@demo/Header.vue'
import SlowToggler from '@demo/SlowToggler.vue'
import StartButton from '@demo/StartButton.vue'
import '@demo/index.css'
import './index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Header', Header)
    app.component('StartButton', StartButton)
    app.component('SlowToggler', SlowToggler)
  },
}
