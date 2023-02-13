import xjs from 'xml-js';

export function c2json(xml:any){
  var res = xjs.xml2json(xml,{compact:true,spaces:2});
  return res
}

export function filterFloat(value:string){
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
    .test(value))
  return Number(value);
  return NaN
}

export function calcCoords(size:undefined|number,x:number,y:number){
  var newX=null
  var newY=null
  if(x!=null&&y!=null){
    newX=(x/(size/2))*375
    newY=((y/(size/2))*375)*(-1)
  }
  return {x:newX,y:newY}
}

export function formatTime(oldTime:number){
  var Hours=0;
  oldTime=Math.floor(Number(oldTime));
  if(oldTime>=60){
    var Hours=Math.floor(Number(oldTime)/60);
    var Minutes=(Number(oldTime)-(Hours*60));
  }else{
    Minutes=Number(oldTime)
  }
  if(Hours>=24){
    var Days=Math.floor(Number(Hours)/24);
    var Hours=(Hours-(Days*24));
  }
  return (Days>0?Days+'d ':'')+(Hours>0?Hours+'h ':'')+(Minutes>0?Minutes+'m':'')
}

export function formatNumber(number:number,digits:number,icon:string){
  var n=Number(number)
  return n.toLocaleString(undefined,{minimumFractionDigits:digits})+icon;
}

export default {
  c2json, filterFloat, calcCoords, formatTime, formatNumber
}