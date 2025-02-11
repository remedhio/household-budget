import { useState } from 'react';
import './App.css'
import { MyBarChart, CategoryBarChart } from './components/graph.jsx';

function App() {

  const [saveItems, setSaveItems] = useState([
    {
      id: 1,
      name: 'パン',
      price: 300,
      category: '食費'
    },
    {
      id: 2,
      name: '牛乳',
      price: 200,
      category: '食費'
    },
    {
      id: 3,
      name: '飲み会',
      price: 3000,
      category: '外食費'
    },

  ]);

  const [price, setPrice] = useState('');

  const changePrice = (e) => {
    setPrice(e.target.value);
  }

  const [save, setSave] = useState('');

  const changeText = (e) => {
    setSave(e.target.value);
  }

  const addSaveItem = () => {
    if(!save || !price) {
      alert('項目と金額の両方を入力してください');
      setSave('');
      setPrice('');
      setCategory('');
      return;
    }
    const newSaveItem = [...saveItems, { id: saveItems.length + 1, name: save, price: price, category: category }];
    setSaveItems(newSaveItem);
    setSave('');
    setPrice('');
    setCategory('');
  }

  const deleteSaveItems = (index) => {
    const newSaveItem = [...saveItems];
    newSaveItem.splice(index, 1);
    setSaveItems(newSaveItem);
  }

  const expenditureTotalPrice = () => {
    const categoryTotal = saveItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + Number(item.price);
      return acc;
    }, {});
    return categoryTotal; // カテゴリごとの合計金額を返す
  }

  const [category, setCategory] = useState('食費'); // 新しい状態を追加

  const changeCategory = (e) => {
    setCategory(e.target.value); // カテゴリーを変更する関数を追加
  }

  const [selected, setSelected] = useState(
    [
      {
        item: "支出",
        isSelected: true,
      }
    ]
  );

  const changeItem = (e) => {
    setSelected(e.target.value);
  }


  return (
    <>
    <div className="sum_area">
      <h2 className="">支出の合計金額</h2>
      <div>
        <CategoryBarChart expenditureTotalPrice={expenditureTotalPrice()}/>
        {Object.entries(expenditureTotalPrice()).map(([category, total]) => (
          <div key={category}>{category}: {total}円</div>
        ))}
      </div>
    </div>
    <div className="add_area">
      <h2>支出を追加する</h2>
      <div className="add_item">
        <div>
          <input type="radio" placeholder="項目を追加してください。" value={selected === "支出"} name="content" onChange={changeItem}/>
          <label>支出</label>
        </div>
        <div>
          <input type="radio" placeholder="項目を追加してください。" value={selected === "収入"} name="content" onChange={changeItem}/>
          <label>収入</label>
        </div>
        <input type="text" value={save} placeholder="項目を追加してください。" onChange={changeText}/>
        <input type="number" value={price} placeholder="金額を追加してください。" onChange={changePrice}/>
        <button onClick={addSaveItem}>項目と金額を追加する</button>
      </div>
      <select value={category} onChange={changeCategory}>
        <option>食費</option>
        <option>交通費</option>
        <option>日用品費</option>
        <option>外食費</option>
      </select>
    </div>
    <div className="save_area">
      <h2 className="">項目</h2>
      <ul className="save_list">
        {saveItems.map((saveItem, index) => {
          return (
            <li key={index} className="save_item">
              <div className="flex flex-a-ctr gap8">
                <div>{saveItem.name}: {saveItem.price}円</div>
                <div className="tag_item">{saveItem.category}</div>
              </div>
              <button onClick={() => deleteSaveItems(index)}>削除</button>
            </li>
          )
        })}
      </ul>
    </div>
    <div>
      <MyBarChart saveItems={saveItems} />
    </div>
    </>
  )
}

export default App
