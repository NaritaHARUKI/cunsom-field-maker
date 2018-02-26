'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnitGroup = function (_Base) {
  (0, _inherits3.default)(UnitGroup, _Base);

  function UnitGroup(props) {
    (0, _classCallCheck3.default)(this, UnitGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UnitGroup.__proto__ || (0, _getPrototypeOf2.default)(UnitGroup)).call(this, props));

    _this.state = {
      type: "text",
      title: "",
      name: "",
      tooltip: "",
      alert: "",
      duplicatedField: "",
      path: "path",
      converter: "",
      normal: "size",
      resize: "true",
      option: [{
        value: "",
        label: ""
      }],
      validator: [{
        option: "",
        value: "",
        message: ""
      }],
      optionFormat: "pref",
      unitGroupTitle: '',
      unitGroupName: '',
      openValidator: false,
      openConverter: false,
      groupAlert: false,
      openGroup: false
    };
    return _this;
  }

  (0, _createClass3.default)(UnitGroup, [{
    key: 'showGroup',
    value: function showGroup() {
      var actions = this.props.actions;
      var _state = this.state,
          unitGroupName = _state.unitGroupName,
          unitGroupTitle = _state.unitGroupTitle;

      if (!unitGroupName) {
        this.setState({
          groupAlert: true
        });
      } else {
        this.setState({
          groupAlert: false,
          duplicatedField: false,
          openGroup: true
        });
        actions.setUnitGroupTitleName({
          unitGroupTitle: unitGroupTitle, unitGroupName: unitGroupName
        });
      }
    }
  }, {
    key: 'addGroup',
    value: function addGroup() {
      var actions = this.props.actions;
      var _state2 = this.state,
          type = _state2.type,
          title = _state2.title,
          name = _state2.name,
          unitGroupName = _state2.unitGroupName;

      if (name == unitGroupName) {
        this.setState({
          duplicatedField: true
        });
        return;
      }
      if (type && title && name) {
        actions.addUnitGroupItem(this.state);
      } else {
        this.setState({
          alert: true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state3 = this.state,
          groupAlert = _state3.groupAlert,
          duplicatedField = _state3.duplicatedField,
          openGroup = _state3.openGroup,
          unitGroupTitle = _state3.unitGroupTitle,
          unitGroupName = _state3.unitGroupName,
          type = _state3.type,
          title = _state3.title,
          name = _state3.name,
          tooltip = _state3.tooltip;

      return _react2.default.createElement(
        'div',
        null,
        groupAlert && _react2.default.createElement(
          'p',
          { className: 'acms-admin-alert acms-admin-alert-danger' },
          _react2.default.createElement(
            'button',
            { className: 'js-acms-alert-close', 'data-action': 'removeGroupAlert' },
            '\xD7'
          ),
          'group\u540D\u3092\u5165\u529B\u3057\u306A\u3044\u3068group\u3092\u751F\u6210\u3067\u304D\u307E\u305B\u3093\u3002'
        ),
        duplicatedField && _react2.default.createElement(
          'p',
          { className: 'acms-admin-alert acms-admin-alert-danger' },
          _react2.default.createElement(
            'button',
            { className: 'js-acms-alert-close', 'data-action': 'removeGroupAlert' },
            '\xD7'
          ),
          'group\u540D\u3068\u30D5\u30A3\u30FC\u30EB\u30C9\u540D\u3092\u540C\u3058\u5024\u306B\u3059\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002'
        ),
        _react2.default.createElement(
          'h2',
          { className: 'acms-admin-admin-title2' },
          '\u30AB\u30B9\u30BF\u30E0\u30E6\u30CB\u30C3\u30C8\uFF08\u30D5\u30A3\u30FC\u30EB\u30C9\u30B0\u30EB\u30FC\u30D7\uFF09'
        ),
        _react2.default.createElement(
          'div',
          { className: 'acms-admin-filter' },
          _react2.default.createElement(
            'table',
            { className: 'adminTable acms-admin-table-admin-edit customFieldBasicTable customFieldBasicTableGroup' },
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { className: 'acms-admin-table-left' },
                '\u30B0\u30EB\u30FC\u30D7\u306E\u30BF\u30A4\u30C8\u30EB',
                _react2.default.createElement('i', { className: 'acms-admin-icon-tooltip', 'data-tip': true, 'data-for': 'unit-group-title-tip' }),
                _react2.default.createElement(
                  _reactTooltip2.default,
                  { id: 'unit-group-title-tip', place: 'top', type: 'dark', effect: 'solid', className: 'acms-admin-tooltip acms-tooltip customFieldTooltip' },
                  _react2.default.createElement(
                    'span',
                    null,
                    '\u30D5\u30A3\u30FC\u30EB\u30C9\u30B0\u30EB\u30FC\u30D7\u306E\u30C6\u30FC\u30D6\u30EB\u7528\u306E\u30BF\u30A4\u30C8\u30EB\u3068\u306A\u308A\u307E\u3059\u3002'
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'acms-admin-label acms-admin-label-danger' },
                  '\u5FC5\u9808'
                )
              ),
              _react2.default.createElement(
                'th',
                { className: 'acms-admin-table-left', colspan: '2' },
                '\u30D5\u30A3\u30FC\u30EB\u30C9\u540D\uFF08\u5909\u6570\uFF09',
                _react2.default.createElement('i', { className: 'acms-admin-icon-tooltip', 'data-tip': true, 'data-for': 'unit-group-field-tip' }),
                _react2.default.createElement(
                  _reactTooltip2.default,
                  { id: 'unit-group-field-tip', place: 'top', type: 'dark', effect: 'solid', className: 'acms-admin-tooltip acms-tooltip customFieldTooltip' },
                  _react2.default.createElement(
                    'span',
                    null,
                    '\u30D5\u30A3\u30FC\u30EB\u30C9\u30B0\u30EB\u30FC\u30D7\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u540D\u3067\u3059\u3002\u5024\u3092\u5FC5\u305A\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'acms-admin-label acms-admin-label-danger' },
                  '\u5FC5\u9808'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'text', value: unitGroupTitle, onInput: function onInput(e) {
                    _this2.updateState('unitGroupTitle', e.target.value);
                  }, className: 'acms-admin-form-width-full', placeholder: '\u4F8B\uFF09\u30B9\u30BF\u30C3\u30D5\u30EA\u30B9\u30C8' })
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'text', value: unitGroupName, onInput: function onInput(e) {
                    _this2.updateState('unitGroupName', e.target.value);
                  }, className: 'acms-admin-form-width-full', placeholder: '\u4F8B\uFF09group_staff' })
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { colspan: '2' },
                openGroup ? _react2.default.createElement(
                  'button',
                  { className: 'acms-admin-btn acms-admin-btn-primary acms-admin-btn-disabled customFieldGroupBtn', disabled: true },
                  '\u30B0\u30EB\u30FC\u30D7\u751F\u6210'
                ) : _react2.default.createElement(
                  'button',
                  { className: 'acms-admin-btn acms-admin-btn-primary customFieldGroupBtn', onClick: this.showGroup.bind(this) },
                  '\u30B0\u30EB\u30FC\u30D7\u751F\u6210'
                )
              )
            )
          ),
          openGroup && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('div', { className: 'customFieldLine' }),
            this.renderModal(),
            this.renderBasic(),
            _react2.default.createElement('div', { className: 'customFieldLine' }),
            type === 'select' && _react2.default.createElement(
              'div',
              null,
              this.renderSnippet(),
              this.renderOption()
            ),
            type === 'radio' && _react2.default.createElement(
              'div',
              null,
              this.renderSnippet(),
              this.renderOption()
            ),
            type === 'image' && _react2.default.createElement(
              'div',
              null,
              this.renderImage(),
              this.renderImageResize()
            ),
            type === 'file' && _react2.default.createElement(
              'div',
              null,
              this.renderFile()
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'button',
                { onClick: this.clearValue.bind(this), className: 'acms-admin-btn-admin', style: { marginRight: '5px' } },
                '\u30AF\u30EA\u30A2'
              ),
              _react2.default.createElement(
                'button',
                { onClick: this.addGroup.bind(this), className: 'acms-admin-btn-admin acms-admin-btn-admin-primary' },
                '\u751F\u6210'
              )
            )
          )
        )
      );
    }
  }]);
  return UnitGroup;
}(_base2.default);

exports.default = UnitGroup;