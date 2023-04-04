import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {context} from './Provider';

class WishList extends React.Component {
  static contextType = context;

  state = {
    data: [],
  };
  componentDidMount(): void {
    //@ts-ignore
    const {wishlist} = this.context;
    console.log(wishlist);
    // this.setState({data:wishlist})
  }
  renderitm = ({item}: any) => {
    //@ts-ignore
    const {cartdata, clearitm, handleWishList} = this.context;
    return (
      <View style={styles.card}>
        <View>
          <Image
            source={{uri: item.images[0]}}
            style={{height: 100, width: 120, borderRadius: 10}}
            resizeMode="stretch"
          />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.titlestyle}>{item.title}</Text>
          <Text style={styles.priceStyle}>₹ {item.price} </Text>
          <TouchableOpacity
            onPress={() => {
              handleWishList(item);
            }}
            style={{
              backgroundColor: '#ff8b24',
              padding: 4,
              width: 70,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 7,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 15, fontWeight: '600', color: '#ffffffaa'}}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render(): React.ReactNode {
    //@ts-ignore
    const {wishlist} = this.context;

    return (
      <View>
        <FlatList
          data={wishlist}
          renderItem={this.renderitm}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default WishList;

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
