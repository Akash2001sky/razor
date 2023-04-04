import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {context} from './Provider';

interface Iprops {
  navigation?: any;
  route: any;
}
interface Istate {
  productdata: any;
  idx: any;
  wishList: any;
}
class SingleProduct extends React.Component<Iprops, Istate> {
  static contextType = context;

  constructor(props: Iprops) {
    super(props);
    this.state = {
      productdata: [],
      idx: '',
      wishList: false,
    };
  }
  componentDidMount(): void {
    const {idx} = this.props.route.params;
    this.setState({idx: idx});
    axios
      .get(`https://dummyjson.com/products/${idx}`)
      .then(res => this.setState({productdata: res.data}));
  }

  render(): React.ReactNode {
    const {item} = this.props.route.params;
    const {productdata, wishList} = this.state;
    //@ts-ignore
    const {handleAdd, handleWishList, wishlist} = this.context;
    const isWishlisted =
      wishlist.findIndex((p: {id: any}) => p.id === item.id) !== -1;

    return (
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => {
            handleWishList(item);
            this.props.navigation.navigate('WishList');
            this.setState({wishList: !wishList});
          }}
          style={{position: 'absolute', marginLeft: 330, marginTop: 130}}>
          <AntDesign
            name="heart"
            size={30}
            color={!isWishlisted ? '#ffffff' : '#FE6244'}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
            marginTop: 180,
            backgroundColor: '#ff8b24',
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 10,
          }}>
          <View>
            <Image
              source={{uri: productdata.thumbnail}}
              style={{height: 200, width: 300, borderRadius: 20}}
              resizeMode="stretch"
            />
          </View>
          <View style={{margin: 20, flexDirection: 'column'}}>
            <Text style={styles.text}>Product: {productdata.title}</Text>
            <Text style={styles.txtremaining}>
              product description: {productdata.description}
            </Text>
            <Text style={styles.txtremaining}>brand: {productdata.brand}</Text>
            <Text style={styles.txtremaining}>
              In stock: {productdata.stock}
            </Text>
            <Text style={styles.txtremaining}>Price: {productdata.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.cartbtn}
            onPress={() => {
              handleAdd(item);
              this.props.navigation.navigate('Cart');
            }}>
            <Text style={{color: '#ffffff'}}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default SingleProduct;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ff8b24aa',
    height: '100%',
  },
  text: {
    fontSize: 25,
    color: '#ffffff',
    fontWeight: '600',
  },
  txtremaining: {
    fontSize: 20,
    color: '#000000',
    marginTop: 6,
  },
  cartbtn: {
    backgroundColor: '#000000aa',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
