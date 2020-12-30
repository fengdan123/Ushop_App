<template>
  <div id="main" style="width:80%;height:80%;margin:30px auto 0"></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cate_req: "gengxin_cate_req",
    }),
  },
  methods: {
    ...mapActions({
      get_cate_req: "get_cate_req",
    }),
  },
  mounted() {
    this.get_cate_req(true).then((res) => {
      console.log(this.cate_req);
      if (this.cate_req.length > 0) {
        //画图
        let mychart = require("echarts").init(document.getElementById("main"));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "分类数量",
          },
          tooltip: {},
          legend: {
            data: ["分类数量"],
          },
          xAxis: {
            data: this.cate_req.map((item) => item.catename),
          },
          yAxis: {},
          // series:数据
          series: [
            {
              name: "分类数量",
              type: "bar",
              data: this.cate_req.map((item) =>
                item.children ? item.children.length : 0
              ),
            },
          ],
        };

        mychart.setOption(option);
      }
    });
  },
};
</script>

<style>
</style>