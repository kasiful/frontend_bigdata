<template>
  <div>
    <!-- Header -->
    <header class="ex-header">
      <div class="container">
        <div class="row" data-aos="fade-right">
          <div class="col-xl-10 offset-xl-1">
            <h1>Artikel</h1>
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
            <label for="bulan" class="form-label">Bulan</label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="bulan"
              id="bulan"
            >
              <option value="0" selected>:: Semua Bulan ::</option>
              <option
                v-for="bulan in monthList"
                v-bind:key="bulan"
                v-bind:value="bulan.id"
              >
                {{ bulan.bulan }}
              </option>
            </select>
          </div>
        </div>

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
            v-on:click="loadArticleList()"
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
          v-for="article in articleList"
          v-bind:key="article"
        >
          <!-- <div class="col-lg-4" v-for="dash in dashboardList" v-bind:key="dash"> -->
          <div
            class="card bg-transparent px-4 dashboard-card"
            style="margin-bottom: 1rem"
          >
            <h4 class="py-2">
              {{ article.title_id }}
            </h4>
            <!-- <p class="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p> -->

            <p style="font-size: 0.8rem; font-style: italic">
              Periode: {{ article.last_update }}
            </p>
            <p style="font-size: 0.8rem; font-style: italic">
              Author: {{ article.author }}
            </p>

            <!-- <div v-html="article.content_id"></div> -->

            <p
              style="
                font-size: 0.8rem;
                font-style: italic;
                color: #1777c7;
                cursor: pointer;
              "
              v-on:click="loadModal(article)"
            >
              Baca Artikel
            </p>

            <!-- {{ article.content_id }} -->
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="detailModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal_title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p
              id="modal_last_update"
              style="font-size: 0.8rem; font-style: italic"
            ></p>
            <p
              id="modal_author"
              style="font-size: 0.8rem; font-style: italic"
            ></p>

            <br />

            <!-- <div v-html="article.content_id"></div> -->
            <div id="modal_content_id"></div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { Modal } from "bootstrap";

import axios from "axios";
import * as variable from "../variable";

export default {
  data: function () {
    return {
      articleList: {},
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
    loadArticleList: function () {
      let bulan = document.getElementById("bulan").value;
      let tahun = document.getElementById("tahun").value;
      let url = variable.api_url + "article/list.php?tahun=" + tahun + "&bulan=" + bulan;

      console.log(url);

      axios.get(url).then(
        function (response) {
          this.articleList = response.data;
        }.bind(this)
      );
    },
    // MODAL
    loadModal: function (arr) {
      document.getElementById("modal_title").innerHTML = arr.title_id;
      document.getElementById("modal_last_update").innerHTML =
        "Periode: " + arr.last_update;
      document.getElementById("modal_author").innerHTML =
        "Author: " + arr.author;
      document.getElementById("modal_content_id").innerHTML = arr.content_id;

      var myModal = new Modal(document.getElementById("detailModal"));
      myModal.show();

      axios.get(variable.api_url + "article/click.php?id=" + arr.id);

    },
  },
  mounted: function () {
    this.loadArticleList();
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