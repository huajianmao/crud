<div align="center">
  <a href="https://huajianmao.github.io/crud" title="CRUD - A table based crud component">
    <img src="https://raw.githubusercontent.com/huajianmao/crud/master/docs/logo.png" alt="XRender Logo - A table render engine both for form and display" />
  </a>
</div>

<p align="center">
  <a href="https://huajianmao.github.io/crud/get-started">Get started</a> | 
  <a href="https://huajianmao.github.io/crud/api">API</a> |
  <a href="https://github.com/huajianmao/crud/tree/master/app/examples">Examples</a> |
  <a href="https://huajianmao.github.io/crud/demo">Demo</a> |
  <a href="https://huajianmao.github.io/crud/faqs">FAQs</a>
</p>

### Features

- Table Render

### Install

    npm install @huajianmao/crud

> **_NOTE:_** As crud package is hosted on Github privately, you need to add github registry in your .npmrc, and request for an authToken from the authors.

```
@huajianmao:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=REQUEST_THE_TOKEN_BY_CONTACTING_THE_AUTHORS
```

#### Install other dependencies

    npm install antd lodash

### Quickstart

```jsx
import { Button, Form, FormInstance, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Crud } from '@huajianmao/crud';

// You need to load antd's css before using xrender
import 'antd/dist/antd.css';

function App() {
  const [form, setForm] = useState<FormInstance<Dict>>();

  const columns: ColumnsType<Dict> = [{title: '字典名称', dataIndex: 'name', key: 'name'}, /*{...}*/]
  const actions = (item?: Dict) => [<Button>查看</Button>, <Button>其他</Button>]

  const modal = {
    width: '50vw',
    setForm,
    body: (init?: Store) => <> <Form.Item name="name" label="字典名称"><Input /></Form.Item> </>
  };

  const apis: CrudApi<Dict> = {}; /*SOME CRUD APIs*/

  return <Crud title="字典" table={{ columns, actions }} modal={modal} api={apis} />;
}
```


### Contributors

Thanks go to these wonderful people! [[Become a contributor](CONTRIBUTING.md)].
<a href="https://github.com/huajianmao/crud/graphs/contributors">
<img src="https://opencollective.com/crud/contributors.svg?width=890&button=false" />
</a>

### Helpers

Thank you for helping and answering questions from the community.

<a href="https://github.com/huajianmao">
  <img src="https://avatars.githubusercontent.com/u/1352072?s=96&v=4" width="25" />
</a>
