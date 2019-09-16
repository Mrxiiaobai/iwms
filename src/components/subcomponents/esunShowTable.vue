<template>
<!-- 	<div align="center" class="detail">
		<div class="detailHead">
			<span>汇总信息列表</span>
			<span>展开全部</span>
		</div>	
		<div class="detailBody">
			<div class="detailTitle">
				<span>序号</span><span v-for="(item, index) in th" :key="index">{{item}}</span>
			</div>
			<div class="substance">
				<ul class="ulList">
					<li v-for="(item, index) in res" :key="index">
						<span>{{Number(index+1)}}</span>
						<span v-for="(it,ind) in fields" :key="ind">{{item[it]}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div> -->
	<div align="center" class="detail" :class="ifshowD==true?'boxShadow':''">
		<div class="detailHead">
			<span>汇总信息列表</span>
			<span @tap="changeIfShow">展开全部</span>
		</div>
		<div class="detailBody" v-show="ifshowD">
			<table>
			  <thead class="detailTitle">
			    <tr>
					<th>序号</th>
					<th v-for="(item, index) in th" :key="index">{{item}}</th>
			    </tr>
			  </thead>
			  <tbody is="transition-group" name="demo" class="substance">
			    <tr v-for="(item, index) in res" :key="index" class="trList">
						  <td>{{Number(index+1)}}</td>
			      <td
			        v-for="(it,ind) in fields"
			        :key="ind"
			      >{{item[it]}}</td>
			    </tr>
			  </tbody>
			</table>
		</div>
	</div>
</template>

<script>
import mui from "../../assets/js/mui.min";
export default {
  data: function() {
    return {
      name: this.headername,
      colorNow: this.colorNow,
      ifshowD: true,
    };
  },
  props: {
    res: {},
    th: {},
    fields: {}
  },

  components: {},

  created() {
    console.log("res.length: " + this.res.length);
  },

  computed: {},

  beforeMount() {},

  mounted() {},
  updated() {
    console.log("res.length: " + this.res.length);
  },
  methods: {
    changeIfShow: function() {
      this.ifshowD = !this.ifshowD;
    },
    AAA: function(index) {
      console.log(index);
    }
  },

  watch: {},

  activated() {
    //���汻����ʱ�߼���д��}
  }
};
</script>
<style scoped>
.detail{
	position: relative;
	width:100%;
	height:2.48rem;
	background:rgba(255,255,255,1);
	
	font-size:0.13rem;
	font-family:PingFang SC;
	font-weight:500;
	color:rgba(102,102,102,1);
	margin:0 auto;
	white-space: nowrap;
}
.detailBody{
	width: 100%;
	height: 2.24rem;
	overflow: scroll;
	
}
.boxShadow{
	border:1px solid rgba(207,212,232,1);
	box-shadow:0px 2px 18px 1px rgba(59,88,212,0.08);
}

/* 表格 */
.detailBody table{
	border: none;
	width: 100%;
	background: #E8EAF7;
}
.detailHead{
	position: relative;
	display: block;
	width:100%;
	height:0.24rem;
	background:rgba(232,234,247,1);
	line-height: 0.24rem;
	/* overflow-y: scroll; */
}
.detailTitle{
	width: 100%;
	margin: 0;
	padding: 0;
	line-height: 0.24rem;
	height: 0.24rem;
}
.detailTitle th{
	display: inline-block;
	width: 0.64rem;
	height: 0.24rem;
	border-left:1px solid rgba(207,212,232,1);
}
.detailTitle th:first-of-type{
	width: 0.51rem;
	border-left: none;
}
.detailTitle th:nth-of-type(2){
	width: 1.35rem;
}
/* .detailTitle span{
	display: inline-block;
	width: 0.64rem;
	height: 0.24rem;
	border-left:1px solid rgba(207,212,232,1);
	background: #E8EAF7;
}
.detailTitle span:first-of-type{
	width: 0.51rem;
	border-left: none;
}
.detailTitle span:nth-of-type(2){
	width: 1.35rem;
} */

.detailHead{
	border-bottom:1px solid rgba(207,212,232,1);
}
.detailHead span:first-of-type{
	position: absolute;
	left: 0.13rem;
}
.detailHead span:last-of-type{
	position: absolute;
	right: 0.09rem;
}
.substance{
	width: 3.45rem;
	height: 2rem;
}

.substance tr:nth-child(odd){
	background: #fff;
}
.substance tr:nth-child(even){
	background:rgba(245,245,247,1);
}
.trList td{
	width: 0.64rem;
	text-align: center;
	display: inline-block;
	border-left:1px solid rgba(207,212,232,1);
}
.trList td:first-of-type{
	width: 0.51rem;
	border-left: none;
}
.trList td:nth-of-type(2){
	width: 1.35rem;
}
/* .ulList li:nth-child(odd){
	background: #fff;
}
.ulList li:nth-child(even){
	background:rgba(245,245,247,1);
} */

/* .ulList{
	width: 100%;
	height: 2rem;
	padding: 0;
	margin: 0;
} */
.ulList{
	width: 100%;
	height: 0.32rem;
	line-height: 0.32rem;
}
/* .ulList span:first-of-type{
	width: 0.51rem;
	border-left: none;
}
.ulList span:nth-of-type(2){
	width: 1.35rem;

}
.ulList span{
	width: 0.64rem;
	display: inline-block;
	border-left:1px solid rgba(207,212,232,1);
} */
.demo-enter,
.demo-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.demo-enter-active,
.demo-leave-active {
  transition: all 0.5s ease;
}

.demo-move {
  transition: all 0.5s ease;
}

</style>