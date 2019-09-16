<template>
	<v-touch v-on:swiperight="back" class="wrapper">
		<div class="container" v-cloak>
			<EsunHeader v-bind:ismenu="false" v-bind:iscenter="false" v-bind:headername="header" v-bind:goback="back"
			 v-bind:usercenter="gousercenter"></EsunHeader>
			<div class="content">
				<div class="mui-content-padded" style="margin: 0px;">
					<div class="mui-input-group">
						<div class="mui-input-row">
							<label>生效日期:</label>
							<input class="mui-version" type="date" :disabled="inputDisableCycle3" :class="inputDisableCycle3==true?'disabledTrue':''"
							 v-model="effectiveDate">
						</div>
					</div>
					<div class="mui-input-group">
						<div class="mui-input-row">
							<label>
								<span style="color:red;">*</span>地点库位
							</label>
							<input type="text" class="mui-input-clear" :disabled="inputDisableCycle2" :class="inputDisableCycle2==true?'disabledTrue':''"
							 v-model="target_site_grid" ref="site" @blur="changeTargetFocus" placeholder="请输入" @focus="stopEject">
							<span class="mui-icon"><img src="../../assets/img/zhengcsaomiao@3x.png"></span>

						</div>
					</div>
					<div class="mui-input-group">
						<div class="mui-input-row">
							<label>
								<span style="color:red;">*</span>加工单ID
							</label>
							<input type="text" class="mui-input-clear" ref="workID" :disabled="inputDisableCycle2" :class="inputDisableCycle2==true?'disabledTrue':''"
							 v-model="workOrderID" placeholder="请输入" @blur="chkReturnId" @focus="stopEject">
							<span class="mui-icon"><img src="../../assets/img/zhengcsaomiao@3x.png"></span>

						</div>
					</div>
					<EsunShowDetail v-bind:res="res2" v-bind:mres="mres2"></EsunShowDetail>
					<div class="mui-input-group">
						<div class="mui-input-row">
							<label>
								<span style="color:red;">*</span>唯一码
							</label>
							<input type="text" class="mui-input-clear" :disabled="inputDisableCycle4" :class="inputDisableCycle4==true?'disabledTrue':''"
							 v-model="barcode" placeholder="请输入" ref="Box" @change="chkToCode" @focus="stopEject">

							<span class="mui-icon"><img src="../../assets/img/zhengcsaomiao@3x.png"></span>

						</div>
					</div>
					<div class="mui-input-group">
						<div class="mui-input-row">
							<label>
								<span style="color:red;">*</span>工序
							</label>
							<input type="text" class="mui-input-clear" v-model="v_op" :disabled="!inputDisabledFlag" :class="!inputDisabledFlag==true?'disabledTrue':''"
							 placeholder="请输入" @blur="changeFocus" ref="op" @focus="stopEject">
							<span class="mui-icon"><img src="../../assets/img/zhengcsaomiao@3x.png"></span>

						</div>
					</div>
					<div class="mui-input-group">
						<div class="mui-input-row" id="siteLocationDiv">
							<label>
								<span style="color:red;">*</span>数量:
							</label>
							<input type="number" class="mui-input-clear" v-model="v_tempqty" :disabled="!inputDisabledFlag" :class="!inputDisabledFlag==true?'disabledTrue':''"
							 ref="num" placeholder="请输入" @blur="chkToSo" @focus="stopEject">
							<span class="mui-icon"><img src="../../assets/img/zhengcsaomiao@3x.png"></span>

						</div>
					</div>
					<EsunShowDetail v-bind:res="res" v-bind:mres="mres"></EsunShowDetail>
					<esunShowTable :res="ResForRec" :th="['箱号','数量']" :fields="['tmpxwin_serial','tmpxwin_qty']"></esunShowTable>
				</div>
			</div>
			<EsunFooter v-bind:confirmBtn="ok" v-bind:cancelBtn="cancel" v-bind:reloadBtn="reload"></EsunFooter>
			<EsunMask v-bind:show="mask"></EsunMask>
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
				flag: false,
				ResForRec: [],
				userId: "",
				domain: '',
				//有效日期
				effectiveDate: '',
				//加工单id 721654
				workOrderID: '',
				//至地点库位
				target_site_grid: '',
				quantityOfBoxScanned: 0,
				//条码 SATG1907100000001
				barcode: '',
				//数量
				v_tempqty: '',
				//箱数
				v_count: 0,
				// workProcedure: '',
				//工序
				v_op: '',
				itemId: '',
				site: '',
				grid: '',
				batch: '',
				// 扫描状态
				status: false,
				v_ptgrid: '',
				v_ptsite: '',
				v_ptloc: '',
				temp1: [],
				//扫描过的箱子或托盘信息表
				// temp11: [],
				referenceId: '',
				batchProperty1: '',
				batchProperty2: '',
				quantity: 0,
				mask: false,
				header: "加工单退料",
				inputChangeAjaxFlag: true,
				inputDisabledFlag: false,
				inputDisableCycle2: false,
				inputDisableCycle3: false,
				inputDisableCycle4: true,
				mres2: [{
						detail: [{
							name: '地点',
							content: '',

						}]
					},
					{
						detail: [{
							name: '库位',
							content: '',

						}]
					},
					{
						detail: [{
							name: '货格',
							content: '',

						}]
					},
					{
						detail: [{
							name: '已扫描',
							content: '',

						}]
					}
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
				res: [{
						detail: [{
							name: '工序',
							content: '',

						}]
					},
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
							name: '批属1',
							content: '',

						}]
					},
					{
						detail: [{
							name: '批属2',
							content: '',

						}, {
							name: '供应商',
							content: '',

						}]
					},
					{
						detail: [{
								name: '参考',
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
							name: '地点',
							content: '',

						}, {
							name: '单位',
							content: '',

						}]
					},
					{
						detail: [{
								name: '库位',
								content: '',

							},
							{
								name: '货格',
								content: '',

							}
						]
					},
					{
						detail: [{
							name: '供批次',
							content: '',
						}, {
							name: '制造日期',
							content: '',
						}]
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
			app.addBack(this.back)
			this.$refs.site.focus();
		},
		destroyed(){
			app.removeBack(this.back);
		},
		methods: {
			reload: function() {
				let _this = this;
				mui.confirm('是否确认清除数据', '前台提示', ['取消', '确认'], function(e) {
					if (e.index == 1) {
						_this.reset();
					} else {
						return;
					}
				}, 'div')
			},
			gousercenter: function() {
				this.inputChangeAjaxFlag = false
				app.center(this);
			},
			back: function() {
				this.inputChangeAjaxFlag = false
				app.back(this);
			},
			cancel: function() {

			},
			ok: function() {
				if (this.flag == false || this.target_site_grid === "") {
					return;
				}
				this.ajaxSaveId();
			},
			// wochk校验加工单
			ajaxChkReturnId: function() {
				let _this = this;
				app.offlineAjax({
						input_userId: _this.userId,
						input_crop: '',
						input_domain: localStorage.getItem('domainNow'),
						input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
						input_ProgramID: 'xwbrwoiss02wochk',
						effdate: _this.effectiveDate,
						v_wolot: _this.workOrderID,
						target_site_grid: _this.target_site_grid
					},
					'xwbrwoiss02wochk',
					_this,
					function(e) {
						_this.flag = true;
						_this.mres2[0].detail[0].content = e.v_site;
						_this.mres2[1].detail[0].content = e.v_loc;
						_this.mres2[2].detail[0].content = e.v_grid;
						// _this.mres2[1].detail[0].content=e.v_wonbr;
						_this.inputDisableCycle4 = false;
						_this.inputDisableCycle2 = true;
						_this.$nextTick(() => {
							_this.$refs.Box.focus();

						})
					},
					function(e) {
						// 离线操作
					},
					function(e) {
						// 加工单，地点值为空
						_this.target_site_grid = "";
						_this.workOrderID = "";
						_this.$nextTick(() => {
							_this.$refs.site.focus();
						});
						//条码框不可用
						// _this.inputDisableCycle4 = true;
						//加工单,地点可用
						_this.inputDisableCycle2 = false;
					}
				);
			},
			// srchk校验条码
			ajaxCheckReturnCode: function() {
				let _this = this;
				app.offlineAjax({
						input_userId: _this.userId,
						input_crop: '',
						input_domain: localStorage.getItem('domainNow'),
						input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
						input_ProgramID: 'xwbrwoiss02srchk',
						//加工单id
						v_wolot: _this.workOrderID,
						//条码
						v_serial: _this.barcode,
						temp1: _this.temp1
					},
					'xwbrwoiss02srchk',
					_this,
					function(e) {
						_this.inputDisabledFlag = true;
						_this.v_tempqty = e.v_qty;
						_this.v_op = e.v_op;
						_this.v_ptgrid = e.v_ptgrid;
						_this.v_ptsite = e.v_ptsite;
						_this.v_ptloc = e.v_ptloc;
						_this.mres = [{
									detail: [{
										name: '数量',
										content: _this.v_tempqty,

									}]
								},
								{
									detail: [{
										name: '零件',
										content: e.v_part,

									}]
								},
							],

							_this.res = [{
									detail: [{
										name: '工序',
										content: _this.v_op,

									}]
								},
								{
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
										name: '批属1 ',
										content: e.v_lot_att1,

									}]
								},
								{
									detail: [{
											name: '批属2',
											content: e.v_lot_att2,

										},
										{
											name: '供应商',
											content: e.v_vend,

										}
									]
								},
								{
									detail: [{
										name: '参考',
										content: e.v_ref,

									}, {
										name: '批次',
										content: e.v_lot,

									}]
								},
								{
									detail: [{
										name: '地点',
										content: e.v_ptsite,

									}, {
										name: '单位',
										content: e.v_um,

									}]
								},
								{
									detail: [{
										name: '库位',
										content: e.v_ptloc,

									}, {
										name: '货格',
										content: e.v_ptgrid,

									}]
								},

								{
									detail: [{
										name: '供批次',
										content: e.v_vend_lot,
									}, {
										name: '制造日期',
										content: e.v_date_mfc,
									}]
								},
								{
									detail: [{
											name: '生效日期',
											content: e.v_effdate,

										},
										{
											name: '失效日期',
											content: e.v_date_disa,

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
											content: e.v_date02,

										}
									]
								},
							];
						_this.$nextTick(() => {
							_this.$refs.op.focus();
						});
					},
					function(e) {
						// 离线
					},
					function(e) {
						_this.barcode = "";
						_this.$nextTick(() => {
							_this.$refs.Box.focus();
						})
					});
			},
			// wochk校验数量
			ajaxCode: function(status) {
				let _this = this;
				_this.mres[0].detail[0].content = _this.v_tempqty;
				_this.res[0].detail[0].content = _this.v_op;
				app.offlineAjax({
						input_userId: _this.userId,
						input_crop: '',
						input_domain: localStorage.getItem('domainNow'),
						input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
						input_ProgramID: 'xwbrwoiss02qtychk',
						effdate: _this.effectiveDate,
						v_site: _this.mres2[0].detail[0].content,
						v_loc: _this.mres2[1].detail[0].content,
						v_grid: _this.mres2[2].detail[0].content,
						v_wolot: _this.workOrderID,
						v_serial: _this.barcode,
						//数量
						v_qty: _this.mres[0].detail[0].content,
						//工序
						v_op: _this.res[0].detail[0].content,
						v_count: _this.v_count,
						temp1: _this.temp1,
					},
					'xwbrwoiss02qtychk',
					_this,
					function(e) {
						_this.ResForRec.unshift({
							tmpxwin_serial: e.v_boxnbr,
							tmpxwin_qty: _this.v_tempqty
						});
						_this.v_count = e.v_count1;
						_this.mres2[3].detail[0].content = _this.v_count;
						_this.res[0].detail[0].content = _this.v_op;
						_this.temp1.push(e.input_xwbrwoiss02srchkin[e.input_xwbrwoiss02srchkin.length - 1]);
						console.log(_this.temp1);

						_this.$nextTick(() => {
							_this.$refs.Box.focus();
						})
						_this.inputDisabledFlag = false;
						_this.barcode = '';
						_this.v_op = '';
						_this.v_tempqty = '';
					},
					function(e) {
						// 离线
					},
					function(e) {
						_this.v_op = '';
						_this.v_tempqty = '';
						_this.inputDisabledFlag = true;
						_this.$nextTick(() => {
							_this.$refs.op.focus();
						})
					}
				);
			},
			// 保存
			ajaxSaveId: function() {
				let _this = this;
				app.offlineAjax({
						input_userId: _this.userId,
						input_crop: '',
						input_domain: localStorage.getItem('domainNow'),
						input_Session_ID: JSON.parse(localStorage.getItem('userMsg')).sessionid,
						input_ProgramID: 'xwbrwoiss02save',
						temp1: _this.temp1,
						effdate: _this.effectiveDate,
						target_site_grid: _this.target_site_grid,
						v_wolot: _this.workOrderID,
					},
					'xwbrwoiss02save',
					_this,
					function(e) {
						_this.reset();
						mui.alert('退料成功');
					}
				)
			},
			//加工单校验
			chkReturnId: function() {
				var _this = this;
				if (_this.target_site_grid === '') {
					return;
				} else if (_this.workOrderID === '') {
					return;
				} else {
					_this.target_site_grid = _this.target_site_grid.toLowerCase().trim();
					_this.workOrderID = _this.workOrderID.toLowerCase().trim();
					_this.ajaxChkReturnId();
				}
			},
			//加工单条码
			chkToCode: function() {
				var _this = this;
				if (_this.barcode === '') {
					return;
				} else if (_this.workOrderID === '') {
					return;
				} else {
					_this.barcode = _this.barcode.toLowerCase().trim();
					_this.workOrderID = _this.workOrderID.toLowerCase().trim();
					_this.ajaxCheckReturnCode();
				}
			},
			//加工单数量
			chkToSo: function() {
				if (this.v_op === '') {
					return;
				}
				if (this.v_tempqty === '') {
					return;
				} else {

					this.ajaxCode();
				}

			},
			changeFocus: function() {
				if (this.v_op === "") {
					return;
				}
				this.$nextTick(function() {
					this.$refs.num.focus();
				})
			},
			changeTargetFocus: function() {
				if (this.target_site_grid === "") {
					return;
				}
				this.$nextTick(function() {
					this.$refs.workID.focus();
				})
			},
			activated: function() {
				this.inputChangeAjaxFlag = true
			},
			reset: function() {
				let _this = this;
				_this.flag = false;
				_this.v_count = 0;
				_this.inputDisabledFlag = false;
				_this.inputDisableCycle2 = false;
				_this.target_site_grid = '';
				_this.workOrderID = '';
				_this.barcode = '';
				_this.v_op = '';
				_this.v_tempqty = '';
				_this.temp1 = [];
				_this.mres2[0].detail[0].content = "";
				_this.mres2[1].detail[0].content = "";
				_this.mres2[2].detail[0].content = "";
				_this.mres2[3].detail[0].content = "";
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
				_this.res[10].detail[0].content = "";
				_this.res[4].detail[1].content = "";
				_this.res[5].detail[1].content = "";
				_this.res[6].detail[1].content = "";
				_this.res[7].detail[1].content = "";
				_this.res[8].detail[1].content = "";
				_this.res[9].detail[1].content = "";
				_this.res[10].detail[1].content = "";

				_this.$nextTick(function() {
					_this.$refs.site.focus();
				})
				_this.ResForRec = [];
			}
		}
	}
</script>

<style scoped>
	.center {
		padding-top: 20px;
	}

	.disabledTrue {
		background: #ccc;
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
