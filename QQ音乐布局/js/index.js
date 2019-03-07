$(function(){
    $(".song_list").mCustomScrollbar();
    // 悬停显示歌曲工具条
    $(".song_list").delegate(".info_detail:gt(0)","mouseover",function(){
        $(this).find(".list_menu").show();
    }).delegate(".info_detail","mouseout",function(){
        $(this).find(".list_menu").hide();
    })
    //显示歌曲编号
    $(".song_number:gt(0)").each(function(i){
        console.log(i);
        $(this).text(i+1);
    });
    //点击工具栏切换图片
    $(".btn_play").click(function(){
        $(this).css(
            {
                "background":"url(./img/player.png) no-repeat -30px 0"
            }
        )
    });
    //使用ajax加载本地的音乐信息
})