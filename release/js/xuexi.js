var XX = {};

XX.urlMap = {
    "index": "https://www.xuexi.cn",
    "points": "https://pc.xuexi.cn/points/my-points.html",
    "scoreApi": "https://pc-proxy-api.xuexi.cn/api/score/days/listScoreProgress?sence=score&deviceType=2",
    "channelApi": "https://www.xuexi.cn/lgdata/",
    "loginUrl": "https://pc.xuexi.cn/points/login.html",
    "dayAskUrl": "https://pc.xuexi.cn/points/exam-practice.html",
    "weekAskUrl": "https://pc.xuexi.cn/points/exam-weekly-list.html",
    "paperAskUrl":  "https://pc.xuexi.cn/points/exam-paper-list.html",
    "articleUrl": [
        "1jpuhp6fn73",  // ��Ҫ�
        "19vhj0omh73",  // ��Ҫ����
        "132gdqo7l73",  // ��Ҫ����
        "35il6fpn0ohq", // ѧϰ�ص�
        "1ap1igfgdn2",  // ѧϰʱ��
        "slu9169f72",   // ����������
        "tuaihmuun2",   // ���ķ�����
        "1oo5atvs172",   // �Ļ��㳡
        "1eppcq11fne",   // �Ƽ�˼���о�
        "152ijthp37e",   // �Ƽ�ǰ��
        "1jscb6pu1n2",   // ��Ҫ����
        "1ajhkle8l72",   // �ۺ�����
    ],
    "videoUrl": [
        "2qfjjjrprmdh",  // ������������
        "3m1erqf28h0r",  // ��ɫ����
        "525pi8vcj24p",  // ��ɫ����
        "48cdilh72vp4", // ����뷨
        "1novbsbi47k",  // ��Ҫ���Ƶר��
        "1742g60067k",   // ѧϰ���ӽ�
        "1koo357ronk",   // ѧϰר�ⱨ��
        "vc9n1ga0nl",   // ��Զ�ķᱮ
        "1f8iooppm7l",   // ���չ㳡
        "1am3asi2enl",   // ΢��Ӱ
    ],
};

XX.getPoints = function () {
    var result;
    $.ajax({
        type: "GET",
        async: false,
        url: XX.urlMap.scoreApi,
        success: function(data){
            result = data;
        },
        error: function() {

        }
    });
    return result;
}

XX.getUrls = function (type) {
    var result;
    if (type == "article" || type == "video") {
        let key;
        if (type == "article") {
            key = Utils.ArrayRandom(XX.urlMap.articleUrl);
        } else {
            key = Utils.ArrayRandom(XX.urlMap.videoUrl);
        }
        $.ajax({
            type: "GET",
            async: false,
            url: XX.urlMap.channelApi + key + ".json?_st=" + Math.floor(Date.now() / 6e4),
            success: function(res){
                let list = [];
                let url;
                let publishTime;
                for (key in res) {
                    if (!res.hasOwnProperty(key)) {
                        continue;
                    }
                    if (res[key].hasOwnProperty("url")) {
                        url = res[key].url;

                        // �жϷ���ʱ���Ƿ���700��֮�ڣ����û�У��ж�url����
                        if (res[key].hasOwnProperty("publishTime")) {
                            publishTime = new Date(res[key].publishTime);
                            var lastYear = new Date(new Date() - 700 * 86400000);
                            if (publishTime < lastYear) {
                                continue;
                            }
                        } else {
                            if (url.indexOf("lgpage/detail/index") === -1) {
                                continue;
                            }
                        }

                        let usedUrls = Settings.getObject("usedUrls");
                        if (list.indexOf(url) === -1 && usedUrls.indexOf(url) === -1) {
                            list.push(url);
                        }
                    }
                }
                if (list.length) {
                    result = Utils.ArrayRandom(list);
                    // result = 'https://www.xuexi.cn/lgpage/detail/index.html?id=16982804095595194424&item_id=16982804095595194424';
                }
            },
            error: function() {

            }
        });
    } else if (type == "paperAsk") {
        result = XX.urlMap.paperAskUrl;
    } else if (type == "weekAsk") {
        result = XX.urlMap.weekAskUrl;
    } else if (type == "dayAsk") {
        result = XX.urlMap.dayAskUrl;
    }
    return result;
}
