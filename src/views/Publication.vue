<template>
  <div>
    <!-- Header -->
    <header class="ex-header">
      <div class="container">
        <div class="row" data-aos="fade-right">
          <div class="col-xl-10 offset-xl-1">
            <h1>Publikasi</h1>
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
            v-on:click="loadPublicationList()"
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
          style="margin-bottom: 1rem"
          v-for="publication in publicationList"
          v-bind:key="publication"
        >
          <!-- <div class="col-lg-4" v-for="dash in dashboardList" v-bind:key="dash"> -->
          <div class="card bg-transparent px-4 dashboard-card">
            <div class="row">
              <div class="col-md-3">
                <center>
                  <img v-bind:src="publication.img" style="max-width: 150px" />
                </center>
              </div>

              <div class="col-md-9">
                <h4 class="py-2">
                  {{ publication.title_id }}
                </h4>
                <!-- <p class="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p> -->

                <div
                  v-html="publication.abstract_500"
                  style="font-size: 0.8rem"
                ></div>

                <p
                  style="
                    font-size: 0.8rem;
                    font-style: italic;
                    color: #1777c7;
                    cursor: pointer;
                  "
                  v-on:click="loadModal(publication)"
                >
                  More detail
                </p>

                <!-- <img v-bind:src="dash.img" class="d-flex align-items-center" /> -->

                <!-- <div v-html="publication.abstract_id"></div> -->
              </div>
            </div>
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
            <div class="row">
              <div class="col-lg-3">
                  <img id="modal_img" style="max-width: 150px; margin-bottom: 1rem" />
                <p
                  id="modal_pub_year"
                  style="font-size: 0.8rem; font-style: italic"
                ></p>
                <p
                  id="modal_visited"
                  style="font-size: 0.8rem; font-style: italic"
                ></p>
                <br/>
              </div>
              <div class="col-lg-9">
                <div id="modal_abstract_id" style="font-size: 0.8rem;"></div>
              </div>
            </div>

            <!-- <div v-html="article.abstract_id"></div> -->
            
          </div>

          <div class="modal-footer">

            <input type="hidden" id="goto" value="">
            <input type="hidden" id="goto_id" value="">

            <button class="btn btn-primary" v-on:click="goto()">
              Download
            </button>

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
      publicationList: {},
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
    loadPublicationList: function () {
      let tahun = document.getElementById("tahun").value;
      let url = variable.api_url + "publication/list.php?tahun=" + tahun;

      axios.get(url).then(
        function (response) {
          this.publicationList = response.data;
          for (let i = 0; i < this.publicationList.length; i++) {
            this.publicationList[i].abstract_500 =
              this.publicationList[i].abstract_id.substring(0, 500) + "...</p>";
            // alert(this.publicationList[i].abstract_500);
          }
        }.bind(this)
      );
    },
    // MODAL
    loadModal: function (arr) {
      document.getElementById("modal_title").innerHTML = arr.title_id;
      document.getElementById("modal_pub_year").innerHTML =
        "Tahun: " + arr.pub_year;
      document.getElementById("modal_visited").innerHTML =
        "visited: " + arr.visited;
      document.getElementById("modal_abstract_id").innerHTML = "<b>Abstrak:<br/></b>"+arr.abstract_id;
      document.getElementById("modal_img").setAttribute("src", arr.img);
      
      document.getElementById("goto").value = arr.link_id;
      document.getElementById("goto_id").value = arr.id;

      var myModal = new Modal(document.getElementById("detailModal"));
      myModal.show();

      // axios.get(variable.api_url + "article/click.php?id=" + arr.id);
    },
    // GOTO
    goto: function(){
      let id = document.getElementById("goto_id").value
      let url = document.getElementById("goto").value
      axios.get(variable.api_url + "publication/click.php?id=" + id).then(function(response){
        if (response.data == 1){
          window.open(url);
        } else {
          alert("Maaf terdapat gangguan silakan coba lagi");
        }
      });
    }
  },
  mounted: function () {
    this.loadPublicationList();
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