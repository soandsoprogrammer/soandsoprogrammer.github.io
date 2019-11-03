$('.name').typeIt({
    whatToType: ["亲爱的晶姐："],
    typeSpeed: 100
  },
  function() {
    $('.name').addClass("hide")
    $('.title').typeIt({
        whatToType: ["在这个特殊的日子里，我只想对你说：",
          "我……",
          "祝你生日快乐，祝你百岁无忧.", "也祝世界和平，祝你愿望都实现。"
        ],
        typeSpeed: 120
      },
      function() {
        $('.title').addClass("hide")
        $('.main').typeIt({
            whatToType: ["我也不会别的什么，只能用这种方式来祝贺", "希望你能喜欢。"],
            typeSpeed: 100
          },
          function() {
            let music = document.querySelector("#music")

            music.volume = 0.1
            console.log(music.volume);
            music.play()
            setTimeout(function() {
              music.pause()
            }, 60000)
          })
      });
  })

// http://music.163.com/#/song?id=27570622