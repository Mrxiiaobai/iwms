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
				<EsunHeader v-bind:iscenter="true" v-bind:ismenu="true" v-bind:headername="header" v-bind:usercenter="gousercenter"
				 v-bind:clickMenuFather="clickMenu" v-bind:resetBtn="resetBtn"></EsunHeader>
				<div class="mcontent">
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
									<img class="btnimg" v-bind:src="item.img">
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
				<div class="popover-bg" v-show="showDomainsDiv">
					<div class="popover-inner">
						<div class="popInner">
							<div class="title">请选择作用域</div>
							<span class="hr"></span>
							<div class="card">
								<div class="mui-input-group inputGroup">
									<div v-for="(item,index) in domains" class="mui-input-row mui-radio" v-bind:key="index">
										<label>{{item}}</label>
										<input name="radio" :value="item" v-model="domain" type="radio">
									</div>
								</div>
							</div>
							<div class="btn-bg">
								<button @tap="seledDomain" type="button" class="confirmBtn">确认</button>
							</div>
						</div>
					</div>
					<div class="popover" v-show="showDomainsDiv"></div>
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
	// 条码查询
	import codeMessage from "../../assets/img/erweimaxinxi@2x.png";
	// 条码库存
	import codeSave from "../../assets/img/kucun@2x.png";
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
	// 退料上架
	import backOn from "../../assets/img/tuiliaoshangjia@2x.png";
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
				showSelect:false,
				domains: [],
				timesindex: -1,
				userId: "",
				showDomainsDiv: true,
				domain: '',
				domainNow:'',
				menuArray: [],
				imgChoose:[wmsChoose,mrs,twh],
				// wms:wms,
				// wmsChoose:wmsChoose,
				// mrs:mrs,
				// mrsChoose:mrsChoose,
				// twh:twh,
				// twhChoose:twhChoose,
				selectChoose:selectChoose,
				current:0,
				smallTitle:['全部','物流','库存','数据'],
				permissions: [],
				permissions2: [
					// {
					//   id: "transferWithQuantityChange",
					//   name: "变更数量的库存转移",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "feedingForFeedingBill",
					//   name: "补料单补料",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },

					{
						id: "barcodeInventoryInquiry",
						name: "条码库存查询",
						img: codeSave,
						show: false,
						collectionStatus: false
					},
					{
						id: "packageDisassembly",
						name: "拆包",
						img: splitOut,
						show: false,
						collectionStatus: false
					},
					{
						id: "packageCombined",
						name: "合包",
						img: joinIn,
						show: false,
						collectionStatus: false
					},
					{
						id: "deliveryForOtherPicking",
						name: "其他领用出库",
						img: oth,
						show: false,
						collectionStatus: false
					},
					{
						id: "consignmentInventoryTransfer",
						name: "非整包发放",
						img: noOne,
						show: false,
						collectionStatus: false
					},
					{
						id: "consignmentInventoryTransfer1",
						name: "寄存库存转移",
						img: sendSave,
						show: false,
						collectionStatus: false
					},
					{
						id: "consignmentPurchaseOrderReceipt",
						name: "寄存采购收货",
						img: sendGet,
						show: false,
						collectionStatus: false
					},
					// {
					//   id: "purchaseOrderReceipt",
					//   name: "采购收货",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					{
						id: "purchaseOrderReturn",
						name: "采购退货",
						img: getBack,
						show: false,
						collectionStatus: false
					},
					{
						id: "workOrderIssue",
						name: "加工单发料",
						img: workIn,
						show: false,
						collectionStatus: false
					},
					{
						id: "workOrderReturn",
						name: "加工单退料",
						img: workOut,
						show: false
					},
					{
						id: "ReceivingOrderIssue",
						name: "领料单发料",
						img: getIn,
						show: false,
						collectionStatus: false
					},
					{
						id: "ReturnListMT",
						name: "退料单维护",
						img: backOut,
						show: false,
						collectionStatus: false
					},
					{
						id: "ReturnGround",
						name: "退料上架",
						img: backOn,
						show: false,
						collectionStatus: false
					},
					{
						id: "salesIssue",
						name: "销售发货",
						img: saleOut,
						show: false,
						collectionStatus: false
					},
					// {
					//   id: "shipperScanningReceipt",
					//   name: "货运单扫描收货",
					//   img: planSc,
					//   show: true
					// },




					// {
					//   id: "workOrderReceipt",
					//   name: "加工单入库",
					//   img: workIner,
					//   show: false,
					//   collectionStatus: false
					// },

					// {
					//   id: "inventoryTransfer",
					//   name: "库存转移",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					{
						id: "countedScanning",
						name: "盘点扫描",
						img: panDe,
						show: false,
						collectionStatus: false
					},
					// {
					//   id: "pickingWithBurdeningBill",
					//   name: "配料单领料",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "chargingWithBurdeningBill",
					//   name: "配料单上料",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "transferWithBurdeningBill",
					//   name: "配料单转移",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },

					// {
					//   id: "generatingFeedingRequireWithScanning",
					//   name: "扫描生成补料需求",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "barcodeShipment",
					//   name: "条码发货",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },

					// {
					//   id: "barcodeDelivery",
					//   name: "条码取货",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },

					// {
					//   id: "packingSalver",
					//   name: "托盘包装",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "disassembingSalverCombiningSalver",
					//   name: "托盘拆分/合并",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "replacingSalver",
					//   name: "托盘替换",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "relatingWithExternalLabel",
					//   name: "外部标签关联",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "repetitivePicklistConfirm",
					//   name: "重复生产领料单确认",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "repetitiveReceiptBackflush",
					//   name: "重复生产入库回冲",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "repetitiveReceiptReview",
					//   name: "重复生产入库回冲(追溯码)",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "pickingWithTransferOrder",
					//   name: "转移单取货",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "transferWithTransferOrder",
					//   name: "转移单转移",
					//   img: planSc,
					//   show: false,
					//   collectionStatus: false
					// },
					// {
					//   id: "allContent",
					//   name: "离线数据明细",
					//   img: shoppingCar,
					//   show: false,
					//   collectionStatus: false
					// }
					{
						id: "crtInStore",
						name: "加工单入库",
						img: workIner,
						show: false,
						collectionStatus: false
					},
					{
						id: "wipcoderc",
						name: "外协入库",
						img: outIn,
						show: false,
						collectionStatus: false
					},
					{
						id: "pcodeis",
						name: "外协出库",
						img: outOt,
						show: false,
						collectionStatus: false
					},
					{
						id: "barcodeInformationInquiry",
						name: "条码信息查询",
						img: codeMessage,
						show: false,
						collectionStatus: false
					},
					{
						id: "purchaseOrderReturnSD",
						name: "采购退货（申达）",
						img: codeMessage,
						show: false,
						collectionStatus: false
					},
				],
				mrsPermission:[],
				twhPermission:[]
			};
		},
		methods: {
			resetBtn:function(){
				
			},
			changeMenu:function(index){
				let _this = this;
				if(index==0){
					// wms系统
					_this.imgChoose = [wmsChoose,mrs,twh];
				}else if(index==1){
					// mrs系统
					_this.imgChoose = [wms,mrsChoose,twh];
				}else{
					// twh系统
					_this.imgChoose = [wms,mrs,twhChoose];
				}
			},
			changeCollectStatus(e, item, index) {
				e.cancelBubble = true
				item.collectionStatus = !item.collectionStatus
			},
			changePage(index){
				this.current = index;
			},
			gousercenter: function() {
				app.center(this);
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
			selectMenu() {
				let _this = this
				for (let i = 0; i < _this.menuArray.length; i++) {
					const element = _this.menuArray[i];
					for (let j = 0; j < _this.permissions2.length; j++) {
						const element2 = _this.permissions2[j];
						if (element.SearchProgramID.toLowerCase().trim() == element2.id.toLowerCase().trim()) {
							element2.name = element.searchLabel
							element2.show = true
							_this.permissions.push(element2)
							break
						}
					}
				}
				// _this.menuArray
			},
			compare(prop) {
				return function(a, b) {
					return a[prop] - b[prop]
				}
			},
			chooseDomain(){
				this.showSelect = !this.showSelect;
			},
			logOut(){
				this.$refs.drawer.toggle(false)
				localStorage.removeItem('userMsg')
				this.$router.replace('/')
			}
		},
		// activated() {
		//   mui.alert('b')
		//   this.showDomainsDiv = false
		// },
		mounted:function(){
			let _this = this;
		},
		computed:{
			// domainNow(){
			// 	let domainNow = ''
			// 	domainNow = localStorage.getItem("domainNow")
			// 	return domainNow
			// }
			
		},
		created: function() {
			let _this = this
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
			_this.selectMenu()
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
	.popover{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 100;
		background:rgba(0,0,0,1);
		opacity:0.62;
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
	.contentTitle{
		font-size:0.12rem;
		font-family:PingFang SC;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:0.25rem;
	}
	
	.mui-input-group .mui-input-row {
		height: 0.5rem;
		border: none;
		margin: 0;
		box-shadow: none;
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
		background: none;
	}
	.smallTitle span:last-of-type{
		display: block;
		width:0.15rem;
		margin-left: 0.06rem;
		margin-top: 0.04rem;
		height:1px;
		/* background:rgba(59,88,212,1); */
	}
	.groupMenu{
		position: relative;
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 0.05rem;
		margin-bottom: 0.47rem;
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
		/* height: 0.47rem; */
		line-height: 0.47rem;
		flex: 1;

	}
	.inputGroup label{
		font-size:0.14rem;
		font-family:PingFang SC;
		font-weight:600;
		color:rgba(51,51,51,1);
		padding: 0.11rem 0.15rem;
		line-height: 0.14rem;
	}
	.mui-checkbox input[type=checkbox]:before, .mui-radio input[type=radio]:before {
		/* width:0.2rem;
		height:0.2rem; */
		border-radius:50%;
		position: absolute;
		right: -0.15rem;
	}
	.card{
		position: relative;
		width: 2.65rem;
		height: 1.2rem;
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

	/* .mui-checkbox input[type='checkbox']:checked:before,
	.mui-radio input[type='radio']:checked:before {
		color: #343434;
	} */

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
		background:rgba(59,88,212,1);
	}
</style>
