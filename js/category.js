(function(){

	//category_left 父元素  屏幕高 - topBar
	//category_left_box 子元素   所有li高度的总和
  
   var startY = 0 ;
   var endY = 0;
   var currentY = 0;
   var moveY = 0;

   var startTime = 0;
   var endTime = 0;

   var childH = $('.category_left_box').height();
   var parentH = $('category_left').height();

   //上下滑动的范围
   var region = 150;

   //开始触摸
   $('.category_left_box').on('touchstart',function(e){

   	  startTime = new Date().getTime();
   	 //记录最初点击的位置
   	 startY = e.targetTouches[0].clientY;
   })
   //正在移动
    $('.category_left_box').on('touchmove',function(e){

   	  //移动后的位置
   	  endY = e.targetTouches[0].clientY;//50px

   	  //移动的距离
   	  moveY = endY - startY;//50px   1px

   	  //手动移动盒子(限定移动的范围)
   	  if(moveY-currentY <region && moveY-currentY>-(childH - parentH)-region){
   	  	move(moveY-currentY);
   	  }
   	  // $('.category_left_box').css('transform','translateY('+(moveY)+'+px)');
		
				
   })

    //手指离开
    $('.category_left_box').on('touchend',function(e){

    	 endTime = new Date().getTime();
    	 //选中的结果
    	 // console.log(e.target);//a链接
    	 //如果在150毫秒之内松手，并且没有移动才算一次点击
    	 if(endTime - startTime < 150 && moveY ==0){

    	 	$(e.target).parent().addClass('active').siblings().removeClass('active');
    	 }

    	 //松手时吸附效果
    	 if(moveY - currentY > 0){
    	 	//回到0 的位置
    	 	move(0);
    	 	//重新设置currentY
    	 	currentY = 0;
    	 }else if(moveY-currentY < -(childH - parentH)){

    	 	move(-(childH - parentH));
    	 	currentY = (childH - parentH); //588
    	 }else{
    	 	//松手的时候，记录值
    		currentY = currentY - moveY;//currentY=-50px  
    	 }
    	 
    	 moveY = 0;
    })


    function move(t){
		$('.category_left_box').css('transform','translateY('+ (t) +'px)');
		//  1px -(-50px) = 51px

    }

})()