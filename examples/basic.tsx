import * as React from 'react';
import List from '../src/List';

interface Item {
  id: number;
}

const MyItem: React.FC<Item> = ({ id }, ref) => {
  return (
    <span
      ref={ref}
      style={{
        border: '1px solid gray',
        padding: '0 16px',
        height: 30,
        lineHeight: '30px',
        boxSizing: 'border-box',
        display: 'inline-block',
      }}
    >
      {id}
    </span>
  );
};

const ForwardMyItem = React.forwardRef(MyItem);

class TestItem extends React.Component<{ id: number }> {
  render() {
    return <div style={{ lineHeight: '30px' }}>{this.props.id}</div>;
  }
}

const data: Item[] = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    id: i,
  });
}

const TYPES = [
  { name: 'ref real dom element', type: 'dom', component: ForwardMyItem },
  { name: 'ref react node', type: 'react', component: TestItem },
];

const Demo = () => {
  const [type, setType] = React.useState('dom');

  return (
    <React.StrictMode>
      <div>
        <h2>Basic</h2>
        {TYPES.map(({ name, type: nType }) => (
          <label key={nType}>
            <input
              name="type"
              type="radio"
              checked={type === nType}
              onChange={() => {
                setType(nType);
              }}
            />
            {name}
          </label>
        ))}

        <List
          data={data}
          height={200}
          itemHeight={30}
          itemKey="id"
          style={{
            border: '1px solid red',
            boxSizing: 'border-box',
          }}
        >
          {(item, _, props) =>
            type === 'dom' ? (
              <ForwardMyItem {...item} {...props} />
            ) : (
              <TestItem {...item} {...props} />
            )
          }
        </List>
      </div>
    </React.StrictMode>
  );
};

export default Demo;