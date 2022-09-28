<template>
  <div class="column q-pa-md">
    <div class="row row-header">
      <div class="col-2">Id</div>
      <div class="col-4">Name</div>
      <div class="col-2">Dual-feeding</div>
      <div class="col-4">Date saved</div>
    </div>
    <div
      class="row row-content items-center"
      v-for="[recipeId, recipe] in props.recipeInformation.recipes"
      :key="recipeId"
    >
      <div class="col-2">{{ recipeId }}</div>
      <div class="col-4 recipe-name-col">{{ recipe.name }}</div>
      <div class="col-2">
        <q-btn
          class="flex-center"
          flat
          :icon="recipe.dualFeeding ? 'check_circle' : 'radio_button_unchecked'"
        />
      </div>
      <div class="col-4">
        {{ recipe.creationDate.toLocaleString(dateLocale) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { RecipeInformation } from 'src/utils/logExtractor';
import { dateLocale } from 'src/utils/dateUtils';

const props = defineProps({
  recipeInformation: {
    type: Object as PropType<RecipeInformation>,
    required: true,
  },
});
</script>

<style lang="scss">
.row-content {
  height: 42px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row-header {
  height: 42px;
  font-weight: bold;
}

.recipe-name-col {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 600px) {
  .log-value {
    padding-left: 70px;
    color: grey;
  }
}
</style>
