define(function(require, exports, module) {
	var wordsData = "A,B,C,D,E,F,G,H,I,G,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z"
			.split(/,/);
	var branchesData = [{
		title : "三星（SAMSUNG）",
		image : "http://img30.360buyimg.com/popshop/g14/M02/09/10/rBEhVlK6tsAIAAAAAAAGeOE5oTkAAHWXwJlZxkAAAaQ741.png"
	}, {
		title : "华为（HUAWEI）",
		image : "http://img30.360buyimg.com/popshop/g13/M01/0E/07/rBEhU1K6o7kIAAAAAAAG7D3lIT8AAHPkgP_-J4AAAdi242.png"
	}];
	var prices = ["0-199", "200-499", "500-899", "900-1599", "1600-2900",
			"3000-4399", "4000以上"];
	var webs = ["联通3G（WCDMA）", "", "移动3G（TD-SCDMA）", "电信3G（CDMA2000）",
			"联通4G（TD-LTE）", "双模（电信＋移动/联通2G）", "3G全网通"];
	var comments = ["配置高", "待机时长", "反应快", "照相不错", "外观不错", "系统流畅", "后盖漂亮"];
	var UserSearchUI = function() {
		this.initHTML();
		this.initListener();
	}
	UserSearchUI.prototype.initHTML = function() {
		var counter = 0;
		/** 初始化检索条件* */
		for (var index in wordsData) {
			$("div.search-tabs>ul").append('<li>' + wordsData[index]
					+ '<b></b></li>');
		}
		$("div.search-tabs>ul").append('<li>其他<b></b></li>');
		/** 初始化品牌数据* */
		while (counter < 15) {
			for (index in branchesData) {
				$("div.tabcon.show-logo").append('<div class="s-brand-infor '
						+ (counter > 7 ? 'hide' : "") + '"><a title="'
						+ branchesData[index].title + '">' + '<img src="'
						+ branchesData[index].image + '">'
						+ branchesData[index].title + '</a></div>');
			}
			counter++;
		}
		/** 初始化价格信息*** */
		for (index in prices) {
			$("div.prop-attrs.price ul.f-list").append("<li><a>"
					+ prices[index] + "</a></li>");
		}
		/** 初始化运营商信息*** */
		for (index in webs) {
			$("div.prop-attrs.webs ul.f-list").append('<li class="'
					+ (index > 4 ? 'hide' : "") + '"><a>' + webs[index]
					+ "</a></li>");
		}
		/** *初始化大家说* */
		for (index in comments) {
			$("div.prop-attrs.comments ul.f-list").append('<li class="'
					+ (index > 4 ? 'hide' : "") + '"><a>' + comments[index]
					+ "</a></li>").parents(".comments").addClass("hide");
		}
	}
	UserSearchUI.prototype.initListener = function() {
		// 底部更多类型按钮
		$("div.more-btns>.attr-extra").on("click", function() {
			if ($(this).hasClass("attr-extra-up")) {
				$(".search-filter").find("div.prop-attrs[content-data=hide]")
						.removeAttr("content-data").addClass("hide");

				$(this).removeClass("attr-extra-up").html("更多选项（大家说）");
			} else {
				$(".search-filter").find("div.prop-attrs.hide").attr(
						"content-data", "hide").removeClass("hide");

				$(this).addClass("attr-extra-up").html("收起");
			}

		});
		// 更多按钮
		$("div.prop-attrs span.o-more").on("click", function() {
			if ($(this).hasClass("attr-extra-up")) {
				$(this).parents(".prop-attrs").find("*[content-data=hide]")
						.removeAttr("content-data").addClass("hide");
				$(this).removeClass("attr-extra-up").html("更多");
			} else {
				$(this).parents(".prop-attrs").find(".hide").attr(
						"content-data", "hide").removeClass("hide");
				$(this).addClass("attr-extra-up").html("收起");
			}
		});
		// 多选按钮
		$("div.prop-attrs span.o-multiple").on("click", function() {
			$(this).parents(".search-option").hide();
			$(this).parents(".prop-attrs").find("li>a").on("click", function() {
				$(this).toggleClass("select");
				if ($(this).parents(".prop-attrs").find("a.select").length > 0) {
					$(this).parents(".prop-attrs").find("div.v-btns>a.btn-red")
							.removeClass("disabled");
				} else {
					$(this).parents(".prop-attrs").find("div.v-btns>a.btn-red")
							.addClass("disabled");
				}
			})
			$(this).parents(".prop-attrs").addClass("multiple-eidting")
					.find(".hide").attr("content-data", "hide")
					.removeClass("hide").end().find(".v-btns").show();
		});
		// 确定和取消按钮
		$("div.prop-attrs div.v-btns>a").on("click", function() {
			if (!$(this).hasClass("disabled")) {
				$(this).parents(".prop-attrs").find(".search-option").show();
				$(this).parents(".prop-attrs").find("li>a").unbind("click");
				$(this).parents(".prop-attrs").removeClass("multiple-eidting")
						.find("*[content-data=hide]")
						.removeAttr("content-data").addClass("hide").end()
						.find(".v-btns").hide();

			}

		});
	}
	UI = {};
	UI.run = function() {
		new UserSearchUI();
	}
	module.exports = UI;
});