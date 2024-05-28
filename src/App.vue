<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const countdown = ref();
const isReady = ref(false);

const time = ref(1);
const seconds = ref(0);
const mintues = ref(0);
const hours = ref(0);
const days = ref(0);

const currentSeconds = computed(() => {
  return { '--value': seconds.value, }
});
const currentMintues = computed(() => ({
  '--value': mintues.value,
}));
const currentHours = computed(() => ({
  '--value': hours.value,
}));
const currentDays = computed(() => ({
  '--value': days.value,
}));

function onProgress(data: any) {
  seconds.value = data.seconds;
  mintues.value = data.minutes;
  hours.value = data.hours;
  days.value = data.days;
}

let last = 0;
const started = ref(false);
const paused = ref(false);
const switchSate = ref('Play');

function onAbort() {
  started.value = false;
  last = countdown.value.totalMilliseconds;
}

const daysInput = ref();
const hoursInput = ref();
const mintuesInput = ref();
const secondsInput = ref();

function getTimeValue() {
  const days = daysInput.value.value;
  const hours = hoursInput.value.value;
  const mintues = mintuesInput.value.value;
  const seconds = secondsInput.value.value;
  return last === 0 ? (seconds * 1000 + mintues * 60 * 1000 + hours * 60 * 60 * 1000 + days * 24 * 60 * 60 * 1000) : last;
}

function onSwitch() {
  if (started.value) {
    started.value = false;
    countdown.value.abort();
    paused.value = true;
  } else {
    started.value = true;
    time.value = getTimeValue();
    countdown.value.start();
  }
  switchSate.value = started.value ? 'Pause' : 'Play';
}

function onCancel() {
  countdown.value.end();
  started.value = false;
  paused.value = false;
  switchSate.value = 'Play';

  seconds.value = 0;
  mintues.value = 0;
  hours.value = 0;
  days.value = 0;

  last = 0;
}

onMounted(() => {
  isReady.value = true;
});
</script>

<template>
  <vue-countdown v-if="isReady" ref="countdown" :auto-start="false" :time="time" @progress="onProgress"
    @abort="onAbort">
    <div class="flex justify-center items-center flex-col h-screen">
      <div class="grid grid-flow-col gap-5 text-center auto-cols-max" v-show="started || paused">
        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span class="countdown font-mono text-5xl">
            <span :style="currentDays"></span>
          </span>
          days
        </div>
        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span class="countdown font-mono text-5xl">
            <span :style="currentHours"></span>
          </span>
          hours
        </div>
        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span class="countdown font-mono text-5xl">
            <span :style="currentMintues"></span>
          </span>
          min
        </div>
        <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span class="countdown font-mono text-5xl">
            <span :style="currentSeconds"></span>
          </span>
          sec
        </div>
      </div>
      <div class="flex mt-5 gap-1" v-show="!started && !paused">
        <input ref="daysInput" class="input input-bordered input-md w-full max-w-xs" type="number" min="0" max="99"
          oninput="if(value<0)value=0; if(value>99)value=99" placeholder="Days">

        <input ref="hoursInput" class="input input-bordered input-md w-full max-w-xs" type="number" min="0" max="23"
          oninput="if(value<0)value=0; if(value>23)value=23;" placeholder="Hours">

        <input ref="mintuesInput" class="input input-bordered input-md w-full max-w-xs" type="number" min="0" max="59"
          oninput="if(value<0)value=0; if(value>59)value=59;" placeholder="Mintues">

        <input ref="secondsInput" class="input input-bordered input-md w-full max-w-xs" type="number" min="0" max="59"
          oninput="if(value<0)value=0; if(value>59)value=59;" placeholder="Seconds">
      </div>
      <div class="flex mt-5 gap-5">
        <button class="btn btn-wide" @click="onCancel">Cancel</button>
        <button class="btn btn-wide" @click="onSwitch">{{ switchSate }}</button>
      </div>
    </div>
  </vue-countdown>
</template>