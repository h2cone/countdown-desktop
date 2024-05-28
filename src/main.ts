import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueCountdown from '@chenfengyuan/vue-countdown';

const app = createApp(App);
app.mount('#app')

if (VueCountdown.name) {
  app.component(VueCountdown.name, VueCountdown);
} else {
  app.component('vue-countdown', VueCountdown);
}
