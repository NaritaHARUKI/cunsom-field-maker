"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var ConditionalWrap = function ConditionalWrap(_ref) {
  var condition = _ref.condition,
      wrap = _ref.wrap,
      children = _ref.children;
  return condition ? wrap(children) : children;
};

var FieldSource =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(FieldSource, _Component);

  function FieldSource(props) {
    (0, _classCallCheck2["default"])(this, FieldSource);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FieldSource).call(this, props));
  }

  (0, _createClass2["default"])(FieldSource, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (window.ACMS && ACMS.dispatchEvent) {
        ACMS.dispatchEvent('acmsCustomFieldMakerPreview', this.table, {
          item: this.table
        });
      }
    }
  }, {
    key: "renderValidator",
    value: function renderValidator(item, acmscss) {
      var _this$props = this.props,
          preview = _this$props.preview,
          jsValidator = _this$props.jsValidator;

      if (!item.openValidator) {
        return null;
      }

      var name = item.type === 'file' || item.type === 'image' ? "".concat(item.name, "@path") : item.name;
      return _react["default"].createElement(_react.Fragment, null, item.validator.map(function (validator) {
        if (!validator.option) {
          return null;
        }

        return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("input", {
          type: "hidden",
          name: "".concat(name, ":v#").concat(validator.option),
          value: validator.value,
          id: "".concat(name, "-v-").concat(validator.option)
        }), !jsValidator && _react["default"].createElement(_react.Fragment, null, validator.message && _react["default"].createElement(_react.Fragment, null, preview ? null : "<!-- BEGIN ".concat(name, ":validator#").concat(validator.option, " -->"), _react["default"].createElement("p", {
          className: (0, _classnames["default"])({
            'acms-admin-text-error': acmscss
          })
        }, validator.message), preview ? null : "<!-- END ".concat(name, ":validator#").concat(validator.option, " -->"))), jsValidator && _react["default"].createElement("div", {
          "data-validator-label": "".concat(name, "-v-").concat(validator.option),
          className: "validator-result-{".concat(name, ":v#").concat(validator.option, "}")
        }, _react["default"].createElement("p", {
          className: "error-text"
        }, _react["default"].createElement("span", {
          className: "acms-icon acms-icon-attension"
        }), validator.message)));
      }), item.converter && _react["default"].createElement("input", {
        type: "hidden",
        name: "".concat(name, ":c"),
        value: item.converter
      }));
    }
  }, {
    key: "renderNoSearch",
    value: function renderNoSearch(item) {
      if (!item.noSearch) {
        return null;
      }

      return _react["default"].createElement("input", {
        type: "hidden",
        name: "".concat(item.name, ":search"),
        value: "0"
      });
    }
  }, {
    key: "renderTh",
    value: function renderTh(item) {
      var jsValidator = this.props.jsValidator;
      return _react["default"].createElement("th", null, item.title, item.tooltip && _react["default"].createElement("i", {
        className: "acms-admin-icon-tooltip js-acms-tooltip",
        "data-acms-tooltip": item.tooltip
      }), jsValidator && _react["default"].createElement("label", {
        className: "valid-mark",
        "data-validator": item.name
      }, _react["default"].createElement("span", {
        className: "acms-admin-icon acms-admin-icon-checklist"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props2 = this.props,
          acmscss = _this$props2.acmscss,
          customfield = _this$props2.customfield,
          preview = _this$props2.preview,
          jsValidator = _this$props2.jsValidator;
      return _react["default"].createElement(_react.Fragment, null, jsValidator && '<!-- <form action="" method="post" class="js-validator" enctype="multipart/form-data"> -->', _react["default"].createElement("table", {
        className: (0, _classnames["default"])({
          'acms-admin-table-admin-edit': acmscss
        }),
        ref: function ref(table) {
          return _this.table = table;
        }
      }, customfield.map(function (item, index) {
        if (item.type === 'text') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item, acmscss, jsValidator), _react["default"].createElement("td", null, _react["default"].createElement("input", (0, _extends2["default"])({
            type: "text",
            name: item.name,
            value: "{".concat(item.name, "}"),
            className: (0, _classnames["default"])({
              'acms-admin-form-width-full': acmscss
            })
          }, jsValidator ? {
            'data-validator': item.name
          } : {})), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _this.renderValidator(item, acmscss), _this.renderNoSearch(item)));
        } else if (item.type === 'textarea') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item, acmscss), _react["default"].createElement("td", null, _react["default"].createElement("textarea", (0, _extends2["default"])({
            name: item.name,
            className: (0, _classnames["default"])({
              'acms-admin-form-width-full': acmscss
            })
          }, jsValidator ? {
            'data-validator': item.name
          } : {}), "{".concat(item.name, "}")), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _this.renderValidator(item, acmscss), _this.renderNoSearch(item, acmscss)));
        } else if (item.type === 'lite-editor') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item, acmscss), _react["default"].createElement("td", null, _react["default"].createElement("textarea", (0, _extends2["default"])({
            name: item.name,
            className: (0, _classnames["default"])('js-lite-editor-field', {
              'acms-admin-form-width-full': acmscss
            })
          }, jsValidator ? {
            'data-validator': item.name
          } : {}), "{".concat(item.name, "}")), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _this.renderValidator(item, acmscss), _this.renderNoSearch(item, acmscss)));
        } else if (item.type === 'rich-editor') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item, acmscss), _react["default"].createElement("td", null, _react["default"].createElement(ConditionalWrap, {
            condition: item.useExpand,
            wrap: function wrap(children) {
              return _react["default"].createElement("div", {
                className: "js-expand js-acms-expand"
              }, _react["default"].createElement("div", {
                className: "js-acms-expand-inner"
              }, _react["default"].createElement("button", {
                className: "js-expand-btn js-acms-expand-btn",
                type: "button"
              }, _react["default"].createElement("i", {
                className: "acms-admin-icon acms-admin-icon-expand-arrow js-expand-icon"
              })), children));
            }
          }, _react["default"].createElement("div", {
            className: "js-smartblock",
            "data-heading-start": item.startHeadingLevel,
            "data-heading-end": item.endHeadingLevel
          }, _react["default"].createElement("div", {
            className: "js-smartblock-edit"
          }), _react["default"].createElement("input", {
            className: "js-smartblock-body",
            type: "hidden",
            name: item.name,
            value: "{".concat(item.name, "@html}")
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, ":extension"),
            value: "rich-editor"
          })))));
        } else if (item.type === 'table') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item, acmscss), _react["default"].createElement("td", null, _react["default"].createElement("div", {
            className: "js-editable-table-field"
          }, _react["default"].createElement("div", {
            className: "js-editable-table"
          }, preview ? null : "<!-- BEGIN_IF [{".concat(item.name, "}[delnl]/nem] -->\n"), preview ? null : "{".concat(item.name, "}[raw]"), preview ? null : '<!-- ELSE -->', _react["default"].createElement("table", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", null, "\u30B5\u30F3\u30D7\u30EB"), _react["default"].createElement("th", null, "\u30B5\u30F3\u30D7\u30EB")), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "\u30B5\u30F3\u30D7\u30EB"), _react["default"].createElement("td", null, "\u30B5\u30F3\u30D7\u30EB"))), preview ? null : '<!-- END_IF -->', _react["default"].createElement("input", {
            type: "hidden",
            className: "js-editable-table-dest",
            value: "{".concat(item.name, "}"),
            name: item.name
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          })))));
        } else if (item.type === 'select') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item, acmscss), _react["default"].createElement("td", null, _react["default"].createElement("select", {
            name: item.name,
            className: (0, _classnames["default"])({
              'acms-admin-form-width-full': acmscss
            })
          }, _react["default"].createElement("option", {
            value: ""
          }), item.option.map(function (option) {
            if (!option.label) {
              return null;
            }

            return _react["default"].createElement("option", {
              value: option.value,
              "data-tmp": "{".concat(item.name, ":selected#").concat(option.value, "}")
            }, option.label);
          })), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _this.renderValidator(item, acmscss), _this.renderNoSearch(item, acmscss)));
        } else if (item.type === 'radio') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item), _react["default"].createElement("td", null, item.option.map(function (option) {
            if (!option.label) {
              return null;
            }

            return _react["default"].createElement("div", {
              className: (0, _classnames["default"])({
                'acms-admin-form-radio': acmscss
              })
            }, _react["default"].createElement("input", {
              type: "radio",
              name: item.name,
              value: option.value,
              "data-tmp": "{".concat(item.name, ":checked#").concat(option.value, "}"),
              id: "input-radio-".concat(item.name, "-").concat(option.value)
            }), _react["default"].createElement("label", {
              htmlFor: "input-radio-".concat(item.name, "-").concat(option.value)
            }, _react["default"].createElement("i", {
              className: "acms-admin-ico-radio"
            }), option.label));
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _this.renderValidator(item, acmscss), _this.renderNoSearch(item, acmscss)));
        } else if (item.type === 'checkbox') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item), _react["default"].createElement("td", null, item.option.map(function (option) {
            if (!option.label) {
              return null;
            }

            return _react["default"].createElement("div", {
              className: (0, _classnames["default"])({
                'acms-admin-form-checkbox': acmscss
              })
            }, _react["default"].createElement("input", {
              type: "checkbox",
              name: "".concat(item.name, "[]"),
              value: option.value,
              "data-tmp": "{".concat(item.name, ":checked#").concat(option.value, "}"),
              id: "input-checkbox-".concat(item.name, "-").concat(option.value)
            }), _react["default"].createElement("label", {
              htmlFor: "input-checkbox-".concat(item.name, "-").concat(option.value)
            }, _react["default"].createElement("i", {
              className: "acms-admin-ico-checkbox"
            }), option.label));
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _this.renderValidator(item, acmscss), _this.renderNoSearch(item, acmscss)));
        } else if (item.type === 'image') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item), _react["default"].createElement("td", {
            className: (0, _classnames["default"])({
              'js-img_resize_cf': item.resize
            })
          }, preview ? null : "<!-- BEGIN_IF [{".concat(item.name, "@path}/nem] -->"), _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("img", {
            src: "%{ARCHIVES_DIR}{".concat(item.name, "@path}"),
            className: (0, _classnames["default"])({
              'acms-admin-img-responsive': acmscss,
              'js-img_resize_preview': item.resize
            }),
            style: item.normalSize ? {
              width: "".concat(item.normalSize, "px")
            } : null,
            alt: "{".concat(item.name, "@alt}")
          })), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@old"),
            value: "{".concat(item.name, "@path}")
          }), _react["default"].createElement("div", {
            className: (0, _classnames["default"])({
              'acms-admin-form-checkbox': acmscss
            })
          }, _react["default"].createElement("input", {
            type: "checkbox",
            name: "".concat(item.name, "@edit"),
            value: "delete",
            id: "input-checkbox-".concat(item.name, "@edit")
          }), _react["default"].createElement("label", {
            htmlFor: "input-checkbox-".concat(item.name, "@edit")
          }, acmscss && _react["default"].createElement("i", {
            className: "acms-admin-ico-checkbox"
          }), "\u524A\u9664")), preview ? null : '<!-- ELSE -->', _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("img", {
            src: "%{ARCHIVES_DIR}{".concat(item.name, "@path}"),
            className: (0, _classnames["default"])({
              'acms-admin-img-responsive': acmscss,
              'js-img_resize_preview': item.resize
            }),
            style: item.normalSize ? {
              width: "".concat(item.normalSize, "px"),
              display: 'none'
            } : {
              display: 'none'
            }
          })), preview ? null : '<!-- END_IF -->', _react["default"].createElement("input", {
            type: "file",
            name: item.name,
            size: "20",
            className: (0, _classnames["default"])({
              'js-img_resize_input': item.resize
            })
          }), _react["default"].createElement("br", null), item.alt && _react["default"].createElement(_react.Fragment, null, "\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8:", _react["default"].createElement("input", {
            type: "text",
            name: "".concat(item.name, "@alt"),
            value: "{".concat(item.name, "@alt}"),
            size: "40"
          })), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, ":extension"),
            value: "image"
          }), item.normalSize && _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@").concat(item.normal),
            value: item.normalSize
          }), item.tiny && _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@").concat(item.tiny),
            value: item.tinySize
          }), item.large && _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@").concat(item.large),
            value: item.largeSize
          }), item.square && _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@").concat(item.square),
            value: item.squareSize
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@filename"),
            value: ""
          }), _this.renderValidator(item, acmscss), _this.renderNoSearch(item, acmscss)));
        } else if (item.type === 'media') {
          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item), _react["default"].createElement("td", {
            className: "js-media-field"
          }, !item.useDropArea && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", null, "<!-- BEGIN_IF [{".concat(item.name, "@thumbnail}/nem] -->"), _react["default"].createElement(ConditionalWrap, {
            condition: item.mediaType === 'file',
            wrap: function wrap(children) {
              return _react["default"].createElement("a", {
                href: "%{MEDIA_ARCHIVES_DIR}{".concat(item.name, "@path}")
              }, children);
            }
          }, _react["default"].createElement("img", (0, _extends2["default"])({
            src: "{".concat(item.name, "@thumbnail}"),
            className: (0, _classnames["default"])('js-preview', {
              'acms-admin-img-responsive': acmscss
            }),
            alt: "",
            id: "".concat(item.name, "-preview")
          }, item.mediaType === 'file' && {
            style: {
              width: '64px',
              height: 'auto'
            }
          }))), '<!-- ELSE -->', _react["default"].createElement("img", (0, _extends2["default"])({
            src: ""
          }, item.mediaType === 'file' ? {
            style: {
              width: '64px',
              height: 'auto',
              display: 'none'
            }
          } : {
            style: {
              display: 'none'
            }
          }, {
            className: (0, _classnames["default"])('js-preview', {
              'acms-admin-img-responsive': acmscss
            }),
            id: "".concat(item.name, "-preview")
          })), '<!-- END_IF -->', _react["default"].createElement("p", {
            className: "js-text acms-admin-text-danger",
            style: {
              display: 'none'
            }
          }, "\u8A31\u53EF\u3055\u308C\u3066\u3044\u306A\u3044\u30D5\u30A1\u30A4\u30EB\u306E\u305F\u3081\u633F\u5165\u3067\u304D\u307E\u305B\u3093\u3002")), _react["default"].createElement("div", {
            className: "acms-admin-margin-top-mini"
          }, _react["default"].createElement("button", {
            type: "button",
            className: (0, _classnames["default"])('js-insert', {
              'acms-admin-btn': acmscss
            }),
            "data-type": item.mediaType ? item.mediaType : 'all'
          }, "\u30E1\u30C7\u30A3\u30A2\u3092\u9078\u629E"), _react["default"].createElement("button", {
            type: "button",
            className: (0, _classnames["default"])('js-insert', {
              'acms-admin-btn': acmscss
            }),
            "data-type": item.mediaType ? item.mediaType : 'all',
            "data-mode": "upload"
          }, "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9"), _react["default"].createElement("button", {
            type: "button",
            className: (0, _classnames["default"])('js-edit', {
              'acms-admin-btn': acmscss
            })
          }, "\u30E1\u30C7\u30A3\u30A2\u3092\u7DE8\u96C6"), _react["default"].createElement("button", {
            type: "button",
            className: (0, _classnames["default"])('js-remove', {
              'acms-admin-btn acms-admin-btn-danger': acmscss
            })
          }, "\u524A\u9664"))), item.useDropArea && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", {
            className: "js-droparea",
            "data-thumbnail": "{".concat(item.name, "@thumbnail}"),
            "data-type": item.mediaType ? item.mediaType : 'all',
            "data-thumbnail-type": "{".concat(item.name, "@type}"),
            "data-width": "".concat(item.dropAreaWidth, "px"),
            "data-height": "".concat(item.dropAreaHeight, "px")
          }), _react["default"].createElement("p", {
            className: "js-text acms-admin-text-danger",
            style: {
              display: 'none'
            }
          }, "\u8A31\u53EF\u3055\u308C\u3066\u3044\u306A\u3044\u30D5\u30A1\u30A4\u30EB\u306E\u305F\u3081\u633F\u5165\u3067\u304D\u307E\u305B\u3093\u3002"), _react["default"].createElement("div", {
            className: "acms-admin-margin-top-mini"
          }, _react["default"].createElement("button", {
            type: "button",
            className: (0, _classnames["default"])('js-insert', {
              'acms-admin-btn': acmscss
            }),
            "data-type": item.mediaType ? item.mediaType : 'all'
          }, "\u30E1\u30C7\u30A3\u30A2\u3092\u9078\u629E"))), _react["default"].createElement("input", {
            type: "hidden",
            name: item.name,
            value: preview ? '' : "{".concat(item.name, "}"),
            className: "js-value"
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, ":extension"),
            value: "media"
          })));
        } else if (item.type === 'file') {
          var src = '/images/fileicon/';
          var alt = 'file';

          if (item.extension) {
            src += "".concat(item.extension, ".svg");
            alt += item.extension;
          } else {
            src += 'file.svg';
          }

          return _react["default"].createElement("tr", {
            key: index
          }, _this.renderTh(item, acmscss), _react["default"].createElement("td", null, preview ? null : "<!-- BEGIN ".concat(item.name, "@path:veil -->"), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@old"),
            value: "{".concat(item.name, "@path}")
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@secret"),
            value: "{".concat(item.name, "@secret}")
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@fileSize"),
            value: "{".concat(item.name, "@fileSize}")
          }), _react["default"].createElement("label", {
            htmlFor: "input-checkbox-".concat(item.name, "@edit"),
            className: (0, _classnames["default"])({
              'acms-admin-form-checkbox': acmscss
            })
          }, _react["default"].createElement("input", {
            type: "checkbox",
            name: "".concat(item.name, "@edit"),
            value: "delete",
            id: "input-checkbox-".concat(item.name, "@edit")
          }), acmscss && _react["default"].createElement("i", {
            className: "acms-admin-ico-checkbox"
          }), "\u524A\u9664"), _react["default"].createElement("a", {
            href: "%{ARCHIVES_DIR}{".concat(item.name, "@path}")
          }, _react["default"].createElement("img", {
            src: src,
            width: "64",
            height: "64",
            alt: alt
          })), preview ? null : "<!-- END ".concat(item.name, "@path:veil -->"), _react["default"].createElement("input", {
            type: "file",
            name: item.name
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "field[]",
            value: item.name
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@baseName"),
            value: "{".concat(item.name, "@baseName}")
          }), _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, ":extension"),
            value: "file"
          }), item.extension && _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@extension"),
            value: item.extension
          }), item.fileNameMethod === 'random' && item.fileName && _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@filename"),
            value: ""
          }), item.fileNameMethod === 'fix' && item.fileName && _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@filename"),
            value: "".concat(item.fileName)
          }), item.fileNameMethod === 'asis' && _react["default"].createElement("input", {
            type: "hidden",
            name: "".concat(item.name, "@filename"),
            value: "@rawfilename"
          }), _this.renderValidator(item, acmscss), _this.renderNoSearch(item, acmscss)));
        }
      })), jsValidator && '<!-- </form> -->');
    }
  }]);
  return FieldSource;
}(_react.Component);

exports["default"] = FieldSource;
FieldSource.defaultProps = {
  preview: false
};