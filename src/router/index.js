import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/pages/login'

//只需要在这里注册路由就好了，其他的逻辑不用管
let functions = ['scan', 'car', 'allContent', 'transferWithQuantityChange', 'feedingForFeedingBill',
  'purchaseOrderReceipt', 'purchaseOrderReturn', 'packageDisassembly', 'packageCombined', 'shipperScanningReceipt',
  'consignmentPurchaseOrderReceipt', 'consignmentInventoryTransfer', 'consignmentInventoryTransfer1', 'workOrderIssue', 'workOrderReceipt',
  'workOrderReturn', 'inventoryTransfer', 'countedScanning', 'pickingWithBurdeningBill', 'chargingWithBurdeningBill',
  'transferWithBurdeningBill', 'deliveryForOtherPicking', 'generatingFeedingRequireWithScanning', 'barcodeShipment',
  'barcodeInventoryInquiry', 'barcodeDelivery', 'barcodeInformationInquiry', 'packingSalver', 'disassembingSalverCombiningSalver',
  'replacingSalver', 'relatingWithExternalLabel', 'repetitivePicklistConfirm', 'repetitiveReceiptBackflush', 'repetitiveReceiptReview',
  'pickingWithTransferOrder', 'transferWithTransferOrder', 'purchaseOrderReceiptrCar', 'barcodeInventoryInquirysub', 'ReceivingOrderIssue',
  'ReturnListMT', 'ReturnGround', 'crtInStore', 'wipcoderc', 'wipcodercDetail', 'pcodeis','salesIssue','salesList','purchaseOrderReturnSD','purchaseOrderReturnSDsub'
]


const usercenter = () => ({
  component: import( /* webpackChunkName: "usercenter" */ '@/components/pages/usercenter'),
  loading: null,
  error: null,
})
const menu = () => ({
  component: import( /* webpackChunkName: "menu" */ '@/components/pages/menu'),
  loading: null,
  error: null,
})

const collection = () => ({
  component: import( /* webpackChunkName: "menu" */ '@/components/pages/collection'),
  loading: null,
  error: null,
})

let constructor = [{
  path: '/',
  name: 'login',
  component: login,
  meta: {
    keepAlive: true
  }
}, {
  path: '/menu',
  name: 'menu',
  component: menu,
  meta: {
    keepAlive: true
  }
}, {
  path: '/usercenter',
  name: 'usercenter',
  component: usercenter,
  meta: {
    keepAlive: false
  }
},{
  path: '/collection',
  name: 'collection',
  component: collection,
  meta: {
    keepAlive: false
  }
}]

let routers = functions.map((item) => {
  return {
    path: `/${item}`,
    name: item,
    component: () => ({
      component: import(`@/components/functions/${item}`),
      loading: null,
      error: null,
      delay: 200,
    }),
  }
})

let config = constructor.concat(routers)



Vue.use(Router)

export default new Router({
  routes: config
})
