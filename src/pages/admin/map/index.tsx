import AMapLoader from '@amap/amap-jsapi-loader';
AMapLoader.load({
  key: 'ef84c834bdb72fda575fbaf3249f01f6', // 申请好的Web端开发者Key，首次调用 load 时必填
  version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
})
  .then((AMap) => {
    const map = new AMap.Map('container', {
      zoom: 16, //级别
      center: [117.474322, 30.959786], //中心点坐标
      viewMode: '3D', //使用3D视图
    });
    // var trafficLayer = new AMap.TileLayer.Traffic({
    //   zIndex: 10,
    // });
    // map.add(trafficLayer); //添加图层到地图
    // var marker = new AMap.Marker({
    //   position: [117.474322, 30.959786], //位置
    // });
    // map.add(marker); //添加到地图
    // var lineArr = [
    //   [117.474322, 30.959786],
    //   [117.475363, 30.960099],
    //   [117.476618, 30.959354],
    //   [117.476618, 30.959772],
    // ];
    // var polyline = new AMap.Polyline({
    //   path: lineArr, //设置线覆盖物路径
    //   strokeColor: '#3366FF', //线颜色
    //   strokeWeight: 5, //线宽
    //   strokeStyle: 'solid', //线样式
    // });
    // map.add(polyline);
    // map.on('click', (e: any) => {
    //   var marker = new AMap.Marker({
    //     position: [e.lnglat.lng, e.lnglat.lat], //位置
    //   });
    //   map.add(marker);
    // });
    AMap.plugin('AMap.ToolBar', function () {
      //异步加载插件
      var toolbar = new AMap.ToolBar();
      map.addControl(toolbar);
    });
  })
  .catch((e) => {
    console.log(e);
  });

const Index = () => {
  return <div id="container" style={{ height: 400 }}></div>;
};
Index.wrappers = ['@/wrappers/city'];
export default Index;
