<template>
  <div class="column q-pa-md">
    <div class="row row-header">
      <div class="col-2">Id</div>
      <div class="col-4">Name</div>
      <div class="col-6">Date saved</div>
    </div>
    <div
      class="row row-size"
      v-for="[recipeId, recipe] in props.recipeInformation.recipes"
      :key="recipeId"
    >
      <div class="col-2">{{ recipeId }}</div>
      <div class="col-4">{{ recipe.name }}</div>
      <div class="col-6">
        {{ recipe.creationDate.toLocaleString('fr-CH') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { RecipeInformation } from 'src/utils/logExtractor';

const props = defineProps({
  recipeInformation: {
    type: Object as PropType<RecipeInformation>,
    required: true,
  },
});
</script>

<style lang="scss">
.row-size {
  height: 42px;
}
.row-header {
  height: 42px;
  font-weight: bold;
}
@media screen and (max-width: 600px) {
  .log-value {
    padding-left: 70px;
    color: grey;
  }
}
</style>
