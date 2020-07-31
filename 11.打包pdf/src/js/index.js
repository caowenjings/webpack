
import "../css/index.css"
import mypdf from "../pdf/my.pdf";
import myphtot from "../pdf/myphtot.pdf";

// a标签直接引入的pdf，导致wenbpack不能打包进入，则需要js动态引入再倒入

document.getElementById('mypdf').href = mypdf;
document.getElementById('myphtot').href = myphtot;