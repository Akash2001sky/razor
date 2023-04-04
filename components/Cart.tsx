import React from 'react';

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {context} from './Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Iporps {
  navigation?: any;
}
interface Istate {
  email: string;
  productdata: any;
}
class Cart extends React.Component<Iporps, Istate> {
  static contextType = context;

  constructor(props: Iporps) {
    super(props);
    this.state = {
      productdata: [],
      email: '',
    };
  }

  async componentDidMount(): Promise<void> {
    //this.setState({productdata: cartdata});

    const savedUser = await AsyncStorage.getItem('user');
    const currentUser = JSON.parse(savedUser);
    this.setState({email: currentUser});
  }
  renderitm = ({item}: any) => {
    //@ts-ignore
    const {cartitems, removeFromCart, addToCart, quantities} = this.context;
    function clearitm() {
      throw new Error('Function not implemented.');
    }

    return (
      <View style={styles.card}>
        <View>
          <Image
            source={{uri: item.thumbnail}}
            style={{height: 100, width: 120, borderRadius: 10}}
            resizeMode="stretch"
          />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.titlestyle}>{item.title}</Text>
          <Text style={styles.priceStyle}>₹ {item.price} </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              onPress={() => {
                removeFromCart(item);
              }}
              style={{
                backgroundColor: '#ff8b24aa',
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 15, fontWeight: '800'}}>-</Text>
            </TouchableOpacity>

            <Text>{quantities[item.id] || 1}</Text>

            <TouchableOpacity
              onPress={() => {
                addToCart(item);
              }}
              onPress={() =>addToCart(item)}
              style={{
                backgroundColor: '#ff8b24aa',
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 15, fontWeight: '800'}}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              var options = {
                description: `${item.description}`,
                image: `${item.images[0]}`,
                currency: 'INR',
                key: 'rzp_test_locuRaWt3KL2uf',
                amount: `${item.price}00`,
                name: `${item.title}`,
                prefill: {
                  email: 'void@razorpay.com',
                  contact: '9191919191',
                  name: 'Razorpay Software',
                },
                theme: {color: '#F37254'},
              };

              RazorpayCheckout.open(options)
                .then(data => {
                  clearitm();
                  Alert.alert(`Success: ${data.razorpay_payment_id}`);
                })
                .catch(error => {
                  Alert.alert(`Error: ${error.code} | ${error.description}`);
                });
            }}
            style={{
              backgroundColor: '#ff8b24',
              height: 30,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              borderRadius: 10,
            }}>
            <Text>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render(): React.ReactNode {
    const {cartdata, clearitm, total, myTotal} = this.context;
    const price =
      total +
      cartdata.reduce((acc: any, ele: {price: any}) => acc + ele.price, 0);
    //console.log(cartdata.reduce((acc, ele) => acc + ele.price, 0));
    //console.log("========productData=======", this.state.productdata)
    return (
      <View>
        <FlatList
          data={cartdata}
          renderItem={this.renderitm}
          keyExtractor={item => item.id}
        />
        {cartdata.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 250,
              backgroundColor: '#ff8b24',
              margin: 30,
              height: 200,
              borderRadius: 20,
            }}>
            <Text style={{color: '#ffffff', fontSize: 30}}>
              Cart is Empty ?
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Products');
              }}>
              <Text>Add Here</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#000000aa',
              margin: 20,
              borderRadius: 10,
              padding: 5,
            }}>
            <View style={{marginTop: 10}}>
              <Text style={{color: '#ffffff'}}>
                Total Items:{cartdata.length}
              </Text>

              <Text style={{color: '#ffffff'}}>
                Total Price:
                {cartdata.length === 0
                  ? null
                  : cartdata.length === 1
                  ? total
                  : price}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  var options = {
                    description: 'Credits towards consultation',
                    image: 'https://i.imgur.com/3g7nmJC.png',
                    currency: 'INR',
                    key: 'rzp_test_locuRaWt3KL2uf',
                    amount: `${
                      cartdata.length === 0
                        ? null
                        : cartdata.length === 1
                        ? total
                        : price
                    }00`,
                    name: 'foo',
                    prefill: {
                      email: `${this.state.email}`,
                      contact: '9191919191',
                      name: 'Razorpay Software',
                    },
                    theme: {color: '#F37254'},
                  };
                  RazorpayCheckout.open(options)
                    .then(data => {
                      clearitm();
                      Alert.alert(`Success: ${data.razorpay_payment_id}`);
                    })
                    .catch(error => {
                      Alert.alert(
                        `Error: ${error.code} | ${error.description}`,
                      );
                    });
                }}
                //   onPress={() => {

                //     var options = {
                //       description: 'Credits towards consultation',
                //       image: 'https://i.imgur.com/3g7nmJC.png',
                //       currency: 'INR',
                //       key: 'rzp_test_locuRaWt3KL2uf',
                //       amount: `${cartdata.reduce((acc,ele)=>acc+ele.price,0)}00`,
                //       name: 'foo',
                //       prefill: {
                //         email: 'ahiwdn@gmail.com',
                //         contact: '9191919191',
                //         name: 'Razorpay Software',
                //       },
                //       theme: {color: '#F37254'},
                //     };
                //     RazorpayCheckout.open(options)
                //       .then(data => {

                //         Alert.alert(`Success: ${data.razorpay_payment_id}`);
                //       })
                //       .catch(error => {

                //         Alert.alert(`Error: ${error.code} | ${error.description}`);
                //       });
                //   }}
                style={{
                  backgroundColor: '#ff8b24',
                  height: 35,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 10,
                }}>
                <Text>Buy All</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
export default Cart;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
    padding: 7,
  },
  titlestyle: {
    color: '#000000aa',
    fontSize: 20,
    fontWeight: '600',
  },
  discStyle: {
    color: '#000000aa',
    fontSize: 15,
  },
  priceStyle: {
    color: '#000000aa',
  },
});
