// Component({
//   data: {
//     animate: "",
//     selected: 0,
//     color: "#7A7E83",
//     selectedColor: "#0052d9",
//     list: [{
//       pagePath: "/pages/index/index",
//       iconPath: "/assets/memorize_un.png",
//       selectedIconPath: "/assets/memorize.png",
//       text: "背单词"
//     }, {
//       pagePath: "/pages/logs/logs",
//       iconPath: "/assets/statistics_un.png",
//       selectedIconPath: "/assets/statistics.png",
//       text: "统计"
//     }]
//   },
//   attached() {},
//   methods: {
//     switchTab(e) {
//       const data = e.currentTarget.dataset
//       const url = data.path
//       wx.switchTab({
//         url
//       })
//       this.setData({
//         selected: data.index,
//         animate: "animate__animated animate__bounceIn"
//       })
//     }
//   }
// })
Component({
  data: {
    value: 'label_1',
    list: [{
        value: '/pages/index/index',
        icon: 'root-list',
        ariaLabel: '首页',
        label: '背单词'
      },{
        value: '/pages/books/index',
        icon: 'layers',
        ariaLabel: '单词表',
        label: '单词表'
      },
      {
        value: '/pages/me/index',
        icon: 'chart',
        ariaLabel: '软件',
        label:'统计'
      },
    ],
  },

  methods: {
    onChange(e) {
      const data = e.currentTarget.dataset
      const url = e.detail.value
      // console.log(data)

      this.setData({
        value: e.detail.value,
      });
      wx.switchTab({
        url
      })
    },
  },
});