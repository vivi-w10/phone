if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/uni-icons/uni-icons?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/navbar/navbar?hash=993ca45dec9dcdb8f19451ba17e5ec831eb613a0');
require('../../components/uni-swiper-dot/uni-swiper-dot?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/flow/flow?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/zzx-tabs/zzx-tabs?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/qiyue-category/qiyue-category?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-transition/uni-transition?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-popup/uni-popup?hash=63f3d097e78ac04213190ce4a92c81860617f7b4');
require('../../components/mehaotian-search-revision/mehaotian-search-revision?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-collapse/uni-collapse?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-collapse-item/uni-collapse-item?hash=993ca45dec9dcdb8f19451ba17e5ec831eb613a0');
require('../../components/echone-sku/echone-sku?hash=ec94c3c931bb453fc9af068b07b208783ce944c8');
require('../../pages/index/index?hash=2a29a6897fef97efe8ebcd020270ad87998136e8');
require('../../pages/list/list?hash=af372ecc657e0de219f272b0879d6302106d0659');
require('../../pages/user/user?hash=ad82157d09e84b6bbdab74ed2243970531fabba1');
require('../../pages/search/search?hash=43c9f27327c5a2c632cb7db2d12e7a721d27da9d');
require('../../pages/question/question?hash=1eea8201ba2532395f12a7a67a09ba897ca7f1c6');
require('../../pages/guide/guide?hash=c490b62796fabd5f347f84558d2450d98e9defb2');
require('../../pages/goodContent/goodContent?hash=eadc8d9251c8f44d0c567e5c339bdf4431395196');
require('../../pages/result/result?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/buy/buy?hash=f4016afa1e6c6f5608dd6a379458c2876264213b');
require('../../pages/order/order?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/orderList/orderList?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/user-info/user-info?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}