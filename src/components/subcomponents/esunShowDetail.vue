<template>
	<div class="detail">
		<div class="mui-input-group showdetail" @click="changeIfShow()">
			<span class="dottedLine"></span>
			<!-- <div
        class="mui-input-row inforLabel"
        v-for="(iteam,index) in res"
        :class="index%2 !=0?'darkGrey':''"
      >-->
			<div class="mui-input-row inforLabel" v-for="(iteam,index) in mres" :class="index%2 !=0?'darkGrey':''">
				<div v-for="item in iteam.detail">
					<div v-show="item.isshow != false">
						<label class="twowidth">{{item.name}}</label>
						<label :class="iteam.detail.length==1?'morewidth':'threewidth'">{{item.content}}</label>
					</div>
				</div>
			</div>
			<transition-group name="list" v-if="res.length!=0">
				<div v-bind:key="aa" v-show="ifshowD">
					<div class="mui-input-row inforLabel" v-for="(iteam,index) in res" :class="index%2 !=0?'darkGrey':''">
						<div v-for="item in iteam.detail">
							<div v-show="item.isshow != false">
								<label class="twowidth">{{item.name}}</label>
								<label :class="iteam.detail.length==1?'morewidth':'threewidth'">{{item.content}}</label>
							</div>
						</div>
					</div>
				</div>
			</transition-group>
			<div class="darkGrey" style="text-align:center" v-if="res.length!=0">
				<label class="twowidth" v-show="ifshowD"><span class="iconSpan">〈</span></label>
				<label class="twowidth" v-show="!ifshowD"><span class="iconSpan">〉</span></label>
				<!-- <label :class="iteam.detail.length==1?'morewidth':'threewidth'">{{item.content}}</label> -->
			</div>
		</div>
	</div>
</template>

<script>
	import mui from '../../assets/js/mui.min'
	export default {

		data: function() {
			return {
				name: this.headername,
				colorNow: this.colorNow,
				ifshowD: false,
				aa: 'a',
				// res: [
				//   {
				//     detail: [{
				//       name: '箱号',
				//       content: '1111'
				//     }, {
				//       name: '箱号',
				//       content: '1111'
				//     }]
				//   },
				//   {
				//     detail: [{
				//       name: '箱号',
				//       content: '1111'
				//     }]
				//   },
				//   {
				//     detail: [{
				//       name: '箱号',
				//       content: '1111'
				//     }, {
				//       name: '箱号',
				//       content: '1111'
				//     }]
				//   }
				// ]
			};
		},
		props: {
			res: {},
			mres: {},
		},

		components: {},

		created() {

			console.log('abc')

		},

		computed: {},

		beforeMount() {},

		mounted() {},

		methods: {

			changeIfShow: function() {
				this.ifshowD = !this.ifshowD
			},
		},

		watch: {},

		activated() { //缓存被激活时逻辑编写处}

		}
	}
</script>
<style scoped>
	.mui-input-row {
		width: 100%;
		font-size: 13px;
		height: auto;
		padding: 0 0 0 0;
		height: 0.25rem;
		border: none;
		box-shadow: none;
		margin-bottom: 0;
	}
	.inforLabel{
		height: 0.25rem;
	}
	.twowidth {
		width: 22%;
	}

	.threewidth {
		width: 28%;
		color: #666666 !important;
	}

	.morewidth {
		width: 78%;
		color: #666666 !important;
	}

	.mui-input-group {
		width: 98%;
		border-radius: 1px;
		background: rgba(255, 255, 255, 1);
		z-index: 2;
		overflow: hidden;
	}

	.mui-input-row label {
		position: relative;
		height: 0.25rem;
		font-size: 11px;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		line-height: 0.11rem;
		word-break: break-all;
		padding: 0.1rem 0 0 0.13rem;
	}

	.mui-input-group .mui-input-row:after {
		left: 0px;
	}

	.darkGrey {
		/* background-color: #F4F5F9; */
	}

	.list-enter-active,
	.list-leave-active {
		transition: opacity 0.3s;
	}

	.list-enter,
	.list-leave-to

	/* .list-leave-active for below version 2.1.8 */
		{
		opacity: 0;
	}

	.detail {
		/* margin-bottom:9px; */
		/* margin-left: 0.16rem; */
		position: relative;
	}

	.iconSpan {
		display: inline-block;
		width: 0.1rem;
		height: 0.05rem;
		transform: rotate(90deg);
		font-size: 0.14rem;
		color: #ccc;
	}
	
	.dottedLine{
		display: block;
		position: absolute;
		width: 3.1rem;
		height: 0.01rem;
		border-top:1px dashed rgba(238,236,247,1);
		margin-left: 0.21rem;
	}
	
</style>
