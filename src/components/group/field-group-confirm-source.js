import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

const ConditionalWrap = ({ condition, wrap, children }) => condition ? wrap(children) : children;

export default class FieldGroupConfirmSource extends Component {

  wrapTable(children, title) {
    const { direction , value} = this.props;

    let Tr = "tr";
    let Th = "th";

    switch(value){
      case "classic":
        Tr = "tr";
        Th = "th";
        break;
      case "modan":
        Tr = "li";
        Th = "label";
        break;
      case "color":
        Tr = "li";
        Th = "label";
        break;
    }

    return (<ConditionalWrap
      condition={direction === 'vertical'}
      wrap={children => <Tr>
        <Th>{title}</Th>
        {children}
      </Tr>}
    >{children}</ConditionalWrap>);
  }

  render() {
    const { groupTitle, groupName, groupitems, acmscss, direction, value } = this.props;

    let Table = "table";
    let Tr = "tr";
    let Th = "th"
    let Td = "td";

    switch(value){
      case "classic":
        Table = "table";
        Tr = "tr";
        Th = "th"
        Td = "td";
        break;
      case "modan":
        Table = "ul";
        Tr = "li";
        Th = "label"
        Td = "div";
        break;
      case "color":
        Table = "ul";
        Tr = "li";
        Th = "label"
        Td = "div"
        break;
    }

    return (<Fragment>
      {groupTitle && <h2 className={classnames({ 'acms-admin-admin-title2': acmscss })}>{groupTitle}</h2>}
      <Table className={classnames({ 'adminTable acms-admin-table-admin-edit': acmscss })}>
        {direction === 'horizontal' &&
          <head className={classnames({ 'acms-admin-hide-sp': acmscss })}>
            <Tr>
              {groupitems.map((item) => (<Th className={classnames({ "acms-admin-table-left": acmscss })}>{item.title}</Th>))}
            </Tr>
          </head>
        }
        <body>
          {`<!-- BEGIN ${groupName}:loop -->`}
          <Tr>
            <ConditionalWrap
              condition={direction === 'vertical'}
              wrap={children => <td><table>{children}</table></td>}
            >
              {groupitems.map((item) => {
                if (item.type === 'text') {
                  return this.wrapTable(<Td>
                    {`{${item.name}}`}
                  </Td>, item.title);
                } else if (item.type === 'textarea') {
                  return this.wrapTable(<Td>
                    {`{${item.name}}[escape|nl2br]`}
                  </Td>, item.title);
                } else if (item.type === 'select') {
                  return this.wrapTable(<Td>
                    {item.option.map((option) => {
                      if (!option.label) {
                        return null;
                      }
                      return (<div>
                        {`<!-- BEGIN_IF [{${item.name}}/eq/${option.value}] -->`}
                        {option.label}
                        {'<!-- END_IF -->'}
                      </div>);
                    })}
                  </Td>, item.title);
                } else if (item.type === 'radio') {
                  return this.wrapTable(<Td>
                    {item.option.map((option) => {
                      if (!option.label) {
                        return null;
                      }
                      return (`<!-- BEGIN_IF [{${item.name}}/eq/${option.value}] -->
                        ${option.label}
                        <!-- END_IF -->`);
                    })}
                  </Td>, item.title);
                } else if (item.type === 'file') {
                  let src = '/images/fileicon/';
                  let alt = 'file';
                  if (item.extension) {
                    src += `${item.extension}.svg`;
                    alt += item.extension;
                  } else {
                    src += 'file.svg';
                  }

                  return this.wrapTable(<Td>
                    {`<!-- BEGIN ${item.name}@path:veil -->`}
                    <a href={`%{ARCHIVES_DIR}{${item.name}@path}`}>
                      <img src={src} width="64" height="64" alt={alt} />
                    </a>
                    {`<!-- END ${item.name}@path:veil -->`}
                  </Td>, item.title);
                } else if (item.type === 'image') {
                  return this.wrapTable(<Td>
                    {`<!-- BEGIN ${item.name}@path:veil -->`}
                    <img src={`%{ARCHIVES_DIR}{${item.name}@path}`} className={classnames({ 'acms-admin-img-responsive': acmscss })} alt={`{${item.name}@alt}`} />
                    {`<!-- END ${item.name}@path:veil -->`}
                  </Td>, item.title);
                } else if (item.type === 'media') {
                  return this.wrapTable(<Td>
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
                  </Td>, item.title);
                } else if (item.type === 'lite-editor') {
                  return this.wrapTable(<Td>
                    {`{${item.name}}[raw]`}
                  </Td>, item.name);
                } else if (item.type === 'rich-editor') {
                  return this.wrapTable(<Td>
                    {`{${item.name}@html}[raw]`}
                  </Td>, item.name);
                } else if (item.type === 'table') {
                  return this.wrapTable(<Td>
                    {`{${item.name}}[raw]`}
                  </Td>, item.name);
                }
              })}
            </ConditionalWrap>
          </Tr>
          {`<!-- END ${groupName}:loop -->`}
        </body>
      </Table>
    </Fragment>);
  }
}
