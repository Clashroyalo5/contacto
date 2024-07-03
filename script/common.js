
function $(id)
{
	return document.getElementById(id);
}

function $G(id)
{
	return $(id).value;
}

function $S(id, value)
{
	$(id).value = value;
}

function $W(obj)
{
	document.write(obj);
}

function $W2(obj)
{
	var p=/(^_*)|(_*$)/g;
	var dev_name=obj.replace(p,"");
	
	document.write(dev_name);
}

function $H()
{
	var msg = "";
	for (var i = 0; i < arguments.length; i++)
	{
		msg += arguments[i];
	}
	$("help_box").innerHTML = msg + "\n";
}

//added for check wan
function isNameUnsafe(compareChar)
{
	var unsafeString = "\"<>%\\^[]`\+\$\,='#&@.: \t";

	if ( unsafeString.indexOf(compareChar) == -1
		&& compareChar.charCodeAt(0) > 32
		&& compareChar.charCodeAt(0) < 123 )
	{
		return false; // found no unsafe chars, return false
	}
	else
	{
		return true;
	}
}

function isPppoeNameUnsafe(compareChar)
{
	var unsafeString = "\"\\\': \t\n";

	if ( unsafeString.indexOf(compareChar) == -1
		&& compareChar.charCodeAt(0) > 32
		&& compareChar.charCodeAt(0) < 123 )
	{
		return false; // found no unsafe chars, return false
	}
	else
	{
		return true;
	}
}

function showhide(element, sh)
{
	var status;

	if (sh == 1) {
		status = "block";
	}
	else
	{
		status = "none"
	}

	if (document.getElementById)
	{
		// standard
		document.getElementById(element).style.display = status;
	}
	else if (document.all)
	{
		// old IE
		document.all[element].style.display = status;
	}
	else if (document.layers)
	{
		// Netscape 4
		document.layers[element].display = status;
	}
}


function isValidIpAddress(address)
{
	var addrParts = address.split('.');

	if ( addrParts.length != 4 )
	{
		return false;
	}

	for (i = 0; i < 4; i++)
	{
		if (isNaN(addrParts[i]) || addrParts[i] == "")
		{
			return false;
		}
		num = parseInt(addrParts[i]);
		if ( num < 0 || num > 255 )
		{
			return false;
		}
	}
	return true;
}

function isValidIpv4Address(address)
{
	if (!isValidIpAddress(address))
	{
		return false;
	}
	
	/*var ip4 = address.split('.');
	var num = parseInt(ip4[0]);
	var num1 = parseInt(ip4[3]);
	if (num == 0 || num == 255 || num1 == 0 || num1 == 255)
	{
		return false;
	}*/
	
	return true;
}
function Ip2Num(ip)
{
	var num = 0;
	
	if (!isValidIpAddress(ip))
	{
		return num;
	}

	var ip4 = ip.split('.');
	for (var i = 0; i < 4; i++)
	{
		num = num*256 + parseInt(ip4[i]);
	}

	return num;
}

function isValidIpAddress6(address)
{
	ipParts = address.split('/');
	if (ipParts.length > 2) return false;
	if (ipParts.length == 2) {
		num = parseInt(ipParts[1]);
		if (num <= 0 || num > 128)
			return false;
	}

	addrParts = ipParts[0].split(':');
	if (addrParts.length < 3 || addrParts.length > 8)
		return false;
	for (i = 0; i < addrParts.length; i++) {
		if ( addrParts[i] != "" )
			num = parseInt(addrParts[i], 16);
		if ( i == 0 ) {
		} else if ( (i + 1) == addrParts.length) {
			if ( num == 0 || num == 1)
				return false;
		}
		if ( num != 0 )
			break;
	}
	return true;
}

function isValidName(name)
{
	var i = 0;

	for ( i = 0; i < name.length; i++ ) {
		if ( isNameUnsafe(name.charAt(i)) == true )
			return false;
	}
	return true;
}

function isValidPppoeName(name)
{
	var i = 0;

	for ( i = 0; i < name.length; i++ ) {
		if ( isPppoeNameUnsafe(name.charAt(i)) == true )
			return false;
	}
	return true;
}

function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask)
{
	var count = 0;

	lan1a = lan1Ip.split('.');
	lan1m = lan1Mask.split('.');
	lan2a = lan2Ip.split('.');
	lan2m = lan2Mask.split('.');

	for (i = 0; i < 4; i++) {
		l1a_n = parseInt(lan1a[i]);
		l1m_n = parseInt(lan1m[i]);
		l2a_n = parseInt(lan2a[i]);
		l2m_n = parseInt(lan2m[i]);
		if ((l1a_n & l1m_n) == (l2a_n & l2m_n))
			count++;
	}
	if (count == 4)
		return true;
	else
		return false;
}

function getLeftMostZeroBitPos(num)
{
	var i = 0;
	var numArr = [128, 64, 32, 16, 8, 4, 2, 1];

	for ( i = 0; i < numArr.length; i++ )
		if ( (num & numArr[i]) == 0 )
			return i;

	return numArr.length;
}

function getRightMostOneBitPos(num)
{
	var i = 0;
	var numArr = [1, 2, 4, 8, 16, 32, 64, 128];

	for ( i = 0; i < numArr.length; i++ )
		if ( ((num & numArr[i]) >> i) == 1 )
			return (numArr.length - i - 1);

	return -1;
}

function isValidSubnetMask(mask)
{
	var i = 0, num = 0;
	var zeroBitPos = 0, oneBitPos = 0;
	var zeroBitExisted = false;

	if ( mask == '0.0.0.0' )
		return false;

	maskParts = mask.split('.');
	if ( maskParts.length != 4 ) return false;

	for (i = 0; i < 4; i++) {
		if ( isNaN(maskParts[i]) == true )
			return false;
		num = parseInt(maskParts[i]);
		if ( num < 0 || num > 255 )
			return false;
		if ( zeroBitExisted == true && num != 0 )
			return false;
		zeroBitPos = getLeftMostZeroBitPos(num);
		oneBitPos = getRightMostOneBitPos(num);
		if ( zeroBitPos < oneBitPos )
			return false;
		if ( zeroBitPos < 8 )
			zeroBitExisted = true;
	}

	return true;
}

function ipverify(ip_string)
{
	var c;
	var n = 0;
	var ch = ".0123456789";
	if (ip_string.length < 7 || ip_string.length > 15)
		return false;
	for (var i = 0; i < ip_string.length; i++){
		c = ip_string.charAt(i);
		if (ch.indexOf(c) == -1)
			return false;
		else{
			if (c == '.'){
				if(ip_string.charAt(i+1) != '.')
					n++;
				else
					return false;
			}
		}
	}
	if (n != 3)
		return false;
	if (ip_string.indexOf('.') == 0 || ip_string.lastIndexOf('.') == (ip_string.length - 1))
		return false;

	szarray = [0,0,0,0];
	var remain;
	var i;
	for(i = 0; i < 3; i++){
		var n = ip_string.indexOf('.');
		szarray[i] = ip_string.substring(0,n);
		remain = ip_string.substring(n+1);
		ip_string = remain;
	}
	szarray[3] = remain;

	for(i = 0; i < 4; i++){
		if (szarray[i] < 0 || szarray[i] > 255){
			return false;
		}
	}
	return true;
}

function is_ipaddr(ip_string)
{
	if(ip_string.length == 0){
		alert("input ip please");
		return false;
	}
	if(ip_string=="0.0.0.0")
	{
		alert("ip format error, please input again");
		return false;
	}
	if(ip_string=="255.255.255.255")
	{
		alert("IP format error, please input again");
		return false;
	}
	if (!ipverify(ip_string))
	{
		alert("IP format error, please input again");
		return false;
	}
	return true;
}

function check_ipaddr(var_name)
{
	var element = document.getElementById(var_name);
	if(element)
	{
		if(!is_ipaddr(element.value))
		{
			element.focus();
			element.select();
			return false;
		}
	}
	return true;
}

function IsIpaddr(ip)
{
	var c;
	var subip = ip.split(".");

	if (4 != subip.length)
	{
		return false;
	}

	if (ip == "0.0.0.0")
	{
		return true;
	}

	if (ip.length < 7 || ip.length > 15)
	{
		return false;
	}

	for (var i = 0; i < ip.length; i++)
	{
		c = ip.charCodeAt(i);
		if (c == '.'.charCodeAt(0))
		{
			continue;
		}
		else
		{
			if (c < 0x30 || c > 0x39)
			{
				return false;
			}
		}
	}

	for (var i = 0; i < 4; i++)
	{
		if (subip[i].length == 0)
		{
			return false;
		}
		var n = parseInt(subip[i]);
		if (n < 0 || n > 255)
		{
			return false;
		}
	}

	return true;
}

function CheckIpaddr(id)
{
	var ipaddr = $(id).value;
	if (false == IsIpaddr(ipaddr))
	{
		$(id).focus();
		return false;
	}
	return true;
}

function IsPort(port)
{
	var c;

	if (port.length < 1 || port.length > 5)
	{
		return false;
	}

	for (var i = 0; i < port.length; i++)
	{
		c = port.charCodeAt(i);
		if (c < 0x30 || c > 0x39)
		{
			return false;
		}
	}

	var n = parseInt(port);
	if (n < 0 || n > 65535)
	{
		return false;
	}

	return true;
}

function CheckPort(id)
{
	var port = $(id).value;

	if (false == IsPort(port))
	{
		$(id).focus();
		return false;
	}
	return true;
}

function ChangeEnable(var_name)
{
	var element = document.getElementById(var_name);
	var element_enable = document.getElementById(var_name+"enable");
	if (element.checked==true)
	{
		element_enable.value="1";
		return true;
	}
	else
	{
		element_enable.value="0";
		return false;
	}
}
function isHexaDigit(digit) {
   var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                           "A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f");
   var len = hexVals.length;
   var i = 0;
   var ret = false;

   for ( i = 0; i < len; i++ )
      if ( digit == hexVals[i] ) break;

   if ( i < len )
      ret = true;

   return ret;
}

function isValidHexKey(val, size) {
   var ret = false;
   if (val.length == size) {
      for ( i = 0; i < val.length; i++ ) {
         if ( isHexaDigit(val.charAt(i)) == false ) {
            break;
         }
      }
      if ( i == val.length ) {
         ret = true;
      }
   }

   return ret;
}

function isBinaDigit(digit) {
   var hexVals = new Array("0", "1");
   var len = hexVals.length;
   var i = 0;
   var ret = false;

   for ( i = 0; i < len; i++ )
      if ( digit == hexVals[i] ) break;

   if ( i < len )
      ret = true;

   return ret;
}

function isValidBinKey(val, size) {
   var ret = false;
   if (val.length == size) {
      for ( i = 0; i < val.length; i++ ) {
         if ( isHexaDigit(val.charAt(i)) == false ) {
            break;
         }
      }
      if ( i == val.length ) {
         ret = true;
      }
   }

   return ret;
}

function KeyPressIP(c)
{
	var ValidString = ".0123456789";

	return (-1 != ValidString.indexOf(c))?true:false;
}

function KeyPressNUM(c)
{
	var ValidString = "0123456789";

	return (-1 != ValidString.indexOf(c))?true:false;
}

function KeyPressNegativeNUM(c)
{
	var ValidString = "-0123456789";
	
	return (-1 != ValidString.indexOf(c))?true:false;
}
function KeyPressHEX(c)
{
	var ValidString = "0123456789abcdefABCDEF";

	return (-1 != ValidString.indexOf(c))?true:false;
}

function KeyPressID(c)
{
	var InvalidString = "\"\\\': \t\n";

	return (-1 == InvalidString.indexOf(c))?true:false;
}

function KeyPressSSID(c)
{
	var InvalidString = "\"\\\'";

	return (-1 == InvalidString.indexOf(c))?true:false;
}

function KeyPressMAC(c)
{
	var ValidString = "-:0123456789abcdefABCDEF";

	return (-1 != ValidString.indexOf(c))?true:false;
}

function KeyPressPasswd(c)
{
	var InvalidString = "\"\\\' :\t\n";

	return (-1 == InvalidString.indexOf(c))?true:false;
}

function KeyPressLVM(c)
{
	var ValidString = "0123456789/;";

	return (-1 != ValidString.indexOf(c))?true:false;
}

function KeyPressURL(c)
{
	var InvalidString = "\"\' \t\n";

	return (-1 == InvalidString.indexOf(c))?true:false;
}

function KeyPressDigitmap(c)
{
	var ValidString = "0123456789-()[]{}*#Xx.T|EFtSL";

	return (-1 != ValidString.indexOf(c))?true:false;
}

function KeyPressPHONENUM(c)
{
	var ValidString = "+0123456789";
	
	return (-1 != ValidString.indexOf(c))?true:false;
}
function KeyPressICCODE(c)
{
	var ValidString = "*#0123456789";
	
	return (-1 != ValidString.indexOf(c))?true:false;
}

function KeyPressIPV6(c)
{
    var validString = "/:0123456789abcdefABCDEF";

    return (-1 != validString.indexOf(c))?true:false;
}

var X_INPUT_IP = 1;
var X_INPUT_NUM = 2;
var X_INPUT_HEX = 3;
var X_INPUT_ID = 4;
var X_INPUT_MAC = 5;
var X_INPUT_PASSWD = 6;
var X_INPUT_LVM = 7;
var X_INPUT_URL = 8;
var X_INPUT_DIGITMAP = 9;
var X_INPUT_PHONENUM = 10;
var X_INPUT_ICCODE = 11;
var X_INPUT_IPV6 = 12;
var X_INPUT_Negative_NUM = 13;
var X_INPUT_SSID = 14;

function OnKeyPress(e, type)
{
	var	k = 0;
	var	c;

	if (window.event)
	{
		k = e.keyCode;
	}
	else if (e.which)
	{
		k = e.which;
	}

	if (k == 8 || k == 0)
	{
		return true;
	}

	c = String.fromCharCode(k);

	switch (type)
	{
	case	X_INPUT_IP:
		return KeyPressIP(c);

	case	X_INPUT_NUM:
		return KeyPressNUM(c);

	case	X_INPUT_HEX:
		return KeyPressHEX(c);

	case	X_INPUT_ID:
		return KeyPressID(c);

	case	X_INPUT_MAC:
		return KeyPressMAC(c);

	case	X_INPUT_PASSWD:
		return KeyPressPasswd(c);

	case	X_INPUT_LVM:
		return KeyPressLVM(c);

	case	X_INPUT_URL:
		return KeyPressURL(c);

	case	X_INPUT_DIGITMAP:
		return KeyPressDigitmap(c);
		
	case	X_INPUT_PHONENUM:
		return KeyPressPHONENUM(c);
		
	case	X_INPUT_ICCODE:
		return KeyPressICCODE(c);
	case	X_INPUT_IPV6:
		return KeyPressIPV6(c);

	case	X_INPUT_Negative_NUM:
		return KeyPressNegativeNUM(c);
	case	X_INPUT_SSID:
		return KeyPressSSID(c);
	
	}

	return false;
}


function isValidMacAddress(address) {
   var c = '';
   var num = 0;
   var i = 0, j = 0;
   var zeros = 0;

   addrParts = address.split(':');
   if ( addrParts.length != 6 ) return false;

   for (i = 0; i < 6; i++) {
      if ( addrParts[i] == '' )
         return false;
      for ( j = 0; j < addrParts[i].length; j++ ) {
         c = addrParts[i].toLowerCase().charAt(j);
         if ( (c >= '0' && c <= '9') ||
              (c >= 'a' && c <= 'f'))
            continue;
         else
            return false;
      }

      num = parseInt(addrParts[i], 16);
      if ( num == NaN || num < 0 || num > 255 )
         return false;
      if ( num == 0 )
         zeros++;
   }
   if (zeros == 6)
      return false;

   if ( parseInt(addrParts[0], 16) & 1 )	  
          return false;

   return true;
}
function is_domain(domain)
{	
	
	var InvalidString = "\"\\\': \t\n";
	var i;
	if(domain.length==0)
	   return false;
	for(i=0;i<domain.length;i++)
	{
	  if(-1 != InvalidString.indexOf(domain.charAt(i)))
	    return false;
	}
	return true;
}

function isValidSuffix(address)
{
    var j = 0;
    if (address == "0:0:0:0" || address == "FFFF:FFFF:FFFF:FFFF"
    		|| address == "ffff:ffff:ffff:ffff")
        return false;
        
    ipParts = address.split(':');
    if (ipParts.length != 4)
    {
        return false;
    }
    else
    {  
        for(j = 0; j < 4; j++)
        {          
            if(false == isValidIpChar(ipParts[j]))
            {
                return false;
            }
        }        
    }
    return true;
}

function isValidIpChar(ipchar)
{
    var str="0123456789abcdefABCDEF";
    var i = 0;
   
    if (ipchar.length == 0 || ipchar.length > 4)
    {
        return false;
    }
    
    for(i = 0; i < ipchar.length; i++)
    {        
        if (str.indexOf(ipchar.charAt(i)) < 0)
        {
            return false;
        }    
    }    

    return true;   
}

function compareIpv6Addr(ipv6addrmin, ipv6addrmax)
{
    var ip6addr1 = ipv6addrmin.split(':');
    var ip6addr2 = ipv6addrmax.split(':');
    
    for(i = 0; i < 4; i++)
    {       
        if (parseInt(ip6addr1[i], 16) < parseInt(ip6addr2[i], 16)) 
        {
            return 1;
        }
        
        if (parseInt(ip6addr1[i], 16) > parseInt(ip6addr2[i], 16)) 
        {
            return -1;
        }
    }
    
    return 0;
}

var CanvasParticle = (function(){
	function getElementByTag(name){
		return document.getElementsByTagName(name);
	}
	function getELementById(id){
		return document.getElementById(id);
	}
	// ���ݴ����config��ʼ������
	function canvasInit(canvasConfig){
		canvasConfig = canvasConfig || {};
		var html = getElementByTag("html")[0];
		var body = getElementByTag("body")[0];
		var canvasDiv = getELementById("canvas-particle");
		var canvasObj = document.createElement("canvas");

		var canvas = {
			element: canvasObj,
			points : [],
			// Ĭ������
			config: {
				vx: canvasConfig.vx || 4,
				vy:  canvasConfig.vy || 4,
				height: canvasConfig.height || 2,
				width: canvasConfig.width || 2,
				count: canvasConfig.count || 100,
				color: canvasConfig.color || "0, 0, 255",
				stroke: canvasConfig.stroke || "130,255,255",
				dist: canvasConfig.dist || 6000,
				e_dist: canvasConfig.e_dist || 20000,
				max_conn: 10
			}
		};

		// ��ȡcontext
		if(canvas.element.getContext("2d")){
			canvas.context = canvas.element.getContext("2d");
		}else{
			return null;
		}

		body.style.padding = "0";
		body.style.margin = "0";
		// body.replaceChild(canvas.element, canvasDiv);
		body.appendChild(canvas.element);

		canvas.element.style = "position: absolute; top: 0; left: 0; z-index: -1;";
		canvasSize(canvas.element);
		window.onresize = function(){
			canvasSize(canvas.element);
		}
		body.onmousemove = function(e){
			var event = e || window.event;
			canvas.mouse = {
				x: event.clientX,
				y: event.clientY
			}
		}
		document.onmouseleave = function(){
			canvas.mouse = undefined;
		}
		setInterval(function(){
			drawPoint(canvas);
		}, 40);
	}

	// ����canvas��С
	function canvasSize(canvas){
		canvas.width = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
		canvas.height = window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight;
	}

	// ����
	function drawPoint(canvas){
		var context = canvas.context,
			point,
			dist;
		context.clearRect(0, 0, canvas.element.width, canvas.element.height);
		context.beginPath();
		context.fillStyle = "rgb("+ canvas.config.color +")";
		for(var i = 0, len = canvas.config.count; i < len; i++){
			if(canvas.points.length != canvas.config.count){
				// ��ʼ�����е�
				point = {
					x: Math.floor(Math.random() * canvas.element.width),
					y: Math.floor(Math.random() * canvas.element.height),
					vx: canvas.config.vx / 2 - Math.random() * canvas.config.vx,
					vy: canvas.config.vy / 2 - Math.random() * canvas.config.vy
				}
			}else{
				// ��������ٶȺ�λ�ã��������߽紦��
				point =	borderPoint(canvas.points[i], canvas);
			}
			context.fillRect(point.x - canvas.config.width / 2, point.y - canvas.config.height / 2, canvas.config.width, canvas.config.height);

			canvas.points[i] = point;
		}
		drawLine(context, canvas, canvas.mouse);
		context.closePath();
	}

	// �߽紦��
	function borderPoint(point, canvas){
		var p = point;
		if(point.x <= 0 || point.x >= canvas.element.width){
			p.vx = -p.vx;
			p.x += p.vx;
		}else if(point.y <= 0 || point.y >= canvas.element.height){
			p.vy = -p.vy;
			p.y += p.vy;
		}else{
			p = {
				x: p.x + p.vx,
				y: p.y + p.vy,
				vx: p.vx,
				vy: p.vy
			}
		}
		return p;
	}

	// ����
	function drawLine(context, canvas, mouse){
		context = context || canvas.context;
		for(var i = 0, len = canvas.config.count; i < len; i++){
			// ��ʼ�����������
			canvas.points[i].max_conn = 0;
			// point to point
			for(var j = 0; j < len; j++){
				if(i != j){
					dist = Math.round(canvas.points[i].x - canvas.points[j].x) * Math.round(canvas.points[i].x - canvas.points[j].x) + 
							Math.round(canvas.points[i].y - canvas.points[j].y) * Math.round(canvas.points[i].y - canvas.points[j].y);
					// �������С���������룬����С�����������������
					if(dist <= canvas.config.dist && canvas.points[i].max_conn <canvas.config.max_conn){
						canvas.points[i].max_conn++;
						// ����ԽԶ������Խϸ������Խ͸��
						context.lineWidth = 0.5 - dist / canvas.config.dist;
						context.strokeStyle = "rgba("+ canvas.config.stroke + ","+ (1 - dist / canvas.config.dist) +")"
						context.beginPath();
						context.moveTo(canvas.points[i].x, canvas.points[i].y);
						context.lineTo(canvas.points[j].x, canvas.points[j].y);
						context.stroke();

					}
				}
			}
			// ��������뻭��
			// point to mouse
			if(mouse){
				dist = Math.round(canvas.points[i].x - mouse.x) * Math.round(canvas.points[i].x - mouse.x) + 
						Math.round(canvas.points[i].y - mouse.y) * Math.round(canvas.points[i].y - mouse.y);
				// ���������������ʱ���٣�ֱ�Ӹı�point��x��yֵ�ﵽ����Ч��
				if(dist > canvas.config.dist && dist <= canvas.config.e_dist){
					canvas.points[i].x = canvas.points[i].x + (mouse.x - canvas.points[i].x) / 20;
					canvas.points[i].y = canvas.points[i].y + (mouse.y - canvas.points[i].y) / 20;
				}
				if(dist <= canvas.config.e_dist){
					context.lineWidth = 1;
					context.strokeStyle = "rgba("+ canvas.config.stroke + ","+ (1 - dist / canvas.config.e_dist) +")";
					context.beginPath();
					context.moveTo(canvas.points[i].x, canvas.points[i].y);
					context.lineTo(mouse.x, mouse.y);
					context.stroke();
				}
			}
		}
	}
	return canvasInit;
})();
