<template>
  <div>
    <!-- Header -->
    <header class="ex-header">
      <div class="container">
        <div class="row" data-aos="fade-right">
          <div class="col-xl-10 offset-xl-1">
            <h1>Paper</h1>
          </div>
          <!-- end of col -->
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container -->
    </header>
    <!-- end of ex-header -->
    <!-- end of header -->

    <div class="container" style="margin-top: 1.5rem">
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="tahun" class="form-label">Tahun</label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="tahun"
              id="tahun"
            >
              <option
                v-for="tahun in computeTahun"
                v-bind:key="tahun"
                v-bind:value="tahun"
              >
                {{ tahun }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 2rem">
        <div class="col">
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="loadPaperList()"
          >
            Cari
          </button>
        </div>
      </div>

      <div
        class="row gy-4 aos-init aos-animate dashboard-list"
        data-aos="zoom-in"
      >
        <div
          class="row"
          data-aos="fade-right"
          v-for="paper in paperList"
          v-bind:key="paper"
        >
          <!-- <div class="col-lg-4" v-for="dash in dashboardList" v-bind:key="dash"> -->
          <div class="card bg-transparent px-4 dashboard-card">
            <div class="row">
              <div class="col">
                <h4 v-if="paper.title_id !== null" class="py-2">
                  {{ paper.title_id }}
                </h4>
                <h4 v-else class="py-2">{{ paper.title_en }}</h4>
                <!-- <p class="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p> -->

                <p style="font-size: 0.8rem; font-style: italic">
                  Author: {{ paper.author }}
                </p>
                <p style="font-size: 0.8rem; font-style: italic">
                  Tahun: {{ paper.pub_year }}
                </p>
                <p
                  style="
                    font-size: 0.8rem;
                    font-style: italic;
                    color: #1777c7;
                    cursor: pointer;
                  "
                  v-if="paper.link_id !== null"
                  v-on:click="downloadPDF(paper.id, paper.link_id)"
                >Download PDF</p>
                <p
                  style="
                    font-size: 0.8rem;
                    font-style: italic;
                    color: #1777c7;
                    cursor: pointer;
                  "
                  v-else
                  v-on:click="downloadPDF(paper.id, paper.link_en)"
                >
                  Download PDF
                </p>

                <br />

                <p style="font-size: 0.8rem; font-style: italic">
                  <b>Abstrak:</b>
                </p>

                <div
                  v-if="paper.abstract_id !== null"
                  v-html="paper.abstract_id"
                  style="font-size: 0.8rem"
                ></div>
                <div
                  v-else
                  v-html="paper.abstract_en"
                  style="font-size: 0.8rem"
                ></div>
                <!-- <img v-bind:src="dash.img" class="d-flex align-items-center" /> -->

                <div v-html="paper.content_id"></div>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as variable from "../variable";

export default {
  data: function () {
    return {
      paperList: {},
      monthList: [
        { id: 1, bulan: "Januari" },
        { id: 2, bulan: "Februari" },
        { id: 3, bulan: "Maret" },
        { id: 4, bulan: "April" },
        { id: 5, bulan: "Mei" },
        { id: 6, bulan: "Juni" },
        { id: 7, bulan: "Juli" },
        { id: 8, bulan: "Agustus" },
        { id: 9, bulan: "September" },
        { id: 10, bulan: "Oktober" },
        { id: 11, bulan: "November" },
        { id: 12, bulan: "Desember" },
      ],
    };
  },
  methods: {
    loadPaperList: function () {
      let tahun = document.getElementById("tahun").value;
      let url = variable.api_url + "paper/list.php?tahun=" + tahun;

      console.log(url);

      axios.get(url).then(
        function (response) {
          this.paperList = response.data;
        }.bind(this)
      );
    },
    downloadPDF(id, url){
      axios.get(variable.api_url+"paper/click.php?id="+id);
      window.open(url);
    }
  },
  mounted: function () {
    this.loadPaperList();
  },
  computed: {
    computeTahun: function () {
      var data = [];
      let tahun = new Date();
      tahun = tahun.getFullYear();
      for (var i = tahun; i >= 2017; i--) {
        data.push(i);
      }
      return data;
    },
  },
};
</script>