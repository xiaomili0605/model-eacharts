<template>
  <div class="container">
    <header>
      <h1>模型数据统计图表</h1>
      <div class="showTime">{{ currentTime }}</div>
    </header>
    <section class="mainbox">
      <!-- 左侧区域 -->
      <div class="column">
        <div class="panel bar">
          <h2>柱形图-就业行业</h2>
          <div class="chart"></div>
          <!-- 添加一个盒子，使用伪元素添加底部2个角 -->
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>折线图-就业行业</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>屏型图-就业行业</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <!-- 中间区域 -->
      <div class="column">
        <!-- 数字 -->
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>124432</li>
              <li>145324</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>需求人数</li>
              <li>供应人数</li>
            </ul>
          </div>
        </div>
        <!-- 球体 -->
        <div class="sphere">
          <div class="sphere1"></div>
          <div class="sphere2"></div>
          <div class="sphere3"></div>
          <div class="chart"></div>
        </div>
      </div>
      <!-- 右侧区域 -->
      <div class="column">
        <div class="panel bar">
          <h2>柱形图-就业行业</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>折线图-就业行业</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>屏型图-就业行业</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
let echarts = require("echarts");
export default {
  name: "",
  data() {
    return {
      timer: null, // 定时器
      currentTime: "", // 当前日期时间
    };
  },
  created() {},
  mounted() {
    this.timer = setTimeout(this.showTime, 1000);
    // 柱状图
    (function () {
      // 1 实例化对象
      let myChart = echarts.init(document.querySelector(".bar .chart"));
      // 2 配置项和数据
      let option = {
        color: ["#2F89CF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 修改图表大小
        grid: {
          top: "10px",
          left: "0%",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: "rgba(255, 255, 255, .6)", // 修改刻度标签 相关样式
              fontSize: "12",
            },
            axisLine: {
              show: false, // x坐标轴的线条不显示
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "rgba(255, 255, 255, .6)", // 修改刻度标签 相关样式
              fontSize: "12",
            },
            axisLine: {
              show: true, // y轴显示
              lineStyle: {
                color: "rgba(255, 255, 255, .2)", // y轴线条颜色粗细
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, .2)", // y 轴分割线样式
              },
            },
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "40%",
            data: [1192, 2252, 1200, 2134, 1390, 1330, 2220],
            itemStyle: {
              barBorderRadius: 2,
            },
          },
        ],
      };
      // 3 把配置项给实例对象
      myChart.setOption(option);
      // 4 图表自适应
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    })();
  },
  methods: {
    showTime() {
      clearTimeout(this.timer);
      let dt = new Date();
      let y = dt.getFullYear();
      let mt = dt.getMonth() + 1;
      let day = dt.getDate();
      let h = dt.getHours(); // 获取时
      let m = dt.getMinutes(); // 获取分
      let s = dt.getSeconds(); // 获取秒
      this.currentTime = `当前时间：${y}年${mt}月${day}日 ${h}时${m}分${s}秒`;
      setTimeout(this.showTime, 1000);
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  components: {},
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  background: url(../../assets/images/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
// 头部
header {
  position: relative;
  height: 0.6rem;
  background: url(../../assets/images/head_bg.png) no-repeat top center;
  background-size: 100% 100%;
  color: #ffffff;
  h1 {
    font-size: 0.3rem;
    font-weight: 600;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
  }
  .showTime {
    position: absolute;
    right: 0.16rem;
    top: 0;
    font-size: 0.1rem;
    font-weight: 500;
    line-height: 0.5rem;
  }
}
// 主体部分划分3列
.mainbox {
  display: flex;
  min-width: 10.8rem;
  margin: 0 auto;
  padding: 0.1rem 0.1rem 0;
  .column {
    flex: 3;
    &:nth-child(2) {
      flex: 5;
      margin: 0 0.1rem 0.15rem;
    }
  }
}

// 图表盒子公共样式
.panel {
  position: relative;
  height: 2.08rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: url(../../assets/images/line.png) rgba(255, 255, 255, 0.04);
  padding: 0 0.15rem 0.2rem;
  margin-bottom: 0.12rem;
  // 使用伪元素添加左上角
  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
  }
  // 使用伪元素添加右上角
  &::after {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
  }
  // 底部两个角：通过添加一个盒子，设置伪元素添加
  .panel-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    &::before {
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
    }
    &::after {
      position: absolute;
      content: "";
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
    }
  }
  h2 {
    height: 0.48rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.16rem;
    font-weight: 500;
    color: #ffffff;
  }
  .chart {
    height: 1.5rem;
  }
}

// 中间区域数字盒子
.no {
  background: rgba(101, 132, 226, 0.1);
  font-size: 0.14rem;
  .no-hd {
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
    // 数字区域左上角
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 30px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
    }
    // 数字区域右上角
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      content: "";
      width: 30px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
    }
    ul {
      display: flex;
      li {
        position: relative;
        flex: 1;
        font-size: 0.6rem;
        text-align: center;
        color: #ffeb7b;
        font-family: "electronicFont"; // 先声明字体在使用
        &:nth-child(1):after {
          content: "";
          position: absolute;
          top: 25%;
          right: 0;
          height: 50%;
          width: 1px;
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
  .no-bd {
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.16rem;
        font-weight: 500;
        height: 0.3rem;
        line-height: 0.3rem;
        padding-top: 0.02rem;
      }
    }
  }
}

// 球体样式
.sphere {
  position: relative;
  height: 5.56rem;
  .sphere1 {
    width: 3.5rem;
    height: 3.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url(../../assets/images/map.png);
    background-size: 100% 100%;
    opacity: 0.3;
  }
  .sphere2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4.1rem;
    height: 4.1rem;
    background: url(../../assets/images/lbx.png);
    background-size: 100% 100%;
    animation: rotate1 15s linear infinite;
    opacity: 0.6;
  }
  .sphere3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.8rem;
    height: 3.8rem;
    background: url(../../assets/images/jt.png);
    background-size: 100% 100%;
    animation: rotate2 15s linear infinite;
    opacity: 0.6;
  }
  .chart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @keyframes rotate1 {
    form {
      transform: translate(-50%, -50%) rotate(0deg); // 选择时位置也要保留 translate
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotate2 {
    form {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
}
</style>
