var URCHINFIELD = "analyticsdata";
var uacct, userv, uwv, ufsc, utitle, uflash, ugifpath;

function encode64(input) {
  var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var out = "",c1,c2,c3,e1,e2,e3,e4,i = 0;
  do {
    c1 = input.charCodeAt(i++);
    c2 = input.charCodeAt(i++);
    c3 = input.charCodeAt(i++);
    e1 = c1 >> 2;
    e2 = ((c1 & 3) << 4) | (c2 >> 4);
    e3 = ((c2 & 15) << 2) | (c3 >> 6);
    e4 = c3 & 63;
    if (isNaN(c2)) {
      e3 = e4 = 64;
    } else if (isNaN(c3)) {
      e4 = 64;
    }
    out = out + k.charAt(e1) + k.charAt(e2) + k.charAt(e3) + k.charAt(e4);
  } while (i < input.length);
  return out;
}

function _uGC(l, n) {
  if (!l || l == "" || !n || n == "") return "";
  var i = l.indexOf(n);
  if (i > -1) {
    var i2 = l.indexOf(";", i);
    if (i2 < 0) {
      i2 = l.length;
    }
    var i3 = n.indexOf("=") + 1;
    return l.substring((i + i3), i2);
  }
  return "";
}

function getUrchinFieldValue() {
  var s = "__uacct=" + uacct + ";";
  s += "__userv=" + userv + ";";
  if (userv == 0 || userv == 2) {
    var i,l = document.location;
    s += "__ugifpath=" + l.protocol + "//" + l.host + ugifpath + ";";
  }
  if (typeof uwv != "undefined") s += "__uwv=" + uwv + ";";
  if (typeof ufsc != "undefined") s += "__ufsc=" + ufsc + ";";
  if (typeof utitle != "undefined") s += "__utitle=" + utitle + ";";
  if (typeof uflash != "undefined") s += "__uflash=" + uflash + ";";

  var dc = document.cookie,umcval = "";
  umcval += "__utma=" + _uGC(dc, "__utma=") + ";";
  umcval += "__utmb=" + _uGC(dc, "__utmb=") + ";";
  umcval += "__utmc=" + _uGC(dc, "__utmc=") + ";";
  umcval += "__utmz=" + _uGC(dc, "__utmz=") + ";";
  umcval += "__utmv=" + _uGC(dc, "__utmv=") + ";";
  umcval += "__utmx=" + _uGC(dc, "__utmx=") + ";";
  umcval += "__utmxx=" + _uGC(dc, "__utmxx=") + ";";
  s += "__umcval=" + escape(umcval) + ";";
  return encode64(s);
}

function getUrchinInputCode() {
  return "<input type=\"hidden\" name=\"" + URCHINFIELD + "\" value=\""
      + getUrchinFieldValue() + "\">";
}

function setUrchinInputCodeOld() {
  if (typeof uacct == "undefined") return;
  for (var i = 0; i < document.forms.length; i++) {
    if (document.forms[i].urchindata)
      document.forms[i].urchindata.value = getUrchinFieldValue();
    if (document.forms[i].analyticsdata)
      document.forms[i].analyticsdata.value = getUrchinFieldValue();
  }
}

function setUrchinInputCode(obj) {
  if (typeof _gat == "undefined") return;
  uacct = obj._getAccount();
  userv = obj._getServiceMode();
  uwv = obj._getVersion();
  ufsc = obj._getClientInfo();
  utitle = obj._getDetectTitle();
  uflash = obj._getDetectFlash();
  ugifpath = obj._getLocalGifPath();
  setUrchinInputCodeOld();
}
