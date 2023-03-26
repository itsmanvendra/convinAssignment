import {useState, useRef} from 'react';
import './Bucket.css'
import Cards from './Card';
function BucketItems(props){
    const itemsList = [];
    const title = useRef(null);
    const url = useRef(null);
    const [isCreate, setIsCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const cardTitle = useRef(null);
    const cardURL = useRef(null);
    const cardType = useRef(null);
    const elementID = useRef(null);
    const bucketName = useRef(null);
    const [isMutliDel, setMultiDel] = useState(false);
    const [checkedItems, setCheckedItems] = useState(itemsList);
    const card_list = props.cardInfo.filter((card, index) => {
        return card.type === props.item;
    })
    
    const editCard = (obj) => {
        cardTitle.current.value = obj.title;
        cardURL.current.value = obj.src;
        cardType.current.value = obj.type;
        elementID.current.value = `${obj.id}`;
        // console.log(elementID);
        setIsEdit(true);
    }
    
    const onClickHandler = (e) => {
        console.log(`${props.item}`);
        console.log(props);
        setIsCreate(true);
    }
    const createCard = (e) => {
        e.preventDefault();
        const arr = {
            'title' : `${title.current.value}`,
            'src' : `${url.current.value}`,
            'id' : `${title.current.value}`,
            'type': `${props.item}`
            
        }
        props.addCard(arr);
        title.current.value = '';
        url.current.value = '';
        setIsCreate(false);
    }
    const saveCard = (e) => {
        e.preventDefault();
        // console.log(elementID.current.value);
        const arr = {
            'title' : `${cardTitle.current.value}`,
            'src' : `${cardURL.current.value}`,
            'id' : `${elementID.current.value}`,
            'type': `${cardType.current.value}`
            
        }
        // console.log(props);
        // props.addCard(arr);
        props.editCard(arr);
        setIsEdit(false);
    }
    const historyEdit = (videoTitle) => {
        console.log(videoTitle);
        props.historyInfoEdit(videoTitle);
    }
    const onMultipleDeleteHandler = () => {
        bucketName.current.value = props.item;
        console.log(bucketName.current.value);
        console.log(card_list);
        setMultiDel(true);
    }
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if(isChecked){
            itemsList.push(value);
        };
    }
    const onDelete = (e) => {
        e.preventDefault()
        console.log(itemsList);
        props.mutliDel(itemsList);
        setMultiDel(false);
    }
    console.log(props.cardInfo);
    return( 
        <>  
            <div className={`${isCreate ? 'form_container' : 'hidden'}`}>
                <form>
                    <label>Title</label>
                    <input type="text" ref={title} placeholder="Enter Title"></input>
                    <label>Video URL</label>
                    <input type="url" ref={url} placeholder="Enter Video URL"></input>
                    <button onClick={createCard}>Create</button>
                </form>
            </div>
            <div className={`${isEdit ? 'edit_card_container' : 'hidden'}`}>
                    <form>
                        <label>Title</label>
                        <input type="text" ref={cardTitle} placeholder="Enter Title"></input>
                        <label>Video URL</label>
                        <input type="url" ref={cardURL}  placeholder="Enter Video URL"></input>
                        <label >Move to:</label>
                        <select  id="category" ref={cardType}>
                            <option value={props.BucketName[0]}>{props.BucketName[0]}</option>
                            <option value={props.BucketName[1]}>{props.BucketName[1]}</option>
                            <option value={props.BucketName[2]}>{props.BucketName[2]}</option>
                        </select>
                        <button onClick={saveCard} ref={elementID}>Save</button>
                    </form>
            </div>
            <div className={`${isMutliDel ? 'edit_card_container' : 'hidden'}`}>
                    <form >
                        
                        <label >Multiple Delete</label>
                        

                            {
                                card_list.map((cardDetails) => {
                                    return (
                                        <div className='multi___del'>
                                            <input type="checkbox" name="interest" value={cardDetails.id} onChange={handleCheckboxChange}/>
                                            <label for="coding">{cardDetails.title}</label>
                                        </div>
                                    )
                                })
                            }
                            
                        
                        <button onClick={onDelete} >Delete</button>
                    </form>
            </div>
            <div  className="bucket">
                <div className="bucket__heading">
                <h2>{props.item}</h2>
                <button onClick={props.editBucketNameHandler}> ✏️ </button>
                <button onClick={onClickHandler}> ➕ </button>
                <button onClick={onMultipleDeleteHandler} ref={bucketName}> ❌ </button>
                </div>
                <div className="bucket__body">
                    
            
                    <div className="bucket_card_container">
                        {card_list.map((cardDetails, index) => {
                            return (
                                <Cards key={cardDetails.title} title={cardDetails.title} src={cardDetails.src} deleteCard={props.deleteCard} id={cardDetails.id} type={cardDetails.type} editCard={editCard} historyEdit={historyEdit} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
function Bucket(props){
    
    const items = ['Educational Videos', 'Entertainment Videos', 'Motivational Videos'];
    const cardInfo = [
        {'src':"https://youtu.be/ap-6PPAuK1Y", 'title': "Promises-JS", 'id':'Promises-JS', 'type': 'Educational Videos'},
        {'src':"https://youtu.be/8zKuNo4ay8E", 'title': "EventLoop-JS", 'id': "EventLoop-JS", 'type': 'Educational Videos'},
        {'src':"https://youtu.be/Iu9FeuQQqPo", 'title': "Bassi-StandUp", 'id' : "Bassi-StandUp", 'type' : 'Entertainment Videos'},
        {'src':"https://youtu.be/QdRwtW6jMSo", 'title': "FRIENDS-EP3S3", 'id' : "FRIENDS-EP3S3", 'type' : 'Entertainment Videos'},
        {'src':"https://youtu.be/7sxpKhIbr0E", 'title': "Self-motivation", 'id' :"Self-motivation", 'type' : 'Motivational Videos'},
        {'src':"https://youtu.be/H14bBuluwB8", 'title': "Girt:power of passion", 'id' : "Girt:power of passion", 'type' : 'Motivational Videos' }]
    const [cardInformation, setCardInformation] = useState(cardInfo);
    const[bucketName, setBucketName] = useState(items);
    const[editStatus, setEditStatus] = useState(false);
    const[editBtn, setEditBtn] = useState(0);
    const newName = useRef(null);
    
    const editBNhandler = (i) => {
        
        console.log(`${items[i]}`);
        setEditStatus(true);
        setEditBtn(i);

    }
    const editBucketName = () => {
        cardInformation.forEach((cardDet) => {
            if(cardDet.type === bucketName[editBtn]){
                cardDet.type = newName.current.value;
            }
        });
        bucketName[editBtn] = newName.current.value;
        
        console.log(bucketName);
        setCardInformation(cardInformation)
        setBucketName(bucketName);
        newName.current.value = '';
        setEditStatus(false);
    }
    const addCard = (newObj) => {
        if(newObj.title.trim().length < 1 || newObj.src.trim().length < 1){
            return ;
        }
        setCardInformation([newObj, ...cardInformation]);
    }
    const editCard = (newObject) => {
        const newArr = cardInformation.filter((info) => {
            return newObject.id !== info.id;
        })
        setCardInformation([newObject,...newArr])
    }
    const deleteCard = (id) => {
        const newArr = cardInformation.filter((info) => {
            return id !== info.id;
        })
        setCardInformation(newArr);
    }
    const mutliDel = (itemsListEle) => {
        let newArr = [];
        
        for(let i = 0; i<cardInformation.length; i++){
            
            for(let j = 0; j<itemsListEle.length; j++){
                if(cardInformation[i].id === itemsListEle[j]){
                    cardInformation[i].id = -1;

                }
            }
            
        }
        for(let i = 0; i < cardInformation.length; i++){
            if(cardInformation[i].id !== -1){
                newArr.push(cardInformation[i]);
                console.log(cardInformation[i]);
            }
        }
        console.log('newArr', newArr);
        setCardInformation(newArr);
    }

    const historyInfoEdit =(videoTitle) =>{
        console.log(videoTitle);
        props.historyUpdate(videoTitle);
    }

    return (
        <>
            <div className={`${!editStatus ? 'hidden' : 'bucket_name_edit'}` }>
                <div className="edit_name_modal">
                    <label >Bucket Name</label>
                    <input type="text" id="bucketName" placeholder="Enter Name" ref={newName}></input>
                    <button onClick={editBucketName}>Submit</button>
                </div>
                
            </div>
            
            <ol className="bucket__container">
                {
                    bucketName.map((BName, i) => {
                        
                        return (
                            <BucketItems key={i} item={BName} editBucketNameHandler={() => {editBNhandler(i)}} cardInfo={cardInformation} index={i} addCard={addCard} deleteCard={deleteCard} editCard={editCard} BucketName={bucketName} historyInfoEdit={historyInfoEdit}
                            mutliDel={mutliDel} />
                        )
                    })
                }
                
                
            </ol>
            
        </>
    )

}
export default Bucket;