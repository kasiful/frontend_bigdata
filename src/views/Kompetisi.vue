<template>
  <div>
    <!-- Header -->
    <header class="ex-header">
      <div class="container">
        <div class="row" data-aos="fade-right">
          <div class="col-xl-10 offset-xl-1">
            <h1>Ini Kompetisi</h1>
          </div>
          <!-- end of col -->
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container -->
    </header>
    <!-- end of ex-header -->
    <!-- end of header -->

    <div
      class="row gy-4 aos-init aos-animate dashboard-list"
      data-aos="zoom-in"
    >
      <div
        class="col-lg-4"
        data-aos="fade-right"
        v-for="dash in dashboardList"
        v-bind:key="dash"
      >
        <!-- <div class="col-lg-4" v-for="dash in dashboardList" v-bind:key="dash"> -->
        <div class="card bg-transparent px-4 dashboard-card">
          <h4 class="py-2 d-flex justify-content-center">
            {{ dash.title_id }}
          </h4>
          <!-- <p class="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p> -->

          <img v-bind:src="dash.img" class="d-flex align-items-center" />

          <p
            class="py-3 d-flex justify-content-center"
            style="font-size: 80%; font-style: italic"
          >
            {{ dash.info_id }}
          </p>

          <div class="my-3 d-flex justify-content-center" style="color: black">
            <a
              class="btn-merah"
              v-on:click="dashboardView(dash.id, dash.link_id)"
              >Tampilkan</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import * as variable from "../variable";

export default {
  data: function() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
