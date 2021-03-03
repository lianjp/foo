#### 项目目录结构：

```
|  .browserslistrc
|  .editorconfig
|  .env.developement
|  .env.production
|  .eslintrc.js
|  .gitignore
|  .gitlab-ci.yml
|  .prettierrc
|  babel.config.js
|  element-variables.scss
|  git-delete-big-file.md
|  jsconfig.json
|  package.json
|  postcss.config.js
|  README.js
|  vue.config.js
├─gitlab-ci
|  ├─del
|  |  |  ci-deploy.sh
|  |  |  deploy.sh
|  |  main.sh
|  |  prod.deploy.sh
|  |  prod.host.list
|  |  README.md
|  |  test.deploy.sh
|  |  test.host.list
├─public
|  ├─image
|  |  |  img0.jpg
|  |  |  img1.jpg
|  |  |  img2.jpg
|  |  |  img3.jpg
|  |  |  img4.jpg
|  |  |  img5.jpg
|  |  |  img6.jpg
|  |  |  img7.jpg
|  |  |  img8.jpg
|  |  |  img9.jpg
|  |  .htaccess
|  |  api.php
|  |  favicon.ico
|  |  index.html
|  |  reset.css
└─src
    ├─api
    |  ├─back-freight-adress-module
    |  |  |  getBackAdress.js
    |  ├─base-date
    |  |  |  getExpressList.js
    |  |  |  getOverviewData.js
    |  |  |  基础数据.md
    |  ├─express-module
    |  |  |  addDispatch.js
    |  |  |  deleteDispatch.js
    |  |  |  disableDispatch.js
    |  |  |  editDispatch.js
    |  |  |  enableDispatch.js
    |  |  |  getDetailById.js
    |  |  |  getDispatchList.js
    |  ├─goods-module
    |  |  |  goodDetail.js
    |  |  |  goodsCategory.js
    |  |  |  goodsList.js
    |  |  |  商品有关的 api 请求接口.md
    |  ├─trademark
    |  |  |  addNewTrademark.js
    |  |  |  deleteTrademark.js
    |  |  |  editNewTrademark.js
    |  |  |  getTrademarkDetail.js
    |  |  |  getTrademarkList.js
    |  |  |  revokeTrademark.js
    |  ├─user-module
    |  |  |  applyBecomeSupplier.js
    |  |  |  autoLogIn.js
    |  |  |  checkUserMobile.js
    |  |  |  checkVerifyCode.js
    |  |  |  login.js
    |  |  |  logOut.js
    |  |  |  register.js
    |  |  |  resetPasswd.js
    |  |  |  updateUserInfo.js
    |  |  |  verifyCode.js
    |  |  |  用户有关的 api 请求接口.md
    |  └─warehouse-module
    |  |  |  warehouseList.js
    |  |  filterPicArray.js
    |  |  readme.md
    ├─assets
    |  ├─css
    |  |  |  global.less
    |  ├─font-icon
    |  |  |  demo_index.html
    |  |  |  demo.css
    |  |  |  iconfont.css
    |  |  |  iconfont.eot
    |  |  |  iconfont.js
    |  |  |  iconfont.svg
    |  |  |  iconfont.woff
    |  |  |  iconfont.woff2
    |  ├─less
    |  |  |  webpack-global.less
    |  |  logo.png
    ├─components
    |  ├─complex-component
    |  |  |  AddNewDispatch.vue
    |  |  |  DeleteDispatch.vue
    |  |  |  EditDispatch.vue
    |  |  |  NavGroup.vue
    |  |  |  UserMenuCard.vue
    |  |  |  readme.md
    |  ├─simple-components
    |  |  ├─goods-component
    |  |  |  |  PicThumb.vue
    |  |  |  |  PicThumbItem.vue
    |  |  |  |  PicZoom.vue
    |  |  |  |  rotate.png
    |  |  |  ActionSucceed.vue
    |  |  |  ApplyToBecomeSupplierInlandForm.vue
    |  |  |  ApplyToBecomeSupplierOverseasForm.vue
    |  |  |  AreaSection-copy.vue
    |  |  |  AreaSection.vue
    |  |  |  BaseFooter.vue
    |  |  |  ColoredSpan.vue
    |  |  |  ELHoverPopover.vue
    |  |  |  GoodsCard.vue
    |  |  |  GoodsShopCard.vue
    |  |  |  GridTable.vue
    |  |  |  GridTableItem.vue
    |  |  |  LogInForm.vue
    |  |  |  NoDataHolder.vue
    |  |  |  RegisterForm.vue
    |  |  |  SimpleButton.vue
    |  |  |  TfCard.vue
    |  |  |  TfHr.vue
    |  |  |  validateRegRues.js
    |  |  all-component.js
    |  |  area.js
    |  |  areaTree.js
    |  |  HomeHeader.vue
    ├─filter
    |  |  nameFilter.js
    ├─router
    |  |  deepKebabCase.js
    |  |  index.js
    |  |  needScrollToTop.js
    |  |  router-after-middleware.js
    |  |  router-before-middleware.js
    ├─service
    |  |  brokenErrorMap.js
    |  |  dataErrorMap.js
    |  |  index.js
    ├─store
    |  |  backFreightAdress.js
    |  |  baseData.js
    |  |  expressModule.js
    |  |  goodsModule.js
    |  |  index.js
    |  |  trademarkModule.js
    |  |  userModule.js
    |  |  warehouseModule.js
    ├─type
    |  |  applyToBecomeSupplierInlandTypeMap.js
    |  |  supplierTypeMap.js
    ├─utils
    |  |  axiosMg.js
    |  |  browserType.js
    |  |  formatJsonToFormData.js
    |  |  localforageStore.js
    |  |  monitorDocumentClose.js
    |  |  screenFull.js
    ├─views
    |  ├─distributor-children
    |  |  |  DistributorDefault.vue
    |  |  |  Promotion.vue
    |  ├─financial-children
    |  |  |  FinancialDefaultPage.vue
    |  |  |  RequestWithdrawMoney.vue
    |  ├─forgot-passwd-page-component
    |  |  |  CheckUserMobile.vue
    |  |  |  SetPasswdForm.vue
    |  ├─my-shop-children
    |  |  |  AfterSalesService.vue
    |  |  |  ChangePassword.vue
    |  |  |  MyFavorite.vue
    |  |  |  MyInformation.vue
    |  |  |  MyOrder.vue
    |  |  |  ShippingAddress.vue
    |  |  |  ShoppingCart.vue
    |  ├─search-page-component
    |  |  |  1px dashed #dedede;.txt
    |  ├─setting-children
    |  |  |  BackFreightAdress.vue
    |  |  |  BaseInformation.vue
    |  |  |  SettingDefault.vue
    |  |  |  Warehouse.vue
    |  |  |  WayOfExpressage.vue
    |  ├─trademark-component
    |  |  |  AddOrEditNewTrademark.vue
    |  |  |  CancelTrademark.vue
    |  |  |  DeleteTrademark.vue
    |  |  About.vue
    |  |  Commodity.vue
    |  |  Distributor.vue
    |  |  Financial.vue
    |  |  FooBar.vue
    |  |  ForgotPasswdPage.vue
    |  |  GoodsDetails - 副本.vue
    |  |  HistoryLog.vue
    |  |  Home.vue
    |  |  LogInPage.vue
    |  |  Order.vue
    |  |  Overview.vue
    |  |  RegisterPage.vue
    |  |  RegisterSupplierPage.vue
    |  |  Settings.vue
    |  |  Trademark.vue
    |  |  timePickerOption.js
    |  |  readme.md
    |  |  Untitled-1.txt
    ├─App.vue
    ├─code-status-type.js
    └─main.js
```

# app



## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

git rm --cached .vscode

## element 笔记

table

show-overflow-tooltip	当内容过长被隐藏时显示 tooltip
align	对齐方式	String	left/center/right	left
header-align	表头对齐方式，若不设置该项，则使用表格的对齐方式	String	left/center/right	—

Picker Options

disabledDate	设置禁用状态，参数为当前日期，要求返回 Boolean	Function
disabledDate(time) {
    return time.getTime() > Date.now();
},

## gitlab-runner
添加 windows 版本 runner

## TODO List
- [x] 框架选型
- [x] Store 设计
- [x] 目录结构设计
- [x] 自定义主题色
- [x] 预渲染机制
- [ ] 表单组件导出
- [ ] 组件文件夹规整