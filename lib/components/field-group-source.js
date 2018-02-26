'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldGroupSource = function (_Component) {
  (0, _inherits3.default)(FieldGroupSource, _Component);

  function FieldGroupSource(props) {
    (0, _classCallCheck3.default)(this, FieldGroupSource);
    return (0, _possibleConstructorReturn3.default)(this, (FieldGroupSource.__proto__ || (0, _getPrototypeOf2.default)(FieldGroupSource)).call(this, props));
  }

  (0, _createClass3.default)(FieldGroupSource, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          groupName = _props.groupName,
          groupTitle = _props.groupTitle,
          acmscss = _props.acmscss,
          groupitems = _props.groupitems,
          preview = _props.preview;

      var groupLength = groupitems.length;

      return _react2.default.createElement(
        _react.Fragment,
        null,
        groupTitle && _react2.default.createElement(
          'h2',
          { className: (0, _classnames2.default)({ 'acms-admin-admin-title2': acmscss }) },
          groupTitle
        ),
        groupName && _react2.default.createElement(
          'table',
          { className: (0, _classnames2.default)('js-fieldgroup-sortable', { 'adminTable acms-admin-table-admin-edit': acmscss }) },
          _react2.default.createElement(
            'thead',
            { className: (0, _classnames2.default)({ 'acms-admin-hide-sp': acmscss }) },
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { className: (0, _classnames2.default)({ 'acms-admin-table-left acms-admin-admin-config-table-item-handle': acmscss }) },
                '\xA0'
              ),
              groupitems.map(function (item) {
                return _react2.default.createElement(
                  'th',
                  { className: (0, _classnames2.default)({ 'acms-admin-table-left': acmscss }) },
                  item.title,
                  item.tooltip && _react2.default.createElement('i', { className: 'acms-admin-icon-tooltip js-acms-tooltip', 'data-acms-tooltip': '{tooltip}' })
                );
              }),
              _react2.default.createElement(
                'th',
                { className: (0, _classnames2.default)({ 'acms-admin-table-left acms-admin-admin-config-table-action': acmscss }) },
                '\u524A\u9664'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            preview ? null : '<!-- BEGIN ' + groupName + ':loop -->',
            _react2.default.createElement(
              'tr',
              { className: 'sortable-item' },
              _react2.default.createElement(
                'td',
                { className: 'item-handle' },
                acmscss && _react2.default.createElement('i', { className: 'acms-admin-icon-sort' })
              ),
              groupitems.map(function (item) {
                if (item.type === 'text') {
                  return _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'text', name: item.name + '[]', value: '{' + item.name + '}', className: (0, _classnames2.default)({ 'acms-admin-form-width-full': acmscss }) })
                  );
                } else if (item.type === 'textarea') {
                  return _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'textarea',
                      { name: item.name + '[]', className: (0, _classnames2.default)({ 'acms-admin-form-width-full': acmscss }) },
                      '{' + item.name + '}'
                    )
                  );
                } else if (item.type === 'select') {
                  return _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'select',
                      { name: item.name + '[]', className: (0, _classnames2.default)({ 'acms-admin-form-width-full': acmscss }) },
                      _react2.default.createElement('option', { value: '' }),
                      item.option.map(function (option) {
                        if (!option.label) {
                          return null;
                        }
                        return _react2.default.createElement(
                          'option',
                          { value: option.value, 'data-tmp': '{' + item.name + ':selected#' + option.value + '}' },
                          option.label
                        );
                      })
                    )
                  );
                } else if (item.type === 'radio') {
                  return _react2.default.createElement(
                    'td',
                    null,
                    item.option.map(function (option) {
                      if (!option.label) {
                        return null;
                      }
                      return _react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)({ 'acms-admin-form-radio': acmscss }) },
                        _react2.default.createElement('input', { type: 'radio', name: item.name + '[]', value: item.value, 'data-tmp': '{' + item.name + ':checked#' + option.value + '}', id: 'input-radio-' + item.name + '-' + option.value }),
                        _react2.default.createElement(
                          'label',
                          { htmlFor: 'input-radio-' + item.name + '-' + option.value },
                          acmscss && _react2.default.createElement('i', { 'class': 'acms-admin-ico-radio' }),
                          option.label
                        )
                      );
                    })
                  );
                } else if (item.type === 'file') {
                  var src = "/images/fileicon/";
                  var alt = 'file';
                  if (item.extension) {
                    src += item.extension + '.gif';
                    alt += item.extension;
                  } else {
                    src += 'file.gif';
                  }

                  return _react2.default.createElement(
                    'td',
                    null,
                    preview ? null : '<!-- BEGIN_IF [{' + item.name + '@path}/nem] -->',
                    _react2.default.createElement(
                      'div',
                      { className: (0, _classnames2.default)({ 'acms-admin-form-checkbox': acmscss }) },
                      _react2.default.createElement('input', { type: 'checkbox', name: item.name + '@edit[]', value: 'delete', id: 'input-checkbox-' + item.name + '@edit' }),
                      _react2.default.createElement(
                        'label',
                        { 'for': 'input-checkbox-{name}@edit' },
                        acmscss && _react2.default.createElement('i', { 'class': 'acms-admin-ico-checkbox' }),
                        ' \u524A\u9664'
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '%{ARCHIVES_DIR}{' + item.name + '@path}' },
                      _react2.default.createElement('img', { src: src, width: '64', height: '64', alt: alt })
                    ),
                    preview ? null : '<!-- END_IF -->',
                    _react2.default.createElement('input', { type: 'hidden', name: item.name + '@old[]', value: '{' + item.name + '@path}' }),
                    _react2.default.createElement('input', { type: 'file', name: item.name + '[]' }),
                    _react2.default.createElement('br', null),
                    preview ? null : '<!-- BEGIN alt:veil -->',
                    '\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8:',
                    _react2.default.createElement('input', { type: 'text', name: item.name + '@alt[]', value: '{' + item.name + '@alt}', size: '40' }),
                    preview ? null : '<!-- END alt:veil -->'
                  );
                } else if (item.type === 'image') {
                  var style = {};
                  if (item.normalSize) {
                    style.width = item.normalSize + 'px';
                  }
                  var hiddenStyle = (0, _assign2.default)({}, style, { 'display': 'none' });

                  return _react2.default.createElement(
                    'td',
                    { className: (0, _classnames2.default)({ 'js-img_resize_cf': item.resize }) },
                    preview ? null : '<!-- BEGIN_IF [{' + item.name + '@path}/nem] -->',
                    _react2.default.createElement('img', { src: '%{ARCHIVES_DIR}{' + item.name + '@' + item.path + '}',
                      className: (0, _classnames2.default)({ 'js-img_resize_preview': item.resize }), style: style }),
                    _react2.default.createElement('input', { type: 'hidden', name: item.name + '@old[]', value: '{' + item.name + '@path}' }),
                    preview ? null : '<!-- ELSE -->',
                    _react2.default.createElement('img', {
                      src: '%{ARCHIVES_DIR}{' + item.name + '@' + item.path + '}',
                      className: (0, _classnames2.default)({ 'js-img_resize_preview': item.resize }), style: hiddenStyle }),
                    preview ? null : '<!-- END_IF -->',
                    _react2.default.createElement('input', { type: 'file', name: item.name + '[]', className: (0, _classnames2.default)({ 'js-img_resize_input': item.resize }) }),
                    _react2.default.createElement('br', null),
                    item.alt && _react2.default.createElement(
                      _react.Fragment,
                      null,
                      '\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8:',
                      _react2.default.createElement('input', { type: 'text', name: item.name + '@alt[]', value: '{' + item.name + '@alt}', size: '40' })
                    ),
                    item.normalSize && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@' + item.normal + '[]', value: item.normalSize }),
                    item.tinySize && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@' + item.tiny + '[]', value: item.tinySize }),
                    item.largeSize && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@' + item.large + '[]', value: item.largeSize }),
                    item.square && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@' + item.square + '[]', value: item.squareSize })
                  );
                }
              }),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'button', className: (0, _classnames2.default)("item-delete", { "acms-admin-btn-admin acms-admin-btn-admin-danger": acmscss }), value: '\u524A\u9664' })
              )
            ),
            preview ? null : '<!-- END ' + groupName + ':loop -->',
            _react2.default.createElement(
              'tr',
              { className: 'sortable-item item-template' },
              _react2.default.createElement(
                'td',
                { 'class': 'item-handle' },
                acmscss && _react2.default.createElement('i', { className: 'acms-admin-icon-sort' })
              ),
              groupitems.map(function (item) {
                if (item.type === 'text') {
                  return _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'text', name: item.name + '[]', value: '', className: (0, _classnames2.default)({ "acms-admin-form-width-full": acmscss }) })
                  );
                } else if (item.type === 'textarea') {
                  return _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('textarea', { name: item.name + '[]', className: (0, _classnames2.default)({ "acms-admin-form-width-full": acmscss }) })
                  );
                } else if (item.type === 'select') {
                  return _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'select',
                      { name: item.name + '[]', className: (0, _classnames2.default)({ "acms-admin-form-width-full": acmscss }) },
                      _react2.default.createElement('option', { value: '' }),
                      item.option.map(function (option) {
                        return _react2.default.createElement(
                          'option',
                          { value: option.value },
                          option.label
                        );
                      })
                    )
                  );
                } else if (item.type === 'radio') {
                  return _react2.default.createElement(
                    'td',
                    null,
                    item.option.map(function (option) {
                      return _react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)({ 'acms-admin-form-radio': acmscss }) },
                        _react2.default.createElement('input', { type: 'radio', name: item.name + '[]', value: option.value, id: 'input-radio-' + item.name + '-' + option.value }),
                        _react2.default.createElement(
                          'label',
                          { htmlFor: 'input-radio-' + item.name + '-' + option.value },
                          acmscss && _react2.default.createElement('i', { 'class': 'acms-admin-ico-radio' }),
                          option.label
                        )
                      );
                    })
                  );
                } else if (item.type === 'file') {
                  return _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'file', name: item.name + '[]' }),
                    item.extension && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@extension[]', value: '{extension}' }),
                    item.fileName && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@filename[]', value: '{fileName}' })
                  );
                } else if (item.type === 'image') {
                  var style = {};
                  if (item.normalSize) {
                    style.width = item.normalSize + 'px';
                  }
                  var hiddenStyle = (0, _assign2.default)({}, style, { 'display': 'none' });

                  return _react2.default.createElement(
                    'td',
                    { className: (0, _classnames2.default)({ 'js-img_resize_cf': item.resize }) },
                    _react2.default.createElement('img', { src: '', style: hiddenStyle, 'class': 'js-img_resize_preview' }),
                    _react2.default.createElement('input', { type: 'file', name: item.name + '[]', style: style }),
                    _react2.default.createElement('br', null),
                    item.alt && _react2.default.createElement(
                      _react.Fragment,
                      null,
                      '\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8:',
                      _react2.default.createElement('input', { type: 'text', name: item.name + '@alt[]', value: '', size: '40' })
                    ),
                    item.normalSize && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@' + item.normal + '[]', value: item.normalSize }),
                    item.tiny && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@' + item.tiny + '[]', value: item.tinySize }),
                    item.large && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@' + item.large + '[]', value: item.largeSize }),
                    item.square && _react2.default.createElement('input', { type: 'hidden', name: item.name + '@' + item.square + '[]', value: item.squareSize })
                  );
                }
              }),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'button', className: (0, _classnames2.default)("item-delete", { "acms-admin-btn-admin acms-admin-btn-admin-danger": acmscss }), value: '\u524A\u9664' })
              )
            ),
            _react2.default.createElement(
              'tfoot',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  { colspan: groupLength },
                  _react2.default.createElement('input', { type: 'button', className: (0, _classnames2.default)("item-insert", { "acms-admin-btn-admin": acmscss }), value: '\u8FFD\u52A0' })
                )
              )
            )
          )
        ),
        groupName && _react2.default.createElement(
          _react.Fragment,
          null,
          groupitems.map(function (item) {
            return _react2.default.createElement(
              _react.Fragment,
              null,
              item.type === 'image' && _react2.default.createElement(
                _react.Fragment,
                null,
                item.square && _react2.default.createElement(
                  _react.Fragment,
                  null,
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@squarePath' }),
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@squareAlt' }),
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@squareX' }),
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@squareY' })
                ),
                item.large && _react2.default.createElement(
                  _react.Fragment,
                  null,
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@largePath' }),
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@largeAlt' }),
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@largeX' }),
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@largeY' })
                ),
                item.tiny && _react2.default.createElement(
                  _react.Fragment,
                  null,
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@tinyPath' }),
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@tinyAlt' }),
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@tinyX' }),
                  _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@tinyY' })
                ),
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@path' }),
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@alt' }),
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@x' }),
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@y' }),
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@edit' }),
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@old' }),
                _react2.default.createElement('input', { type: 'hidden', name: item.name + ':extension', value: 'image' })
              ),
              item.type === 'file' && _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@path' }),
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@alt' }),
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@edit' }),
                _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name + '@old' }),
                _react2.default.createElement('input', { type: 'hidden', name: item.name + ':extension', value: 'file' })
              ),
              _react2.default.createElement('input', { type: 'hidden', name: '@' + groupName + '[]', value: item.name }),
              _react2.default.createElement('input', { type: 'hidden', name: 'field[]', value: item.name }),
              item.noSearch && _react2.default.createElement('input', { type: 'hidden', name: item.name + ':search', value: '0' })
            );
          }),
          _react2.default.createElement('input', { type: 'hidden', name: 'field[]', value: '@' + groupName })
        )
      );
    }
  }]);
  return FieldGroupSource;
}(_react.Component);

exports.default = FieldGroupSource;


FieldGroupSource.defaultProps = {
  preview: false
};