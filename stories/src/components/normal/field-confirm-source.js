import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

const ConditionalWrap = ({ condition, wrap, children }) => (condition ? wrap(children) : children);

export default class FieldConfirmSource extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customfield, acmscss ,value} = this.props;

    let Table = "table";
    let Tr = "tr";
    let Th = "th"
    let Td = "td";

    switch(value){
      case "classic":
        Table = "table";
        Th = "th"
        Tr = "tr";
        Td = "td";
        break;
      case "modan":
        Table = "ul";
        Th = "label"
        Tr = "li";
        Td = "div";
        break;
      case "color":
        Table = "ul";
        Th = "label"
        Tr = "li";
        Td = "div"
        break;
    }

    return (<Table className={classnames({ 'acms-admin-table-admin-edit': acmscss })}>
      {customfield.map((item, index) => {
        if (!item.name) {
          return null;
        }
        if (item.type === 'text') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              {`{${item.name}}`}
            </Td>
          </Tr>);
        } else if (item.type === 'textarea') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              {`{${item.name}}[escape|nl2br]`}
            </Td>
          </Tr>);
        } else if (item.type === 'select') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              {item.option.map(option => (<div>
                {`<!-- BEGIN_IF [{${item.name}}/eq/${option.value}] -->`}
                {option.label}
                {'<!-- END_IF -->'}
              </div>))}
            </Td>
          </Tr>);
        } else if (item.type === 'radio') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              {item.option.map(option => (`<!-- BEGIN_IF [{${item.name}}/eq/${option.value}] -->
              ${option.label}
              <!-- END_IF -->`))}
            </Td>
          </Tr>);
        } else if (item.type === 'checkbox') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              {`<!-- BEGIN ${item.name}:loop -->`}
              {`<!-- BEGIN ${item.name}:glue -->,<!-- END ${item.name}:glue -->`}
              {item.option.map(option => `<!-- BEGIN_IF [{${item.name}}/eq/${option.value}] -->
              ${option.value}
              <!-- END_IF -->`)}
              {`<!-- END ${item.name}:loop -->`}
            </Td>
          </Tr>);
        } else if (item.type === 'file') {
          let src = '/images/fileicon/';
          let alt = 'file';
          if (item.extension) {
            src += `${item.extension}.svg`;
            alt += item.extension;
          } else {
            src += 'file.svg';
          }

          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              {`<!-- BEGIN ${item.name}@path:veil -->`}
              <a href={`%{ARCHIVES_DIR}{${item.name}@path}`}>
                <img src={src} width="64" height="64" alt={alt} />
              </a>
              {`<!-- END ${item.name}@path:veil -->`}
            </Td>
          </Tr>);
        } else if (item.type === 'image') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              <img src={`%{ARCHIVES_DIR}{${item.name}@path}`} width="64" height="64" alt={`{${item.name}@alt}`} />
            </Td>
          </Tr>);
        } else if (item.type === 'media') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
                {`<!-- BEGIN_IF [{${item.name}@type}/eq/file] -->`}
                <a href={`{${item.name}@path}`}>
                  <img
                    alt={`{${item.name}@alt}`}
                    src={`{${item.name}@thumbnail}`}
                    style={{ width: '64px', height: 'auto' }}
                  />
                </a>
                {`<!-- END_IF -->`}
                {`<!-- BEGIN_IF [{${item.name}@type}/eq/image] -->`}
                {`<!-- BEGIN_IF [{${item.name}@link}/nem] -->`}
                <a href={`{${item.name}@link}`}>
                {`<!-- END_IF -->`}   
                {item.useFocusImage && <div style={{ width: `${item.focusImageWidth}px`, height: `${item.focusImageHeight}px` }}>
                <img className="js-focused-image" data-focus-x={`{${item.name}@focalX}`} data-focus-y={`{${item.name}@focalY}`} alt={`{${item.name}@alt}`} src={`%{MEDIA_ARCHIVES_DIR}{${item.name}@path}[resizeImg(${item.focusImageWidth})]`} />
                </div>}
                {!item.useFocusImage &&
                <img
                  alt={`{${item.name}@alt}`}
                  src={`%{MEDIA_ARCHIVES_DIR}{${item.name}@path}`}
                />}
                {`<!-- BEGIN_IF [{${item.name}@link}/nem] -->`}
                </a>
                {`<!-- END_IF -->`}

              {`<!-- BEGIN_IF [{${item.name}@text}/nem] -->`}
              <p>{`{${item.name}@text}`}</p>
              {'<!-- END_IF -->'}
              {'<!-- END_IF -->'}
            </Td>
          </Tr>);
        } else if (item.type === 'rich-editor') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              {`{${item.name}@html}[raw]`}
            </Td>
          </Tr>)
        } else if (item.type === 'lite-editor') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              {`{${item.name}}[raw]`}
            </Td>
          </Tr>)
        } else if (item.type === 'table') {
          return (<Tr key={index}>
            <Th>{item.title}</Th>
            <Td>
              {`{${item.name}}[raw]`}
            </Td>
          </Tr>)
        }
      })}
    </Table>);
  }
}
