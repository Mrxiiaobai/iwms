<template>
	<v-touch v-on:swiperight="back" class="wrapper">
		<div class="container" v-cloak>
			<EsunHeader v-bind:ismenu="false" v-bind:iscenter="false" v-bind:headername="header" v-bind:goback="back"
			 v-bind:usercenter="gousercenter" v-bind:resetBtn="resetBtn"></EsunHeader>
			<div class="content">
				<div class="mui-content-padded" style="margin: 0px;">
					<div class="mui-input-group">
						<div class="mui-input-row" :class="inputDisableCycle1==true?'disabledTrue':''">
							<label>生效日期:</label>
							<input class="mui-version" type="date" v-model="effectiveDate" :disabled="inputDisableCycle1">
						</div>
					</div>
					<div v-bind:class="{wholeDv:inputDisableCycle2?'wholeDv':''}" class="marginDv">
						<div class="mui-input-group barcodeUi">
							<div class="mui-input-row" :class="inputDisableCycle2==true?'disabledTrue':''">
								<label>
									加工单ID<span style="color:red;">*</span>
								</label>
								<input type="text" class="mui-input-clear" v-model="workOrderID" placeholder="请输入" :disabled="inputDisableCycle2"
								  ref="workID" @blur="chkToId" @focus="stopEject">
								<span class="mui-icon"><img src="../../assets/img/zhengcsaomiao@3x.png"></span>
							</div>
						</div>
						<div class="circleDv" v-show="inputDisableCycle2">
							<span class="smallCircle"></span>
							<span class="smallCircle"></span>
						</div>
						<EsunShowDetail v-show="inputDisableCycle2" v-bind:res="res2" v-bind:mres="mres2"></EsunShowDetail>

					</div>
					<div v-bind:class="{wholeDv:showDetail?'wholeDv':''}" class="marginDv">
						<div class="mui-input-group barcodeUi">
							<div class="mui-input-row" :class="inputDisableCycle3==true?'disabledTrue':''">
								<label>
									唯一码<span style="color:red;">*</span>
								</label>
								<input type="text" class="mui-input-clear" v-model="barcode" :disabled="inputDisableCycle3" 
								 placeholder="请输入" ref="Box" @change="chkType" @focus="stopEject">
								<span class="mui-icon"><img src="../../assets/img/zhengcsaomiao@3x.png"></span>
							</div>
						</div>
						<div class="circleDv" v-show="showDetail">
							<span class="smallCircle"></span>
							<span class="smallCircle"></span>
						</div>
						<EsunShowDetail v-show="showDetail" v-bind:res="res" v-bind:mres="mres"></EsunShowDetail>
					</div>
					
					<div class="mui-input-group" >
						<div class="mui-input-row" :class="!inputDisabledFlag==true?'disabledTrue':''" id="siteLocationDiv">
							<label>
								数量<span style="color:red;">*</span>
							</label>
							<input type="number" class="mui-input-clear" v-model="v_tempqty" :disabled="!inputDisabledFlag" 
							 ref="num" placeholder="请输入" @blur="chkToSo" @focus="stopEject">
							<span class="mui-icon"><img src="../../assets/img/zhengcsaomiao@3x.png"></span>
						</div>
					</div>
					<esunShowTable :res="ResForRec" :th="['唯一码','数量']" :fields="['tmpxwin_serial','tmpxwin_qty']"></esunShowTable>
					<!-- <EsunShowTable></esunShowTable> -->
				</div>
			</div>
			<EsunFooter v-bind:confirmBtn="ok" v-bind:cancelBtn="cancel" v-bind:reloadBtn="reload"></EsunFooter>
			<EsunMask v-bind:show="mask"></EsunMask>
			<EsunReset v-if="showPop" v-bind:confirmBtn="confirmBtn" v-bind:cancelBtn="cancelBtn"></EsunReset>
		</div>
	</v-touch>
</template>
<script>
	import mui from "../../assets/js/mui.min";
	import app from "../../assets/js/app";
	export default {
		name: "workOrderIssue",
		data: function() {
			return {
				ResForRec: [],
				userId: "",
				domain: '',
				effectiveDate: '',
				//加工单id 721654
				workOrderID: '',
				//条码 SATG1907100000001
				barcode: '',
				//数量
				v_tempqty: '',
				// 弹窗
				showPop:false,
				v_qtychg: '',
				//工序
				v_op: '',
				//箱数
				v_count: 0,
				// workProcedure: '',
				site: '',
				grid: '',
				temp1: [],
				//扫描过的箱子或托盘信息表
				temp11: [],
				//扫描状态，是修改还是扫描
				status: true,
				flag: false,
				mask: false,
				header: "加工单发料",
				inputChangeAjaxFlag: true,
				inputDisabledFlag: false,
				inputDisableCycle1: false,
				inputDisableCycle2: false,
				inputDisableCycle3: true,
				showDetail:false,
				mres2: [{
						detail: [{
							name: '已扫描',
							content: '',

						}]
					},
					{
						detail: [{
							name: '加工单',
							content: '',

						}]
					},
				],
				mres: [{
						detail: [{
							name: '零件',
							content: '',
						}]
					},
					{
						detail: [{
							name: '数量',
							content: '',
						}]
					},
				],
				res: [

					{
						detail: [{
							name: '描述1',
							content: '',

						}]
					},
					{
						detail: [{
							name: '描述2',
							content: '',

						}]
					},
					{
						detail: [{
								name: '工序',
								content: '',

							},
							{
								name: '地点',
								content: '',
							}
						]
					},
					{
						detail: [{
								name: '供应商',
								content: '',

							},
							{
								name: '批次',
								content: '',

							}
						]
					},
					{
						detail: [{
								name: '货格',
								content: '',

							},

							{
								name: '参考号',
								content: '',

							}
						]
					},

					{
						detail: [{
								name: '批属1',
								content: '',

							},

							{
								name: '批属2',
								content: '',

							}
						]
					},

					{
						detail: [{
								name: '单位',
								content: '',

							},
							{
								name: '库位',
								content: '',

							}
						]
					},

					{
						detail: [{
								name: '供批次',
								content: '',

							},
							{
								name: '制造日期',
								content: '',

							}
						]
					},
					{
						detail: [{
								name: '生效日期',
								content: '',

							},
							{
								name: '失效日期',
								content: '',

							}
						]
					},
					{
						detail: [{
								name: '小包装号',
								content: '',

							},
							{
								name: '出库日期',
								content: '',

							}
						]
					},
				],

				res2: []
			};
		},
		created() {
			app.init(this)
			this.userId = JSON.parse(localStorage.getItem('userMsg')).userid
			this.effectiveDate = app.getDate()

		},
		mounted() {
			app.addBack(this.back);
			this.$refs.workID.focus();
		},
		destroyed(){
			app.removeBack(this.back);
		},
		methods: {
			confirmBtn:function(){
				let _this = this;
				_this.reset();
			},
			cancelBtn:function(){
				let _this = this;
				_this.showPop = false;
			},
			resetBtn:function(){
				let _this = this;
				_this.showPop = true;
			},
			cancel:function(){
				
			},
			// stopEject:function(e){
			// 	e.target.readOnly = true;
			// 	setTimeout(()=>{
			// 		e.target.readOnly = false;
			// 	},200)
			// 	// this.$refs.scanTextbox.setAttribute('readonly', 'readonly');
			// 	//   setTimeout(() => {
			// 	// 	this.$refs.scanTextbox.removeAttribute('readonly');
			// 	//  }, 200);
			// },
			reload: function() {
				let _this = this;
				this.showPop = false;
			},
			
			gousercenter: function() {
				this.inputChangeAjaxFlag = false
				app.center(this);
			},
			back: function() {
				this.inputChangeAjaxFlag = false
				app.back(this);
			},
			ok: function() {
				if (!this.flag || this.workOrderID === "") {
					return;
				}
				this.ajaxSaveId();
			},
			ajaxCheckId: function() {
				let _this = this;
				app.offlineAjax({
						input_userId: _this.userId,
						input_crop: '',
						input_domain: localStorage.getItem('domainNow'),
						input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
						input_ProgramID: 'xwbrwoiss01wochk',
						effdate: _this.effectiveDate,
						v_wolot: _this.workOrderID
					},
					'xwbrwoiss01wochk',
					_this,
					function(e) {
						_this.mres2[1].detail[0].content = e.v_wonbr;
						_this.inputDisableCycle1 = true;
						_this.inputDisableCycle2 = true;
						_this.inputDisableCycle3 = false;
						_this.$nextTick(() => {
							_this.$refs.Box.focus();
						})
					},
					function(e) {
						// 离线操作
					},
					function(e) {
						_this.target_site_grid = "";
						_this.workOrderID = "";
						_this.$nextTick(() => {
							_this.$refs.workID.focus();
						})
					}
				)
			},
			ajaxCheckTypeCode: function() {
				let _this = this;
				app.offlineAjax({
						input_userId: _this.userId,
						input_crop: '',
						input_domain: localStorage.getItem('domainNow'),
						input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
						input_ProgramID: 'xwbrwoiss01typechk',
						effdate: _this.effectiveDate,
						//加工单id
						v_wolot: _this.workOrderID,
						//条码
						v_serial: _this.barcode,
						temp1: _this.temp1,
					},
					'xwbrwoiss01typechk',
					_this,
					function(e) {
						//输入框数量
						
						_this.v_tempqty = e.v_qty;
						_this.v_qtychg = e.v_qtychg;
						_this.v_op = e.v_op;
						_this.showDetail = true;
						_this.mres = [{
								detail: [{
									name: '零件',
									content: e.v_part,
								}]
							},
							{
								detail: [{
									name: '数量',
									content: _this.v_tempqty,
								}]
							},
						];
						_this.res = [{
								detail: [{
									name: '描述1',
									content: e.v_ptdesc1,
								}]
							},
							{
								detail: [{
									name: '描述2',
									content: e.v_ptdesc2,
								}]
							},
							{
								detail: [{
										name: '工序',
										content: e.v_op,

									},
									{
										name: '地点',
										content: e.v_site,
									}
								]
							},
							{
								detail: [{
										name: '供应商',
										content: e.v_vend,
									},
									{
										name: '批次',
										content: e.v_lot,
									}
								]
							},
							{
								detail: [{
									name: '货格',
									content: e.v_grid,
								}, {
									name: '参考号',
									content: e.v_ref,
								}]
							},
							{
								detail: [{
									name: '批属1',
									content: e.v_lot_att1,
								}, {
									name: '批属2',
									content: e.v_lot_att2,
								}]
							},
							{
								detail: [{
									name: '单位',
									content: e.v_um,
								}, {
									name: '库位',
									content: e.v_loc,
								}]
							},

							{
								detail: [{
									name: '供批次',
									content: e.v_vend_lot,
								}, {
									name: '制造日期',
									content: app.getProgressDate(e.v_date_mfc),
								}]
							},
							{
								detail: [{
										name: '生效日期',
										content: app.getProgressDate(e.v_effdate),

									},
									{
										name: '失效日期',
										content: app.getProgressDate(e.v_date_disa),

									}
								]
							},
							{
								detail: [{
										name: '小包装号',
										content: e.v_box,

									},
									{
										name: '出库日期',
										content: app.getProgressDate(e.v_date02),

									}
								]
							},
						];
						if (_this.v_qtychg) {
							_this.inputDisabledFlag = true;
							_this.$nextTick(() => {
								_this.$refs.num.focus();
							})
						} else {
							_this.inputDisabledFlag = false;
							_this.ajaxCheckCode();
						}
						// _this.ajaxCheckCode();
					},
					function(e) {
						// 离线操作
					},
					function(e) {
						_this.barcode = "";
						_this.$nextTick(() => {
							_this.$refs.Box.focus();
						})
					});
			},
			// 数量校验
			ajaxCheckCode: function(status) {
				let _this = this;
				_this.mres[1].detail[0].content = _this.v_tempqty;
				app.offlineAjax({
						input_userId: _this.userId,
						input_crop: '',
						input_domain: localStorage.getItem('domainNow'),
						input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
						input_ProgramID: 'xwbrwoiss01srchk',
						effdate: _this.effectiveDate,
						//加工单id
						v_wolot: _this.workOrderID,
						//条码
						v_serial: _this.barcode,
						//工序
						v_tempop: _this.v_op,
						//数量
						v_tempqty: _this.v_tempqty,
						//扫描过的箱子或托盘信息表
						temp1: _this.temp1,
						// 已扫描箱数
						v_count: _this.v_count
					},
					'xwbrwoiss01srchk',
					_this,
					function(e) {
						_this.flag = true;
						_this.mres[1].detail[0].context = _this.v_tempqty;
						_this.ResForRec.push({
							tmpxwin_serial: e.v_tpbox.toLowerCase().trim(),
							tmpxwin_qty: _this.v_tempqty,
						});
						_this.mres2[0].detail[0].content = e.v_count1;
						_this.v_count = e.v_count1;
						_this.temp1.push(e.input_xwbrwoiss01srchkin[e.input_xwbrwoiss01srchkin.length-1]);
						// _this.temp1[e.input_xwbrwoiss01srchkin.length-1].input_xwbrwoiss01srchkin_qty = _this.v_tempqty;
						_this.$nextTick(() => {
							_this.$refs.Box.focus();
							_this.barcode = '';
							_this.v_tempqty = '';
							_this.inputDisabledFlag = false;
						});
					},
					function(e) {
						// 离线操作
					},
					function(e) {
						_this.v_tempqty = "";
						_this.$nextTick(() => {
							_this.$refs.num.focus();
						})
					}
				)
			},
			ajaxSaveId: function() {
				let _this = this;
				console.log(_this.temp1);
				app.offlineAjax({
						input_userId: _this.userId,
						input_crop: '',
						input_domain: localStorage.getItem('domainNow'),
						input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
						input_ProgramID: 'xwbrwoiss01save',
						effdate: _this.effectiveDate,
						v_wolot: _this.workOrderID,
						temp1: _this.temp1,
					},
					'xwbrwoiss01save',
					_this,
					function(e) {
						_this.reset();
						mui.alert('发料成功');
					}
				)
			},
			//加工单校验
			chkToId: function() {
				var _this = this;
				if (_this.workOrderID === '') {
					return;
				}
				_this.workOrderID = _this.workOrderID.toLowerCase().trim();
				_this.ajaxCheckId();
			},
			// 数量校验
			chkToSo: function() {
				if (this.v_tempqty === "") {
					return;
				}
				this.ajaxCheckCode();
			},
			//条码校验
			chkType: function() {
				var _this = this;
				if (_this.barcode == '') {
					return;
				}
				_this.barcode = _this.barcode.toLowerCase().trim();
				_this.ajaxCheckTypeCode();
			},
			reset: function() {
				let _this = this;
				_this.showDetail = false;
				_this.flag = false;
				_this.v_qtychg = '';
				_this.v_count = 0;
				_this.workOrderID = '';
				_this.barcode = '';
				_this.v_tempqty = '';
				_this.temp1 = [];
				_this.inputDisabledFlag = false;
				_this.inputDisableCycle1 = false;
				_this.inputDisableCycle2 = false;
				_this.mres2[0].detail[0].content = "";
				_this.mres2[1].detail[0].content = "";
				_this.mres[0].detail[0].content = "";
				_this.mres[1].detail[0].content = "";
				_this.res[0].detail[0].content = "";
				_this.res[1].detail[0].content = "";
				_this.res[2].detail[0].content = "";
				_this.res[3].detail[0].content = "";
				_this.res[4].detail[0].content = "";
				_this.res[5].detail[0].content = "";
				_this.res[6].detail[0].content = "";
				_this.res[7].detail[0].content = "";
				_this.res[8].detail[0].content = "";
				_this.res[9].detail[0].content = "";
				_this.res[2].detail[1].content = "";
				_this.res[3].detail[1].content = "";
				_this.res[4].detail[1].content = "";
				_this.res[5].detail[1].content = "";
				_this.res[6].detail[1].content = "";
				_this.res[7].detail[1].content = "";
				_this.res[8].detail[1].content = "";
				_this.res[9].detail[1].content = "";
				_this.showPop = false;
				_this.$nextTick(function() {
					_this.$refs.workID.focus();
				})
				_this.ResForRec = [];
			}
		},
		activated: function() {
			this.inputChangeAjaxFlag = true
		}
	};
</script>

<style scoped>
	.center {
		padding-top: 20px;
	}

	

	.mui-input-row .mui-input-clear~.mui-icon-clear {
		top: 0.2rem !important;
		color: lightblue !important;
		font-size: 35px;
	}

	.inforLabel {
		background-color: #f2f2f2;
	}

	.mui-input-group .mui-input-row:after {
		bottom: auto;
	}
</style>
