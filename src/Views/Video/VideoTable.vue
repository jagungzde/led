<template>
  <div class="card-hover-shadow card-border mb-3 card">
    <div class="card-header">Media</div>
    <div class="card-body">
      <b-table
        :striped="true"
        small
        responsive
        :outlined="true"
        :hover="true"
        :items="mediaArray"
        :fields="fields"
      >
        <template v-slot:cell(description)="data">
          <div>{{ data.item.media.description }}</div>
        </template>
        <!-- <template v-if="mode == 'create'" v-slot:cell(videoUrl)="data">
          <div>{{ data.item.videoUrl }}</div>
        </template> -->
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    localData: Array,
    mode: {
      required: true,
      type: String
    }
  },
  data: () => ({
    fields: [
      { key: "description", sortable:true},
      // { key: "videoUrl", sortable:true },
      // { key: "actions", class: "actions-column" }
    ],
    mediaArray:[]
  }),
};
</script>