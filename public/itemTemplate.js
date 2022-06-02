(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['items'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"person\">\n    <div class=\"item-id\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"itemid") || (depth0 != null ? lookupProperty(depth0,"itemid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemid","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":18}}}) : helper)))
    + "\n    </div>\n    <div class=\"item-title\">\n        "
    + alias4(((helper = (helper = lookupProperty(helpers,"itemtl") || (depth0 != null ? lookupProperty(depth0,"itemtl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemtl","hash":{},"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":18}}}) : helper)))
    + "\n    </div>\n    <div class=\"item-desc\">\n       <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":9,"column":10},"end":{"line":9,"column":18}}}) : helper)))
    + "\n    </div>\n    <div class=\"item-price\">\n       <p>"
    + alias4(((helper = (helper = lookupProperty(helpers, "price") || (depth0 != null ? lookupProperty(depth0, "price") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "price", "hash": {}, "data": data, "loc": { "start": { "line": 12, "column": 10 }, "end": { "line": 12, "column": 18}}}) : helper)))
    + "</p>\n    </div>\n</section>";
},"useData":true});
})();