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
      :accept="'.' + acceptedFileType"
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
import { getLogInformation } from 'src/utils/logExtractor';

const acceptedFileType = 'logs';

const router = useRouter();
const route = useRoute();
const inputFileRef = ref();
const logStore = useLogStore();
const $q = useQuasar();

function importButtonClick() {
  inputFileRef.value.click();
}

const alertUnreadableLogFile = () => {
  alert('The logs file you selected cannot be read.');
  $q.loading.hide();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadFile = (event: any) => {
  const fileName = event.target.files[0].name;
  if (fileName) {
    const fileType = fileName.split('.').pop();
    if (fileType !== acceptedFileType) {
      alert(
        `File type not accepted. Please upload a .${acceptedFileType} file.`
      );
      return;
    }
    $q.loading.show();
    logStore.setLogs([], '');
    logStore.setMetaData({});
    let reader = new FileReader();
    reader.onload = () => {
      untar(reader.result)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((extractedFiles: any[]) => {
          if (extractedFiles.length === 0) {
            alertUnreadableLogFile();
            return;
          }
          extractedFiles.forEach((log) => {
            if (log.name === 'full.log.gz') {
              try {
                const unzippedLog = pako.inflate(log.buffer, { to: 'string' });
                const parsedLog = parseLogFile(unzippedLog);
                logStore.setLogs(parsedLog, fileName);
              } catch {
                alertUnreadableLogFile();
                return;
              }
            }
            if (log.name === 'metadata.gz') {
              try {
                const unzippedLog = pako.inflate(log.buffer, { to: 'string' });
                logStore.setMetaData(JSON.parse(unzippedLog));
              } catch {
                alertUnreadableLogFile();
                return;
              }
            }
          });
          if (logStore.getRows.length === 0) {
            alertUnreadableLogFile();
            return;
          }

          let logInformation = getLogInformation(logStore.getRows);

          // Update some information using the more reliable metadata information
          const metadata: any = logStore.metadata; // eslint-disable-line @typescript-eslint/no-explicit-any
          if (metadata.releaseVersion && metadata.gitVersionHash) {
            logInformation.softwareVersion = `${metadata.releaseVersion} (${metadata.gitVersionHash})`;
          }
          if (metadata.hwVersion) {
            logInformation.hardwareVersion = `v${metadata.hwVersion}`;
          }
          if (metadata.som) {
            logInformation.somSerialNumber = metadata.som;
          }

          // Create logInformation
          logStore.setLogInformation(logInformation);

          if (route.path === '/') router.push('/base');
          $q.loading.hide();
        })
        .catch(() => {
          alertUnreadableLogFile();
        });
    };
    reader.readAsArrayBuffer(event.target.files[0]);
  }
};
</script>
