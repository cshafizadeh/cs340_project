(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['person'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <section class=\"person\">\n    <div class=\"first-name\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"firstname") || (depth0 != null ? lookupProperty(depth0,"firstname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstname","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":21}}}) : helper)))
    + "\n    </div>\n    <div class=\"last-name\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"lastname") || (depth0 != null ? lookupProperty(depth0,"lastname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastname","hash":{},"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":20}}}) : helper)))
    + "\n    </div>\n    <div class=\"orders\">\n        <a href=\"orders.html\">Orders</a>\n    </div>\n</section>";
},"useData":true});
})();