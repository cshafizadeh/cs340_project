(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['orders'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <section class=\"orders\">\n    <div class=\"order-number\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"ordernum") || (depth0 != null ? lookupProperty(depth0,"ordernum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ordernum","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":20}}}) : helper)))
    + "\n    </div>\n    <div class=\"order-date\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"orderdt") || (depth0 != null ? lookupProperty(depth0,"orderdt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"orderdt","hash":{},"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":19}}}) : helper)))
    + "\n    </div>\n    <div class=\"price\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"price") || (depth0 != null ? lookupProperty(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":9,"column":17}}}) : helper)))
    + "\n    </div>\n    <div class=\"items\">\n        <a href=\"/items\">Items</a>\n    </div>\n    <div class=\"delete\">\n        <button id=\"delete-order\">Delete</button>\n    </div>\n</section>";
},"useData":true});
})();