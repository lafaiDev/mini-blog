(function(d,k,l,h){d.widget("ui.triggeredAutocomplete",d.extend(!0,{},d.ui.autocomplete.prototype,{options:{trigger:"@",allowDuplicates:!0,maxLength:0},_create:function(){var a=this;this.id_map={};this.stopLength=this.stopIndex=-1;this.contents="";this.cursorPos=0;this.element.bind("keydown.autocomplete.fix",function(b){switch(b.keyCode){case d.ui.keyCode.ESCAPE:a.close(b);b.stopImmediatePropagation();break;case d.ui.keyCode.UP:case d.ui.keyCode.DOWN:a.menu.element.is(":visible")||b.stopImmediatePropagation()}});
var c=this.element.attr("id_map");c&&(this.id_map=jQuery.parseJSON(c));this.ac=d.ui.autocomplete.prototype;this.ac._create.apply(this,arguments);this.updateHidden();this.options.select=function(b,e){var f=a.contents,c=a.cursorPos,d=f.substring(c,f.length),f=f.substring(0,c),f=f.substring(0,f.lastIndexOf(a.options.trigger)),c=a.element.scrollTop();this.value=f+a.options.trigger+e.item.label+" "+d;a.element.scrollTop(c);a.id_map[e.item.label]=e.item.value;a.updateHidden();d=f.length+a.options.trigger.length+
e.item.label.length+2;this.createTextRange?(f=this.createTextRange(),f.move("character",d),f.select()):this.setSelectionRange&&this.setSelectionRange(d,d);return!1};this.options.focus=function(a,c){return!1};this.menu.options.blur=function(a,c){return!1};this.element.focus(function(){a.updateHidden()});this.element.change(function(){a.updateHidden()})},_renderItem:function(a,c){return c.img!=h?d("<li></li>").data("item.autocomplete",c).append("<a><img src='"+c.img+"' /><span>"+c.label+"</span></a>").appendTo(a):
d("<li></li>").data("item.autocomplete",c).append(d("<a></a>").text(c.label)).appendTo(a)},_move:function(a,c){if(this.menu.element.is(":visible"))if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a))this.menu.deactivate();else this.menu[a](c);else this.search(null,c)},search:function(a,c){var b=this.element.val(),e=this.getCursor();this.contents=b;this.cursorPos=e;var d=b.substring(b.lastIndexOf(this.options.trigger)-1,e),g=new RegExp("\\B\\"+this.options.trigger+"([\\w\\-]+)");
if(0<=b.indexOf(this.options.trigger)&&d.match(g)){b=b.substring(0,e);e=b.substring(b.lastIndexOf(this.options.trigger)+1,b.length);this.stopIndex==b.lastIndexOf(this.options.trigger)&&e.length>this.stopLength&&(e="");if(0<e.length&&(!this.options.maxLength||e.length<=this.options.maxLength))return this.updateHidden(),this._search(e);this.close()}},_initSource:function(){var a=this,c,b;d.isArray(this.options.source)?(c=this.options.source,this.source=function(a,b){b(d.ui.autocomplete.filter(c,a.term))}):
"string"===typeof this.options.source?(b=this.options.source,this.source=function(c,f){a.xhr&&a.xhr.abort();a.xhr=d.ajax({url:b,data:c,dataType:"json",success:function(b){null!=b?(f(d.map(b,function(b){label="string"===typeof b?b:b.label;if(!a.id_map[label]||a.options.allowDuplicates)return b})),a.stopLength=-1,a.stopIndex=-1):(a.stopLength=c.term.length,a.stopIndex=a.contents.lastIndexOf(a.options.trigger),a.close())}})}):this.source=this.options.source},destroy:function(){d.Widget.prototype.destroy.call(this)},
getCursor:function(){var a=this.element[0];if(a.selectionStart)return a.selectionStart;if(a.ownerDocument.selection){var c=a.ownerDocument.selection.createRange();if(!c)return 0;var a=a.createTextRange(),b=a.duplicate();a.moveToBookmark(c.getBookmark());b.setEndPoint("EndToStart",a);return b.text.length}},updateHidden:function(){var a=this.options.trigger,c=this.element.scrollTop(),b=this.element.val(),e;for(e in this.id_map){var f=a+e,f=f.replace(/[^a-zA-Z 0-9@]+/g,"\\$&"),g=b,b=b.replace(new RegExp(f,
"g"),a+"["+this.id_map[e]+"]");g==b&&delete this.id_map[e]}d(this.options.hidden).val(b);this.element.scrollTop(c)}}))})(jQuery,window,document);