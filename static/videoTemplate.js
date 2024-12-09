(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['video'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

<<<<<<< HEAD
  return "<div class=\"video-post\">\r\n    <div class=\"post-img\">\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"photoURL") || (depth0 != null ? lookupProperty(depth0,"photoURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":30}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":37},"end":{"line":3,"column":46}}}) : helper)))
    + "\">\r\n    </div>\r\n    <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":17}}}) : helper)))
    + "</h3>\r\n    <p>By: "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":6,"column":11},"end":{"line":6,"column":19}}}) : helper)))
    + "</p>\r\n    <p>Length: "
    + alias4(((helper = (helper = lookupProperty(helpers,"minutes") || (depth0 != null ? lookupProperty(depth0,"minutes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minutes","hash":{},"data":data,"loc":{"start":{"line":7,"column":15},"end":{"line":7,"column":26}}}) : helper)))
    + ":"
    + alias4(((helper = (helper = lookupProperty(helpers,"seconds") || (depth0 != null ? lookupProperty(depth0,"seconds") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"seconds","hash":{},"data":data,"loc":{"start":{"line":7,"column":27},"end":{"line":7,"column":38}}}) : helper)))
    + "</p>\r\n</div>";
=======
  return "<div class=\"video-post\">\n    <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"photoURL") || (depth0 != null ? lookupProperty(depth0,"photoURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data,"loc":{"start":{"line":2,"column":14},"end":{"line":2,"column":26}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":2,"column":33},"end":{"line":2,"column":42}}}) : helper)))
    + "\">\n    <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":17}}}) : helper)))
    + "</h3>\n    <p>By: "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":11},"end":{"line":4,"column":19}}}) : helper)))
    + "</p>\n    <p>Length: "
    + alias4(((helper = (helper = lookupProperty(helpers,"minutes") || (depth0 != null ? lookupProperty(depth0,"minutes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minutes","hash":{},"data":data,"loc":{"start":{"line":5,"column":15},"end":{"line":5,"column":26}}}) : helper)))
    + ":"
    + alias4(((helper = (helper = lookupProperty(helpers,"seconds") || (depth0 != null ? lookupProperty(depth0,"seconds") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"seconds","hash":{},"data":data,"loc":{"start":{"line":5,"column":27},"end":{"line":5,"column":38}}}) : helper)))
    + "</p>\n</div>\n";
>>>>>>> 0c6928e258d4c6875f0d1d4d2ce5a15bb32f9583
},"useData":true});
})();