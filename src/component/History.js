import './History.css'
function History(props){
    console.log(props.historyItem)
    return (
        <div className="history__container">
            <h2 className="history_heading">History</h2>
            <ol >
                {
                    props.historyItem.map((itemName, i) => {
                        return (
                        <div className='history_item_list'>
                            <p key={Math.random()}>{itemName.title}</p>
                            <p key={Math.random()}>{itemName.src}</p>
                            <p key={Math.random()}>{itemName.time}</p>
                        </div>
                            
                        
                        )
                    })
                }
            </ol>
        </div>
    )
}
export default History;