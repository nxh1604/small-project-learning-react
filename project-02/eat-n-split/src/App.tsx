import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <ListFriends />
    </div>
  );
}

export default App;

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    owe: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    owe: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    owe: 0,
  },
];

const ListFriends = () => {
  const [data, setData] = useState(initialFriends);
  const [isSplitBill, setIsSplitBill] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className='container'>
      <div className='list-friends'>
        {data.map((el) => {
          return (
            <FriendShareMeal
              key={el.id}
              friend={el}
              split={isSplitBill}
              friendID={selectedFriend}
              setSplit={setIsSplitBill}
              setSelectedFriend={setSelectedFriend}
            />
          );
        })}
      </div>
      <div className='split-bill'>
        {isSplitBill && (
          <SplitBill
            key={selectedFriend}
            friend={data}
            friendID={selectedFriend}
            updateFriend={setData}
            setIsSplitBill={setIsSplitBill}
          />
        )}
      </div>
      <div className='add-friend'>
        {addFriend && (
          <AddFriendForm
            handlerAddFriend={setData}
            isAddFriend={addFriend}
            setIsAddFriend={setAddFriend}
          />
        )}
        <button onClick={() => setAddFriend(!addFriend)}>
          {addFriend ? "close" : "Add Friend"}
        </button>
      </div>
    </div>
  );
};

const AddFriendForm = ({ handlerAddFriend, isAddFriend, setIsAddFriend }: any) => {
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const condition = name ? (img ? false : true) : true;
  return (
    <form
      className='add-friend-form'
      onSubmit={() => {
        const newFriend = {
          id: Number(new Date()),
          name: name,
          image: img,
          owe: 0,
        };
        handlerAddFriend((friend: any) => [...friend, newFriend]);
        setIsAddFriend(!isAddFriend);
      }}>
      <label>Friend name</label>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <label>Image URL</label>
      <input type='url' value={img} onChange={(e) => setImg(e.target.value)} />
      <button type='submit' disabled={condition}>
        submit friend
      </button>
    </form>
  );
};

const FriendShareMeal = ({ friendID, setSelectedFriend, friend, split, setSplit }: any) => {
  const condition = friendID === friend.id && split ? true : false;
  const text =
    friend.owe === 0
      ? "We are even"
      : friend.owe < 0
      ? `You owe ${friend.name} ${-friend.owe}$`
      : `${friend.name} owe you ${friend.owe}$`;

  return (
    <div
      className={`friend ${friendID === friend.id ? "active" : ""}`}
      onClick={() => setSelectedFriend(friend.id)}>
      <img className='avatar' src={friend.image} alt={friend.name} />
      <div className='info-friend'>
        <h1>{friend.name}</h1>
        <p className={friend.owe > 0 ? "owed" : friend.owe < 0 ? "owe" : ""}>{text}</p>
      </div>
      <button
        onClick={() => {
          condition ? setSplit(false) : setSplit(true);
        }}>
        {condition ? "close" : "select"}
      </button>
    </div>
  );
};

const SplitBill = ({ friend, updateFriend, friendID, setIsSplitBill }: any) => {
  const [bill, setBill] = useState<number | 0>(0);
  const [spend, setSpend] = useState<number | 0>(0);
  const [pay, setPay] = useState<string | null>("me");
  const friendSpend = !!bill && !!spend ? Number(bill) - Number(spend) : 0;
  const paying =
    pay === "me"
      ? Number(bill) - Number(spend)
      : pay === "friend"
      ? Number(friendSpend) - Number(bill)
      : 0;
  const updatedFriend = friend.map((el: any) => (el.id === friendID ? { ...el, owe: paying } : el));
  const person = friend.filter((el: any) => el.id === friendID)[0];

  return (
    <form
      className='split-bill-form'
      onSubmit={(e) => {
        e.preventDefault();
        updateFriend(updatedFriend);
        setIsSplitBill(false);
      }}>
      <h1>Split bill with {person.name}</h1>

      <label htmlFor='bill'>Bill Value </label>
      <input
        name='bill'
        type='number'
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label htmlFor='my-expense'>Your expense </label>
      <input
        name='my-expense'
        type='number'
        value={spend}
        onChange={(e) => {
          Number(e.target.value) > bill
            ? setSpend(Number(bill))
            : Number(e.target.value) < 0
            ? setSpend(0)
            : setSpend(Number(e.target.value));
        }}
      />

      <label htmlFor='friend'>{person.name} expense </label>
      <input name='friend' type='number' value={friendSpend} disabled={true} />

      <label htmlFor='select-name'>Who is paying this bill?</label>
      <select name='select-name' onChange={(e) => setPay(e.target.value)}>
        <option value='me'>You</option>
        <option value='friend'>{person.name}</option>
      </select>

      <button type='submit'>Split bill</button>
    </form>
  );
};
