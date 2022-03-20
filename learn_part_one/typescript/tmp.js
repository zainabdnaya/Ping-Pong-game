window.onload = function(){

    var canvas = document.createElement("canvas");
    var innerBtn = document.querySelector("#cbtn1 .cbtn-i");
    var outerBtn = document.getElementById("cbtn1");
    // var nextBtn = document.getElementById("nav-next");
    // var prevBtn = document.getElementById("nav-prev");
    var btnTitle = document.getElementById("cbtn-title");
    var tipText = document.querySelector(".info-wrap .info-text");
    outerBtn.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    w = ctx.canvas.width = outerBtn.offsetWidth;
    h = ctx.canvas.height = outerBtn.offsetHeight;
    dots=[];
    hoverFlag = false;
    clickFlag = false;
    mode = 0;
    nt = 0;
    tip = 0;
  
    tips = [
      "Stepping up your hover effects game!",
      "The spacing/canvas area around the button can be easily adjusted via CSS margin.",
      "Tested in IE and on various mobile devices.",
      "No libraries required!",
      "Imagine the endless possibilities :)",
      "In this case there is only one Button which is being controlled via JS.",
      "Using a black background for the best contrast.",
      "More effects coming soon..."
    ];
  
    modeSets = [
      {
        name: "",
        maxDots: 75,
        maxSpeed: 3,
        minSpeed: 1,
        emitRate: 10,
        emitNum: 2,
        radius: 2,
        trail: 0.2,
        maxTime: 1500,
        minTime: 750,
        glow: 10,
        hueMin: 15,
        hueMax: 55
      },
    ]
  
    function emitDots(x,y){
      if(dots.length<modeSets[mode].maxDots){
        for(var i=0; i<modeSets[mode].emitNum; i++){
          var color = Math.random()*(modeSets[mode].hueMax-modeSets[mode].hueMin)+modeSets[mode].hueMin;
          dots.push({
            x: w/2,
            y: h/2,
            v: Math.random()*(modeSets[mode].maxSpeed-modeSets[mode].minSpeed)+modeSets[mode].minSpeed,
            d: Math.random()*360,
            c: Math.random()*(5-(-5))+(-5),
            h: color,
            st: Date.now(),
            lt: Math.random()*(modeSets[mode].maxTime-modeSets[mode].minTime)+modeSets[mode].minTime
          });
        }
      }
    }
  
    function draw(){
      nt += 0.0005;
      ctx.fillStyle = "rgba(0,0,0,"+modeSets[mode].trail+")";
      ctx.fillRect(0,0,w,h);
      ctx.fill();
      for(var i=0; i<dots.length; i++){
        var pct = (Date.now()-dots[i].st)/dots[i].lt;
  
        switch(mode){
          case 0:
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "hsla("+dots[i].h+", 100%, 60%, "+(1-pct)+")";
            ctx.shadowColor = "hsla("+dots[i].h+", 100%, 60%, 1)";
            ctx.shadowBlur = modeSets[mode].glow;
            ctx.arc(dots[i].x, dots[i].y, Math.pow(modeSets[mode].radius,2)/dots[i].v, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
  
            dots[i].x += dots[i].v * Math.cos(dots[i].d * Math.PI/180);
            dots[i].y += dots[i].v * Math.sin(dots[i].d * Math.PI/180);
            dots[i].d += dots[i].c;
  
            if(clickFlag)
              dots[i].v = 1;
            break;
        }
  
        if(dots[i].x>w || dots[i].x<0 || dots[i].y>h || dots[i].y<0 || dots[i].st+dots[i].lt<Date.now()){
          dots.splice(i,1);
        }
      }
      anim = requestAnimationFrame(draw);
    }
  
    innerBtn.onmouseover = function(){
      hoverFlag = true;
      emitter = setInterval(emitDots, modeSets[mode].emitRate);
      anim = requestAnimationFrame(draw);
    }
  
    innerBtn.onmouseout = function(){
      hoverFlag = false;
      clearInterval(emitter);
      cancelAnimationFrame(anim);
      ctx.clearRect(0,0,w,h);
      dots = [];
    }
  
    innerBtn.onmousedown = function(){
      clickFlag = true;
    }
  
    innerBtn.onmouseup = function(){
      clickFlag = false;
    }
  
    btnTitle.innerHTML = modeSets[mode].name;
  
    // nextBtn.onclick = function(){
    //   if(modeSets.length <= mode+1){
    //     mode = 0;
    //   }else{
    //     mode += 1;
    //   }
  
      setTimeout(function(){
        innerBtn.setAttribute("data-mode", mode);
        btnTitle.innerHTML = modeSets[mode].name;
      }, 300);
  
    // //   outerBtn.classList.add("next_anim");
    //   btnTitle.classList.add("prev_anim");
    //   setTimeout(function(){
    //     // outerBtn.classList.remove("next_anim");
    //     btnTitle.classList.remove("prev_anim");
    //   }, 600)
    }
  
    prevBtn.onclick = function(){
      if(0 > mode-1){
        mode = modeSets.length-1;
      }else{
        mode -= 1;
      }
  
      setTimeout(function(){
        innerBtn.setAttribute("data-mode", mode);
        btnTitle.innerHTML = modeSets[mode].name;
      }, 300);
  
    //   outerBtn.classList.add("prev_anim");
    // //   btnTitle.classList.add("next_anim");
    //   setTimeout(function(){
    //     outerBtn.classList.remove("prev_anim");
    //     // btnTitle.classList.remove("next_anim");
    //   }, 600)
    }
  
    tipText.innerHTML = tips[tip];
    setInterval(function(){
      tips.length<=tip+1?tip=0:tip+=1;
      tipText.innerHTML = tips[tip];
    }, 7000)
  
  }
  
  
  
  
  
  
  
  // Hey! Wow, you found a comment. Thanks for checking this Pen out :)