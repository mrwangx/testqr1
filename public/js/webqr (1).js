// QRCODE reader Copyright 2011 Lazar Laszlo
// http://www.webqr.com

var gCtx = null;
var gCanvas = null;
var c=0;
var stype=0;
var gUM=false;
var webkit=false;
var moz=false;
var v=null;

var imghtml='<div id="qrfile"><canvas id="out-canvas" width="320" height="240"></canvas>'+
    '<div id="imghelp">drag and drop a QRCode here'+
	'<br>or select a file'+
	'<input type="file" onchange="handleFiles(this.files)"/>'+
	'</div>'+
'</div>';


function handleFiles(f)
{
    var o=[];
    for(var i =0;i<f.length;i++)
    {
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                console.log("e:"+e.target.result);
                qrcode.decode(e.target.result);
            };
        })(f[i]);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f[i]);	}
}

function read(a)
{
    var b=toUtf8(a);
    var c=getUTF8Bytes(a);
    console.log("v:"+b);
    console.log("vv:"+c);
    //var b=unescape(a);
    console.log(a);
}

function load()
{


		qrcode.callback = read;


    setimg();

}
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }

    return out;
}

function getUTF8Bytes(string) {
    var utf8codes = [];
    for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        var utf8 = unicodeFormat8(code);
        for (var j = 0; j < utf8.length; j++) {
            utf8codes.push(utf8[j]);
        }
    }
    return utf8codes;
}
function unicodeFormat8(code) {
    // 1 byte
    if (code < 128) {
        return [code];
        // 2 bytes
    } else if (code < 2048) {
        c0 = 192 + (code >> 6);
        c1 = 128 + (code & 63);
        return [c0, c1];
        // 3 bytes
    } else {
        c0 = 224 + (code >> 12);
        c1 = 128 + (code >> 6 & 63);
        c2 = 128 + (code & 63);
        return [c0, c1, c2];
    }
}
function setimg()
{
	document.getElementById("result").innerHTML="";
    document.getElementById("outdiv").innerHTML = imghtml;

}
