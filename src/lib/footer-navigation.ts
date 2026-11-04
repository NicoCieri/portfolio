// Cross-document language links must restore the footer before hydration/paint.
// A React effect would run after the new page can already show its hero.
export const footerNavigationStart = `
if(location.hash==="#site-footer"){
  document.documentElement.style.scrollBehavior="auto";
  document.documentElement.style.visibility="hidden";
}
`;

export const footerNavigationRestore = `
if(location.hash==="#site-footer"){
  var restoreFooter=function(){
    var footer=document.getElementById("site-footer");
    if(footer)footer.scrollIntoView({behavior:"instant",block:"end"});
    document.documentElement.style.removeProperty("visibility");
  };
  restoreFooter();
  window.addEventListener("load",function(){
    requestAnimationFrame(function(){
      restoreFooter();
      document.documentElement.style.removeProperty("scroll-behavior");
    });
  },{once:true});
}
`;
