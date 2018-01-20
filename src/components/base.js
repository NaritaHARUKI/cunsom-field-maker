import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';

import ModalDialog from './modal-dialog';

export default class Base extends Component {

  constructor(props) {
    super(props);
  }


  updateState(prop, value) {
    this.setState({
      [prop]: value
    });
  }

  clearValue() {
    this.setState({
      title: '',
      name: '',
      path: '',
      normalSize: '',
      tiny: '',
      tinySize: '',
      large: '',
      largeSize: '',
      square: '',
      squareSize: '',
      alt: true,
      resize: true,
      openConverter: '',
      openValidator: '',
      converter: '',
      tooltip: ''
    })
  }

  addOption() {
    const { option } = this.state;
    this.setState({
      option: [...option, {
        value: "",
        label: ""
      }]
    })
  }

  removeOption(idx) {
    const { option } = this.state;
    this.setState({
      option: [...option.slice(0, idx), ...option.slice(idx + 1)]
    });
  }

  updateOptionLabel(idx, label) {
    const { option } = this.state;
    const item = option[idx];
    this.setState({
      option: [
        ...option.slice(0, idx),
        Object.assign({}, item, {
          label
        }),
        ...option.slice(idx + 1)
      ]
    });
  }

  updateOptionValue(idx, value) {
    const { option } = this.state;
    const item = option[idx];
    this.setState({
      option: [
        ...option.slice(0, idx),
        Object.assign({}, item, {
          value
        }),
        ...option.slice(idx + 1)
      ]
    });
  }

  addValidator() {
    const { validator } = this.state;
    this.setState({
      validator: [...validator, {
        option: "",
        value: "",
        message: ""
      }]
    });
  }

  removeValidator(idx) {
    const { validator } = this.state;
    this.setState({
      validator: [...validator.slice(0, idx), ...validator.slice(idx + 1)]
    });
  }

  updateValidatorOption(idx, option) {
    const { validator } = this.state;
    const item = validator[idx];
    this.setState({
      validator: [
        ...validator.slice(0, idx),
        Object.assign({}, item, {
          option
        }),
        ...validator.slice(idx + 1)
      ]
    });
  }

  updateValidatorValue(idx, value) {
    const { validator } = this.state;
    const item = validator[idx];
    this.setState({
      validator: [
        ...validator.slice(0, idx),
        Object.assign({}, item, {
          value
        }),
        ...validator.slice(idx + 1)
      ]
    });
  }

  updateValidatorMessage(idx, message) {
    const { validator } = this.state;
    const item = validator[idx];
    this.setState({
      validator: [
        ...validator.slice(0, idx),
        Object.assign({}, item, {
          message
        }),
        ...validator.slice(idx + 1)
      ]
    });
  }

  addConverter(item) {
    let { converter } = this.state;
    const reg = new RegExp(item, "i");
    if (converter.search(reg) === -1) {
      converter += item;
    } else {
      converter = converter.replace(item.toUpperCase(), item);
      converter = converter.replace(item.toLowerCase(), item);
    }
    this.setState({
      converter
    });
  }

  renderOption() {
    const { option } = this.state;
    return (
      <div>
        <table className="acms-admin-table customFieldOptionTable">
          {option.map((item, idx) =>
            (<tr>
              <td>
                <div className="customFieldOptionTableInput">
                  <span className="customFieldOptionTableAppend">項目名（label）</span><input type="text" value={item.label} onInput={(e) => { this.updateOptionLabel(idx, e.target.value) }} className="acms-admin-form-width-full" placeholder="例）東京都" />
                </div>
              </td>
              <td>
                <div className="customFieldOptionTableInput">
                  <span className="customFieldOptionTableAppend">値（value）</span><input type="text" value={item.value} onInput={(e) => { this.updateOptionValue(idx, e.target.value) }} className="acms-admin-form-width-full" placeholder="例）tokyo" />
                </div>
              </td>
              <td>
                <input type="button" className="acms-admin-btn-admin acms-admin-btn-admin-danger acms-admin-float-right" onClick={this.removeOption.bind(this, idx)} value="削除" />
              </td>
            </tr>))}
        </table>
        <p>
          <button className="acms-admin-btn" onClick={this.addOption.bind(this)}>追加</button>
        </p>
      </div>
    );
  }

  renderTitleName() {
    const { title, name } = this.state;
    return (
      <div>
        <p>タイトル</p>
        <p><input type="text" value={title} onInput={(e) => { this.updateState('title', e.target.value) }} /></p>
        <p>name属性</p>
        <p><input type="text" value={name} onInput={(e) => { this.updateState('name', e.target.value) }} /></p>
      </div>
    );
  }

  applySnippet() {
    const { optionFormat, option } = this.state;
    axios.get(`./json/${optionFormat}.json`)
    .then((res) => {
      this.setState({
        option: [...option, ...res.data]
      });
    });
  }

  renderSnippet() {
    const { useSnippet, optionFormat } = this.state;
    return (
      <p>
        <span className="customFieldBold">
          選択項目（option要素）
          <i className="acms-admin-icon-tooltip" data-tip data-for="option-value-tip"></i>
          <ReactTooltip id="option-value-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
            <span>option要素の選択項目になります。</span>
          </ReactTooltip>
        </span>
        <span className="customFieldUseSnippet">
          <label className="customFieldUseSnippetLabel" style={{marginRight: '5px'}}>
            <input type="checkbox" style={{ display: 'none' }} value="true" onChange={() => {this.updateState('useSnippet', !useSnippet)}}/>
            {useSnippet ? "スニペットを使用しない" : "スニペットを使用する"}
          </label>
          {useSnippet &&
            <span>
              <select style={{ verticalAlign: 'middle', marginRight: '5px' }} value={optionFormat} onChange={(e) => {this.updateState('optionFormat', e.target.value)}}>
                <option value="pref">都道府県</option>
                <option value="pref-en">都道府県（英語）</option>
                <option value="pref-number">都道府県（連番）</option>
              </select>
              <button className="acms-admin-btn" onClick={this.applySnippet.bind(this)} style={{ verticalAlign: 'middle' }}>追加</button>
            </span>
          }
        </span>
      </p>
    )
  }

  renderModal() {
    const { openConverter, converter } = this.state;
    return (
      <div>
        <ModalDialog open={openConverter} title="コンバーター参照" onClose={this.updateState.bind(this, 'openConverter', false)}>
          <table className="acms-admin-table acms-admin-table-heading acms-admin-table-hover">
            <tr>
              <th>オプション</th>
              <th>意味</th>
              <th>追加</th>
            </tr>
            <tr>
              <td>r</td>
              <td>「全角」英字を「半角」に変換します</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'r')}>追加</button></td>
            </tr>
            <tr>
              <td>R</td>
              <td>「半角」英字を「全角」に変換します</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'R')}>追加</button></td>
            </tr>
            <tr>
              <td>n</td>
              <td>「全角」数字を「半角」に変換します</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'n')}>追加</button></td>
            </tr>
            <tr>
              <td>N</td>
              <td>「半角」数字を「全角」に変換します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'N')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>a</td>
              <td>「全角」英数字を「半角」に変換します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'a')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>A</td>
              <td>「半角」英数字を「全角」に変換します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'A')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>s</td>
              <td>「全角」スペースを「半角」に変換します（U+3000 -> U+0020）。
                    </td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 's')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>S</td>
              <td>「半角」スペースを「全角」に変換します（U+0020 -> U+3000）。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'S')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>k</td>
              <td>「全角カタカナ」を「半角カタカナ」に変換します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'k')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>K</td>
              <td>「半角カタカナ」を「全角カタカナ」に変換します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'K')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>h</td>
              <td>「全角ひらがな」を「半角カタカナ」に変換します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'h')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>H</td>
              <td>「半角カタカナ」を「全角ひらがな」に変換します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'H')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>c</td>
              <td>「全角カタカナ」を「全角ひらがな」に変換します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'c')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>C</td>
              <td>「全角ひらがな」を「全角カタカナ」に変換します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'C')}>追加</button>
              </td>
            </tr>
            <tr>
              <td>V</td>
              <td>濁点付きの文字を一文字に変換します。"K", "H" と共に使用します。</td>
              <td><button className="acms-admin-btn" onClick={this.addConverter.bind(this, 'V')}>追加</button>
              </td>
            </tr>
          </table>
        </ModalDialog>
      </div>
    )
  }

  renderBasic() {
    const { title, name, tooltip, type } = this.state;
    return (<table className="adminTable acms-admin-table-admin-edit customFieldBasicTable customFieldBasicTableFirst">
      <tr>
        <th className="acms-admin-table-left">入力欄の種類
        <i className="acms-admin-icon-tooltip" data-tip="React-tooltip" data-for="type-tip"></i>
          <ReactTooltip id="type-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
            <span>フィールドのタイプとなります。<br />選択しないと生成ボタンを押してもソースコードが生成されません。</span>
          </ReactTooltip>
          <span className="acms-admin-label acms-admin-label-danger">必須</span>
        </th>
        <th className="acms-admin-table-left">タイトル
        <i className="acms-admin-icon-tooltip" data-tip="React-tooltip" data-for="title-tip"></i>
          <ReactTooltip id="title-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
            <span>見出しになります。</span>
          </ReactTooltip>
          <span className="acms-admin-label acms-admin-label-danger">必須</span></th>
        <th className="acms-admin-table-left">フィールド
        <i className="acms-admin-icon-tooltip" data-tip="React-tooltip" data-for="field-tip"></i>
          <ReactTooltip id="field-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
            <span>フィールド名です。name属性として使用されます。</span>
          </ReactTooltip>
          <span className="acms-admin-label acms-admin-label-danger">必須</span></th>
        <th className="acms-admin-table-left">ツールチップ
        <i className="acms-admin-icon-tooltip" data-tip="React-tooltip" data-for="tooltip-tip"></i>
          <ReactTooltip id="tooltip-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
            <span>カスタムフィールドの説明用のツールチップを付与します。</span>
          </ReactTooltip>
        </th>
      </tr>
      <tr>
        <td>
          {this.typeSelectRender()}
        </td>
        <td><input type="text" value={title} onInput={(e) => { this.updateState('title', e.target.value) }} className="acms-admin-form-width-full" placeholder="例）氏名" /></td>
        <td><input type="text" value={name} onInput={(e) => { this.updateState('name', e.target.value) }} className="acms-admin-form-width-full" placeholder="例）name" /></td>
        <td><input type="text" value={tooltip} onInput={(e) => { this.updateState('tooltip', e.target.value) }} className="acms-admin-form-width-full" placeholder="例）ここにお名前を入力してください" /></td>
      </tr>
    </table>);
  }

  typeSelectRender() {
    const { type } = this.state;
    
    return (
      <select id="type" value={type} className="acms-admin-form-width-full" onChange={(e) => { this.updateState('type', e.target.value) }}>
      <option value="text">テキスト</option>
      <option value="textarea">テキストエリア</option>
      <option value="select">セレクトボックス</option>
      <option value="radio">ラジオボタン</option>
      <option value="file">ファイル</option>
      <option value="image">画像</option>
    </select>
    )
  }

  noSearchCheckRender() {
    const { noSearch } = this.state;
    return (<p className="acms-admin-form-checkbox">
    <input type="checkbox" value={noSearch} id="noSearch-checkbox" onChange={this.updateState.bind(this, 'noSearch', !noSearch)}/>
    <label htmlFor="noSearch-checkbox">
      <i className="acms-admin-ico-checkbox"></i>
      カスタムフィールド検索の対象外にする
    </label>
  </p>);
  }

  renderValidator() {
    const { openValidator, validator, converter, type } = this.state;
    return (
      <div>
        <p>
          <label style={{ color: "#006DEC", cursor: "pointer" }}>
            <input type="checkbox" value={openValidator} onChange={this.updateState.bind(this, 'openValidator', !openValidator)} style={{ display: 'none' }} />
            オプション</label>
          <i className="acms-admin-icon-tooltip" data-for="option-tip" data-tip="React-tooltip" style={{ marginLeft: "5px" }}></i>
          <ReactTooltip id="option-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
            <span>変換・入力チェック用の項目を表示します。</span>
          </ReactTooltip>
        </p>
        {openValidator &&
          <div className="customFieldValidatorArea">
            {/text|textarea|radio|select/.exec(type) && this.noSearchCheckRender()}
            <p className="customFieldBold">
              テキストの変換
              <i className="acms-admin-icon-tooltip" data-tip data-for="convert-tip"></i>
              <ReactTooltip id="convert-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
                <span>テキストフィールドに入力された値を別の値に変換します。詳しくは参照ボタンを押すと表示されるモーダルウィンドウに情報が記載されています。</span>
              </ReactTooltip>
            </p>
            <p>
              <input type="text" value={converter} onInput={(e) => { this.updateState('converter', e.target.value) }} className="acms-admin-form-width-quarter" placeholder="例）rs" />
              <button className="acms-admin-btn" onClick={this.updateState.bind(this, 'openConverter', true)}>コンバーター参照</button>
            </p>
            <table className="acms-admin-table customFieldOptionTable">
              <tr>
                <th>
                  入力チェック
                  <i className="acms-admin-icon-tooltip" data-tip data-for="validate-tip"></i>
                  <ReactTooltip id="validate-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
                    <span>フィールドに入力された値が条件に合っているかをチェックします。</span>
                  </ReactTooltip>
                </th>
                <th>値
                  <i className="acms-admin-icon-tooltip" data-tip data-for="validate-value-tip"></i>
                  <ReactTooltip id="validate-value-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
                    <span>最小文字数や、正規表現チェックをバリデータに設定した際に設定する値となります。</span>
                  </ReactTooltip>
                </th>
                <th>
                  メッセージ
                  <i className="acms-admin-icon-tooltip" data-tip data-for="validate-message-tip"></i>
                  <ReactTooltip id="validate-message-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
                    <span>フィールドに入力されている値が条件に合わなかった場合に表示されるメッセージになります。</span>
                  </ReactTooltip>
                </th>
                <th></th>
              </tr>
              {validator.map((item, idx) =>
                (<tr>
                  <td>
                    <select className="acms-admin-form-width-full" onChange={(e) => { this.updateValidatorOption(idx, e.target.value) }}>
                      <option value="">▼ バリデータを選択</option>
                      <optgroup label="入力値の制限">
                        <option value="required">必須 ( required )</option>
                        <option value="minLength">最小文字数 ( minLength )</option>
                        <option value="maxLength">最大文字数 ( maxLength )</option>
                        <option value="min">下限値 ( min )</option>
                        <option value="max">上限値 ( max )</option>
                      </optgroup>
                      <optgroup label="形式チェック">
                        <option value="digits">数字チェック ( digits )</option>
                        <option value="email">メールアドレスチェック ( email )</option>
                        <option value="url">URLチェック ( url )</option>
                        <option value="dates">日付チェック ( dates )</option>
                        <option value="times">時間チェック ( times )</option>
                        <option value="regex">正規表現マッチ ( regex )</option>
                      </optgroup>
                    </select>
                  </td>
                  <td>
                    <input type="text" value={item.value} onInput={(e) => { this.updateValidatorValue(idx, e.target.value) }} className="acms-admin-form-width-full" />
                  </td>
                  <td>
                    <input type="text" value={item.message} onInput={(e) => { this.updateValidatorMessage(idx, e.target.value) }} className="acms-admin-form-width-full" />
                  </td>
                  <td>
                    <button onClick={this.removeValidator.bind(this, idx)} className="acms-admin-btn-admin acms-admin-btn-admin-danger">削除</button>
                  </td>
                </tr>
                ))}
            </table>
            <p><button onClick={this.addValidator.bind(this)} className="acms-admin-btn">追加</button></p>
          </div>
        }
      </div>
    );
  }

  renderMake() {
    return (
      <p>
        <button onClick={this.clearValue.bind(this)} className="acms-admin-btn-admin" style={{ marginRight: '5px' }}>クリア</button>
        <button onClick={this.submit.bind(this)} className="acms-admin-btn-admin acms-admin-btn-admin-primary customFieldMakeBtn">生成</button>
      </p>
    )
  }

  renderImage() {
    return (
      <table className="adminTable acms-admin-table-admin-edit customFieldBasicTable customFieldBasicTableImg">
        <tr>
          <th className="acms-admin-table-left">
            画像サイズ
            <i className="acms-admin-icon-tooltip" data-tip data-for="image-size-tip"></i>
            <ReactTooltip id="image-size-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
              <span>通常画像の画像サイズを指定します</span>
            </ReactTooltip>
          </th>
          <th className="acms-admin-table-left">
            large画像生成
            <i className="acms-admin-icon-tooltip" data-tip data-for="image-large-size-tip"></i>
            <ReactTooltip id="image-size-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
              <span>通常画像よりも大きい画像を生成できます。</span>
            </ReactTooltip>
          </th>
          <th className="acms-admin-table-left">
            tiny画像生成
            <i className="acms-admin-icon-tooltip" data-tip data-for="image-tiny-size-tip"></i>
            <ReactTooltip id="image-tiny-size-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
              <span>通常画像よりも小さい画像を生成できます。</span>
            </ReactTooltip>
          </th>
          <th className="acms-admin-table-left">
            square画像生成
            <i className="acms-admin-icon-tooltip" data-tip data-for="image-square-size-tip"></i>
            <ReactTooltip id="image-tiny-size-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
              <span>通常画像を指定したサイズで中央から正方形にトリミングして生成します。</span>
            </ReactTooltip>
          </th>
        </tr>
        <tr>
          <td>
            <div className="acms-form-group">
              <div className="controls">
                <select name="normal" onChange={(e) => { this.updateState('normal', e.target.value) }}>
                  <option value="size">長辺</option>
                  <option value="width">幅</option>
                  <option value="height">高さ</option>
                </select>
                <span className="input-append">
                  <input type="text" autocomplete="off" name="normalSize" onInput={(e) => { this.updateState('normalSize', e.target.value) }} className="customFieldSizeInput" placeholder="例）200px" /><span className="add-on"> px</span>
                </span>
              </div>
            </div>
          </td>
          <td>
            <div className="acms-form-group">
              <div className="controls">
                <select name="large" onChange={(e) => { this.updateState('large', e.target.value) }}>
                  <option value="">作らない</option>
                  <option value="largeWidth">width</option>
                  <option value="largeHeight">height</option>
                </select>
                <span className="input-append">
                  <input type="text" autocomplete="off" name="largeSize" onInput={(e) => { this.updateState('largeSize', e.target.value) }} className="customFieldSizeInput" placeholder="例）400px" /><span className="add-on"> px</span>
                </span>
              </div>
            </div>
          </td>
          <td>
            <div className="acms-form-group">
              <div className="controls">
                <select name="tiny" onChange={(e) => { this.updateState('tiny', e.target.value) }}>
                  <option value="">作らない</option>
                  <option value="tinyWidth">width</option>
                  <option value="tinyHeight">height</option>
                </select>
                <span className="input-append">
                  <input type="text" autocomplete="off" name="tinySize" onInput={(e) => { this.updateState('tinySize', e.target.value) }} className="customFieldSizeInput" placeholder="例）100px" /><span className="add-on"> px</span>
                </span>
              </div>
            </div>
          </td>
          <td>
            <div className="acms-form-group">
              <div className="controls">
                <select name="square" onChange={(e) => { this.updateState('square', e.target.value) }}>
                  <option value="">作らない</option>
                  <option value="squareWidth">width</option>
                </select>
                <span className="input-append">
                  <input type="text" autocomplete="off" name="squareSize" onInput={(e) => { this.updateState('squareSize', e.target.value) }} className="customFieldSizeInput" placeholder="例）250px" /><span className="add-on"> px</span>
                </span>
              </div>
            </div>
          </td>
        </tr>
      </table>
    )
  }

  renderImageResize() {
    const { resize, alt } = this.state;
    return (
      <div>
        <p className="acms-admin-form-checkbox">
          <input type="checkbox" onChange={this.updateState.bind(this, 'resize', !resize)} checked={resize} id="resize-checkbox" />
          <label htmlFor="resize-checkbox">
            <i className="acms-admin-ico-checkbox"></i>
            ブラウザ側のリサイズ機能を使用する
        </label>
        </p>
        <p className="acms-admin-form-checkbox">
          <input type="checkbox" onChange={this.updateState.bind(this, 'alt', !alt)} checked={alt} id="alt-checkbox" />
          <label htmlFor="alt-checkbox">
            <i className="acms-admin-ico-checkbox"></i> alt表示用入力欄を使用する
        </label>
        </p>
      </div>
    );
  }

  renderFile() {
    const { extension, fileName } = this.state;
    return (
      <table className="adminTable acms-admin-table-admin-edit customFieldBasicTable customFieldBasicTableFile">
        <tr>
          <th className="acms-admin-table-left">
            ファイルの拡張子
            <i className="acms-admin-icon-tooltip" data-tip data-for="file-ext-tip"></i>
            <ReactTooltip id="file-ext-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
              <span>アップロードするファイルの拡張子となります。（例、txt, doc, docx, pdf, ppt, pptx, xls, xlsx, csvなど） *拡張子は一つしか指定できません。</span>
            </ReactTooltip>
          </th>
          <th className="acms-admin-table-left">
            固定のファイル名
            <i className="acms-admin-icon-tooltip" data-tip data-for="file-name-tip"></i>
            <ReactTooltip id="file-name-tip" place="top" type="dark" effect="solid" className="acms-admin-tooltip acms-tooltip customFieldTooltip">
              <span>設定しないとファイル名がランダムの文字列となります。 拡張子も明記する必要があります。（例、hoge.pdf)</span>
            </ReactTooltip>
          </th>
        </tr>
        <tr>
          <td>
            <input type="text" value={extension} onInput={(e) => { this.updateState('extension', e.target.value) }} className="acms-admin-form-width-full" placeholder="例）pdf" />
          </td>
          <td>
            <div className="customFieldInputGroup">
              <input type="text" value={fileName} onInput={(e) => { this.updateState('fileName', e.target.value) }} className="acms-admin-form-width-full" placeholder="例）example.pdf" />
            </div>
          </td>
        </tr>
      </table>
    );
  }
}