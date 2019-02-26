$(function(){
    // 默认空白无法提交
    $(".send_input").delegate("#wbinput","propertychange input",function(){
       if($(this).val().length>0){
           $(".sub_btn button").prop("disabled",false);
       }else{
           $(".sub_btn button").prop("disabled",true);
       }
    })
    $(".sub_btn").click(
        function(){
            var txt = $("#wbinput").val()
            console.log(txt)
            //显示发布时间
            var wb_time = new Date()
            var wb_format = FormatDate(wb_time)
            // 把输入内容推到列表中
            $jqnode=CreatEle(txt,wb_format)
            $(".tab_box").after($jqnode)
            // 把输入内容清空
            $("#wbinput").val("")
            $(".sub_btn button").prop("disabled",true)
        }
    )
    function CreatEle(txt,time){
        var wb_con = '<div class="WB_feed">'+
            '<!-- 用户头像 -->'+
            '<div class="wb_con_face">'+
                '<img src="./img/defaulthead.gif" alt="哼哼">'+
            '</div>'+
            '<!-- 发布的内容 -->'+
            '<div class="wb_feed_detail">'+
                '<div class="wb_user_info">'+
                    '<span>隔壁老王不讲话</span>'+
                '</div>'+
                '<div class="wb_time"><span>'+time+' 来自 微博 weibo.com</span></div>'+
                '<div class="wb_con_info"><p class="article">'+ txt+' </p></div>'+
            '</div>'+
            '<!-- 评论信息 -->'+
            '<div class="wb_con_hander">'+
                '<ul class="wb_row_line">'+
                    '<li><span><img src="./img/tool_1.png" alt="哼哼"></span><span class="wb_tool_info">收藏</span></li>'+
                    '<li><span><img src="./img/tool_2.png" alt="哼哼"></span><span class="wb_tool_info">0</span></li>'+
                    '<li><span><img src="./img/tool_3.png" alt="哼哼"></span><span class="wb_tool_info">0</span></li>'+
                    '<li><span><img src="./img/tool_4.png" alt="哼哼"></span><span class="no_border wb_tool_info">0</span></li>'+
                '</ul>'+
            '</div>    '+                  
        '</div>'+
    '</div>'
        return $(wb_con);
    }
    function FormatDate(wb_time){
        return wb_time.getFullYear()+"-"+wb_time.getMonth()+1+"-"+wb_time.getDay()+" "+wb_time.getHours()+":"+wb_time.getMinutes();
    }
}
)

