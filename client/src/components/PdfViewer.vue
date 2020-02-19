<template>
  <v-layout v-show="isready" row wrap align-center justify-start class="cpdf">
    <v-flex d-flex-inline xs12 class="text-xs-center pb-0">
      <v-btn small fab @click="prev">
        <v-icon>mdi-page-previous-outline</v-icon>
      </v-btn>
      <v-btn small fab @click="next">
        <v-icon>
          mdi-page-next-outline
        </v-icon>
      </v-btn>
      <span class="white--text">Page: {{ page_num }} / {{ page_count }} </span>
      <v-btn small fab @click="addscale">
        <v-icon color="primary">mdi-magnify-plus</v-icon>
      </v-btn>
      <v-btn small fab @click="minus"
        ><v-icon color="primary">mdi-magnify-minus</v-icon></v-btn
      >
      <v-btn small fab @click="closepdf"
        ><v-icon color="red">mdi-close-circle</v-icon></v-btn
      >
    </v-flex>
    <v-flex xs12 d-flex class="text-xs-center canvasWrapper pa-0">
      <canvas id="the-canvas" class="canvasstyle"></canvas>
    </v-flex>
  </v-layout>
</template>
<script>
// import PDFJS from "./pdf/pdf.js";
import PDFJS from "pdfjs-dist/webpack";
// console.log(PDFJS);
export default {
  name: "CPdf",
  props: {
    pdfurl: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      required: true,
      default: false
    },
    maxscale: {
      default: 2,
      type: Number
    },
    minscale: {
      default: 0.5,
      type: Number
    },
    scale: {
      default: 1,
      type: Number
    }
  },
  //['pdfurl', 'value'],
  data() {
    return {
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      compuscale: 0,
      page_num: 0,
      page_count: 0,
      isready: false
    };
  },
  computed: {
    ctx() {
      let id = document.getElementById("the-canvas");
      return id.getContext("2d");
    }
  },
  watch: {
    value(b) {
      const url = this.pdfurl;
      if (b == false || url == "" || url == undefined) return;
      // async function f() {
      //   try {
      //     const url = await this.pdfurl;
      //     alert(url);
      //     this.pdfDoc = await PDFJS.getDocument(url);
      //     this.page_count = this.pdfDoc.numPages;
      //     this.renderPage(this.pageNum);
      //   } catch (error) {
      //     console.log(error);
      //     this.throwerr(this.pdfurl);
      //   }
      // }
      // f();
      PDFJS.getDocument(url)
        .then(pdfDoc_ => {
          //初始化pdf
          this.pdfDoc = pdfDoc_;
          this.page_count = this.pdfDoc.numPages;
          this.renderPage(this.pageNum);
        })
        .catch(function(err) {
          if (err) {
            console.log(err);
            this.throwerr(this.pdfurl);
          }
        });
    }
  },
  mounted() {
    this.compuscale = this.scale;
  },
  methods: {
    async renderPage(num) {
      //渲染pdf
      this.pageRendering = true;
      let canvas = document.getElementById("the-canvas");
      // Using promise to fetch the page
      const page = await this.pdfDoc.getPage(num);
      const viewport = page.getViewport({ scale: this.compuscale });
      // console.log(viewport);
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      this.isready = true;
      const renderContext = {
        canvasContext: this.ctx,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);

      // Wait for rendering to finish
      await renderTask.promise;
      this.pageRendering = false;
      if (this.pageNumPending !== null) {
        // New page rendering is pending
        this.renderPage(this.pageNumPending);
        this.pageNumPending = null;
      }
      this.page_num = this.pageNum;
    },
    addscale() {
      //放大
      if (this.compuscale >= this.maxscale) {
        return;
      }
      this.compuscale += 0.5;
      this.queueRenderPage(this.pageNum);
    },
    minus() {
      if (this.compuscale <= this.minscale) {
        return;
      }
      this.compuscale -= 0.5;
      this.queueRenderPage(this.pageNum);
    },
    prev() {
      if (this.pageNum <= 1) {
        return;
      }
      this.pageNum--;
      this.queueRenderPage(this.pageNum);
    },
    next() {
      if (this.pageNum >= this.page_count) {
        return;
      }
      this.pageNum++;
      this.queueRenderPage(this.pageNum);
    },
    closepdf() {
      this.pdfDoc = null;
      this.isready = false;
      this.compuscale = this.scale;
      this.$emit("closepdf");
    },
    throwerr(err) {
      this.$emit("pdferr", err);
    },
    queueRenderPage(num) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cpdf {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 480px;
}
.canvasWrapper {
  overflow-y: scroll;
  height: 400px;
  align-items: center;

  flex-direction: column;
  .canvasstyle {
    // position: absolute;
    display: flex;
  }
}
</style>
