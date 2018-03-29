/*
 * drag 1.0
 * create by tony@jentian.com
 * date 2015-08-18
 * 鎷栧姩婊戝潡
 */
(function($){
    $.fn.drag = function(options){
        var x, drag = this, isMove = false, defaults = {
        };
        var options = $.extend(defaults, options);
        //娣诲姞鑳屾櫙锛屾枃瀛楋紝婊戝潡
        var html = '<div class="drag_bg"></div>'+
            '<div class="drag_text" onselectstart="return false;" unselectable="on">向右滑动完成登录</div>'+
            '<div class="handler handler_bg"></div>';
        this.append(html);

        var handler = drag.find('.handler');
        var drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var maxWidth = drag.width() - handler.width();  //鑳芥粦鍔ㄧ殑鏈€澶ч棿璺�

        //榧犳爣鎸変笅鏃跺€欑殑x杞寸殑浣嶇疆
        handler.mousedown(function(e){
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
        });

        //榧犳爣鎸囬拡鍦ㄤ笂涓嬫枃绉诲姩鏃讹紝绉诲姩璺濈澶т簬0灏忎簬鏈€澶ч棿璺濓紝婊戝潡x杞翠綅缃瓑浜庨紶鏍囩Щ鍔ㄨ窛绂�
        $(document).mousemove(function(e){
            var _x = e.pageX - x;
            if(isMove){
                if(_x > 0 && _x <= maxWidth){
                    handler.css({'left': _x});
                    drag_bg.css({'width': _x});
                }else if(_x > maxWidth){  //榧犳爣鎸囬拡绉诲姩璺濈杈惧埌鏈€澶ф椂娓呯┖浜嬩欢
                    dragOk();
                }
            }
        }).mouseup(function(e){
            isMove = false;
            var _x = e.pageX - x;
            if(_x < maxWidth){ //榧犳爣鏉惧紑鏃讹紝濡傛灉娌℃湁杈惧埌鏈€澶ц窛绂讳綅缃紝婊戝潡灏辫繑鍥炲垵濮嬩綅缃�
                handler.css({'left': 0});
                drag_bg.css({'width': 0});
            }
        });

        //娓呯┖浜嬩欢
        function dragOk(){
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            text.text('验证成功');
            drag.css({'color': '#fff'});
            handler.unbind('mousedown');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
        }
    };
})(jQuery);

