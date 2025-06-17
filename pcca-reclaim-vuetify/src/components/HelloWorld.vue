<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="150"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3 primary--text">
          Welcome to PCCA Reclaim
        </h1>

        <p class="subheading font-weight-regular">
          Manage your data efficiently and professionally.
        </p>
      </v-col>

      <v-col cols="12">
        <v-row justify="center" class="mt-5">
          <v-btn
            color="primary"
            dark
            class="mx-2"
            :to="'/master'"
          >
            Manage Master Data
          </v-btn>
          <v-btn
            color="primary"
            dark
            class="mx-2"
            :to="'/scan'"
          >
            Scan PCCA Reclaim
          </v-btn>
          <v-btn
            color="primary"
            dark
            class="mx-2"
            :to="'/search'"
          >
            Search & Export
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
};
</script>

<style>
.primary--text {
  color: #467c2d !important;
}
</style>
