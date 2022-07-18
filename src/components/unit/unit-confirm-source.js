import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

export default class UnitConfirmSource extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customunit, acmscss,value } = this.props;

    let Table = "table";
    let Tr = "tr";
    let Td = "td";
    let Th = "th";

    switch(value){
      case "classic":
        Table = "table";
        Tr = "tr";
        Td = "td";
        Th = "th"
        break;
      case "modan":
        Table = "ul";
        Tr = "li";
        Td = "div";
        Th = "label"
        break;
      case "color":
        Table = "ul";
        Tr = "li";
        Td = "div";
        Th = "label"
        break;
    }

    return (<Table className={classnames({ 'acms-admin-table-admin-edit acms-admin-table-admin-edit-bordered': acmscss })}>
      {customunit.map((item) => {
        if (!item.name) {
          return null;
        }
        if (item.type === 'text') {
          return (<Tr>
            <Th>{item.title}</Th>
            <Td>
              {`{${item.name}}`}
            </Td>
          </Tr>);
        } else if (item.type === 'textarea') {
          return (<Tr>
            <Th>{item.title}</Th>
            <Td>
              {`{${item.name}}[escape|nl2br]`}
            </Td>
          </Tr>);
        } else if (item.type === 'select') {
          return (<Tr>
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
          return (<Tr>
            <Th>{item.title}</Th>
            <Td>
              {item.option.map(option => (`<!-- BEGIN_IF [{${item.name}}/eq/${option.value}] -->
              ${option.label}
              <!-- END_IF -->`))}
            </Td>
          </Tr>);
        } else if (item.type === 'checkbox') {
          return (<Tr>
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
          return (<Tr>
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
          return (<Tr>
            <Th>{item.title}</Th>
            <Td>
              <img src={`%{ARCHIVES_DIR}{${item.name}@path}`} width="64" height="64" alt={`{${item.name}@alt}`} />
            </Td>
          </Tr>);
        } else if (item.type === 'media') {
          return (<Tr>
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
          return (<Tr>
            <Th>{item.title}</Th>
            <Td>
              {`{${item.name}@html}[raw]`}
            </Td>
          </Tr>)
        } else if (item.type === 'lite-editor') {
          return (<Tr>
            <Th>{item.title}</Th>
            <Td>
              {`{${item.name}}[raw]`}
            </Td>
          </Tr>)
        } else if (item.type === 'table') {
          return (<Tr>
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
