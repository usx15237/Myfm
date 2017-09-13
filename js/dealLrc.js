var dealLrc=function(s)
{
	var lrc=s.split('\n')
    var timeReg = /\[\d{2}:\d{2}\.\d{3}\]/g;//匹配时间的正则表达式
    var lrc_time=[]
    var lrc_text=[]

    function setTime_Text()
    {
    //获取"时间数组"
    for(var i in lrc)
    {
      var time=lrc[i].match(timeReg)//match方法用于按指定形式，挑选字符串的子串,并以数组形式返回
      var time_min=parseInt(time[0].slice(1,3))//slice方法用于按指定区间，截取字符串的子串,并以数组形式返回
      var time_sec=parseFloat(time[0].slice(4,10))
      lrc_time.push(time_min*60+time_sec)
      //console.log(time_min*60+time_sec)
  }

    //获取"文本数组"
    for(var i in lrc)
    {
      var text=lrc[i].replace(timeReg,"")//replace方法用于替换原字符串的部分内容
      lrc_text.push(text)
  }
}

function showLrc() {
        var curTime = audioObject.currentTime;//获取当前的播放时间
        for (var i=0;i<lrc.length;i++) {
        	if ((curTime >lrc_time[i])&&(curTime<lrc_time[i+1])) {
        		//console.log(lrc_time[i]+" "+lrc_text[i])
                 //播放时间大于对应歌词时间小于下一句歌词时间就显示当前歌词
                 document.getElementById("lrc").innerHTML = lrc_text[i];
                break;//找到对应歌词就停
            }
        }
        //document.getElementById("lrc").innerHTML = lrc_text[10]+" "+f;
    }

    setTime_Text()
    var interval = setInterval(function(){
			showLrc()
			if(audioObject.duration-audioObject.currentTime<1){
				clearInterval(interval);
				//console.log("播完了")
			}
			//console.log(audioObject.currentTime-audioObject.duration)
		}, 200);   
}