<template>
  <q-btn
    icon="upload_file"
    label="Import log"
    aria-label="Import file"
    @click="importButtonClick"
    class="bg-secondary"
  />
  <form :onChange="uploadFile" style="display: none">
    <input
      type="file"
      id="file"
      ref="inputFileRef"
      accept=".logs"
      style="display: none"
      @click="$event.target.value = ''"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import untar from 'js-untar';
import pako from 'pako';
import { useRouter, useRoute } from 'vue-router';
import { useLogStore } from 'stores/logStore';
import { parseLogFile } from 'src/utils/logParser';
import { useQuasar } from 'quasar';

const router = useRouter();
const route = useRoute();
const inputFileRef = ref();
const logStore = useLogStore();
const $q = useQuasar();

function importButtonClick() {
  inputFileRef.value.click();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadFile = (event: any) => {
  const fileName = event.target.files[0].name;
  if (fileName) {
    $q.loading.show();
    logStore.setLogs([], '');
    let reader = new FileReader();
    reader.onload = () => {
      untar(reader.result)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((extractedFiles: any[]) => {
          extractedFiles.forEach((log) => {
            const logName = log.name.slice(0, -3);
            if (logName === 'full.log') {
              const unzippedLog = pako.inflate(log.buffer, { to: 'string' });
              const parsedLog = parseLogFile(unzippedLog);
              logStore.setLogs(parsedLog, fileName);
            }
            if (logName === 'metadata') {
              const unzippedLog = pako.inflate(log.buffer, { to: 'string' });
              logStore.setMetaData(JSON.parse(unzippedLog));
            }
          });
          if (route.path === '/') router.push('/base');
          $q.loading.hide();
        })
        .catch($q.loading.hide());
    };
    reader.readAsArrayBuffer(event.target.files[0]);
  }
};
</script>
