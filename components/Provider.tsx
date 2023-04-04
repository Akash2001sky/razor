
import React, {createContext} from 'react';
import { Alert } from 'react-native';

interface Iprops {
  children: any;
}
interface Istate{
cartdata :[];
wishlist:[];
quantities:object;
total:number;
myTotal:[];



}
export const context = createContext({});

export class Provider extends React.Component<Iprops, Istate> {
  subdata: any;
  constructor(props: Iprops) {
    super(props);
    this.state = {
      cartdata: [],
      wishlist: [],
    quantities:{},
    total:0,
    myTotal:[],

    };
  }

  handleAdd = (item: { price: any; }) => {
    const {cartdata} = this.state;
    const val = this.state.cartdata.find(ele => {
      return ele.id === data.id;
    });
    if (val === undefined) {
      this.state.cartdata.push(data);
      const updateProducts = this.state.cartData.map(ele => ({
        ...ele,
        quantity: 1,
      }));
      this.setState({cartdata: updateProducts, toggle: true});
      // console.log('======================>', this.state.cartData);
    } else {
      Alert.alert('Item already is in Cart!');
      
    }
    // const val= cartdata.find(ele=>{
    //   return ele.id === item.id
    // })
    // if(val=== undefined){
    //   this.setState({
    //     cartdata: [...cartdata, item],
    //     total:item.price,
      
        
    //   });
  
    // }else{
    //   this.setState({cartdata:[...cartdata]})
    //   Alert.alert('Item is already in the cart')
    // }
    
  
  };

  clearitm = () => {
    this.state.cartdata.length = 0;
    this.setState({cartdata: [],total:0, quantitles:{}});
    console.log('hello');
  };

  handleWishList = (item) => {
    // console.log(item)
    const {wishlist} = this.state;
    const index = wishlist.findIndex(p => p.id === item.id);
    if (index !== -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(item);
    }
    this.setState({
      wishlist,
    });
  };
 


  addToCart=(item :any )=>{
  
const {quantities,total,cartdata}=this.state;
//const newCart=[...cartdata, item];
const newQuantities={...quantities};
newQuantities[item.id]=(newQuantities[item.id] || 1)+1;
const newTotal =total +item.price
const dta=item.price
this.setState({
  quantities:newQuantities,total:newTotal
})

  }


  removeFromCart=(item)=>{
    console.log(item)
const {cartdata,quantities,total}=this.state;
const itemIndex=cartdata.findIndex((i)=>i.id===item.id);
if(itemIndex >=0){
  // const newCart=[...cartdata];
  // newCart.splice(itemIndex,1);
  let newQuantities = {...quantities};
  newQuantities[item.id]= (newQuantities[item.id] || 0 )-1;
  if(newQuantities[item.id]>=1){
    const newTotal = total - item.price;
    this.setState({quantities:newQuantities, total:newTotal})
  }

}

  }



  plus=()=>{
    const {quantities,total,cartdata}=this.state;
//const newCart=[...cartdata, item];
const newQuantities={...quantities};
newQuantities[item.id]=(newQuantities[item.id] || 1)+1;
const newTotal =total +item.price
const dta=item.price
this.setState({
  quantities:newQuantities,total:newTotal
})
  }
  
  render(): React.ReactNode {
    console.log(this.state.cartitems)
    return (
      <context.Provider
        value={{
          handleWishList: this.handleWishList,
          clearitm: this.clearitm,
          handleAdd: this.handleAdd,
          cartdata: this.state.cartdata,
          wishlist: this.state.wishlist,
          cartitems:this.state.cartitems,
          removeFromCart:this.removeFromCart,
          addToCart:this.addToCart,
          total:this.state.total,
          quantities:this.state.quantities,
          myTotal:this.myTotal
        }}>
        {this.props.children}
      </context.Provider>
    );
  }
}
