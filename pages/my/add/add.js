Page({
  data: {
    tabs: ["体重", "胸围", "腰围", "臀围", "身高", "BMI"],
    chats: [{
      name: "体重",
      unit: "kg",
      target: 54
    }, {
      name: "胸围",
      unit: "cm",
      target: -1

    }, {
      name: "腰围",
      unit: "cm",
      target: -1
    }, {
      name: "臀围",
      unit: "cm",
      target: -1
    }, {
      name: "身高",
      unit: "cm",
      target: -1
    }, {
      name: "BMI",
      target: -1
    }]
  },

  onReady() {}
});