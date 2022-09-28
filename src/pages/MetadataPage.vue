<template>
  <div class="col-xs-12 col-lg-4 q-pa-sm">
    <div class="row" style="min-height: 100%">
      <div class="col-12 q-pb-xs-md q-pb-md-none">
        <q-card
          class="col q-mr-md-sm q-mr-xs-none q-pb-xs-md q-mb-md-none"
          style="min-height: 100%"
        >
          <h5 class="q-my-none q-ml-md q-pt-sm">Recipes</h5>
          <RecipeInformation
            :recipeInformation="logStore.getRecipeInformation"
          ></RecipeInformation>
        </q-card>
      </div>
    </div>
  </div>
  <h4>Metadata</h4>
  <json-viewer
    :value="logStore.getMetadata"
    copyable
    boxed
    expanded
    theme="json-theme"
  ></json-viewer>
</template>

<script setup lang="ts">
import JsonViewer from 'vue-json-viewer';
import { useLogStore } from 'src/stores/logStore';
import RecipeInformation from 'src/pages/MetadataPage/RecipeInformation.vue';
import { onMounted } from 'vue';

const logStore = useLogStore();
onMounted(() => {
  logStore.setLogLoading(false);
});
</script>

<style lang="scss">
.json-theme {
  background: #fff;
  white-space: nowrap;
  color: #252525;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;

  .jv-ellipsis {
    color: #999;
    background-color: #eee;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button {
    color: #49b3ff;
  }
  .jv-key {
    color: #111111;
  }
  .jv-item {
    &.jv-array {
      color: #111111;
    }
    &.jv-boolean {
      color: #fc1e70;
    }
    &.jv-function {
      color: #067bca;
    }
    &.jv-number {
      color: #fc1e70;
    }
    &.jv-number-float {
      color: #fc1e70;
    }
    &.jv-number-integer {
      color: #fc1e70;
    }
    &.jv-object {
      color: #111111;
    }
    &.jv-undefined {
      color: #e08331;
    }
    &.jv-string {
      color: #157c4e;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }
}
</style>
