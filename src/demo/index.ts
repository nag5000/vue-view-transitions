import { createApp } from 'vue'
import Header from './Header.vue'
import Index from './Index.vue'
import SlowToggler from './SlowToggler.vue'
import StartButton from './StartButton.vue'
import './index.css'

const app = createApp(Index)
app.component('Header', Header)
app.component('StartButton', StartButton)
app.component('SlowToggler', SlowToggler)
app.mount('#app')
