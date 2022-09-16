<template>
  <q-btn
    icon="upload_file"
    label="Import log"
    aria-label="Import file"
    @click="importButtonClick"
  />
  <form :onChange="uploadFile" style="display: none">
    <input
      type="file"
      id="file"
      ref="inputFileRef"
      accept=".logs"
      style="display: none"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import untar from 'js-untar';
import pako from 'pako';
import { useRouter, useRoute } from 'vue-router';
import { useLogStore } from 'stores/logStore';
import { parseLogFile } from 'stores/logParser';

const router = useRouter();
const route = useRoute();
const inputFileRef = ref();
const logStore = useLogStore();

function importButtonClick() {
  inputFileRef.value.click();
}

const uploadFile = (event: any) => {
  const fileName = event.target.files[0].name;
  let reader = new FileReader();
  reader.onload = () => {
    untar(reader.result).then((extractedFiles: any) => {
      extractedFiles.forEach((log: any) => {
        const logName = log.name.slice(0, -7);
        if (logName === 'full') {
          const unzippedLog = pako.inflate(log.buffer, { to: 'string' });
          const parsedLog = parseLogFile(unzippedLog);
          logStore.setLogs(parsedLog, fileName);
          if (route.path === '/') router.push('/base');
        }
      });
    });
  };
  reader.readAsArrayBuffer(event.target.files[0]);
};
</script>
