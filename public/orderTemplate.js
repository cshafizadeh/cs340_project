(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['orders'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <section class=\"person\">\n    <div class=\"order-number\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"firstname") || (depth0 != null ? lookupProperty(depth0,"firstname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstname","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":21}}}) : helper)))
    + "\n    </div>\n    <div class=\"order-date\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"lastname") || (depth0 != null ? lookupProperty(depth0,"lastname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastname","hash":{},"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":20}}}) : helper)))
    + "\n    </div>\n    <div class=\"price\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"price") || (depth0 != null ? lookupProperty(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":9,"column":17}}}) : helper)))
    + "\n    </div>\n    <div class=\"items\">\n        <a href=\"items.html\">Items</a>\n    </div>\n</section>";
},"useData":true});
})();