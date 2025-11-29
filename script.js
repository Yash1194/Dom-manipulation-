addEventListener('mousemove', (e) =>{
    console.log(`Mouse Moved to: (${e.clientX}, ${e.clientY})`);
    document.body.style.setProperty("--x",e.clientX+"px");
    document.body.style.setProperty("--y",e.clientY+"px");

    
    
});
function enableSound(){
    const vid = document.querySelector(".bg-video");
    
  
 vid.muted = !vid.muted;
  vid.play();
}