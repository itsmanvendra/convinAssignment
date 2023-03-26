import { useState } from 'react';
import Bucket from './component/Bucket';
import History from './component/History';
import './App.css';

function App() {
  const historyitem = [];
  const [historyItem, setHistoryItem] = useState(historyitem)
  
  const historyUpdate = (videoTitle) => {
    setHistoryItem([videoTitle, ...historyItem]);
  }
  return (
    <div className='container'>
    <Bucket historyUpdate={historyUpdate} />
    <History historyItem={historyItem} />
    </div>
  );
}

export default App;
