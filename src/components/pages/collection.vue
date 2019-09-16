<template>
	<vue-drawer-layout ref="drawer" @mask-click="handleMaskClick">
		<div class="drawer-content" slot="drawer" style="width:2.42rem;height:100%;background-color:#fff;position: relative;">
			<!-- drawer-content -->
			<div style="height:50px;"></div>
			<div class="subDv">
				<ul class="subUl">
					<li class="">
						<a class="">用户名</a><span>{{userId}}</span>
					</li>
					<li class="">
						<a class="">选择域</a><div class="chooseDv" @tap="chooseDomain">{{domainNow}}</div><img :src="selectChoose" alt="" class="imgAbsolute" @tap="chooseDomain">
					</li>
					<li>
						<div class="chooseSelect" v-show="showSelect" >
							<ul class="subUl">
								<li class="" v-for="(item,index) in domains" v-bind:key="index" @tap="changeDomain(index)">
									<span>{{item}}</span>
								</li>
							</ul>
						</div>
					</li>
				</ul>
				<div class="signOn">
					<button @tap="logOut">退出登录</button>
				</div>
			</div>
		</div>
		<div slot="content">
			<!-- main-content -->
			<div>
				<EsunHeader v-bind:iscenter="true" v-bind:ismenu="true"
				 v-bind:clickMenuFather="clickMenu" v-bind:resetBtn="resetBtn"></EsunHeader>
				<div class="mcontent">
					<span class="contentTitle">收藏</span>
					<span class="addImg" @click="addCollection"><img :src="addCollect" alt=""></span>
					<div class="mui-content-padded" style="margin: 0px;">
						<div class="groupMenu">
							<div class="inputRow" v-for="(item,index) in permissions3" v-show="item.show" @tap="goEminfomt(item,index)">
								<span class="deleteSpan" v-show="editShow"><img :src="deleteIcon" alt=""></span>
								<div class="menuImg">
									<img class="btnimg" v-bind:src="item.img">
									<label class="menuName">
											<!-- <span v-show="item.collectionStatus" class="star mui-icon iconfont icon-star" @tap="changeCollectStatus($event,item,index)"></span>
											<span v-show="!item.collectionStatus" class="star mui-icon iconfont icon-star1" @tap="changeCollectStatus($e vent,item,index)"></span>-->
										<span>{{item.name}}</span>
									</label>
								</div>	
							</div>
						</div>
					</div>
				</div>
				
				
				<div class="bcontent">
					<span class="contentTitle">系统</span>
					<div class="threeTitle">
						<span v-for="(value,index) in imgChoose" @tap="changeMenu(index)"><img :src="value"/></span>
						<!-- <span><img :src="mrs" /></span>
						<span><img :src="twh" /></span> -->
					</div>
					<div class="subTitle">
						<div class="smallTitle" v-for="(value,index) in smallTitle">
							<span @click="changePage(index)" v-bind:class="{black:index==current}">{{value}}</span>
							<span :key="index" :index="index" v-bind:class="{black:index==current}"></span>
						</div>
					</div>
					<div class="mui-content-padded" style="margin: 0px;">
						<div class="groupMenu">
							<div class="inputRow" v-for="(item,index) in permissions" v-show="item.show" @tap="goEminfomt(item,index)">
								<div class="menuImg">
									<img class="btnimg" src="">
									<label class="menuName">
											<!-- <span v-show="item.collectionStatus" class="star mui-icon iconfont icon-star" @tap="changeCollectStatus($event,item,index)"></span>
											<span v-show="!item.collectionStatus" class="star mui-icon iconfont icon-star1" @tap="changeCollectStatus($e vent,item,index)"></span>-->
										<span>{{item.name}}</span>
									</label>
								</div>
								<!-- <div class style="border-bottom: 1px solid #cccccc;"> -->
								
							</div>
						</div>
					</div>
				</div>
				
			</div>
			<esunMenuFooter></esunMenuFooter>
		</div>
	</vue-drawer-layout>
</template>
<script>
	// const requireContext = require.context('../../assets/img/', true, /\.png$/)
	// const images = requireContext.keys().map(requireContext);
	// console.log(images)
	// 库存信息查询
	// 加号
	import addCollect from "../../assets/img/tianjia@2x.png";
	
	import codeMessage from "../../assets/img/kucun@2x.png";
	// 
	import codeSave from "../../assets/img/weiyima@3x(1).png";
	// 寄存采购收货
	import sendGet from "../../assets/img/jicuncaigou@2x.png";
	// 非整包
	import noOne from "../../assets/img/feizhengbao@2x.png";
	// 寄存库存转移
	import sendSave from "../../assets/img/jicun@2x.png";
	// 采购退货
	import getBack from "../../assets/img/caigoutuihuo@2x.png";
	// 加工单入库
	import workIn from "../../assets/img/jiagongdan@2x(1).png";
	// 加工单退料
	import workOut from "../../assets/img/jiagongdantuiliao@2x.png";
	// 领料单发料
	import getIn from "../../assets/img/linliaodan@2x.png";
	// 退料入库
	import backOn from "../../assets/img/tuiliaod@3x(1).png";
	// 退料出库
	import backOut from "../../assets/img/tuiliaodan@2x.png";
	// 外协入库
	import outIn from "../../assets/img/waixieruku@2x.png";
	// 外协出库
	import outOt from "../../assets/img/waixiechuku@2x.png";
	// 其它领用出库
	import oth from "../../assets/img/qitalinyong@2x.png";
	// 盘点扫描
	import panDe from "../../assets/img/pandiansaomiao@2x.png";
	// 拆包
	import splitOut from "../../assets/img/cahibao@2x.png";
	// 合包
	import joinIn from "../../assets/img/hebao@2x.png";
	// 加工单入库
	import workIner from "../../assets/img/jiagongdan@2x.png";
	// 销售发货
	import saleOut from "../../assets/img/xiaoshoufahuo@2x.png";
	// 退料上架
	import outOn from "../../assets/img/tuiliaoshangjia@2x.png"
	// 加icon
	import addIcon from "../../assets/img/add@2x.png"
	// 减icon
	import deleteIcon from "../../assets/img/delete@2x.png"
	import mui from "../../assets/js/mui.min";
	import app from "../../assets/js/app";
	import inventoryTransfer from "../../assets/img/inventoryTransfer.png";
	import shoppingCar from "../../assets/img/shoppingCar.png";
	import twh from "../../assets/img/disanfan@2x.png";
	import twhChoose from "../../assets/img/disanfanxz@2x.png";
	import wms from "../../assets/img/kucunguanli@2x.png";
	import wmsChoose from "../../assets/img/kucunglxz@2x.png";
	import mrs from "../../assets/img/shengchan@2x.png";
	import mrsChoose from "../../assets/img/shengchanguanli@2x.png";
	import selectChoose from "../../assets/img/xuanze@2x.png";

	export default {
		name: "menu",
		data: function() {
			return {
				// header: "菜单",
				mask: false,
				domains: [],
				timesindex: -1,
				userId: "",
				showDomainsDiv: true,
				domain: '',
				domainNow:'',
				menuArray: [],
				selectChoose:selectChoose,
				addIcon:addIcon,
				deleteIcon:deleteIcon,
				editShow:false,
				smallTitle:['全部','物流','库存','数据'],
				current:0,
				addCollect:addCollect,
				showSelect:false,
				imgChoose:[wmsChoose,mrs,twh],
				permissions: [
					
				],
				permissions2: [
					{
						id: "barcodeInventoryInquiry",
						name: "条码库存查询",
						img: codeSave,
						show: false,
						collectionStatus: false
					},
				],
				permissions3: [
					{
						id: "barcodeInventoryInquiry",
						name: "条码库存查询",
						img: codeSave,
						show: true,
						collectionStatus: false
					},
					{
						id: "barcodeInventoryInquiry",
						name: "条码库存查询",
						img: codeSave,
						show: true,
						collectionStatus: false
					},
					{
						id: "barcodeInventoryInquiry",
						name: "条码库存查询",
						img: codeSave,
						show: true,
						collectionStatus: false
					},
					{
						id: "barcodeInventoryInquiry",
						name: "条码库存查询",
						img: codeSave,
						show: true,
						collectionStatus: false
					},
					
				],
			};
		},
		methods: {
			chooseDomain(){
				this.showSelect = !this.showSelect;
			},
			logOut(){
				this.$refs.drawer.toggle(false)
				localStorage.removeItem('userMsg')
				this.$router.replace('/')
			},
			changeDomain(index){
				if(this.showSelect){
					this.showSelect = false;
				}
				app.chgDoma(this.domains[index]);
				this.$refs.drawer.toggle(false)
				this.$nextTick(()=>{
					this.domainNow = localStorage.getItem('domainNow')
				})
			},
			seledDomain() {
				if (!this.domain) {
					mui.alert("请选择一个域");
					return;
				}
				this.showDomainsDiv = false
				app.chgDoma(this.domain);
				// this.searchLocalData()
				this.domainNow = localStorage.getItem('domainNow')
			},
			resetBtn(){
				
			},
			addCollection(){
				// 待完成
			},
			clickMenu() {
				this.$refs.drawer.toggle()
			},
			handleMaskClick() {
				this.$refs.drawer.toggle(false)
			},
			goEminfomt: function(item, index) {
				this.$router.push({
					path: "/" + item.id,
					query: {
						name: item.name
					}
				});
			},
			searchLocalData() {
				let _this = this
				_this.$indexDB.cat('offlineData', null, function(event, tempArray) {
					if (event.type === 'error') {} else if (event.type === 'complete') {
						if (tempArray.length !== 0) {
							mui.confirm('存在本地数据是否查看？', '提示信息', ['否', '是'], function(e) {
								if (e.index == 1) {
									_this.$router.push({
										path: "/allContent",
										query: {}
									});
								} else {}
							});
						}
					}
				})

			},
			compare(prop) {
				return function(a, b) {
					return a[prop] - b[prop]
				}
			}
		},
		created: function() {
			let _this = this
			_this.domainNow = localStorage.getItem("domainNow")
			_this.menuArray = JSON.parse(localStorage.getItem('menuArray'))
			_this.menuArray = _this.menuArray.sort(_this.compare('searchSelect'))
			_this.domains = localStorage.getItem('domainArray').split(",")
			_this.$store.dispatch('commitOnlineStatusDescribe', '在线')
			_this.$store.dispatch('commitOnlineStatusIconColor', 'green')
			_this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
			app.init(_this);
			app.offlineAjax({}, 'HelloWorld', _this, function() {}, function() {})
			let {
				length: len
			} = 'hello'
		}
	};
</script>

<style scoped>
	html,
	body {
		height: 100%;
		padding: 0;
		margin: 0;
	}
	.subUl{
		width: 100%;
		height: 1rem;
		padding: 0 0.15rem 0 0.15rem;
	}
	.subUl li{
		list-style: none;
		width: 100%;
		height: 0.5rem;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:600;
		line-height:0.5rem;
		border-bottom:1px solid rgba(238,236,247,1);
		position: relative;
	}
	/* .subUl li:last-of-type{
		border-bottom:none;
	} */
	.subUl a{
		position: absolute;
		color:rgba(51,51,51,1);
		line-height:0.5rem;
	}
	.imgAbsolute{
		position: absolute;
		bottom: 0.12rem;
		right: 0;
	}
	.subUl span{
		display: inline-block;
		width: 1.4rem;
		height: 0.5rem;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:500;
		margin-left: 0.65rem;
	}
	
	/* menu样式 */
	.bcontent{
		position: absolute;
		padding: 0.1rem 0.15rem 0 0.15rem;
		top: 192px;
		width: 100%;
		bottom: 1px;
		left: 0%;
		overflow: scroll;
	}
	.contentTitle{
		font-size:0.12rem;
		font-family:PingFang SC;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:0.25rem;
	}
	
	.mui-input-group .mui-input-row {
		height: 50px;
	}

	.mui-input-row {
		justify-content: flex-start;
		flex-wrap: nowrap;
		display: flex;
	}
	.threeTitle{
		width: 100%;
		height: 0.72rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.threeTitle img{
		width: 1.05rem;
		height: 0.72rem;
	}
	.subTitle {
		width: 100%;
		height: 0.3rem;
		margin-top: 0.22rem;
		font-size:0.13rem;
		font-family:PingFang SC;
		font-weight:600;
		color:rgba(153,153,153,1);
		line-height: 0.13rem;
	}
	.smallTitle{
		display: inline-block;
		width: 0.3rem;
		height: 0.3rem;
		margin-right: 0.36rem;
	}
	.smallTitle span:first-of-type{
		width:0.24rem;
		height:0.12rem;
		line-height:0.12rem;
	}
	.smallTitle span:last-of-type{
		display: block;
		width:0.15rem;
		margin-left: 0.06rem;
		margin-top: 0.04rem;
		height:1px;
		background:rgba(59,88,212,1);
	}
	.groupMenu{
		position: relative;
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 0.05rem;
	}
	.inputRow{
		position: relative;
		width: 1.65rem;
		height: 0.4rem;
		background:rgba(255,255,255,1);
		border:1px solid rgba(238, 236, 247, 1);
		box-shadow:0px 2px 18px 1px rgba(59,88,212,0.08);
		border-radius:1px;
		margin-bottom: 0.13rem;
	}
	.inputRow:nth-of-type(odd){
		margin-right: 0.15rem;
	}
	.menuImg{
		/* position: absolute; */
		margin-left: 0.22rem;
	}
	.btnimg{
		width: 0.3rem;
		height: 0.3rem;
		/* position: absolute; */
		margin-top:0.06rem;
	}
	.menuName{
		display: inline-block;
		position: absolute;
		left:0.66rem;
		top:0.1rem;
		font-size:0.12rem;
		font-family:PingFang SC;
		font-weight:600;
		color:rgba(51,51,51,1);
		/* line-height: 0.4rem; */
	}
	.mmenu {
		position: absolute;
		top: 45px;
		width: 95%;
		left: 2.5%;
		overflow: scroll;
	}

	.mui-input-group .mui-input-row:after {
		left: 65px;
	}

	.mbutten {
		width: 9.8rem;
		height: 9.8rem;
		background: white;
		border-radius: 0.8rem;
		box-shadow: 3px 3px 3px #888888;
		text-align: center;
		margin: 0 auto;
		margin-top: 2rem;
	}

	.mui-input-group {
		margin: 0%;
	}

	.butName {
		padding-top: 0.8rem;
		font-weight: 700;
	}

	.mbuttenb {
		width: 50%;
		text-align: center;
		height: 11rem;
		float: left;
	}

	.mcontent {
		position: absolute;
		padding: 0.1rem 0.15rem 0 0.15rem;
		top: 44px;
		width: 100%;
		bottom: 1px;
		left: 0%;
		overflow: scroll;
	}
	
	.content-menu {
		margin-top: 54px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.iconbtn {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		margin-top: 5%;
		margin-left: 2.5%;
		width: 30%;
	}

	.iconbtn img {
		width: 4rem;
	}

	.iconbtn span {
		font-size: 0.7rem;
	}

	.popover-bg {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 100;
		background-color: rgba(101, 112, 107, 0.2);
	}

	.popover-bg .popover-inner {
		position: absolute;
		width: 3rem;
		height: 2.58rem;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(238, 236, 247, 1);
		box-shadow: 0px 2px 18px 1px rgba(59, 88, 212, 0.08);
		border-radius: 1px;
		left: 0.38rem;
		top: 1.91rem;
		z-index: 101;
		padding: 0.24rem 0 0 0.19rem;

	}
	.addImg{
		position: absolute;
		right:0.15rem;
		top:0.15rem;
	}
	.addImg img{
		width: 0.15rem;
		height: 0.15rem;
	}
	.hr {
		width: 2.65rem;
		height: 1px;
		display: block;
		background: rgba(238, 236, 247, 1);
		margin-top: 0.2rem;
		margin-bottom: 0.15rem;
	}
	.inputGroup{
		width: 2.65rem;
		height: 0.47rem;
		line-height: 0.47rem;
		flex: 1;

	}
	.inputGroup label{
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:600;
		color:rgba(51,51,51,1);
	}
	.mui-checkbox input[type=checkbox]:before, .mui-radio input[type=radio]:before {
		width:0.2rem;
		height:0.2rem;
		border-radius:50%;
		position: absolute;
		right: -0.15rem;
	}
	.card{
		position: relative;
		width: 2.65rem;
		height: 1rem;
		display: flex;
		flex-direction: column;
		overflow: scroll;
	}
	.popover-bg .title {
		/* width:63px;
	height:16px; */
		font-size: 0.16rem;
		font-family: PingFang SC;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		line-height: 25px;
	}

	.popover-bg .btn-bg {
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 0.12rem;
		left: 0;
	}

	.popover-bg .btn-bg button {
		/* position: absolute; */
		/* margin-left:0.08rem; */
		width: 2.77rem;
		height: 0.47rem;
		background:rgba(59,88,212,1);
		color: #fff;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:600;
	}

	.mui-checkbox input[type='checkbox']:checked:before,
	.mui-radio input[type='radio']:checked:before {
		color: #343434;
	}

	.popover-inner .mui-input-group .mui-input-row:after {
		left: 0;
	}

	/* .star {
		font-size: 20px !important;
		width: 33px;
		padding-left: 5px;
	}

	.icon-star {
		color: #ffcc00;
	} */
	.black{
		color: #333333;
	}
	
	.subUl{
		width: 100%;
		height: 1rem;
		padding: 0 0.15rem 0 0.15rem;
	}
	.subUl li{
		list-style: none;
		width: 100%;
		height: 0.5rem;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:600;
		line-height:0.5rem;
		border-bottom:1px solid rgba(238,236,247,1);
		position: relative;
	}
	.subUl li:last-of-type{
		border-bottom:none;
	}
	.subUl a{
		position: absolute;
		color:rgba(51,51,51,1);
		line-height:0.5rem;
	}
	.imgAbsolute{
		position: absolute;
		bottom: 0.12rem;
		right: 0;
	}
	.subUl span{
		display: inline-block;
		width: 1.5rem;
		height: 0.5rem;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:500;
		margin-left: 0.65rem;
	}
	.chooseDv{
		display: inline-block;
		width: 1.5rem;
		height: 0.5rem;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:500;
		margin-left: 0.65rem;
	}
	.chooseSelect{
		display: block;
		width: 100%;
		height: auto;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:500;
	}
	.chooseSelect .subUl{
		padding: 0;
		border-bootom: 1px solid rgba(238,236,247,1);
	}
	.chooseSelect .subUl li{
		border:1px solid rgba(238,236,247,1);
		border-top: 0;
		/* border-bottom: 0; */
	}
	.signOn{
		width:2.16rem;
		height: 0.45rem;
		background:rgba(255,62,100,1);
		border-radius:1px;
		position: absolute;
		bottom: 0.16rem;
		left: 0.13rem;
		/* margin-left: 0.13rem; */
	}
	.signOn button{
		width:2.16rem;
		height: 0.45rem;
		background:rgba(255,62,100,1);
		border-radius:1px;
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:600;
		color:rgba(255,255,255,1);
		/* line-height:0.45rem; */
	}
	.deleteSpan{
		position: absolute;
		width: 0.18rem;
		height: 0.18rem;
		right: -0.09rem;
		top: -0.09rem;
	}
</style>
