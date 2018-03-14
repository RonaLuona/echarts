import $ from 'jquery';
import echarts from 'echarts';

require('echarts/theme/shine');

const map = () => {
  // const hide = {
  //   name: '南海诸岛',
  //   value: 0,
  //   itemStyle: {
  //     normal: { opacity: 0, label: { show: false } },
  //   },
  // };
  /* 处理数据 */
  const szRoad = {
    success: true,
    errorCode: 0,
    errorMsg: '成功',
    data: [{
      ROAD_LINE: '104.096113,30.615077;104.098278,30.615873;104.098292,30.615875;104.098818,30.615953;104.098848,30.616028;104.098870,30.616195;104.098732,30.617522;104.098509,30.620377;104.098505,30.620469;104.097949,30.622939;104.097576,30.623194;104.097317,30.623492;104.094637,30.625320;104.094115,30.625740;104.094119,30.625785;104.094477,30.627981;104.094801,30.629104;104.094954,30.629733;104.094943,30.630138;104.094949,30.630221;104.094774,30.630891;104.094425,30.631573;104.093507,30.633908;104.092901,30.635783;104.092741,30.636169;104.090898,30.639007;104.088691,30.641360;104.085363,30.642658;104.083635,30.643239;104.081910,30.643978;104.081657,30.644021;104.080126,30.644908;104.078022,30.645938;104.074251,30.646484;104.070599,30.646582;104.067798,30.647174;104.066191,30.648032;104.066197,30.648432;104.066192,30.648534;104.066108,30.651254;104.066112,30.651402;104.066099,30.651729;104.066094,30.651789;104.066055,30.651950;104.065885,30.651965;104.065885,30.651965',
    }],
  };
  const taxiRoutes = [];
  const data = szRoad.data;
  // const hStep = 300 / (data.length - 1);
  /* eslint-disable */
  for (let x in data) {
    const line = data[x];
    const pointString = line.ROAD_LINE;
    const pointArr = pointString.split(';');
    const lnglats = [];
    for (let j in pointArr) {
      lnglats.push(pointArr[j].split(','))
    }
    taxiRoutes.push({
      coords: lnglats,
      // lineStyle: {
      //   // color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * x))
      // }
    })
  }
  /* eslint-enable */

  // datas.push(hide);
  $.get('/static/china.json', (chinaJson) => {
    echarts.registerMap('china', chinaJson);
    const myChart = echarts.init(document.getElementById('container'), 'shine');
    const option = {
      mapbox: {
        center: [104.091, 30.639],
        zoom: 13,
        // pitch: 50,
        // bearing: -10,
        altitudeScale: 2,
        postEffect: {
          enable: true,
          FXAA: {
            enable: true,
          },
        },
        light: {
          main: {
            intensity: 1,
            shadow: true,
            shadowQuality: 'high',
          },
          ambient: {
            intensity: 0,
          },
          ambientCubemap: {
            texture: '/asset/get/s/data-1491838644249-ry33I7YTe.hdr',
            exposure: 1,
            diffuseIntensity: 0.5,
            specularIntensity: 2,
          },
        },
      },
      series: [{
        type: 'lines',
        coordinateSystem: 'mapbox',
        effect: {
          show: true,
          constantSpeed: 5,
          trailWidth: 2,
          trailLength: 0.4,
          trailOpacity: 1,
          spotIntensity: 10,
        },
        blendMode: 'lighter',
        polyline: true,
        lineStyle: {
          width: 0.1,
          color: 'rgb(200, 40, 0)',
          opacity: 0,
        },
        data: {
          count: () => taxiRoutes.length,
          /* eslint-disable */
          getItem: (idx) => taxiRoutes[idx],
          /* eslint-enable */
        },
      }],
    };
    myChart.setOption(option);
  });
};

export default {
  map,
};
