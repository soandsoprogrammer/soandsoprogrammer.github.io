var navCnList = ["首页", "导语", "历史沿革", "建筑概览", "武英书局", "殿本精华", "皇城聚珍", "风物逸闻", "人物剪影", "结语"]
var navEnList = ["INDEX", "PERFACE", "HISTORY", "PREFACE", "DEPARTMENT", "PUBLICATION", "TECHNOLOGY", "STORY", "FIGURE", "END"]
var textlist = [
    "永乐初年，明成祖朱棣营建武英殿。在明代，武英殿最主要的职能是皇帝的便殿，是皇帝斋戒和召见臣工之处。明代设中书舍人，值武英殿西房等处。武英殿还设有待诏，择能画者居之。明末，李自成在武英殿登基称帝。李自成撤离北京后，放火烧毁紫禁城，止存武英一殿。",
    "清军入关后，摄政王多尔衮在武英殿办理政务，康熙帝亦曾短暂于武英殿寝居办公。康熙年间，首开武英殿书局，武英殿成为清代最重要的皇家出版机构。康熙十九年（1680）清廷在武英殿设立修书处，由亲王大臣总理，直接隶属于内务府，专门从事内府书籍校勘、刷印和装潢工作。武英殿和敬思殿主要用于收储图书，东西配殿、东西值房、浴德堂、恒寿斋则作刊刻、校对、装潢之所。武英殿下设监造处和校勘翰林处，常设刻字作、刷印作、折配作、做书作等作坊，特设铜字馆、聚珍馆负责活字刷印，以及档案房、通行书籍售卖处等相关办事机构。1911年7月，溥伦、汪荣宝等人在武英殿西庑焕章殿纂拟钦定宪法草案。",
    "辛亥革命后，武英殿收归民国政府所有。1913年北洋政府内务总长朱启钤呈明大总统袁世凯，拟将沈阳故宫、热河避暑山庄行宫两处所藏各种文物集中到北京故宫，筹办古物陈列所。1913年12月29日，内务部正式下令筹办古物陈列所，以外朝西侧武英殿作为古物陈列所的筹备处。在朱启钤主持下，重修过廊，凿墙开窗，在武英殿及后殿敬思殿之间修建过廊，两殿相连成“工”字形布局。为了适应展览采光的需要，原来的木窗被全部换成了玻璃窗。同一年，武英殿里安装了紫禁城内的第一部电话，不久又安装了自来水系统以改善消防条件。1914年2月，古物陈列所在武英殿正式成立，沉寂多时的武英殿再次热闹起来。10月10日，设在武英殿的古物陈列所正式对外开放，五百年的皇宫禁地第一次向公众打开了厚重的大门。1914年10月，沈阳、热河两地文物陆续到京，共计运京文物1949箱，11770余件，暂时存放在武英殿，后移交至宝蕴楼贮存",
    "2002年武英殿被作为故宫大修的试点，进行了修缮，正式拉开了故宫“百年大修”的序幕。2005年武英殿修缮完成，作为故宫书画馆，正式向游人开放，每年举办《故宫藏历代书画展》等专题书画展览。同时，作为清代皇家出版机构，故宫在武英殿进行了多次殿本及雕版展览。如2005年在武英殿举办了《盛世文治：清宫典籍文化展》。2007年举办“天禄珍藏——清宫内府本三百年”展。2008年举办“尽善尽美——殿本精华展”，同年又举办了“同文之盛——清宫藏少数民族文字辞书展”。2018年，故宫将武英殿与文华殿功能对调，武英殿从书画馆转变为陶瓷馆，展陈历代陶瓷。"
]
$(".home").scroll(function() {
    console.log(1);

});
var historylist = $(".history-li li")
    /**
     * 历史沿革
     */
for (var i = 0; i < historylist.length; i++) {
    historylist[i].index = i;
}
$(".history-li>ul>li").on("mouseenter", function(params) {
    var ddd = this.index
    for (let index = 0; index < historylist.length; index++) {
        historylist[index].style.color = "#858585";

    }
    historylist[ddd].style.color = '#6E0F0F'
    $(".history-introduce").hide()
    $(".history-introduce>p").text(textlist[ddd])
    $(".history-introduce").show()
    $(".history-introduce>p").addClass("animated slideInRight")
    var o = document.querySelectorAll(".history-introduce>p")
    o[0].addEventListener("webkitAnimationEnd", function() {
        // this.className = "";
        $(".history-introduce>p").removeClass("animated slideInRight")
    })
    var text = '<div class="history-introduce">' + textlist[this.index] + '</div>'


})

function gethistory() {






}
/**
 * 武英书局
 */
var list = $(".base")
for (let i = 0; i < list.length; i++) {
    list[i].number = i
}
var flag = 7;
var tectext = []
tectext.push("刻字作亦称刻字馆、写字局。负责钩幕御书、缮写板样、刊刻书板等事务。刻字作又分为宫内、宫外两部分，设有刻字三馆：宫内刻字馆在武英殿群房；宫外刻字馆在东安门外烧酒胡同路北，内设写字局、刻字东馆、西馆。咸丰十年，又增设南馆，时称刻字三馆。刻字作设有库掌、柏唐阿、司匠等人。匠役分为食钱粮匠役和外雇匠役两种，食钱粮匠役包括写字头目、刻字头目、刻字匠四至六人，为日常常设。遇到临时加派的任务，允许外雇匠人从事刻字工作。")
tectext.push("刷印作位于武英殿群房，专门负责内府书籍的刷印、装订等工作。一般常设有库掌一名，拜唐阿八名，委署司匠一名，委署领催二名，负责钩摹御书、刊刻书籍、写样、刷印、折配、齐订等事务。另外还有食钱粮刷印匠四十名，如果刷印事务繁重，也允许外雇匠人，这些从事刷印的工匠在康熙初年按惯例享用官方提供的饭食，康熙四十四年规定停止提供官饭，酌量给与工匠钱粮。 ")
tectext.push("折配作位于武英殿群房。设库掌、栢柏唐阿、司匠、领催管理，专管折配书页、经页等事。折配匠一般采取外雇的方式。《大清会典事例》把折配作与刷印作合并记述，实际上二者分开管理，与刷印作互相配合。")
tectext.push("做书作主要承担内府书籍的装潢事宜，所以也往往称为装潢作。位于武英殿的东南廊房，时称“东作房”、“南作房”。设有库掌一名，拜唐阿六名，委署司匠一名，委署领催二名，负责内庭交出及进呈陈设各种新旧书籍，以及托裱界划等事务。另外，做书作设有食钱粮书匠十四名，齐栏匠四名，托裱匠四名，平书匠七名，补书匠四名，合背匠五名，界划匠六名，传用营造司锉书木匠五名。")
tectext.push("铜字馆于康熙五十五年（1716）特设，专门负责铜字、铜盘的制作及摆字事宜，铜字馆曾制作100余万个铜活字摆印《古今图书集成》《数理精蕴》等书籍。常设库掌一名、柏唐阿二名，摆字匠和刻铜字匠不定额。雍正六年（1728），《古今图书集成》等书摆印完竣后，铜字馆极少刊印其他书籍。乾隆九年（1744），大臣奏请将一百余万铜活字熔化，而铜盘等熔化改作陈设之物，铜字馆随之撤销，相关人员归入武英殿其他职能部门。")
tectext.push("聚珍馆于乾隆三十八年（1773）特设。位于西华门外北长街路东，专门负责摆印木活字聚珍版书。乾隆三十七年（1772），乾隆帝命儒臣校辑《永乐大典》中的散简零篇和天下秘籍，汇为《四库全书》。乾隆三十八年十月，武英殿总裁金简奏请以枣木活字套板刷书，既省又快。乾隆帝因“活字”不雅而赐名“聚珍”。嘉庆中期后，聚珍馆摆印书籍的工作逐渐减少，实际上成为了存贮木活字的场所。直至清末，聚珍馆仍设供事、收掌等官员、匠役在此听差，每年拨有专款备用 。")
var flag333 = true
$(".base").on("click", function() {
        var div = '<div class="unfold"><p>' + tectext[this.number] + '</p></div>'
        if (flag333) {
            flag333 = false
            $(this).after(div)
            $(".unfold").children().hide()
            $(".unfold").stop().animate({
                "width": "336px"
            }, 500, function(params) {
                $(".unfold").children().fadeIn("slow")
            });
            $(".base").stop().animate({
                "width": "58px"
            }, 500);

            // $(".unfold").fadeIn("2000")
            var color = $(this).css("background")
            $(".unfold").css("background", color)
        } else {
            $(".unfold").children().fadeOut("fast", function(params) {
                $(".unfold").stop().animate({
                    "width": "0px"
                }, 500);
            })
            $(".base").stop().animate({
                "width": "114px"
            }, 500, function(params) {
                $(".unfold").remove()
                flag333 = true
            });
        }

        // if (flag == this.number) {
        //     $(".unfold").children().fadeOut("fast", function(params) {
        //         $(".unfold").stop().animate({
        //             "width": "0px"
        //         }, 1000);
        //     })
        //     $(".base").stop().animate({
        //         "width": "114px"
        //     }, 1000);


        //     flag = 7
        // } else {
        //     $(".unfold").remove()
        //     $(this).after(div)
        //     $(".unfold").children().hide()
        //     $(".unfold").stop().animate({
        //         "width": "336px"
        //     }, 1000, function(params) {
        //         $(".unfold").children().fadeIn("slow")
        //     });
        //     $(".base").stop().animate({
        //         "width": "58px"
        //     }, 1000);

        //     // $(".unfold").fadeIn("2000")
        //     var color = $(this).css("background")
        //     $(".unfold").css("background", color)
        //     flag = $(this)[0].number
        // }
    })
    /**
     * 风物逸闻
     */
var storylist = []
storylist.push(["浴德堂位于武英殿西北平台之上，有房三间，坐北面南，为卷棚歇山式黄琉璃瓦顶。堂东次间后檐辟门通后室，室平面呈方形，屋顶呈穹隆形，建筑带有鲜明的土耳其式风格，四壁至顶为乳白色瓷片贴面，顶部开窗。", "1914 年成立古物陈列所，将武英殿、敬思殿、文华殿开辟为陈列室展览陈列，对外开放。当时从热河运来的文物中，有一张戎装女像油画，古物陈列所把这幅画像定为乾隆的回族妃子香妃。由于武英殿西北角浴德堂后有类似阿拉伯式的瓮顶浴室建筑，遂名为香妃浴室，并将戒装女像悬于浴室门楣上，又复制画片出售，加以宣传。香妃从此引起了人们的兴趣。有关她的野史、笔记、小说、故事和传说不绝于人们耳目。《清稗类钞•宫苑类》记载浴德堂：“以白色炼瓦造成，人声响应，划然有声。盖乾隆时征服回部，虏获香妃，纳入后宫。”据说清代乾隆年间，有一奇女子，天生丽质，而且“玉容未近，芳香袭人，既不是花香也不是粉香，别有一种奇芳异馥，沁人心脾”，被人称作香妃。她是反清的新疆回部酋长霍集占的王妃，回部叛乱，霍集占被清廷诛杀，将军兆惠将香妃生擒送与乾隆。1937年，著名清史学家孟森撰写了《香妃考实》一文，初步断定香妃就是乾隆皇帝四十多个后妃中的维吾尔族妃子——容妃。民间传说，浴德堂是乾隆皇帝为香妃特地建造的，是香妃沐浴的地方。其建筑仿欧西意大利形式，有人认为当时“高宗命意人设计而成”。", "对于浴德堂的功能，学界有不同看法。实际上，“浴德”一词源自儒家经典，《礼记•儒行篇》有“浴德澡身”，注疏曰：“澡身谓能澡絮其身不染浊也。浴谓沐浴于德以德自清也。”武英殿以“浴德”题额，并非真指沐浴而是比喻君子以德自清之意。实际上紫禁城内重华宫，其西配殿亦名为“浴德殿”，作为乾隆帝的书房，与沐浴毫无关系。据单士元先生考证，武英殿浴德堂可能始建于元代，并非用作浴室：“浴德堂在明清两代并非浴室，更非香妃浴室，明代汉族亦无淋浴之习俗，清代其处长期为修书之所，其建筑可能为元代之遗物。”古建筑专家傅连仲先生则认为，武英殿西北之浴德堂,即康熙十九年奉旨设立的修书处。而浴德堂后连属之弯窿顶建筑实为修书处装潢过程中熟纸、染纸、染帛等工序所需而建之积水池。《康熙衙署图》已经出现了浴德堂，表明康熙朝确实已经存在，至《乾隆京城全图》图示注明“浴德堂”，穹顶建筑依稀可见，由此可见香妃沐浴之所依据不足。", ])
storylist.push(["武英殿与紫禁城其他殿堂一样，是木结构建筑，曾多次发生火灾，影响较大的有两次：同治八年，烧毁房屋三十多间，并焚毁了几乎全部的库存殿版书和部分书版，只有焕章殿无恙。光绪二十七年由于雷击，武英殿部分殿堂再遭焚毁。", "同治八年（1869）武英殿发生第一次火灾。当年六月二十一日，救火大臣醇亲王等奏报朝廷，武英殿火势延烧三十余间，包括武英殿正宫门五间、正殿五间、后殿五间、东配殿五间、东小库房五间、南院库房六间、浴德堂正殿六间。同治帝师翁同龢目睹了武英殿的这次火灾，《翁同龢日记》载：“同治八年，六月二十一日夜半，微雨，无风。照常起，见北方火光熊熊如赤霞，入前门，见火从大清门西起，犹未知何处，将至东华门，始见武英殿火，门闭，叩而入，由东西阙门径直趋火所，则赫然之威不可向迩，正殿、后殿及门座同时燃燎矣。”至于引发火灾的原因，有人认为是武英殿书籍久被盗窃，“典守者假火逃罪”而致。", "同治八年（1869）的武英殿火灾，是武英殿修书处走向衰亡的标志性事件。火灾发生时，武英殿前后库房存书达一万八千余部，书板数万块，均被焚毁。存贮殿本书版的武英殿正殿和后殿，以及武英殿大部分办公场所（如校刊翰林处所在的浴德堂）、刷印作坊、刷印工具材料等未能幸免，在这场大火中化为灰烬，极大的影响了武英殿修书处后续的校勘、刷印、装潢工作，很难恢复到原来的状态和规模。同治八年武英殿火灾后，清廷即有复修武英殿动议，但限于财力物力，只是局部修复，先将宫门正殿估修，剩余房间分年陆续修理。 ", "光绪二十七年（1901），武英殿再次发生火灾。光绪二十七年四月二十一日，庆亲王奕劻详细报告了武英殿因雷起火的具体情形：四月十八日雷雨交作，值班护军搜查时闻霹雳大震，见武英殿后墙内柳株劈裂，电火击入后殿，烟火齐出。火势太急，人力难施，以致延烧武英殿前殿五间，后殿五间，西配殿五间，浴德堂共六间，前院西配房五间、后院东配房五间，共三十一间，至四月十九日火势始息。日本人所写的《明治三十二年清国战争史》也记载了该次火灾：1901年6月4日夜，北京紫禁城内储藏经文和木板的武英殿遭遇雷火之灾，几乎全部被烧毁。此夜有大雷雨，晚上8点武英殿附近的大树由雷电引发大火，火势蔓延到武英殿。 此次火灾，武英殿修书处大部分殿堂再度被焚。当时由于清廷财力支绌，只能部分修补武英殿。光绪二十八年（1902）十一月七日光绪帝谕旨武英殿工程所需钱粮较巨，令督修大臣择其工程紧要之处先行修补。其余部分暂缓兴修。在此情况下，武英殿的刊刻工作基本陷于停滞。"])
storylist.push(["露房，又称“西洋堂”，一般认为是因蒸馏取露而得名，“专司合药、蒸露、造鼻烟及西洋胰子等事。”据小横香室主人撰写的《清朝野史大观》载：“武英殿有露房，即殿之东梢间，盖旧贮西洋药物及花露之所。……旧传西洋堂归武英殿管理，故所存多西洋之药。此次交造办处，而露房遂空。”康熙六十一年（1722）露房归并入武英殿，于嘉庆十九年（1814）正式撤销。", "武英殿刻书用纸需要用芸香熏蒸，可免虫蛀。露房所设人员主要有医生 4 名，属御药房，打扫太监3 名。虽然露房主要工作是蒸熏书籍，但同时负责合药、造鼻烟及西洋胰子等。据史料记载，露房医生每日行分例饭二分，每日每分猪肉十二两。", "露房医生主要负责从事制药、蒸露等事务，这些技术大多从异域传入，同时露房也贮藏了不少从异域传来的药物。据时人记载：“武英殿有露房，即殿之东梢间，盖旧贮西洋药物及花露之所。甲戌（1814）夏，查检此房，瓶贮甚夥，皆丁香、豆蔻、肉桂油等类。油已成膏，匙匕取之不动。又有狗宝、鳖宝、蜘蛛宝、狮子宝、蛇牙、蛇睛等物。其蜘蛛宝，黑如药丸，巨若小胡桃，其蛛当不细矣。又有曰‘德力雅噶’者，形如药膏；曰‘噶中得’者，制成小花果，如普洱小茶糕。” 姚衡的《武英殿露房药库颁赏例药目》一书，记载了武英殿露房药物共有124种，包括药油、药露、合成药、植物药、动物药、矿物药及制药辅料，每种药物皆注明数量、重量、所盛器皿、功效，部分注明用法、材料。所治疾病及用途涵盖伤寒伤热、咳嗽痨病、头晕头痛、牙痛眼疾、脾虚胃痛、痢疾泄泻、风湿痹痛、妇人小儿、外伤痈肿、解毒补益等。据学者研究，从这些名称和治疗方法看，似乎都是阿拉伯的药物，很可能是元大都回回药物院的遗物，部分药物可能来自外国的进贡。总之，武英殿露房作为清代制作、贮藏异域药物之处，直接证明清代异域药物在宫廷的流播和运用，可以说见证了中外医药的交流与影响。"])
storylist.push(["辛亥革命后，武英殿收归民国政府所有。依据《清室优待条件》，热河和奉天行宫的古物被移运至故宫,前朝武英殿、文华殿辟为古物陈列所。1914年2月,古物陈列所正式宣告成立。还利用美国退还的“庚款”二十万元在武英殿以西建了宝蕴楼库房，用来保存文物，并将之起名为“北平古物陈列所”，由内政部管理。古物陈列所于1914年10月10日正式向广大民众开放，它将中国古代文明、珍贵文物和宏伟宫殿建筑融为一体，首次向广大市民展现，由此揭开了国立博物馆的序幕。", "随着古物陈列所的影响日渐扩大，它的开放面积和陈列文物数量也大大增加，到古物陈列所参观的游客明显增多，仅开放日至月底的短短20天里，前来参观的人数就超过了11000人次，其中外国游客占了很大比例。据当时记载，古物陈列所开放以后，“中外人士前来参观者岁时不绝，而外人之临莅京师者尤莫不以先睹为快。”庄士敦《紫禁城的黄昏》也说“1916年以后几年中，博物馆陈列的那些引人入胜的艺术品吸引了来自世界各地的成千上万的观众。”值得一提的是，1916年5月31日早晨例行检杳武英殿展室时工作人员发现敬思殿内一柜盖锁簧损坏，遗失铜满达、云龙镀金爵盘、白玉双龙耳孟、金柄盘各一件。由于怀疑是监守自盗，将当夜3名执勤警卫送交护军管理处司法科审讯。这是古物陈列所记录的第一起文物被盔案，此后十多年间再未发生过文物被盗情祝。民国政府在武英殿设立古物陈列所，皇宫禁地第一次向公众打开了厚重的大门。这是中国历史上第一家国立博物馆、宫廷博物馆、艺术博物馆，意义重大。"])

/**
 * 展开的nav
 */
var rrrr = $(".show-nav>ul>li:nth-child(odd)")
for (let i = 0; i < rrrr.length; i++) {
    rrrr[i].index = i;
}
$("#leftnav").click(function() {
    // $(this).animate({ "width": "15%" })

    $(".show-nav").animate({
        "left": "0"
    })
})
rrrr.on('click', function(params) {
    swiper.slideTo(this.index, 1000);
    $(".show-nav").animate({
        "left": "-20%"
    })

})
$(".left-nav>img").on("mouseenter", function(params) {
    $(".show-nav").animate({
        "left": "0%"
    })
})
$(".show-nav").on("mouseleave", function(params) {
    $(".show-nav").animate({
        "left": "-20%"
    })
})

rrrr.on("mouseover mouseout", function(event) {
    if (event.type == "mouseover") {
        // $(this).addClass("cssa")
        $(this).text(navEnList[this.index])
            //鼠标悬浮
    } else if (event.type == "mouseout") {
        //鼠标离开
        // $(this).removeClass("cssa")
        $(this).text(navCnList[this.index])
    }
})

/**
 * 人物剪影
 */
var peopletext = []
peopletext.push(["1644年春，明末农民起义军领袖李自成攻入北京，曾以武英殿为治事之所。崇祯十七年（1644）三月十九日李自成率农民军攻入紫禁城午门，约一个月后，李自成军在山海关遭到重创，于四月二十七日退回北京。四月十二九日，李自成在武英殿登基称帝，追尊七代先祖都为帝后，立妻子高氏为皇后。李自成身着皇冠冕服，陈列仪仗接受朝拜。牛金星代替他行使在郊外祭天的礼仪。当晚，李自成下令焚毁紫禁城宫殿及九门城楼。据史料记载，当时紫禁城宫殿及太庙均被焚毁，只剩下武英殿一处。李自成则于四月三十日撤离北京。是年五月，多尔衮率清军进入紫禁城，封闭所有宫殿，等待顺治皇帝入关。多尔衮在武英殿理事，所以顺治初年武英殿便成了刚刚入主紫禁城的清廷的重要政务活动场所。"])
peopletext.push(["康熙初年，康熙帝曾短暂于武英殿寝居办公。康熙八年（1669）正月二十二日，因修理太和殿，大兴土木，康熙帝从平日寝居的清宁宫移居至武英殿。到十一月二十四日，康熙帝才由武英殿移居回乾清宫，康熙帝在武英殿居住了将近一年时间。康熙帝对典籍编纂事业极为关注。康熙十九年，康熙皇帝在武英殿设立修书处，除书作、印刷作外，还设有露房、砚作、珐琅作等，隶属内务府，由“侍卫及（内务府）司员经营”。此时的武英殿并非专门的刻书机构，虽然也刊刻书籍，但承刻能力有限，所以康熙皇帝将一些准备刊刻的书籍交由外面的亲信大臣刊刻印刷，诸如《全唐诗》、《历代诗余》《历代题画诗类》《御批通鉴纲目》等，这些书籍经过精写、精校、精刻，版印精良，成就一代“康版”美谈。", "康熙四十年（1701）以后，政局稍稳，武英殿的刻书工作才得到更多的重视。康熙四十三年（1704），康熙帝下令儒臣在武英殿开局编纂《佩文韵府》，并交由武英殿刊印，此后，武英殿刊印典籍的数量才开始逐渐增多，进入新的发展阶段。武英殿在康熙前期仅能刊刻少量书籍，到康熙后期修书处成立，编校图书，武英殿修书处走过了一个逐步发展壮大的过程。由于康熙帝的重视，武英殿的刊刻能力大大加强。", "    康熙帝雄才武略，文化素养极高，平时即“留意典籍，编定群书”。他非常重视经筵日讲，并谕旨将经筵内容编纂，刊刻成书。先后在武英殿编刻成书的包括《日讲书经解义》《日讲易经解义》《日讲四书解义》诸书，均令刊刻颁赐。此外，康熙时期刊刻的殿本之中不少是版画、套印精品，如《御制避暑山庄三十六景诗》《钦定古今图书集成》的精美版画，《御选古文渊鉴》采用了四色、五色套印，都充分显示了康熙朝武英殿在印刷技术方面已经有了长足的发展。"])
peopletext.push(["陈梦雷（1650-？），字则震，一字省斋，福建闽县人。康熙九年(1670)进士及第，十一年(1672)授翰林院编修，十二年(1673)回乡省亲，逢耿精忠叛乱，请陈梦雷共谋，陈梦雷佯病，与李光地共谋，设计送蜡丸给清廷。三藩之乱平复后，李光地因送腊丸青云直上，却隐瞒了陈梦雷的功劳，陈梦雷最终以从逆治罪，后经康熙旨意减刑免死，于康熙二十一年(1682)流放沈阳尚阳堡。康熙三十七年(1698)，康熙帝东巡奉天，陈梦雷献诗称旨。康熙再次施恩，将陈梦雷召还京师。陈梦雷于十二月进京，给房给衣，暂住椒园教书。康熙三十八年(1699)夏入懋勤殿侍皇三子允祉读书，康熙三十九年(1700)五月到允祉王府行走，成为重要幕僚，康熙帝也曾三次赐御书给他，有“松高枝叶茂，鹤老羽毛新”的称赞，陈梦雷受宠若惊，遂以“松鹤老人”自号，将其诗文集命名为《松鹤山房诗文集》。允祉也赐衣赐园给他，在扈跸时，还曾让他随从，可谓待遇优厚，异于常人。", "康熙帝和允祉给了陈梦雷相当的礼遇和优裕的生活条件，陈梦雷深为感激，在入允祉王府后渐渐萌生了编纂一部大类书以报答一二的打算。经过一番酝酿准备，陈梦雷于康熙四十年（1701）十月开始编纂《汇编》，历时5年编成大型类书《古今图书集成》。康熙五十五年，清廷在武英殿成立了古今图书集成馆，由陈梦雷担任总裁，负责《古今图书集成》的编纂和刊印，同时制作了铜活字100万个，陆续用铜活字刊印《古今图书集成》。雍正帝继位以后，迫害打击同他争夺帝位的兄弟，允祉遭禁锢。陈梦雷也因允祉的关系被又一次谪戍黑龙江，后病死于戍所。《古今图书集成》最终于雍正六年刊印完成，印刷了64部。全书共计1万卷，另有目录40卷。分为6汇编，32典，6109部，字数达1亿6千万字，是中国现存的一部规模最大、体例最善、用处广泛的大型类书。陈梦雷作为编纂和刊印《古今图书集成》这一鸿编巨制的核心人物，功绩不可淹没。"])
peopletext.push(["陈鹏年（1664-1723），字北溟，号沧洲，湘潭(今属湖南)人。康熙三十年（1691）进士，历官浙江西安、江西山阳知县，海州、江宁、苏州知府。任苏州知府时，因曾得罪总督阿山，被诬入狱。所作《重游虎丘》诗，阿山指为诽谤朝廷，句句旁注，密奏康熙。康熙谓“诗人讽咏，各有寄托，岂可有意罗织，以入人命?”并斥责阿山乃“宵人伎俩”，他遂得免于文字狱。后任江苏布政使，官至河道总督，卒于任所，谥恪勤。", "陈鹏年担任了第一任的武英殿总裁官，武英殿总裁在康熙时已是统领武英殿修书处全局的总负责人，其工作内容较为繁杂。康熙末年修书处编刻的几部大型类书——《韵府拾遗》《月令辑要》《分类字锦》等，皆是在陈鹏年主持下编辑和刻印完成的。据《陈恪勤公年谱》记载，陈鹏年在康熙五十六年在武英殿初修《月令辑要》一部，又修《鸟兽虫鱼广义》；康熙六十年《佩文韵府》告成。又发《缥缃类对》一部，康熙帝命陈鹏年与编修、后赠侍读学士何义门先生焯协纂，荟萃群书，研搜考索，每月进呈三卷，赐名《分类字锦》。六月，武英殿《分类字锦》告成后，十一月初一日，开载校勘、承纂、分纂、缮写、监造官员职名，陈鹏年因久离武英殿、何焯病故，皆未列名，康熙帝特命补入。陈鹏年自康熙五十二年至康熙六十年任职武英殿总裁达八年时间，至康熙六十年十一月转署理河道总督，其武英殿总裁职务才由王兰生、方苞等人接任。可以说，陈鹏年作为武英殿总裁，对武英殿修书处的早期发展贡献颇大，也得到了康熙帝的高度认可。"])
peopletext.push(["蒋廷锡（1669-1732），字扬孙，一字南沙，号西谷。常熟（今江苏常熟县）人。康熙四十二年（1703）进士。入翰林院，官至大学士。善画花卉，多用逸笔，或奇或正，或率或工，或赋色，或晕墨，一幅之中错综出之，而自然洽和，风神生动。故声名很高，其性恬雅，凡有才艺之人，多罗致门下，并常与马栖霞、顾云坡等共游。其画落笔超然绝俗，笔墨遒劲，设色研丽，贵显矜重，一笔不苟。写生有南田余韵，亦在青藤与白阳之间。其画妍丽工致者，多系门徒代作，赝本极多。传他衣钵的有陈邦直、奚冈、王子学、马扶曦等。其作品流传至今的有：《四瑞庆登图》、《竹石水仙图》等。", "蒋廷锡曾在陈梦雷被流放之后，雍正元年正月初五日被雍正帝任命为古今图书集成馆总裁，主持后续的编刻工作。蒋廷锡接到集成馆总裁的任命，不敢怠慢，三天后的正月初八日抵集成馆，正式开展《集成》的纂修刷印工作。就印刷工作而言，康熙朝集成馆所刷印之《集成》已经大体完成了。针对康熙朝集成馆所纂修《集成》“一卷之中，必有十余页错误应改印者”之不足，蒋廷锡提出整改意见和工作进度设想，一方面将没有印刷的三百七十九卷，令在馆人员详细校对、刷印，另一方面，将已刷印的部分，令在馆人员分卷重校，最后由总裁和副总裁总阅，保证无误。雍正帝对蒋廷锡的“改印”方案十分慎重，批示“改印者不必，恐有后论。将已成好之书改坏，大有所关，如必有不可处，亦当声闻于众而行。”最后的折中办法是，蒋廷锡率领集成馆员对《集成》文字进行审查，对已刷印的部分进行校正，作一些技术性的处理，完成未刷印部分的刷印，折页装订。蒋廷锡还提出了新的人事安排。康熙朝集成馆经裁撤后，剩余六十四人，但大多是贡、监人员，功名低微，蒋廷锡恐其如原集成馆一样滋生事端，遂请旨从翰林院选拔人员入馆负责校对，对留用人员重新分工。从后来的实际纂修情形看，雍正朝集成馆除总裁、副总裁外，加上翰林院调拨人员，共有六十名纂修人员留存在馆。最终于雍正六年完成了《古今图书集成》的印制工作，蒋廷锡在其中发挥了重要作用。"])
peopletext.push(["金简（?—1794），汉军正黄旗人。朝鲜族，金氏，武备院卿三保子，初隶内务府汉军。乾隆中授内务府笔帖式，累迁奉宸院卿，赐姓金佳氏。乾隆三十七年(1772)，金简授总管内务府大臣，监武英殿刻书，充《四库全书》副总裁，专司考核督催。三十九年，授户部侍郎，管钱法堂，任镶黄旗汉军副都统。四十三年(1778)，奉命编纂《四库荟要》，署工部尚书。受命赴盛京(今沈阳)查平允库项亏短事，奏定盛京银库章程。四十六年(1781)，受命总理工部。四十八年，擢工部尚书、镶黄旗汉军都统。次年，请疏浚卢沟桥中泓五孔水道，并请定三四年疏浚一次。乾隆五十七年(1792)，调吏部尚书。谥勤恪。", "乾隆三十八年四月，武英殿雕版刊刻了《永乐大典》中的《易纬八种》、《汉官旧仪》四种珍稀图书后，武英殿总裁金简向乾隆帝提议制作枣木活字，摆板印刷。金简说明了实施方案和预算：依《佩文韵府》选择六千左右常用字，每字刻十至百个备用；并制橡木槽板作为板框。用活字印刷，制作全套书所需活字为十五万个，费用不及一本雕版刊印的《史记》。乾隆帝批复“甚好，照此办理”。到乾隆五十九年，最终用木活字刊印图书一百三十四种，共使用木活字二十五万个，工料大为减省。连同先前雕版印行的四种书籍，共计刊行图书一百三十八种。因“活字”之名不雅，乾隆帝特命名为《钦定武英殿聚珍版书》。金简还根据木活字印书的工艺流程，撰写了《武英殿聚珍版程式》一书，总结了“刻木有法、藏庋有具、排校有次”的原则，图文并茂地说明了木活字制作、刊印的全部过程。该书亦收入《钦定武英殿聚珍版书》中，成为木活字印刷的珍贵史料。 "])
peopletext.push(["陶湘（1871-1940），字兰泉，号渉园，别号百川书屋、喜咏轩、托跋廛。原籍江苏武进，长于浙江慈溪，生于清同治十年（1871），卒于民国二十九年（1940），享年七十岁。《武进陶涉园七十年记略》自述，陶湘出身于官宦之家，其父为慈溪县典史，十岁时“伯父因大房二房人丁稀少，又以湘为嗣”，过继给任山东恩县知县的伯父，陶湘当年即随任之山东恩县读书，自幼受到很好的教育。陶湘早年也想走科举仕途之路，然而屡次乡试都铩羽而归。二十一岁时以大兴县学生员保送鸿胪寺序班，后又纳资加捐，累保至道员。历任京汉路北段养路处、机器处总办，行车副监督。1909 年任上海三新纱厂总办，并兼税关公款清理处及城壕放丈局两处会办。民国以后，陶湘投身于实业及金融业，先后任上海招商局董事兼天津分局经理、汉治萍煤矿董事、天津中国银行经理、北京交通银行总行经理、天津裕元纱厂经理、山东鲁丰纱厂经理。晚年退职后由天津移居上海。", "陶湘是近代著名的目录学家、藏书家和刻书家。他虽然多年出仕经商，但仍孜孜于学术，尤深于版本目录之学，陶湘自谓“生平于缥缃外，无他嗜”。曾辑著目录书多种，如《钦定文渊阁四库全书目录》《摛藻堂四库全书荟要目录》《内府写本书目》《钦定校正补刻通志堂经解目录》《钦定石经目录》《石经萃宝藏宋版五经目录》《明代内府经厂本书目》。", "陶湘以收藏殿本著称，凡遇开化纸印本，不问何类，一概收之，一时有“陶开化”的美誉，民国以来的书林中，人人皆知。他在《清代殿版书目》《武英殿聚珍版书目》《故宫殿本书库现存目》等书目中，其中多涉及开化纸印本，可以说重视并揭示开化纸本价值所在，陶湘是民国以来第一人。除此之外，陶湘也相当重视铜活字本，如《古今图书集成》《数理精蕴》等，铅印本和石印本也在他关注的范围之内。", "陶湘除了收藏殿本宏富外，亦亲身参与了故宫所藏殿本的整理和编目工作。1929年陶湘曾应聘任故宫博物院图书馆专门委员，主持编订故宫殿本工作，为殿本书目的整理和编目做出了重要贡献。陶湘对故宫殿本的偏爱，不仅仅停留在收藏和整理，他利用自己收藏所得，认真查阅资料，撰写出了详细考述殿本源流的《清代殿版书始末记》，对殿本源流、发展等基本问题作了非常有价值的基础性研究，所编辑《清代殿板书目》《故宫殿本书库现存目》等多种目录书，字里行间也渗透着他对殿本研究的心得和成果，至今仍为人所用。"])
let namelist = ["李自成", "康熙", "陈梦雷", "陈鹏年", "蒋廷锡", "金简", "陶湘"]
let pinyinSurnameList = ["LI", "AIXINJUELUO", "CHEN", "CHEN", "JIANG", "JIN", "TAO"]
let pinyinNameList = ["ZICHENG", "XUANYE", "MENGLEI", 'PENGNIAN', "TINGXI", 'JIAN', 'XIANG']
var eeee = $(".figure-people>div>img")
for (let i = 0; i < eeee.length; i++) {
    eeee[i].index = i;
}

$(".figure-people>div>img").on('click', function(event) {
    $(this).hide()
    $(this).next().show()
    let figuretext = '';
    let fimg = "../img/f" + (this.index + 1) + ".png"
    let figurep = peopletext[this.index]
    for (let i = 0; i < figurep.length; i++) {
        figuretext += '<p class="texttype figuretext">' + figurep[i] + '</p>'

    }
    $(".figuretext").remove()
    $(".figurename").text(namelist[this.index])
    $(".figuresurname").text(pinyinSurnameList[this.index])
    $(".figurepyname").text(pinyinNameList[this.index])
    $(".figurestr").after(figuretext)
    $(".figure-particulars>img").attr('src', fimg)
    $(".figure-detail").animate({
        "right": "0",
    }, 500)
})

$(".figure-people>div>img").on("mouseover mouseout", function(event) {
    if (event.type == "mouseover") {
        $(this).attr("src", "../img/s" + this.index + ".png")
            //鼠标悬浮
    } else if (event.type == "mouseout") {
        //鼠标离开
        $(this).attr("src", "../img/r" + this.index + ".png")
    }
})

$("#figure-arr").on('click', function() {
        $(".figure-detail").animate({
            "right": "-50%",
        }, 500)
        $(".figureimg").hide()
        $(".figure-people>div>img").show()
    })
    /**
     * 皇城聚珍相关方法
     */
var asd = $(".technlogy-down")
var flag3 = true
var offbtnStatus = true;
var flag4 = true
var offbtnStatus2 = true;
$("#left").on("click", function(params) {
    if (offbtnStatus) {
        offbtnStatus = false
        if (flag3) {
            $(".technology-right").animate({
                'left': '50%'
            }, 1000, function(params) {
                $(".technology-right").hide()
                offbtnStatus = true
                flag3 = !flag3
            })
            downHide()


        } else {
            $(".technology-right").show();
            $(".technology-right").animate({
                'left': '0%'
            }, 1000, function(params) {
                offbtnStatus = true
                flag3 = !flag3
            })
            downShow()


        }
    }
})



function downHide(params) {
    asd.animate({
        'bottom': '-20%'
    }, 1000, function(params) {
        asd.hide()
    })
}

function downShow(params) {
    asd.show()
    asd.animate({
        'bottom': '101px'
    }, 1000)
}

$("#right").on("click", function() {
        if (offbtnStatus2) {
            offbtnStatus2 = false
            if (flag4) {
                $(".technology-left").animate({
                    'left': '-50%'

                }, 1000, function(params) {
                    offbtnStatus2 = true
                    flag4 = !flag4
                })
                downHide()

            } else {
                $(".technology-left").animate({
                    'left': '0'
                }, 1000, function(params) {
                    offbtnStatus2 = true
                    flag4 = !flag4
                })
                downShow()
            }
        }

    })
    // $('#btn').click(function() {
    //     console.log(1);

//     swiperV.slideTo(1, 1000, false); //切换到第一个slide，速度为1秒
// })
$('#change2').click(function() {
    $(".intrs").show()
    $(".open-text>p").hide()
    $(".preface-main").animate({
        "left": "-100%"
    }, function(params) {
        $(".open-text>p").show()
        $(".open-text>p").addClass("animated bounceInRight")
    })
    $(".intrs").animate({
        "right": "0%"
    })

})
$('#preface-arr').click(function() {
    $(".preface-main").animate({
        "left": "0%"
    }, function(params) {
        $(".intrs").hide()
    })
    $(".intrs").animate({
        "right": "-100%"
    })


})
$('#perface-arr').click(function(params) {
        $(".perface-main").animate({
            "left": "0%"
        })

    })
    /**
     * 风物逸闻打开方法
     */
for (let i = 0; i < $('.newbutton').length; i++) {
    $('.newbutton')[i].index = i;

}
let storynamelist = ["香妃传说", "两次火灾", "西洋露房", "古物陈列馆"]

$('.newbutton').click(function(params) {
    let storytext = ''
    let simg = "../img/st" + this.index + ".png"

    let storyp = storylist[this.index]
    for (let i = 0; i < storyp.length; i++) {
        storytext += '<p class="texttype">' + storyp[i] + '</p>'

    }
    $(".reded>p").remove()
    $(".storyname").text(storynamelist[this.index])
    $(".storyimg").attr("src", simg)
    $(".storystr").after(storytext)
    $(".story-detail").show()
    $(".story-detail").animate({
        "right": "0%"
    })
})
$('#story-arr').click(function(params) {
    $(".story-detail").animate({
        "right": "-50%"
    }, function(params) {
        $(".story-detail").hide()
    })
})

/**
 * 进入详情页时 关闭鼠标滚轮切换轮播图方法
 */
var detailList = $('.perface-detail,.story-detail,.figure-detail,.technology-introduce,.techology-int')
detailList.on("mouseenter mouseleave", function(event) {
    if (event.type == "mouseenter") {
        swiper.mousewheel.disable();
        //鼠标悬浮
    } else if (event.type == "mouseleave") {
        //鼠标离开
        swiper.mousewheel.enable();

    }
})

/**
 * 殿本精华  书籍详情方法
 */
$(".book").on("mouseenter", function() {
    $(".cover", this).animate({
        "top": "0"
    }, {
        queue: false,
        duration: 0
    })

});

$(".book").on("mouseleave", function() {
    $(".cover", this).animate({
        "top": "400px"
    }, {
        queue: false,
        duration: 0
    })

});
/**
 * 滚动方法
 */
$('#story-right').click(function(params) {
    // $(".scrollsize").scrollLeft($(".scrollsize").scrollLeft() + 1000);
    $(".scrollsize").animate({
        "scrollLeft": "+=800px"
    })
})
$('#story-left').click(function(params) {
    $(".scrollsize").animate({
        "scrollLeft": "-=800px"
    })
})
$('#figure-right').click(function(params) {
    // $(".figure-scroll").scrollLeft($(".figure-scroll").scrollLeft() + 500);
    $(".figure-scroll").animate({
        "scrollLeft": "+=500px"
    })
})
$('#figure-left').click(function(params) {
    $(".figure-scroll").animate({
        "scrollLeft": "-=500px"
    })

})
$('#caseup').click(function(params) {
    $(".bookcase-main").animate({
        "scrollTop": "-=500px"
    })

})

$('#casedown').click(function(params) {
    $(".bookcase-main").animate({
        "scrollTop": "+=500px"
    })

})

$('#mybook').booklet({
    pagePadding: 0,
    pageNumbers: false,
    closed: true,
    autoCenter: true,
});


// $("#flipbook").turn({
//     width: 400,
//     height: 300,
//     autoCenter: true,
//     acceleration: true,

//     gradients: true,
// });
//下一页按钮
$("#ccccc").on("click", function(event) {
    // $("#flipbook").turn("next");
    $('#mybook').booklet("next")
});
//上一页按钮
$("#help").on("click", function(event) {
    // $("#flipbook").turn("previous");
    $('#mybook').booklet("prev")
});
$("#btn").click(function(params) {
    $("#circlecase").hide()
    $("#vase").animate({
        'left': '-100%'
    }, function(params) {
        // $(".publication-main").addClass("asdff")
        $("#bookcase").animate({
            // "transform": "scale(1.1)"
            // "width": "+=750px",
            // "height": "1891px"
        }, 500, function(params) {

            $("#outerdiv").css("display", "block");

        })

        swiper.mousewheel.disable();
    })
    $(".publication-content div,#kangxi").animate({
        'right': '-100%'
    }, function(params) {
        $(".publication-content div,#kangxi").hide()
    })



})

$(".book").on('click', function(params) {
    $(".hard>img").attr("src", $(this).children("img").attr("src"))
    $('#mybook').booklet("gotopage", 0)

    $(".sadasd").show()
})

$("#a1").click(function(params) {
    event.stopPropagation();

    $(".sadasd").hide("slow")

})

$("#a2").click(function(params) {
    event.stopPropagation();


})

/**
 * 滑动到某DIV底部时 触发方法
 */
var flagscroll = true
var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
var nScrollTop = 0; //滚动到的当前位置
var nDivHight = $(window).height();
$(".bookcase-main").scroll(function() {
    nScrollHight = $(this)[0].scrollHeight;


    nScrollTop = $(this)[0].scrollTop;
    if (nScrollTop + nDivHight >= nScrollHight) {
        if (flagscroll) {
            flagscroll = false;
            swiper.mousewheel.enable();
        }


        // alert(1)
    }
});

/**
 * 殿本精华还原方法 
 */
var republication = function republication(params) {
    // $(".publication-main").removeClass("asdff")
    $(".bookcase-main").scrollTop(0);
    $("#bookcase").animate({
        // "width": "-=750px",
        // "height": "676px"
    }, "fast", function(params) {
        flagscroll = true
    })
    $("#outerdiv").hide()
    $("#vase").css('left', '-57px')
    $(".publication-content div,#kangxi").show()
    $("#circlecase").show()
    $(".publication-content div,#kangxi").css("right", "0")
    swiper.mousewheel.enable();
}
$(".anniu").click(function(params) {
    republication()
})
var spanlist = $(".tttyyy>span")
for (let i = 0; i < spanlist.length; i++) {
    spanlist[i].index = i

}
spanlist.on("mouseenter mouseleave", function(event) {
        if (event.type == "mouseenter") {
            if ($(this).find('img')[0]) {
                $(this).find('img').replaceWith('<span class="nav-span temporary">' + navCnList[this.index] + '</span>')
            }


            //鼠标悬浮
        } else if (event.type == "mouseleave") {
            $(".temporary").replaceWith('<img src="../img/ 导航.png" class="nav-img" alt="">')

        }
    })
    /**
     * 建筑概览
     */
var perfacelist = []
perfacelist.push("武英殿之正门，守卫值宿之处。面阔九间，南向，正面辟有三门，设三阶，出九级。黄琉璃瓦歇山式顶，门内丹陛直通武英殿。")
perfacelist.push("武英殿之正殿。面阔五间，进深三间，黄琉璃瓦歇山式顶，南向，乾隆四十年（1775）御题门额“武英”。周围有石栏，前出月台与丹陛相接，东西两陛九级，直通武英门。该殿主要为收藏内府刻本，贮存板片之所。道光间曾充补武英殿校录官的黄培芳所撰《虎坊杂识》载：“武英殿殿宇前后两重，皆贮书版。”")
perfacelist.push("武英殿之后殿。面阔五间，进深三间，黄琉璃瓦歇山式顶。有乾隆帝御笔题匾“敬思”。和正殿一样，皆为收藏内府刻本，贮存板片之所，即《国朝宫史》所称：“殿前后两重，皆贮书籍。” 清人姚元之《竹叶亭杂记》卷四载：“武英殿书籍其存而不发卖者，向贮于殿之后敬思殿。甲戌夏清查，将完好者移贮前殿，其残缺者变价，符呪等书悉付之丙，于是敬思殿空为贮板片之所。”民国初年曾迁热河避暑山庄古物于此陈列，将武英、敬思二殿通而为一。")
perfacelist.push("武英殿东庑，亦称东配殿。坐东面西，面阔五间，进深二间，单檐悬山顶、黄琉璃瓦。乾隆四十年（1775）御笔题匾“凝道”。该殿为武英殿修书处校刊、装潢诸书之处，“凡钦定命刊诸书，俱于殿左右直房校刻”。")
perfacelist.push("武英殿西庑，亦称西配殿。坐西面东，面阔五间，进深二间，单檐悬山顶、黄琉璃瓦。乾隆四十年（1775）御笔题匾“焕章”。该殿亦为武英殿修书处校刊、装潢诸书之处。晚清时期，焕章殿曾作为修订法律馆的办公场所。")
perfacelist.push("武英殿东北角之小殿。面阔三间，进深一间，黄琉璃瓦硬山式顶 。《康熙衙署图》及《乾隆京城全图》均出现了恒寿斋，《乾隆京城全图》图示还特别予以注明。《钦定日下旧闻考》载：“恒寿斋，今为缮校四库全书诸臣直房。西北为浴德殿，即旧所称修书处也，浴堂在其后，西为井亭。”《国朝宫史续编》卷五十三记载：“东北为恒寿斋，西北为浴德堂，皆词臣校书直次。”关槐乾隆年间曾充武英殿提调，其年谱载：“殿东北隅恒寿斋为修书直庐，自兹编校无虚日。”恒寿斋日常作为武英殿修书处总裁、提调等官办公处所。")
perfacelist.push("又称作“浴德殿”，为武英殿西北角之小殿。位于武英殿西北高台上，面阔三间，坐北面南，卷棚歇山式黄琉璃瓦顶。堂东次间后檐辟门通后室（罗大天），室平面呈方形，上为穹顶，四壁至顶皆为乳白色瓷片贴面，顶部设有天窗。东室有灶台，安放铁锅一口，西室为灶间，从井亭给水由石槽引水入锅。《钦定日下旧闻考》载：“西北为浴德殿，即旧所称修书处也，浴堂在其后，西为井亭。”《国朝宫史》又载：“西有浴德堂，为词臣校书直次，设总裁统之。”武英殿修书处成立后，浴德堂作为校刊翰林处办事处所，设有提调房、校录房和办事值房等，负责内府书籍的缮写、校勘。")
perfacelist.push("包括武英门东耳房、武英门西耳房、凝道殿北耳房、焕章殿北耳房、西群房等，负责书籍刷印、齐订书页，折配书页、经页，以及钩幕御书、缮写板样、刊刻书板等事宜。另外，武英殿修书处下属的档案房、钱粮房、办事值房、值宿房、材料房、通行书籍售卖处、督催房、查核房等行政办事机构，也都散布在武英殿周边。")
var perfacenamelist = ["武英门", "武英殿", "敬思殿", "凝道殿", "焕章殿", "恒寿斋", "浴德堂", "武英殿群房"]
var perfacepinyin = ["WUYING", "WUYING", "JINGSI", "NINGDAO", "HUANZHANG", "HENGSHOU", 'YUDE']
    /**
     * 各个向下向上滚屏按钮
     */
$(".end-return").click(function(params) {
    swiper.slideTo(0, 1000);
})
$(".down,.godown").click(function(params) {
    swiper.slideNext();
    // console.log(1);

})


$(".area").click(
    function(params) {
        $(".perfaces").css('z-index', '1')
        $(".perfaces-label").css('visibility', 'hidden')
        $(this).prev().css('visibility', 'visible');
        $(this).parent().css('z-index', '100')
    }
)
let labels = $(".perfaces-label")
for (let i = 0; i < labels.length; i++) {
    labels[i].index = i
}
labels.click(function(params) {
    params.stopPropagation()
    console.log();
    $(".prefaceimg").attr("src", "../img/p" + (this.index + 1) + ".png")
    $(".particulars>p").text(perfacelist[this.index])
    $(".perfacename").text(perfacenamelist[this.index])
    $(".pinyin").text(perfacepinyin[this.index])
    if (this.index == 0) {
        $(".mingcheng").text('DOOR')
    } else {
        $(".mingcheng").text('HALL')
    }
    $(".perface-main").animate({
        "left": "-50%"
    }, function(params) {
        $(".perfaces").css('z-index', '1')
        $(".perfaces-label").css('visibility', 'hidden')
    })

})
$("#swipermain").click(function(params) {
    $(".show-nav").animate({
        "left": "-20%"
    })
})


windowAddMouseWheel();
var flag777 = true;

function windowAddMouseWheel() {
    var scrollFunc = function(e) {
        e = e || window.event;
        if (flag777) {
            flag777 = false
            if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                    swiper.slideNext();
                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时
                    // swiper.slideNext();
                }
            } else if (e.detail) { //Firefox滑轮事件
                if (e.detail > 0) { //当滑轮向上滚动时
                    swiper.slideNext();
                }
                if (e.detail < 0) { //当滑轮向下滚动时
                    // swiper.slideNext();
                }
            }
        }

    };
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    //滚动滑轮触发scrollFunc方法
    window.onmousewheel = document.onmousewheel = scrollFunc;
}