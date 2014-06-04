!function(){var BootstrapModal=function($){function hideWithTransition(){var that=this,timeout=setTimeout(function(){that.$element.off($.support.transition.end),hideModal.call(that)},500);this.$element.one($.support.transition.end,function(){clearTimeout(timeout),hideModal.call(that)})}function hideModal(that){this.$element.hide().trigger("hidden"),backdrop.call(this)}function backdrop(callback){var that=this,animate=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate;if(this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(document.body),"static"!=this.options.backdrop)this.$backdrop.click($.proxy(this.hide,this));if(doAnimate)this.$backdrop[0].offsetWidth;this.$backdrop.addClass("in"),doAnimate?this.$backdrop.one($.support.transition.end,callback):callback()}else if(!this.isShown&&this.$backdrop)this.$backdrop.removeClass("in"),$.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one($.support.transition.end,$.proxy(removeBackdrop,this)):removeBackdrop.call(this);else if(callback)callback()}function removeBackdrop(){this.$backdrop.remove(),this.$backdrop=null}function escape(){var that=this;if(this.isShown&&this.options.keyboard)$(document).on("keyup.dismiss.modal",function(e){27==e.which&&that.hide()});else if(!this.isShown)$(document).off("keyup.dismiss.modal")}var Modal=function(content,options){this.options=options,this.$element=$(content).delegate('[data-dismiss="modal"]',"click.dismiss.modal",$.proxy(this.hide,this))};Modal.prototype={constructor:Modal,toggle:function(){return this[!this.isShown?"show":"hide"]()},show:function(){var that=this;if(this.isShown)return;$("body").addClass("modal-open"),this.isShown=!0,this.$element.trigger("show"),escape.call(this),backdrop.call(this,function(){var transition=$.support.transition&&that.$element.hasClass("fade");if(!that.$element.parent().length&&that.$element.appendTo(document.body),that.$element.show(),transition)that.$element[0].offsetWidth;that.$element.addClass("in"),transition?that.$element.one($.support.transition.end,function(){that.$element.trigger("shown")}):that.$element.trigger("shown")})},hide:function(e){if(e&&e.preventDefault(),!this.isShown)return;var that=this;this.isShown=!1,$("body").removeClass("modal-open"),escape.call(this),this.$element.trigger("hide").removeClass("in"),$.support.transition&&this.$element.hasClass("fade")?hideWithTransition.call(this):hideModal.call(this)}},$.fn.modal=function(option){return this.each(function(){var $this=$(this),data=$this.data("modal"),options=$.extend({},$.fn.modal.defaults,$this.data(),"object"==typeof option&&option);if(!data)$this.data("modal",data=new Modal(this,options));if("string"==typeof option)data[option]();else if(options.show)data.show()})},$.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},$.fn.modal.Constructor=Modal,$(function(){$("body").on("click.modal.data-api",'[data-toggle="modal"]',function(e){var $this=$(this),href,$target=$($this.attr("data-target")||(href=$this.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,"")),option=$target.data("modal")?"toggle":$.extend({},$target.data(),$this.data());e.preventDefault(),$target.modal(option)})})};if("function"==typeof define&&define.amd)define(["jquery"],function($){BootstrapModal($)});else if("undefined"!=typeof window&&"undefined"==typeof ender)BootstrapModal(window.$)}();