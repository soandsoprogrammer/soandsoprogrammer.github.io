$('.name').typeIt({
    whatToType: ["亲爱的晶姐："],
    typeSpeed: 100
  },
  function() {
    $('.title').addClass("hide")
    $('.title').typeIt({
        whatToType: ["祝你生日快乐，祝你百岁无忧", "也祝世界和平，祝你愿望都实现。"],
        typeSpeed: 100
      },
      function() {
        $('.title').addClass("hide")
        $('.main').typeIt({
            whatToType: ["就算见不到你，", "我也想亲口告诉你：我爱你", "爱着你，就像老鼠爱大米~"],
            typeSpeed: 100
          },
          function() {

          })
      });
  })